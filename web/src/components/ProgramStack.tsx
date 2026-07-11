'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type Program = {
  title: string;
  slug: string;
  desc: string;
  logo: string;
  image: string;
  color: string;
};

type ProgramStackProps = {
  programs: Program[];
  locale: string;
};

const pillLabels: Record<string, string> = {
  "avanza-joven": "Formacion",
  avanzaJoven: "Formacion",
  empleo: "Insercion",
  incidencia: "Liderazgo",
  "mi-cuerpo": "Bienestar",
  miCuerpo: "Bienestar",
};

export default function ProgramStack({ programs, locale }: ProgramStackProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-brand-purple">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Programas
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Nuestros <span className="text-brand-orange">Programas</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Nuestros programas se estructuran en un plan de apoyo para los
            adolescentes y jovenes en estrategias que se articula con diferentes
            actores como los centros de proteccion, ICBF, la academia, las
            empresas y otros aliados estrategicos.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {programs.map((program, i) => (
            <motion.div
              key={program.slug}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : i * 0.12 }}
              className="group overflow-hidden rounded-[10px] bg-white"
            >
              <div className="relative h-52 overflow-hidden sm:h-60">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span
                    className="inline-block rounded-[10px] px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: program.color }}
                  >
                    {pillLabels[program.slug] || "Programa"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] p-2" style={{ backgroundColor: `${program.color}18` }}>
                    <Image
                      src={program.logo}
                      alt=""
                      width={40}
                      height={24}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {program.title}
                  </h3>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {program.desc}
                </p>
                <Link
                  href={`/${locale}/programas/${program.slug}`}
                  className="mt-auto inline-flex items-center gap-2 self-start rounded-[10px] px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: program.color }}
                >
                  Leer mas
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
