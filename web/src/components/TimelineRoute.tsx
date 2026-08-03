"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { Plus } from "lucide-react";

export type RouteItem = {
  year: string;
  items: string[];
  highlight?: boolean;
  image?: string;
};

type TimelineRouteProps = {
  items: RouteItem[];
  hitoSingular: string;
  hitoPlural: string;
};

export default function TimelineRoute({ items, hitoSingular, hitoPlural }: TimelineRouteProps) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [fill, setFill] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleScroll = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const total = rect.height + vh * 0.5;
    const passed = vh * 0.85 - rect.top;
    const pct = Math.min(Math.max(passed / total, 0), 1);
    setFill(pct * 100);
  }, []);

  useEffect(() => {
    let raf: number;
    if (prefersReducedMotion) {
      raf = requestAnimationFrame(() => setFill(100));
      return () => cancelAnimationFrame(raf);
    }
    raf = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll, prefersReducedMotion]);

  const dashOffset = pathLength - (pathLength * fill) / 100;

  return (
    <div ref={trackRef} className="relative mt-8">
      <svg
        className="pointer-events-none absolute left-[18px] top-0 h-full w-11 sm:left-[26px] sm:w-14"
        preserveAspectRatio="none"
        viewBox="0 0 44 1000"
        aria-hidden="true"
      >
        <path
          d="M 22 0 C 8 60, 8 100, 22 160 S 36 260, 22 320 S 8 420, 22 480 S 36 580, 22 640 S 8 740, 22 800 S 36 900, 22 1000"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="stroke-[var(--color-border-subtle)]"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={pathRef}
          d="M 22 0 C 8 60, 8 100, 22 160 S 36 260, 22 320 S 8 420, 22 480 S 36 580, 22 640 S 8 740, 22 800 S 36 900, 22 1000"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="stroke-[var(--color-brand-primary)] transition-[stroke-dashoffset] duration-150 ease-linear"
          strokeDasharray={pathLength || 1}
          strokeDashoffset={prefersReducedMotion ? 0 : dashOffset}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol className="relative m-0 flex list-none flex-col gap-4 p-0">
        {items.map((item, i) => (
          <TimelineItem
            key={item.year}
            item={item}
            isLast={i === items.length - 1}
            hitoSingular={hitoSingular}
            hitoPlural={hitoPlural}
          />
        ))}
      </ol>
    </div>
  );
}

function TimelineItem({
  item,
  isLast,
  hitoSingular,
  hitoPlural,
}: {
  item: RouteItem;
  isLast: boolean;
  hitoSingular: string;
  hitoPlural: string;
}) {
  const [open, setOpen] = useState(isLast);
  const contentId = `qs-momento-${item.year}`;
  const count = item.items.length;
  const countLabel = `${count} ${count === 1 ? hitoSingular : hitoPlural}`;

  return (
    <li className={`relative pl-14 sm:pl-[72px] ${item.highlight ? "" : ""}`}>
      <div className="absolute left-0 top-2 flex w-11 justify-center sm:w-14" aria-hidden="true">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[var(--color-bg-base)] font-display text-[15px] font-semibold sm:h-[44px] sm:w-[44px] ${
            item.highlight
              ? "border-brand-orange text-brand-orange shadow-[0_0_0_5px_rgba(196,81,24,0.12)]"
              : "border-brand-primary text-brand-primary-dark"
          }`}
        >
          {item.year.slice(2)}
        </span>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((o) => !o)}
        className={`w-full min-h-[44px] cursor-pointer rounded-[10px] border bg-[var(--color-bg-card)] text-left transition-all duration-200 hover:shadow-md ${
          item.highlight
            ? "border-brand-orange bg-brand-orange/[0.04]"
            : "border-border-subtle hover:border-brand-secondary"
        }`}
      >
        <span className="flex min-h-[44px] items-center gap-3 px-4 py-3">
          <span
            className={`text-lg font-bold sm:text-[21px] ${
              item.highlight ? "text-brand-orange" : "text-brand-primary-dark"
            }`}
          >
            {item.year}
          </span>
          <span className="mr-auto text-xs text-text-muted">{countLabel}</span>
          <Plus
            size={18}
            strokeWidth={2}
            aria-hidden="true"
            className={`shrink-0 text-brand-primary-dark transition-transform duration-200 ${
              open ? "rotate-45" : ""
            }`}
          />
        </span>
        <span
          id={contentId}
          className="block overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: open ? "800px" : "0px" }}
        >
          {item.image ? (
            <span className="block border-t border-border-subtle px-4 pt-4">
              <Image
                src={item.image}
                alt={`${item.year}`}
                width={200}
                height={150}
                className="rounded-[10px] object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </span>
          ) : null}
          <span className="block">
            <ul className="m-0 flex list-none flex-col gap-2.5 border-t border-border-subtle px-4 py-4">
              {item.items.map((entry, j) => (
                <li
                  key={j}
                  className="relative pl-4 text-sm leading-relaxed text-text-secondary sm:text-[15px]"
                >
                  <span
                    className={`absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full ${
                      item.highlight ? "bg-brand-orange" : "bg-brand-secondary"
                    }`}
                  />
                  {entry}
                </li>
              ))}
            </ul>
          </span>
        </span>
      </button>
    </li>
  );
}
