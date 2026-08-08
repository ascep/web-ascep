"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import type { TransparenciaDoc } from "@/types/transparencia";

type TransparenciaSliderProps = {
  docs: TransparenciaDoc[];
  recentTag: string;
  heroTag: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  openDoc: string;
  updatedLabel: string;
  prevLabel: string;
  nextLabel: string;
  dotsLabel: string;
};

export default function TransparenciaSlider({
  docs,
  recentTag,
  heroTag,
  heroTitle,
  heroHighlight,
  heroSubtitle,
  openDoc,
  updatedLabel,
  prevLabel,
  nextLabel,
  dotsLabel,
}: TransparenciaSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % docs.length);
  }, [docs.length]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + docs.length) % docs.length);
  }, [docs.length]);

  useEffect(() => {
    if (docs.length <= 1 || paused || prefersReducedMotion) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused, docs.length, prefersReducedMotion]);

  if (docs.length === 0) return null;

  const doc = docs[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="grid items-center gap-8 lg:grid-cols-[240px_1fr] lg:gap-10"
          >
            <div className="mx-auto flex w-full max-w-[240px] flex-col items-center">
              <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-yellow">
                <Download size={11} />
                {recentTag}
              </p>
              <div className="aspect-[3/4] w-full overflow-hidden rounded-[10px] border border-white/20 bg-white/10 shadow-xl">
                <iframe src={doc.path} title={doc.title} className="h-full w-full" />
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-white">{doc.title}</p>
              {doc.updatedAt && (
                <p className="mt-1 text-xs text-text-muted">
                  {updatedLabel}: {new Date(doc.updatedAt).toLocaleDateString()}
                </p>
              )}
              <Link
                href={doc.path}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-[10px] bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-brand-purple transition-all hover:shadow-lg hover:brightness-95"
              >
                {openDoc}
                <Download size={15} />
              </Link>
            </div>

            <div className="text-center lg:text-left">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">
                {heroTag}
              </p>
              <h1 className="font-display text-2xl leading-tight font-semibold text-white sm:text-4xl">
                {heroTitle} <span className="text-brand-yellow">{heroHighlight}</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                {heroSubtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {docs.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label={prevLabel}
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={nextLabel}
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="mt-7 flex items-center justify-center gap-1.5">
            {docs.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${dotsLabel} ${i + 1}`}
                aria-current={i === active}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full"
              >
                <span
                  className={`block h-2 w-2 rounded-full transition-all ${
                    i === active ? "bg-brand-yellow" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
