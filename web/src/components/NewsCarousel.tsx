"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export type NewsItem = {
  id: string;
  href: string;
  image: string;
  tag: string;
  title: string;
  excerpt: string;
  color: string;
};

type NewsCarouselProps = {
  items: NewsItem[];
  locale: string;
};

export default function NewsCarousel({ items }: NewsCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || isPaused || prefersReducedMotion) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isPaused, items.length, prefersReducedMotion]);

  if (items.length === 0) return null;

  const item = items[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[10px] sm:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              priority={active === 0}
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${item.color}E6 0%, ${item.color}66 45%, transparent 75%)`,
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <span
                className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.tag}
              </span>
              <h3 className="mb-2 text-lg font-bold leading-snug text-white sm:text-2xl">
                {item.title}
              </h3>
              <p className="mb-4 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/85">
                {item.excerpt}
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 rounded-[10px] bg-white px-5 py-2.5 text-sm font-semibold transition-all hover:shadow-lg"
                style={{ color: item.color }}
              >
                {t("noticiasLeerMas")}
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous news"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next news"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((n, i) => (
            <button
              key={n.id}
              onClick={() => setActive(i)}
              aria-label={`Go to ${n.title}`}
              className={`flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all ${
                i === active ? "bg-brand-purple" : "bg-brand-purple/30 hover:bg-brand-purple/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
