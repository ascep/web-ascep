"use client";
import { assetPath } from "@/lib/asset-path";
import { fotos } from "@/data/fotos";

import { useState } from "react";
import { AnimatePresence, useReducedMotion, motion } from "motion/react";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";

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

const images = [
  assetPath(fotos.enredate.gallery[0]),
  assetPath(fotos.enredate.gallery[1]),
  assetPath(fotos.enredate.gallery[2]),
];

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
  const [imgIndex, setImgIndex] = useState(0);
  const total = images.length;

  return (
    <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
      <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
      <DecoShapes variant="teal" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection direction="left">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[10px] border border-white/10 shadow-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={images[imgIndex]}
                  alt="Actividades y encuentros"
                  initial={dur ? { opacity: 0 } : undefined}
                  animate={dur ? { opacity: 1 } : undefined}
                  exit={dur ? { opacity: 0 } : undefined}
                  transition={dur ? { duration: 0.4 } : undefined}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/50 to-transparent p-3">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setImgIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === imgIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"}`}
                    aria-label={`Imagen ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={() => setImgIndex((imgIndex - 1 + total) % total)}
                className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30 min-h-[44px] min-w-[44px]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => setImgIndex((imgIndex + 1) % total)}
                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30 min-h-[44px] min-w-[44px]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute -bottom-4 -left-4 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-brand-orange text-white shadow-lg">
                <span className="text-lg font-black leading-tight">{badgeText.split(" ")[0]}</span>
                <span className="text-[10px] font-bold leading-tight">{badgeText.slice(badgeText.indexOf(" ") + 1)}</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <span className="mb-3 inline-block rounded-full border border-brand-secondary/30 px-5 py-2 text-sm font-bold text-brand-secondary">
              {tag}
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
              {desc}
            </p>
            <ul className="mb-8 space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/${ctaHref}`}
              className="inline-flex items-center gap-2 rounded-[10px] bg-brand-purple px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90"
            >
              {ctaLabel}
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}



