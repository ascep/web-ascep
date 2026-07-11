'use client';

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import CountUp from "./CountUp";
import { Users, Calendar, GraduationCap, Layers, Target } from "lucide-react";

const ColombiaMap = dynamic(() => import("./ColombiaMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[var(--color-bg-elevated)] rounded-[10px]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-purple border-t-transparent" />
    </div>
  ),
});

type Stat = {
  end: number;
  suffix: string;
  label: string;
};

type ImpactGridProps = {
  stats: Stat[];
};

const cards = [
  { color: "#019E9F", icon: Users, labelExt: "NNA protegidos" },
  { color: "#44BCC5", icon: Calendar, labelExt: "Desde" },
  { color: "#EC6620", icon: GraduationCap, labelExt: "Egresados" },
  { color: "#EC6620", icon: Layers, labelExt: "Programas" },
  { color: "#019E9F", icon: Target, labelExt: "Rango etario" },
];

function StatCard({
  stat,
  color,
  icon: Icon,
  delay,
  colSpan = "",
  rowSpan = "",
  children,
}: {
  stat: Stat;
  color: string;
  icon: React.ElementType;
  delay: number;
  colSpan?: string;
  rowSpan?: string;
  children?: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={
        prefersReducedMotion
          ? {}
          : { rotateX: 4, rotateY: -4, y: -8, scale: 1.02 }
      }
      className={`${colSpan} ${rowSpan} perspective-[1200px]`}
    >
      <div
        className="relative h-full rounded-[10px] border bg-[var(--color-bg-card)] p-6 transition-shadow duration-300"
        style={{
          transformStyle: "preserve-3d",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
          borderColor: color,
        }}
      >
        <div>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[10px]" style={{ backgroundColor: `${color}14` }}>
            <Icon size={20} style={{ color }} />
          </div>
          <div className="text-4xl font-bold sm:text-5xl" style={{ color }}>
            <CountUp end={stat.end} suffix={stat.suffix} duration={2} />
          </div>
          <div className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {stat.label}
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

export default function ImpactGrid({ stats }: ImpactGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.15],
    prefersReducedMotion ? [0, 0] : [40, 0]
  );

  if (!stats || stats.length === 0) return null;

  const fallbackStat = { end: 0, suffix: "", label: "" };

  return (
    <section ref={containerRef} className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.h2
        style={{ opacity: headingOpacity, y: headingY }}
        className="mb-14 text-center text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl"
      >
        Nuestro Impacto
      </motion.h2>
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          stat={stats[0] || fallbackStat}
          color={cards[0].color}
          icon={cards[0].icon}
          delay={0.05}
          colSpan="sm:col-span-2"
        />

        <StatCard
          stat={stats[1] || fallbackStat}
          color={cards[1].color}
          icon={cards[1].icon}
          delay={0.1}
        />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          whileHover={
            prefersReducedMotion ? {} : { rotateX: 4, rotateY: -4, y: -8, scale: 1.02 }
          }
          className="perspective-[1200px] sm:col-span-2 row-span-2"
        >
          <div
            className="relative h-full rounded-[10px] border bg-[var(--color-bg-card)] p-2 transition-shadow duration-300"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
              borderColor: "#44BCC5",
            }}
          >
            <div className="flex h-full w-full items-center justify-center min-h-[240px]">
              <ColombiaMap />
            </div>
          </div>
        </motion.div>

        {stats.slice(2).map((stat, i) => {
          const cardIndex = (i + 2) % cards.length;
          return (
            <StatCard
              key={stat.label}
              stat={stat}
              color={cards[cardIndex].color}
              icon={cards[cardIndex].icon}
              delay={0.2 + i * 0.05}
            />
          );
        })}
      </div>
    </section>
  );
}
