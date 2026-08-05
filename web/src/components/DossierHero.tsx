import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

export type HeroCta = { label: string; href: string; external?: boolean };

type DossierAccent = "cyan" | "orange" | "yellow" | "teal" | "purple";

type DossierHeroProps = {
  bgImage: string;
  tag: string;
  title: string;
  highlight?: string;
  subtitle: string;
  accent?: DossierAccent;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  children?: React.ReactNode;
};

const accentStyles: Record<DossierAccent, { badge: string; highlight: string; cta: string; blob: string }> = {
  cyan: {
    badge: "border-ley-cyan/40 text-ley-cyan",
    highlight: "text-ley-cyan",
    cta: "bg-ley-cyan text-white hover:bg-ley-cyan/90",
    blob: "bg-ley-cyan/10",
  },
  orange: {
    badge: "border-ley-orange/40 text-ley-orange",
    highlight: "text-ley-orange",
    cta: "bg-ley-orange text-white hover:bg-ley-orange/90",
    blob: "bg-ley-orange/10",
  },
  yellow: {
    badge: "border-ley-yellow/40 text-ley-yellow",
    highlight: "text-ley-yellow",
    cta: "bg-ley-yellow text-ley-purple hover:bg-ley-yellow/90",
    blob: "bg-ley-yellow/10",
  },
  teal: {
    badge: "border-ley-teal/40 text-ley-teal",
    highlight: "text-ley-teal",
    cta: "bg-ley-teal text-white hover:bg-ley-teal/90",
    blob: "bg-ley-teal/10",
  },
  purple: {
    badge: "border-ley-fuchsia/50 text-ley-fuchsia",
    highlight: "text-ley-fuchsia",
    cta: "bg-ley-fuchsia text-ley-purple hover:bg-ley-fuchsia/90",
    blob: "bg-ley-fuchsia/10",
  },
};

function HeroLink({ cta, className }: { cta: HeroCta; className: string }) {
  if (cta.external) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:shadow-lg ${className}`}
      >
        {cta.label} <ArrowRight size={16} />
      </a>
    );
  }
  return (
    <Link
      href={cta.href}
      className={`inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:shadow-lg ${className}`}
    >
      {cta.label} <ArrowRight size={16} />
    </Link>
  );
}

export default function DossierHero({
  bgImage,
  tag,
  title,
  highlight,
  subtitle,
  accent = "cyan",
  primaryCta,
  secondaryCta,
  children,
}: DossierHeroProps) {
  const accentCls = accentStyles[accent];

  return (
    <section className="relative overflow-hidden bg-ley-purple text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={bgImage}
          alt=""
          fill
          className="object-cover opacity-15"
          sizes="100vw"
          priority
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 hidden lg:block">
        <Quote size={340} strokeWidth={1} className="text-white opacity-10" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-ley-cyan/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-ley-orange/10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
        <div className={`grid items-center gap-12 ${children ? "lg:grid-cols-12" : ""}`}>
          <div className={children ? "lg:col-span-7" : "mx-auto max-w-3xl text-center"}>
            <span
              className={`inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${accentCls.badge}`}
            >
              {tag}
            </span>
            <h1 className="mt-6 break-words text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {title}
              {highlight && <span className={accentCls.highlight}> {highlight}</span>}
            </h1>
            <p className={`mt-6 max-w-xl text-base leading-relaxed text-purple-100 sm:text-lg ${children ? "" : "mx-auto"}`}>
              {subtitle}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className={`mt-8 flex flex-wrap gap-3 ${children ? "" : "justify-center"}`}>
                {primaryCta && (
                  <HeroLink
                    cta={primaryCta}
                    className={`${accentCls.cta} hover:shadow-lg`}
                  />
                )}
                {secondaryCta && (
                  <HeroLink
                    cta={secondaryCta}
                    className="border border-white/30 text-white hover:border-white/60 hover:bg-white/10"
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
