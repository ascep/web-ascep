"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type Program = {
  title: string;
  slug: string;
  desc: string;
  logo: string;
  image: string;
  color: string;
  href?: string;
};

type ProgramCarouselProps = {
  programs: Program[];
  locale: string;
};

const pillLabels: Record<string, string> = {
  "avanza-joven": "pillFormacion",
  avanzaJoven: "pillFormacion",
  empleo: "pillInsercion",
  incidencia: "pillLiderazgo",
  "mi-cuerpo": "pillBienestar",
  miCuerpo: "pillBienestar",
  "casas-del-saber": "pillFormacion",
  casasDelSaber: "pillFormacion",
};

export default function ProgramCarousel({ programs, locale }: ProgramCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("programas");

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % programs.length);
  }, [programs.length]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + programs.length) % programs.length);
  }, [programs.length]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isPaused, prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-brand-purple">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t("title")} <span className="text-white/80">{t("titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            {t("desc")}
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-stretch justify-center gap-3 overflow-hidden px-4 py-8 sm:px-8">
            {programs.map((program, i) => {
              const isActive = i === active;
              const pill = t(pillLabels[program.slug] || "pillPrograma");

              return (
                <motion.div
                  key={program.slug}
                  layout
                  className="relative cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
                  style={{ zIndex: isActive ? 10 : 1 }}
                  animate={{
                    flex: isActive ? "1 1 55%" : "1 1 10%",
                    opacity: isActive ? 1 : 0.7,
                  }}
                  transition={{
                    layout: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
                    opacity: { duration: 0.3 },
                  }}
                  onClick={() => setActive(i)}
                >
                  <div className="relative h-[360px] w-full sm:h-[420px]">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700"
                      style={{
                        transform: isActive ? "scale(1)" : "scale(1.1)",
                        filter: isActive ? "none" : "saturate(0.3) brightness(0.6)",
                      }}
                      sizes="(max-width: 640px) 100vw, 55vw"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, ${program.color}cc 0%, transparent 60%)`,
                        opacity: isActive ? 1 : 0.4,
                      }}
                    />

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="absolute inset-x-0 bottom-0 p-6 sm:p-8"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                            <Image
                              src={program.logo}
                              alt=""
                              width={40}
                              height={24}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span
                            className="inline-block rounded-lg px-3 py-1 text-xs font-semibold text-white"
                            style={{ backgroundColor: program.color }}
                          >
                            {pill}
                          </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">
                          {program.title}
                        </h3>
                        <p className="mb-4 max-w-md text-sm leading-relaxed text-white/80">
                          {program.desc}
                        </p>
                        <Link
                          href={program.href ?? `/${locale}/programas/${program.slug}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold transition-all hover:shadow-lg"
                          style={{ color: program.color }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t("leerMas")}
                          <ArrowRight size={14} />
                        </Link>
                      </motion.div>
                    )}

                    {!isActive && (
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 p-1.5 backdrop-blur-sm">
                          <Image
                            src={program.logo}
                            alt=""
                            width={32}
                            height={20}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); setIsPaused(true); prev(); }}
              aria-label="Previous program"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/20 text-white transition-all hover:border-white hover:bg-white hover:text-brand-purple"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {programs.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => { setIsPaused(true); setActive(i); }}
                  aria-label={`Go to ${p.title}`}
                  className={`flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all ${
                    i === active ? "bg-white" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setIsPaused(true); next(); }}
              aria-label="Next program"
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
