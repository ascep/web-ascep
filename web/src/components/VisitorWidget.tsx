'use client';

import { useEffect, useState, useCallback } from "react";

type VisitInfo = {
  city: string;
  country: string;
  flag: string;
  timestamp: number;
};

const DENO_URL = process.env.NEXT_PUBLIC_DENO_VISITORS_URL || "";
const GEO_API = "https://geolocation.microlink.io/";

function timeAgo(ts: number) {
  const min = Math.floor((Date.now() - ts) / 60000);
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min}min`;
  const h = Math.floor(min / 60);
  return `hace ${h}h`;
}

export default function VisitorWidget() {
  const [total, setTotal] = useState(0);
  const [last, setLast] = useState<VisitInfo | null>(null);
  const [hover, setHover] = useState(false);
  const [now, setNow] = useState(Date.now());

  const sendVisit = useCallback(async () => {
    if (!DENO_URL || sessionStorage.getItem("ascep_visited")) return;
    sessionStorage.setItem("ascep_visited", "1");
    try {
      const res = await fetch(GEO_API);
      const geo = await res.json();
      await fetch(`${DENO_URL}/visit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: geo.city?.name || "Desconocido",
          country: geo.country?.name || "Desconocido",
          flag: geo.country?.flag || "",
        }),
      });
    } catch {
      /* silent */
    }
  }, []);

  useEffect(() => {
    if (!DENO_URL) return;
    sendVisit();

    fetch(`${DENO_URL}/stats`)
      .then((r) => r.json())
      .then((d) => {
        setTotal(d.total);
        setLast(d.lastVisit);
      })
      .catch(() => {});

    const es = new EventSource(`${DENO_URL}/sse`);
    es.addEventListener("update", (e) => {
      try {
        const { key, value } = JSON.parse(e.data);
        if (key === "lastVisit") setLast(value);
        if (key === "visits") setTotal(Number(value));
      } catch {
        /* silent */
      }
    });

    const tick = setInterval(() => setNow(Date.now()), 30000);

    return () => {
      es.close();
      clearInterval(tick);
    };
  }, [sendVisit]);

  if (!DENO_URL || total === 0) return null;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed bottom-4 left-4 z-40 cursor-default select-none"
    >
      <div
        className={`rounded-[10px] border border-border-subtle bg-bg-card/80 px-3 py-1.5 text-[11px] text-text-muted shadow-sm backdrop-blur transition-all duration-300 ${
          hover ? "px-4" : ""
        }`}
        style={{ minWidth: hover ? 220 : 80 }}
      >
        {!hover ? (
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[10px]">👁</span>
            {total.toLocaleString()}
          </span>
        ) : (
          <div className="space-y-0.5 whitespace-nowrap">
            <div className="flex items-center gap-1.5 font-medium text-text-primary">
              <span className="text-[10px]">👁</span>
              {total.toLocaleString()} visitas
            </div>
            {last && (
              <div className="flex items-center gap-1 text-text-muted">
                <span>{last.flag}</span>
                <span>
                  {last.city}, {last.country}
                </span>
                <span className="opacity-50">• {timeAgo(last.timestamp)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
