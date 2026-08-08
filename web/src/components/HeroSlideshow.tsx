"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";

export type HeroCta = { label: string; href: string; external?: boolean };

type HeroAccent = "cyan" | "orange" | "yellow" | "teal" | "purple";

type HeroSlideshowProps = {
  images: string[];
  tag?: string;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  subtitle?: React.ReactNode;
  accent?: HeroAccent;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  children?: React.ReactNode;
  auto?: number;
  className?: string;
};

const accentStyles: Record<HeroAccent, { badge: string; highlight: string; cta: string }> = {
  cyan: {
    badge: "border-ley-cyan/40 text-ley-cyan",
    highlight: "text-ley-cyan",
    cta: "bg-ley-cyan text-white hover:bg-ley-cyan/90",
  },
  orange: {
    badge: "border-ley-orange/40 text-ley-orange",
    highlight: "text-ley-orange",
    cta: "bg-ley-orange text-white hover:bg-ley-orange/90",
  },
  yellow: {
    badge: "border-ley-yellow/40 text-ley-yellow",
    highlight: "text-ley-yellow",
    cta: "bg-ley-yellow text-ley-purple hover:bg-ley-yellow/90",
  },
  teal: {
    badge: "border-ley-teal/40 text-ley-teal",
    highlight: "text-ley-teal",
    cta: "bg-ley-teal text-white hover:bg-ley-teal/90",
  },
  purple: {
    badge: "border-ley-fuchsia/50 text-ley-fuchsia",
    highlight: "text-ley-fuchsia",
    cta: "bg-ley-fuchsia text-ley-purple hover:bg-ley-fuchsia/90",
  },
};

function HeroLink({ cta, className }: { cta: HeroCta; className: string }) {
  if (cta.external) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:shadow-lg ${className}`}
      >
        {cta.label} <ArrowRight size={16} />
      </a>
    );
  }
  return (
    <Link
      href={cta.href}
      className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:shadow-lg ${className}`}
    >
      {cta.label} <ArrowRight size={16} />
    </Link>
  );
}

export default function HeroSlideshow({
  images,
  tag,
  title,
  highlight,
  subtitle,
  accent = "cyan",
  primaryCta,
  secondaryCta,
  children,
  auto = 7000,
  className = "",
}: HeroSlideshowProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const count = images.length;
  const accentCls = accentStyles[accent];

  useEffect(() => {
    if (prefersReducedMotion || paused || count <= 1) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, auto);
    return () => window.clearInterval(timer);
  }, [auto, count, paused, prefersReducedMotion]);

  return (
    <section
      className={`relative flex min-h-[80vh] items-center overflow-hidden bg-ley-purple text-white sm:min-h-[85vh] ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url("${src}")`,
              opacity: active === i ? 1 : 0,
              transform: active === i ? "scale(1.06)" : "scale(1)",
              transitionTimingFunction: "ease-out",
              transitionDuration: `${active === i ? auto : 1000}ms`,
            }}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(97deg, rgba(10,16,32,0.82) 0%, rgba(10,16,32,0.55) 42%, rgba(10,16,32,0.12) 78%, rgba(10,16,32,0.03) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className={`grid items-center gap-12 ${children ? "lg:grid-cols-12" : ""}`}>
          <div className={children ? "lg:col-span-7" : "max-w-2xl"}>
            {tag && (
              <span
                className={`inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${accentCls.badge}`}
              >
                {tag}
              </span>
            )}
            <h1 className="mt-6 break-words text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.5rem]">
              {title}
              {highlight && <span className={accentCls.highlight}> {highlight}</span>}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {subtitle}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta && <HeroLink cta={primaryCta} className={accentCls.cta} />}
                {secondaryCta && (
                  <HeroLink
                    cta={secondaryCta}
                    className="border border-white/40 text-white hover:border-white/70 hover:bg-white/10"
                  />
                )}
              </div>
            )}
          </div>

          {children && <div className="lg:col-span-5">{children}</div>}
        </div>
      </div>
    </section>
  );
}
