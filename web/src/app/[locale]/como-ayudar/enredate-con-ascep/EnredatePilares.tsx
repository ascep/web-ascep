"use client";

import { Network, BookOpen, HeartHandshake, Megaphone } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";

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

export default function EnredatePilares({ tag, title, pilares }: EnredatePilaresProps) {
  return (
    <section className="section-dark relative overflow-hidden bg-ley-purple py-20">
      <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
      <DecoShapes variant="mixed" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/30 px-5 py-2 text-sm font-bold text-white/80">
            {tag}
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((pilar, i) => {
            const Icon = icons[i];
            return (
              <AnimatedSection key={pilar.title} direction="up" delay={0.15 * i}>
                <div className="glass-card group rounded-[10px] p-8 text-center transition-all hover:bg-white/15">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white">
                    {pilar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {pilar.desc}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

