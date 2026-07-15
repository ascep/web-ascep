'use client';

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { useTranslations } from "next-intl";

type HomeHeroProps = {
  title: string;
  subtitle: string;
  tag?: string;
  cta: React.ReactNode;
  secondary?: React.ReactNode;
};

export default function HomeHero({
  title,
  subtitle,
  tag = "ASCEP",
  cta,
  secondary,
}: HomeHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");

  return (
    <section className="relative flex min-h-[85vh] items-center bg-brand-purple">
      <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-teal/10" />
      <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-brand-orange/10" />
      <div className="absolute inset-0 opacity-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={assetPath("/images/MG_1563.webp")}
          className="h-full w-full object-cover"
        >
          <source src={assetPath("/videos/FONDO-WEB-16-9.mp4")} type="video/mp4" />
        </video>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[85vh] flex-col items-center gap-10 py-20 lg:flex-row lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 lg:max-w-xl"
          >
            <span className="mb-4 inline-block rounded-[10px] bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {tag}
            </span>
            <h1 className="mb-4 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              {cta}
              {secondary}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1"
          >
            <div className="relative mx-auto max-w-lg">
              <div className="absolute -right-6 -top-6 h-48 w-48 rounded-2xl bg-brand-teal/20" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-2xl bg-brand-orange/20" />
              <Image
                src={assetPath("/images/encuentro-2025/GIS06445.webp")}
                alt="ASCEP team"
                width={600}
                height={450}
                className="relative z-10 w-full rounded-[10px] object-cover shadow-2xl"
                style={{ aspectRatio: "4/3" }}
                priority
              />
              <div className="absolute -bottom-3 -right-3 z-20 rounded-[10px] bg-brand-orange px-4 py-2.5 text-sm font-bold text-white shadow-lg">
                <span className="text-lg">2019</span>
                <br />
                <span className="text-xs font-normal opacity-80">{t("heroBadge")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
