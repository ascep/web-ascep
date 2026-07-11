'use client';

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

type DarkHeroProps = {
  title: string;
  subtitle: string;
  cta: React.ReactNode;
  secondary?: React.ReactNode;
  bgImage?: string;
};

export default function DarkHero({
  title,
  subtitle,
  cta,
  secondary,
  bgImage = assetPath("/videos/FONDO-WEB-16-9.mp4"),
}: DarkHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-40"
        >
          <source src={bgImage} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/90 via-[#0A0A0F]/60 to-[#0A0A0F]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#019E9F30_0%,transparent_70%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange"
          >
            ASCEP
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="mb-4 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap gap-3"
          >
            {cta}
            {secondary}
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
