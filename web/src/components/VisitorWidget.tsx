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

  useEffect(() => {
    if (!DENO_URL) return;

    const sendVisit = async () => {
      if (sessionStorage.getItem("ascep_visited")) return;
      sessionStorage.setItem("ascep_visited", "1");
      let city = "Desconocido";
      let country = "Desconocido";
      let flag = "";
      try {
        const res = await fetch(GEO_API, { signal: AbortSignal.timeout(5000) });
        const geo = await res.json();
        city = geo.city?.name || city;
        country = geo.country?.name || country;
        flag = geo.country?.flag || flag;
      } catch {}
      await fetch(`${DENO_URL}/visit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, country, flag }),
      }).catch(() => {});
    };
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
      } catch {}
    });

    return () => es.close();
  }, []);

  if (!DENO_URL) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 select-none">
      <div className="flex items-center gap-2 rounded-[10px] border border-border-subtle bg-bg-card/80 px-3 py-1.5 text-[11px] text-text-muted shadow-sm backdrop-blur">
        <span className="text-[10px]">👁</span>
        <span className="font-medium text-text-primary">{total.toLocaleString()}</span>
        {last && (
          <>
            <span className="opacity-30">|</span>
            <span>{last.flag}</span>
            <span className="hidden sm:inline">{last.city}, {last.country}</span>
            <span className="opacity-50">• {timeAgo(last.timestamp)}</span>
          </>
        )}
      </div>
    </div>
  );
}
