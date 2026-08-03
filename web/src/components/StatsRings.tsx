"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Users, FileWarning, HeartHandshake, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Users,
  FileWarning,
  HeartHandshake,
};

export type StatBreakdown = {
  label: string;
  value: number;
  color: string;
};

export type RingStat = {
  icon: string;
  value: number;
  ring: number;
  ringColor: string;
  label: string;
  breakdown?: StatBreakdown[];
  note?: string;
};

type StatsRingsProps = {
  stats: RingStat[];
};

function useCountUp(target: number, inView: boolean, reduced: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    if (reduced) {
      raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduced, duration]);
  return value;
}

function DataRing({
  percent,
  color,
  size = 156,
  stroke = 12,
}: {
  percent: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const target = Math.min(Math.max(percent, 0), 1) * circumference;
  const [dash, setDash] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const raf = requestAnimationFrame(() => setDash(target));
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-border-subtle)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference - dash}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: reduced ? "none" : "stroke-dasharray 1200ms cubic-bezier(0.22,1,0.36,1)" }}
      />
    </svg>
  );
}

function StatCard({ stat }: { stat: RingStat }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(stat.value, isInView, reduced ?? false);
  const Icon = iconMap[stat.icon] || Users;
  const total = stat.breakdown
    ? stat.breakdown.reduce((sum, b) => sum + b.value, 0)
    : stat.value;

  return (
    <div
      ref={ref}
      className="flex h-full flex-col rounded-[10px] border border-border-subtle bg-[var(--color-bg-card)] p-6 sm:p-7"
    >
      <div className="flex items-center justify-center gap-5">
        <div className="relative flex items-center justify-center">
          <DataRing percent={stat.ring} color={stat.ringColor} />
          <span
            className="absolute text-[27px] font-semibold tabular-nums text-[var(--color-text-primary)]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {count.toLocaleString("es-CO")}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2.5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle text-brand-primary-dark"
          aria-hidden="true"
        >
          <Icon size={20} strokeWidth={1.75} />
        </span>
      </div>

      <p className="mt-3 min-h-[44px] text-center text-[15px] text-text-secondary">{stat.label}</p>

      {stat.breakdown ? (
        <>
          <div
            className="mb-3 flex h-2 w-full overflow-hidden rounded-full bg-[var(--color-border-subtle)]"
            role="img"
            aria-label={stat.breakdown
              .map((b) => `${b.label}: ${b.value.toLocaleString("es-CO")}`)
              .join(", ")}
          >
            {stat.breakdown.map((b) => (
              <span
                key={b.label}
                className="h-full transition-[width] duration-[900ms] ease-out"
                style={{ width: isInView ? `${(b.value / total) * 100}%` : 0, background: b.color }}
              />
            ))}
          </div>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {stat.breakdown.map((b) => (
              <li key={b.label} className="flex items-center gap-2 text-[13px] text-text-muted">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: b.color }} />
                {b.label}
                <strong className="ml-auto font-bold text-[var(--color-text-primary)]">
                  {b.value.toLocaleString("es-CO")}
                </strong>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {stat.note ? (
        <p className="mt-3 rounded-[10px] border border-brand-primary/25 bg-brand-primary/[0.08] px-4 py-3 text-[13px] leading-relaxed text-brand-primary-dark">
          {stat.note}
        </p>
      ) : null}
    </div>
  );
}

export default function StatsRings({ stats }: StatsRingsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
