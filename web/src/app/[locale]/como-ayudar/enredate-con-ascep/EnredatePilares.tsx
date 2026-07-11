"use client";

import { motion, useReducedMotion } from "motion/react";
import { Network, BookOpen, HeartHandshake, Megaphone } from "lucide-react";

type Pilar = {
  title: string;
  desc: string;
};

type EnredatePilaresProps = {
  tag: string;
  title: string;
  pilares: Pilar[];
};

const icons = [Network, BookOpen, HeartHandshake, Megaphone];
const colors = [
  "bg-brand-purple/10 text-brand-purple",
  "bg-brand-teal/10 text-brand-teal",
  "bg-brand-orange/10 text-brand-orange",
  "bg-brand-orange/10 text-brand-orange",
];

export default function EnredatePilares({ tag, title, pilares }: EnredatePilaresProps) {
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
            transition={dur ? { duration: 0.5 } : undefined}
            className="mb-3 inline-block rounded-full bg-brand-purple/10 px-5 py-2 text-sm font-bold text-brand-purple"
          >
            {tag}
          </motion.span>
          <motion.h2
            initial={dur ? { opacity: 0, y: 20 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={dur ? { duration: 0.5, delay: 0.1 } : undefined}
            className="text-3xl font-bold text-text-primary sm:text-4xl"
          >
            {title}
          </motion.h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((pilar, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <motion.div
                key={pilar.title}
                initial={dur ? { opacity: 0, y: 30 } : undefined}
                whileInView={dur ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={dur ? { duration: 0.6, delay: 0.15 * i, ease: [0.23, 1, 0.32, 1] } : undefined}
                className="group rounded-[10px] border border-border-subtle bg-bg-card p-8 text-center transition-shadow hover:shadow-lg"
              >
                <div
                  className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${color} transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">
                  {pilar.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {pilar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
