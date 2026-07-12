"use client";

import { motion, useReducedMotion } from "motion/react";
import { Calendar, Sparkles, UserCheck, Star, ArrowRight } from "lucide-react";
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
  "from-brand-teal/20 to-brand-teal/5",
];

export default function EnredateActividades({
  tag,
  title,
  actividades,
  locale,
}: EnredateActividadesProps) {
  const prefersReduced = useReducedMotion();
  const dur = prefersReduced ? 0 : 0.6;

  return (
    <section className="relative bg-bg-base py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <motion.span
            initial={dur ? { opacity: 0, y: 20 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block rounded-full bg-brand-purple/10 px-5 py-2 text-sm font-bold text-brand-purple"
          >
            {tag}
          </motion.span>
          <motion.h2
            initial={dur ? { opacity: 0, y: 20 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-text-primary sm:text-4xl"
          >
            {title}
          </motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actividades.map((actividad, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={dur ? { opacity: 0, y: 30 } : undefined}
                whileInView={dur ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={dur ? { duration: dur, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] } : undefined}
                className="overflow-hidden rounded-[10px] border border-border-subtle bg-bg-card transition-shadow hover:shadow-lg"
              >
                <div
                  className={`flex h-40 items-center justify-center bg-gradient-to-br ${gradients[i]}`}
                >
                  <Icon className="h-16 w-16 text-text-muted" />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-text-primary">
                    {actividad.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-3">
                    {actividad.desc}
                  </p>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple transition-colors hover:text-brand-purple/80"
                  >
                    {actividad.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
