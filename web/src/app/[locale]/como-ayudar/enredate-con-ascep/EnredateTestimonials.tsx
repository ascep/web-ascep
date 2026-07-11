"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <section className="relative bg-gradient-to-br from-[#2D1B4E] via-[#4A2D7A] to-brand-purple py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-teal/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <motion.span
            initial={dur ? { opacity: 0, y: 20 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={dur ? { duration: 0.5 } : undefined}
            className="mb-3 inline-block rounded-full bg-white/20 px-5 py-2 text-sm font-bold text-white"
          >
            {tag}
          </motion.span>
          <motion.h2
            initial={dur ? { opacity: 0, y: 20 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={dur ? { duration: 0.5, delay: 0.1 } : undefined}
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            {title}
          </motion.h2>
        </div>

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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-3">
              {testimonios.map((t, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-all ${
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonios.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
