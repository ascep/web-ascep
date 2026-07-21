"use client";

import { Users, CalendarDays, Heart, MapPin } from "lucide-react";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";

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
  return (
    <section className="relative overflow-hidden bg-section-light py-20">
      <DecoShapes variant="teal" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full border border-brand-teal/30 px-5 py-2 text-sm font-bold text-brand-teal">
            {tag}
          </span>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            {title}
          </h2>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <AnimatedSection key={stat.label} direction="up" delay={0.15 * i}>
                <div className="rounded-[10px] border border-border-subtle bg-bg-card p-8 text-center transition-shadow hover:shadow-md">
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mb-1 text-3xl font-black text-[var(--color-text-primary)]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-[var(--color-text-muted)]">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
