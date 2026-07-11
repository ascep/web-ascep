'use client';

import { motion } from "motion/react";
import Aurora from "./Aurora";
import Rain from "./Rain";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  cta: React.ReactNode;
  secondary?: React.ReactNode;
  auroraColors?: [string, string, string];
};

export default function HeroSection({
  title,
  subtitle,
  cta,
  secondary,
  auroraColors = ["#019E9F", "#44BCC5", "#EC6620"],
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <Aurora
          colorStops={auroraColors}
          amplitude={1.0}
          blend={0.5}
          speed={0.5}
        />
      </div>
      <Rain opacity={0.1} count={80} speed={0.8} />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/60 to-black/60" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8 text-lg text-white/80 sm:text-xl"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap gap-4"
          >
            {cta}
            {secondary}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
