'use client';

import { motion } from "motion/react";
import Link from "next/link";
import {
  Heart,
  Users,
  Globe,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import CursorGlow from "./CursorGlow";

const dimensions = [
  { titleKey: "dim1Title", descKey: "dim1Desc", icon: Heart, color: "#007374" },
  { titleKey: "dim2Title", descKey: "dim2Desc", icon: Users, color: "#44BCC5" },
  { titleKey: "dim3Title", descKey: "dim3Desc", icon: Globe, color: "#C45118" },
  { titleKey: "dim4Title", descKey: "dim4Desc", icon: Sparkles, color: "#C45118" },
  { titleKey: "dim5Title", descKey: "dim5Desc", icon: Target, color: "#007374" },
  { titleKey: "dim6Title", descKey: "dim6Desc", icon: TrendingUp, color: "#44BCC5" },
];

type ModeloGridProps = {
  variant?: "light" | "dark";
};

export default function ModeloGrid({ variant = "light" }: ModeloGridProps) {
  const isDark = variant === "dark";
  const t = useTranslations("modelo");
  const locale = useLocale();
  return (
    <section className={`relative overflow-hidden py-24 ${isDark ? "section-dark bg-purple-bg" : "bg-[var(--color-bg-surface)]"}`}>
      {isDark && <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              {t("tag")}
            </p>
            <h2 className="mb-5 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mb-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
              {t("desc")}
            </p>
            <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {t("desc2")}
            </p>
            <Link
              href={`/${locale}/quienes-somos`}
              className={`inline-flex items-center rounded-[10px] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg ${isDark ? "bg-brand-orange hover:bg-brand-orange-dark" : "bg-brand-purple hover:bg-brand-purple-dark"}`}
            >
              {t("cta")}
            </Link>
          </div>
          <div className="lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dimensions.map((dim, i) => {
                const Icon = dim.icon;
                return (
                  <motion.div
                    key={dim.titleKey}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ y: -6, rotateX: -3, rotateY: 3 }}
                    className={`group perspective-[1200px] rounded-[10px] p-5 transition-all duration-300 ${
                      isDark ? "glass-card" : "border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]"
                    }`}
                    style={isDark ? {} : {
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
                    }}
                  >
                    <div
                      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] transition-transform duration-300 group-hover:scale-110 ${
                        isDark ? "bg-white/10" : ""
                      }`}
                      style={isDark ? {} : { backgroundColor: `${dim.color}14` }}
                    >
                      <Icon size={20} style={{ color: dim.color }} />
                    </div>
                    <h3 className="mb-2 text-sm font-bold text-[var(--color-text-primary)]">
                      {t(dim.titleKey)}
                    </h3>
                    <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                      {t(dim.descKey)}
                    </p>
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

