"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Calendar, Sparkles, UserCheck, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

type Actividad = {
  title: string;
  desc: string;
  cta: string;
};

type EnredateActividadesProps = {
  tag: string;
  title: string;
  actividades: Actividad[];
  locale: string;
};

const icons = [Calendar, Sparkles, UserCheck, Star];
const gradients = [
  "from-brand-purple/20 to-brand-purple/5",
  "from-brand-teal/20 to-brand-teal/5",
  "from-brand-orange/20 to-brand-orange/5",
  "from-brand-orange/20 to-brand-orange/5",
];

export default function EnredateActividades({
  tag,
  title,
  actividades,
  locale,
}: EnredateActividadesProps) {
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();
  const total = actividades.length;

  const goTo = useCallback(
    (i: number) => setCurrent((i + total) % total),
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, prefersReduced]);

  const isCentered = (i: number) => i === current;
  const isSide = (i: number) =>
    i === (current + 1) % total || i === (current - 1 + total) % total;

  return (
    <section className="relative bg-bg-base py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <motion.span
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block rounded-full bg-brand-purple/10 px-5 py-2 text-sm font-bold text-brand-purple"
          >
            {tag}
          </motion.span>
          <motion.h2
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-text-primary sm:text-4xl"
          >
            {title}
          </motion.h2>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.92 }}
              animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
              exit={prefersReduced ? {} : { opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden rounded-[10px] border border-border-subtle bg-bg-card"
            >
              <div
                className={`flex h-56 items-center justify-center bg-gradient-to-br ${gradients[current]}`}
              >
                {(() => {
                  const Icon = icons[current];
                  return <Icon className="h-20 w-20 text-text-muted" />;
                })()}
              </div>
              <div className="p-8">
                <h3 className="mb-3 text-2xl font-bold text-text-primary">
                  {actividades[current].title}
                </h3>
                <p className="mb-6 leading-relaxed text-text-secondary">
                  {actividades[current].desc}
                </p>
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple transition-colors hover:text-brand-purple/80"
                >
                  {actividades[current].cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default text-text-primary transition-colors hover:bg-bg-elevated"
              aria-label="Previous activity"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {actividades.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-brand-purple" : "w-2 bg-border-default hover:bg-text-muted"
                  }`}
                  aria-label={`Go to ${actividades[i].title}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default text-text-primary transition-colors hover:bg-bg-elevated"
              aria-label="Next activity"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
