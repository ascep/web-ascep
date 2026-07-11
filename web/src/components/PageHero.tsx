'use client';

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

type PageHeroProps = {
  bgImage: string;
  bgColor?: string;
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export default function PageHero({
  bgImage,
  bgColor = "bg-brand-purple",
  tag,
  title,
  highlight,
  subtitle,
  children,
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`relative flex min-h-[80vh] items-center overflow-hidden sm:min-h-[85vh] ${bgColor}`}>
      <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-teal/10" />
      <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-brand-orange/10" />
      <div className="absolute inset-0 opacity-15">
        <Image
          src={bgImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {tag && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="mb-4 inline-block rounded-[10px] bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange"
            >
              {tag}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {title}
            {highlight && (
              <span className="text-brand-orange"> {highlight}</span>
            )}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
