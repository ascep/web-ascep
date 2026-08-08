"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";

type Slide = {
  tag: string;
  title: string;
  desc: string;
};

type CasasHeroProps = {
  slides: Slide[];
  images: string[];
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export default function CasasHero({
  slides,
  images,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: CasasHeroProps) {
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();
  const total = slides.length;

  const goTo = useCallback(
    (i: number) => setCurrent((i + total) % total),
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const dur = prefersReduced ? 0 : 0.6;

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-purple-bg">
      <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
      <DecoShapes variant="mixed" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center px-4 py-24 sm:px-6 lg:flex-row lg:px-8">
        <div className="flex-1 lg:pr-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={dur ? { opacity: 0, x: 60 } : undefined}
              animate={dur ? { opacity: 1, x: 0 } : undefined}
              exit={dur ? { opacity: 0, x: -60 } : undefined}
              transition={dur ? { duration: dur, ease: [0.23, 1, 0.32, 1] } : undefined}
            >
              <span className="mb-4 inline-block rounded-full border border-brand-orange/30 px-5 py-2 text-sm font-bold text-white/80">
                {slides[current].tag}
              </span>
              <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {slides[current].title}
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                {slides[current].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mb-8 flex flex-wrap gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-[10px] bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 hover:shadow-lg"
            >
              {ctaLabel}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center rounded-[10px] border-2 border-white/30 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          </div>

          <div className="flex items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex min-h-11 min-w-11 items-center justify-center"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex-1 lg:mt-0">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full border-8 border-brand-teal/30" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full border-8 border-brand-orange/20" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={dur ? { opacity: 0, scale: 0.9 } : undefined}
                animate={dur ? { opacity: 1, scale: 1 } : undefined}
                exit={dur ? { opacity: 0, scale: 0.9 } : undefined}
                transition={dur ? { duration: 0.5, ease: [0.23, 1, 0.32, 1] } : undefined}
                className="absolute inset-0"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[10px] border border-white/10">
                  <Image
                    src={images[current % images.length]}
                    alt={slides[current].title}
                    fill
                    sizes="(min-width: 512px) 512px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              className="absolute -left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute -right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="h-12 w-full sm:h-16">
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1350,30 1440,30 L1440,60 L0,60 Z"
            fill="var(--color-bg-base)"
          />
        </svg>
      </div>
    </section>
  );
}
