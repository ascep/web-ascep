'use client';

import { motion, useReducedMotion } from "motion/react";
import CountUp from "./CountUp";
import { Users, GraduationCap, Layers, Calendar } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Users,
  GraduationCap,
  Layers,
  Calendar,
};

type StatItem = {
  value: string;
  label: string;
  icon: string;
  color: string;
};

type HomeStatsProps = {
  tag: string;
  title: string;
  description: string;
  cta: React.ReactNode;
  stats: StatItem[];
  variant?: "light" | "dark";
};

export default function HomeStats({
  tag,
  title,
  description,
  cta,
  stats,
  variant = "light",
}: HomeStatsProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:pt-10">
              <div>
                <span className="mb-3 inline-block rounded-[10px] bg-brand-purple/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-primary">
                  {tag}
                </span>
                <h2 className="mb-4 text-3xl font-bold leading-tight text-[var(--color-text-primary)]">
                  {(() => {
                    const words = title.split(" ");
                    const last = words.pop();
                    return <>{words.join(" ")} <span className="text-text-primary">{last}</span></>;
                  })()}
                </h2>
                <p className="mb-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {description}
                </p>
                {cta}
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {stats.map((stat, i) => {
                const Icon = iconMap[stat.icon] || Users;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : { scale: 1.03 }
                    }
                    className="group"
                  >
                    <div
                      className={`relative overflow-hidden rounded-[10px] p-6 transition-all duration-500 ${
                        isDark ? "glass-card" : ""
                      }`}
                      style={isDark ? {} : { backgroundColor: `${stat.color}0D` }}
                    >
                      <div
                        className="absolute inset-0 origin-bottom scale-y-[0.2] opacity-0 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100"
                        style={{ backgroundColor: stat.color }}
                      />
                      <div className="relative z-10">
                        <div
                          className={`mb-4 flex h-[74px] w-[74px] items-center justify-center rounded-full transition-all duration-500 group-hover:bg-white ${
                            isDark ? "bg-white/10" : ""
                          }`}
                          style={isDark ? {} : { backgroundColor: `${stat.color}1A` }}
                        >
                          <Icon size={32} style={{ color: isDark ? stat.color : stat.color }} />
                        </div>
                        <h3
                          className="mb-1 text-4xl font-extrabold transition-all duration-500 sm:text-5xl"
                          style={{ color: isDark ? "#FFFFFF" : stat.color }}
                        >
                          <span className="group-hover:text-white">
                            <CountUp
                              end={parseInt(stat.value.replace(/[^0-9]/g, ""))}
                              suffix={stat.value.includes("+") ? "+" : stat.value.includes("%") ? "%" : ""}
                            />
                          </span>
                        </h3>
                        <p className={`text-sm leading-relaxed transition-all duration-500 group-hover:text-white sm:text-base ${
                          isDark ? "text-white/70" : "opacity-70"
                        }`}>
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
