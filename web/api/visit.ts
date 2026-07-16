import { Hono } from "https://deno.land/x/hono@v4.7.5/mod.ts"
import { cors } from "https://deno.land/x/hono@v4.7.5/middleware/cors/index.ts"
import { streamSSE } from "https://deno.land/x/hono@v4.7.5/helper/streaming/sse.ts"

const db = await Deno.openKv()

const app = new Hono()
let eventId = 0

app.use("/*", cors())

app.get("/", (c) => c.json({ ok: true, name: "ascep-visitors" }))

app.post("/visit", async (c) => {
  const { city, country, flag } = await c.req.json()
  const entry = { city, country, flag, timestamp: Date.now() }

  await db.atomic()
    .set(["lastVisit"], entry)
    .sum(["visits"], 1n)
    .commit()

  return c.json({ ok: true })
})

app.get("/sse", (c) => {
  return streamSSE(c, async (stream) => {
    const watcher = db.watch([["lastVisit"], ["visits"]])
    for await (const [entry] of watcher) {
      if (entry.value != null) {
        await stream.writeSSE({
          data: JSON.stringify({ key: entry.key[0], value: entry.value }),
          event: "update",
          id: String(eventId++),
        })
      }
    }
  })
})

app.get("/stats", async (c) => {
  const [lastVisit, visits] = await Promise.all([
    db.get(["lastVisit"]),
    db.get(["visits"]),
  ])
  return c.json({
    total: Number(visits.value ?? 0),
    lastVisit: lastVisit.value ?? null,
  })
})

Deno.serve(app.fetch)
