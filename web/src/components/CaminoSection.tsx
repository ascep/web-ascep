'use client';

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path";

type CaminoSectionProps = {
  bgImage: string;
  tag: string;
  title: string;
  subtitle: string;
  stepLabel: string;
  prevLabel: string;
  nextLabel: string;
};

const POSTERS = [
  "EXP8.webp",
  "EXP1.webp",
  "EXP2.webp",
  "EXP3.webp",
  "EXP4.webp",
  "EXP5.webp",
  "EXP6.webp",
  "EXP7.webp",
  "EXP10.webp",
  "EXP11.webp",
  "EXP12.webp",
  "Vaki.webp",
].map((src) => ({
  src: `/images/afiches/${src}`,
  alt: src.replace(".webp", ""),
}));

export default function CaminoSection({
  bgImage,
  tag,
  title,
  subtitle,
  stepLabel,
  prevLabel,
  nextLabel,
}: CaminoSectionProps) {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const count = POSTERS.length;

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + count) % count);
  }, [count]);

  return (
    <section
      className="section-dark section-bg-image bg-atmospheric-purple relative overflow-hidden py-20 sm:py-24"
      style={{
        "--section-bg-image": `url(${assetPath(bgImage)})`,
        "--section-bg-position": "center calc(50% + clamp(160px, 22vw, 280px))",
      } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">
            {tag}
          </p>
          <h2 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[10px] shadow-2xl ring-1 ring-white/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={assetPath(POSTERS[active].src)}
                  alt={`${stepLabel} ${active + 1}`}
                  fill
                  sizes="(min-width: 480px) 384px, 100vw"
                  className="object-contain"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label={prevLabel}
                  className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label={nextLabel}
                  className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <p className="mt-4 text-center text-sm font-medium text-white/80">
            {stepLabel} {active + 1} de {count}
          </p>

          <div
            className="mx-auto mt-3 flex max-w-xs items-center gap-1.5"
            aria-hidden="true"
          >
            {POSTERS.map((_, i) => (
              <span
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i === active
                    ? "bg-brand-yellow"
                    : i < active
                      ? "bg-brand-teal"
                      : "bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
