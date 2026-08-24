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
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-border-subtle bg-bg-card text-text-secondary hover:border-brand-primary/40 hover:bg-brand-primary/5 hover:text-brand-primary"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </AnimatedSection>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card, i) =>
          card.featured ? (
            <AnimatedSection key={card.id} className="sm:col-span-2 lg:col-span-3" direction="up">
              <Link
                href={`/${locale}/noticias/${card.slug}`}
                className="group relative block overflow-hidden rounded-[10px] bg-brand-purple text-white shadow-lg transition-all hover:shadow-xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/60 to-brand-purple/90" />
                <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="max-w-2xl">
                    <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {card.categoryLabel}
                    </span>
                    <h3 className="mb-2 text-xl font-bold leading-tight sm:text-2xl">
                      {card.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-white/80">
                      {card.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-yellow">
                    {card.ctaLabel}
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ) : (
            <AnimatedSection key={card.id} direction="up" delay={i * 0.06}>
              <Link
                href={`/${locale}/noticias/${card.slug}`}
                className="group block overflow-hidden rounded-[10px] border border-border-subtle bg-bg-card transition-all hover:-translate-y-1 hover:shadow-md"
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
                  <span className="mb-2 inline-block rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-xs font-medium text-brand-primary">
                    {card.categoryLabel}
                  </span>
                  <h3 className="mb-1 text-sm font-bold text-[var(--color-text-primary)] line-clamp-2">
                    {card.title}
                  </h3>
                  {card.excerpt && (
                    <p className="line-clamp-2 text-xs text-[var(--color-text-muted)]">
                      {card.excerpt}
                    </p>
                  )}
                  {card.publishedAt && (
                    <p className="mt-2 text-[11px] text-[var(--color-text-muted)]">{card.publishedAt}</p>
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
