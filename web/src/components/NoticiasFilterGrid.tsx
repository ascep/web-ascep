'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { Newspaper, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export type NoticiaCard = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  categoryLabel?: string;
  publishedAt?: string;
  imageUrl?: string;
  featured?: boolean;
  bgImage?: string;
  ctaLabel?: string;
};

type CategoryOption = { key: string; label: string };

type NoticiasFilterGridProps = {
  locale: string;
  categories: CategoryOption[];
  cards: NoticiaCard[];
};

export default function NoticiasFilterGrid({ locale, categories, cards }: NoticiasFilterGridProps) {
  const [active, setActive] = useState<string>("todas");

  const visible = useMemo(
    () => (active === "todas" ? cards : cards.filter((c) => c.category === active)),
    [active, cards]
  );

  return (
    <>
      <AnimatedSection className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = active === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              aria-pressed={isActive}
              className={`rounded-[10px] border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-brand-accent bg-brand-accent text-white"
                  : "border-white/20 bg-white/5 text-[var(--color-text-muted)] hover:border-white/40 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </AnimatedSection>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card, i) =>
          card.featured ? (
            <AnimatedSection key={card.id} className="sm:col-span-2 lg:col-span-3" direction="up">
              <Link
                href={`/${locale}/noticias/${card.slug}`}
                className="group relative block overflow-hidden rounded-[10px] bg-ley-purple text-white shadow-lg transition-all hover:shadow-xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ley-purple/60 to-ley-purple/90" />
                <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                  <div className="max-w-2xl">
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-ley-orange px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {card.categoryLabel}
                    </span>
                    <h3 className="mb-2 text-2xl font-bold leading-tight sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-purple-100">
                      {card.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ley-yellow">
                      {card.ctaLabel}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ) : (
            <AnimatedSection key={card.id} direction="up" delay={i * 0.06}>
              <Link
                href={`/${locale}/noticias/${card.slug}`}
                className="group glass-card block overflow-hidden rounded-[10px] transition-all hover:bg-white/15"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-t-[10px] bg-white/5">
                  {card.imageUrl ? (
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${card.imageUrl})` }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Newspaper size={32} className="text-[var(--color-text-muted)]" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="mb-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/80">
                    {card.categoryLabel}
                  </span>
                  <h3 className="mb-2 text-base font-bold text-[var(--color-text-primary)] line-clamp-2">
                    {card.title}
                  </h3>
                  {card.excerpt && (
                    <p className="line-clamp-2 text-sm text-[var(--color-text-muted)]">
                      {card.excerpt}
                    </p>
                  )}
                  {card.publishedAt && (
                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">{card.publishedAt}</p>
                  )}
                </div>
              </Link>
            </AnimatedSection>
          )
        )}
      </div>
    </>
  );
}
