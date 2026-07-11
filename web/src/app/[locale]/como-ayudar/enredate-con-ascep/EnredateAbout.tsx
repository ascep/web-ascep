"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { Check } from "lucide-react";

type EnredateAboutProps = {
  locale: string;
  tag: string;
  title: string;
  desc: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  badgeText: string;
};

export default function EnredateAbout({
  locale,
  tag,
  title,
  desc,
  items,
  ctaLabel,
  ctaHref,
  badgeText,
}: EnredateAboutProps) {
  const prefersReduced = useReducedMotion();
  const dur = prefersReduced ? 0 : 0.6;

  return (
    <section className="relative bg-bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={dur ? { opacity: 0, y: 30 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={dur ? { duration: dur, ease: [0.23, 1, 0.32, 1] } : undefined}
            className="relative"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[10px] bg-gradient-to-br from-brand-purple/20 to-brand-teal/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-purple/20">
                    <svg className="h-10 w-10 text-brand-purple" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-text-muted">
                    Video institucional
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-brand-orange text-white shadow-lg">
                <span className="text-lg font-black leading-tight">{badgeText.split(" ")[0]}</span>
                <span className="text-[10px] font-bold leading-tight">{badgeText.slice(badgeText.indexOf(" ") + 1)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={dur ? { opacity: 0, y: 30 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={dur ? { duration: dur, delay: 0.15, ease: [0.23, 1, 0.32, 1] } : undefined}
          >
            <span className="mb-3 inline-block rounded-full bg-brand-teal/10 px-5 py-2 text-sm font-bold text-brand-teal">
              {tag}
            </span>
            <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
              {title}
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-text-secondary">
              {desc}
            </p>
            <ul className="mb-8 space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/${ctaHref}`}
              className="inline-flex items-center gap-2 rounded-[10px] bg-brand-purple px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90"
            >
              {ctaLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
