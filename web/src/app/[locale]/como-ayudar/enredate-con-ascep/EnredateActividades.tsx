"use client";

import { Calendar, Sparkles, UserCheck, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";

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

export default function EnredateActividades({
  tag,
  title,
  actividades,
  locale,
}: EnredateActividadesProps) {
  return (
    <section className="section-dark relative overflow-hidden bg-ley-purple py-20">
      <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
      <DecoShapes variant="orange" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/30 px-5 py-2 text-sm font-bold text-white/80">
            {tag}
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actividades.map((actividad, i) => {
            const Icon = icons[i];
            return (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="glass-card group overflow-hidden rounded-[10px] transition-all hover:bg-white/15">
                  <div className="flex h-40 items-center justify-center bg-white/5">
                    <Icon className="h-16 w-16 text-white/40 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {actividad.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-muted)] line-clamp-3">
                      {actividad.desc}
                    </p>
                    <Link
                      href={`/${locale}/contacto`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary transition-colors hover:text-brand-secondary/80"
                    >
                      {actividad.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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

