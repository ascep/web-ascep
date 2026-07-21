'use client';

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import Aurora from "./Aurora";
import ImageParallax from "./ImageParallax";
import CursorGlow from "./CursorGlow";

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
  heroImage?: string;
  heroImageAlt?: string;
  badge?: { text: string; label: string };
  videoSrc?: string;
  videoPoster?: string;
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
  const [reducedMotion, setReducedMotion] = useState(false);
  const isHome = variant === "home";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className={`relative flex min-h-[80vh] items-center overflow-hidden sm:min-h-[85vh] ${bgColor}`}>
      <CursorGlow color="rgba(1, 158, 159, 0.06)" size={600} opacity={0.8} />

      <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-secondary/10" />
      <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-brand-accent/10" />

      {isHome && !reducedMotion && (
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <Aurora
            colorStops={["#019E9F", "#44BCC5", "#EC6620"]}
            amplitude={0.6}
            blend={0.3}
            speed={0.5}
          />
        </div>
      )}

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
        <ImageParallax
          src={bgImage}
          alt=""
          fill
          containerClassName="absolute inset-0"
          className="object-cover opacity-15"
          priority
          intensity={0.15}
        />
      ) : null}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex min-h-[80vh] flex-col items-center gap-10 py-20 sm:min-h-[85vh] ${isHome ? "lg:flex-row lg:py-0" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: isHome ? -40 : 0, y: isHome ? 0 : 40 }}
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
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1"
            >
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -right-6 -top-6 h-48 w-48 rounded-2xl bg-brand-secondary/20" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-2xl bg-brand-accent/20" />
                <ImageParallax
                  src={heroImage}
                  alt={heroImageAlt}
                  width={600}
                  height={450}
                  containerClassName="relative z-10"
                  className="w-full rounded-[10px] object-cover shadow-2xl"
                  style={{ aspectRatio: "4/3" }}
                  priority
                  intensity={0.2}
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
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-white/40" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
