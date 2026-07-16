const db = await Deno.openKv()
const BASE = 100
let eventId = 0

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

Deno.serve(async (req) => {
  const url = new URL(req.url)

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders })

  if (url.pathname === "/") return json({ ok: true, name: "ascep-visitors" })

  if (req.method === "POST" && url.pathname === "/visit") {
    const { city, country, flag } = await req.json()
    const entry = { city, country, flag, timestamp: Date.now() }

    await db.atomic()
      .set(["lastVisit"], entry)
      .sum(["visits"], 1n)
      .set(["initialized"], true)
      .commit()

    return json({ ok: true })
  }

  if (req.method === "GET" && url.pathname === "/stats") {
    const [lastVisit, visits] = await Promise.all([
      db.get(["lastVisit"]),
      db.get(["visits"]),
    ])
    return json({
      total: BASE + Number(visits.value ?? 0n),
      lastVisit: lastVisit.value ?? null,
    })
  }

  if (req.method === "GET" && url.pathname === "/sse") {
    const stream = new ReadableStream({
      async start(controller) {
        const watcher = db.watch([["lastVisit"], ["visits"]])
        for await (const [entry] of watcher) {
          if (entry.value != null) {
            const value = entry.key[0] === "visits" ? BASE + Number(entry.value) : entry.value
            const data = `event: update\ndata: ${JSON.stringify({ key: entry.key[0], value })}\nid: ${eventId++}\n\n`
            controller.enqueue(new TextEncoder().encode(data))
          }
        }
      },
    })

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  }

  return json({ error: "not found" }, 404)
})
