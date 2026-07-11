'use client';

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  text: string;
  author: string;
  role: string;
};

type HomeTestimonialsProps = {
  tag: string;
  title: string;
  testimonials: Testimonial[];
};

export default function HomeTestimonials({
  tag,
  title,
  testimonials,
}: HomeTestimonialsProps) {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden bg-brand-purple py-20">
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-brand-teal" />
        <div className="absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-brand-orange" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-[10px] bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {tag}
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {(() => {
              const words = title.split(" ");
              const last = words.pop();
              return <>{words.join(" ")} <span className="text-brand-orange">{last}</span></>;
            })()}
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
              className="mb-8 text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                  <Quote className="h-7 w-7 text-brand-orange" />
                </div>
              </div>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
                &ldquo;{testimonials[active].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    {testimonials[active].author}
                  </p>
                  <p className="text-xs text-white/60">
                    {testimonials[active].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/20 text-white transition-all hover:border-white hover:bg-white hover:text-brand-purple"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? "w-8 bg-white" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/20 text-white transition-all hover:border-white hover:bg-white hover:text-brand-purple"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
