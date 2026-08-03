"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import type { TransparenciaDoc } from "@/types/transparencia";
import { CATEGORY_META } from "@/lib/transparencia-meta";

type TransparenciaSliderProps = {
  docs: TransparenciaDoc[];
  categories: Record<string, string>;
  openDoc: string;
  updatedLabel: string;
  prevLabel: string;
  nextLabel: string;
  dotsLabel: string;
};

export default function TransparenciaSlider({
  docs,
  categories,
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
  const meta = CATEGORY_META[doc.category] ?? CATEGORY_META.legales;
  const Icon = meta.icon;

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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="grid items-center gap-8 lg:grid-cols-[minmax(0,340px)_1fr]"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-[10px] border border-white/20 bg-white/10 shadow-2xl lg:mx-0 lg:max-w-none">
              <iframe src={doc.path} title={doc.title} className="h-full w-full" />
            </div>
            <div className="text-center lg:text-left">
              <span
                className={`mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.iconBg} ${meta.iconColor}`}
              >
                <Icon size={12} />
                {categories[doc.category] ?? doc.category}
              </span>
              <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                {doc.title}
              </h3>
              {doc.updatedAt && (
                <p className="mt-2 text-sm text-text-muted">
                  {updatedLabel}: {new Date(doc.updatedAt).toLocaleDateString()}
                </p>
              )}
              <Link
                href={doc.path}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-brand-yellow px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:shadow-lg hover:brightness-95"
              >
                {openDoc}
                <Download size={16} />
              </Link>
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
          <div className="mt-8 flex items-center justify-center gap-2">
            {docs.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${dotsLabel} ${i + 1}`}
                aria-current={i === active}
                className={`min-h-6 min-w-6 rounded-full p-2 transition-all ${
                  i === active ? "bg-brand-yellow" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
