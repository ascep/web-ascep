"use client";

import { motion, useReducedMotion } from "motion/react";
import { Users, CalendarDays, Heart, MapPin } from "lucide-react";

type Stat = {
  value: string;
  label: string;
};

type EnredateStatsProps = {
  tag: string;
  title: string;
  stats: Stat[];
};

const icons = [Users, CalendarDays, Heart, MapPin];
const colors = [
  "bg-brand-purple/10 text-brand-purple",
  "bg-brand-teal/10 text-brand-teal",
  "bg-brand-orange/10 text-brand-orange",
  "bg-brand-orange/10 text-brand-orange",
];

export default function EnredateStats({ tag, title, stats }: EnredateStatsProps) {
  const prefersReduced = useReducedMotion();
  const dur = prefersReduced ? 0 : 0.6;

  return (
    <section className="relative bg-bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <motion.span
            initial={dur ? { opacity: 0, y: 20 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={dur ? { duration: 0.5 } : undefined}
            className="mb-3 inline-block rounded-full bg-brand-teal/10 px-5 py-2 text-sm font-bold text-brand-teal"
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <motion.div
                key={stat.label}
                initial={dur ? { opacity: 0, y: 30 } : undefined}
                whileInView={dur ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={dur ? { duration: dur, delay: 0.15 * i, ease: [0.23, 1, 0.32, 1] } : undefined}
                className="rounded-[10px] border border-border-subtle bg-bg-card p-8 text-center transition-shadow hover:shadow-md"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mb-1 text-3xl font-black text-text-primary">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-text-muted">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
