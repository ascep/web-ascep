"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, useReducedMotion, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";

type Testimonio = {
  text: string;
  author: string;
  role: string;
};

type EnredateTestimonialsProps = {
  tag: string;
  title: string;
  testimonios: Testimonio[];
};

const avatars = ["MC", "CM", "AP"];

export default function EnredateTestimonials({
  tag,
  title,
  testimonios,
}: EnredateTestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();
  const total = testimonios.length;

  const goTo = useCallback(
    (i: number) => setCurrent((i + total) % total),
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [next, prefersReduced]);

  const dur = prefersReduced ? 0 : 0.5;

  return (
    <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
      <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
      <DecoShapes variant="teal" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/30 px-5 py-2 text-sm font-bold text-white/80">
            {tag}
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
        </AnimatedSection>

        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={dur ? { opacity: 0, y: 20 } : undefined}
              animate={dur ? { opacity: 1, y: 0 } : undefined}
              exit={dur ? { opacity: 0, y: -20 } : undefined}
              transition={dur ? { duration: dur, ease: [0.23, 1, 0.32, 1] } : undefined}
              className="mb-10 text-center"
            >
              <svg
                className="mx-auto mb-6 h-12 w-12 text-white/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-white/85 sm:text-2xl">
                {testimonios[current].text}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/30 text-sm font-bold text-white">
                  {avatars[current]}
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">
                    {testimonios[current].author}
                  </div>
                  <div className="text-sm text-white/60">
                    {testimonios[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-3">
              {testimonios.map((t, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    i === current
                      ? "bg-brand-orange text-white"
                      : "border border-white/20 text-white/60 hover:bg-white/10"
                  }`}
                  aria-label={`Testimonial from ${t.author}`}
                >
                  {avatars[i]}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex justify-center">
            {testimonios.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex min-h-11 min-w-11 items-center justify-center"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

