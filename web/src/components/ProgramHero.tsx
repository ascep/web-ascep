import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

type HeroCta = { label: string; href: string };

type ProgramHeroProps = {
  bgImage: string;
  tag: string;
  title: string;
  highlight?: string;
  highlightClass?: string;
  subtitle: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  cardIcon?: LucideIcon;
  cardLogo?: string;
  cardTitle: string;
  cardTag: string;
  cardDesc: string;
  cardCta?: HeroCta;
};

export default function ProgramHero({
  bgImage,
  tag,
  title,
  highlight,
  highlightClass,
  subtitle,
  primaryCta,
  secondaryCta,
  cardIcon: CardIcon,
  cardLogo,
  cardTitle,
  cardTag,
  cardDesc,
  cardCta,
}: ProgramHeroProps) {
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
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full border border-ley-yellow/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ley-yellow">
              {tag}
            </span>
            <h1 className="mt-6 break-words text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {title}
              {highlight && <span className={highlightClass ?? "text-ley-cyan"}> {highlight}</span>}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-purple-100 sm:text-lg">
              {subtitle}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-ley-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-ley-orange/90 hover:shadow-lg"
                  >
                    {primaryCta.label} <ArrowRight size={16} />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
              <div className="flex items-center gap-4">
                {cardLogo ? (
                  <Image
                    src={cardLogo}
                    alt={cardTitle}
                    width={112}
                    height={112}
                    className="h-16 w-16 rounded-2xl bg-white/15 object-contain p-2"
                  />
                ) : CardIcon ? (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                    <CardIcon size={28} className="text-ley-teal" />
                  </div>
                ) : (
                  <Image
                    src={assetPath("/logos/12 logo ascep blanco sin slogan.png")}
                    alt="ASCEP"
                    width={112}
                    height={112}
                    className="h-16 w-16 rounded-2xl bg-white/15 object-contain p-2"
                  />
                )}
                <div>
                  <p className="text-xl font-extrabold">{cardTitle}</p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-cyan">
                    {cardTag}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-purple-100">{cardDesc}</p>
              {cardCta && (
                <Link
                  href={cardCta.href}
                  className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
                >
                  {cardCta.label} <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
