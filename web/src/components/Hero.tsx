'use client';

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type HeroVariant = "home" | "page" | "section";

type HeroProps = {
  variant?: HeroVariant;
  bgImage?: string;
  bgColor?: string;
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  children?: React.ReactNode;
  secondary?: React.ReactNode;
  /** Imagen decorativa para variante home (2 columnas) */
  heroImage?: string;
  /** Texto alternativo para heroImage */
  heroImageAlt?: string;
  /** Badge opcional (variante home) */
  badge?: { text: string; label: string };
  /** Video de fondo (variante home) */
  videoSrc?: string;
  videoPoster?: string;
  /** Muestra indicador scroll (variante home) */
  showScrollIndicator?: boolean;
};

export default function Hero({
  variant = "page",
  bgImage,
  bgColor = "bg-brand-purple",
  tag,
  title,
  highlight,
  subtitle,
  children,
  secondary,
  heroImage,
  heroImageAlt = "",
  badge,
  videoSrc,
  videoPoster,
  showScrollIndicator = false,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHome = variant === "home";

  return (
    <section className={`relative flex min-h-[80vh] items-center overflow-hidden sm:min-h-[85vh] ${bgColor}`}>
      <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-secondary/10" />
      <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-brand-accent/10" />

      {isHome && videoSrc ? (
        <div className="absolute inset-0 opacity-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={videoPoster}
            className="h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      ) : bgImage ? (
        <div className="absolute inset-0 opacity-15">
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex min-h-[80vh] flex-col items-center gap-10 py-20 sm:min-h-[85vh] ${isHome ? "lg:flex-row lg:py-0" : ""}`}>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: isHome ? -40 : 0, y: isHome ? 0 : 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className={isHome ? "flex-1 lg:max-w-xl" : "max-w-3xl"}
          >
            {tag && (
              <span className="mb-4 inline-block rounded-[10px] bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                {tag}
              </span>
            )}
            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
              {highlight && (
                <span className="text-brand-accent"> {highlight}</span>
              )}
            </h1>
            {subtitle && (
              <p className={`mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg ${isHome ? "mb-8" : ""}`}>
                {subtitle}
              </p>
            )}
            {(children || secondary) && (
              <div className={`flex flex-wrap gap-3 ${isHome ? "" : "mt-8"}`}>
                {children}
                {secondary}
              </div>
            )}
          </motion.div>

          {isHome && heroImage && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1"
            >
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -right-6 -top-6 h-48 w-48 rounded-2xl bg-brand-secondary/20" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-2xl bg-brand-accent/20" />
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  width={600}
                  height={450}
                  className="relative z-10 w-full rounded-[10px] object-cover shadow-2xl"
                  style={{ aspectRatio: "4/3" }}
                  priority
                />
                {badge && (
                  <div className="absolute -bottom-3 -right-3 z-20 rounded-[10px] bg-brand-accent px-4 py-2.5 text-sm font-bold text-white shadow-lg">
                    <span className="text-lg">{badge.text}</span>
                    <br />
                    <span className="text-xs font-normal opacity-80">{badge.label}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {showScrollIndicator && (
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
      )}
    </section>
  );
}
