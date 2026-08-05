import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { type HeroCta } from "./DossierHero";

type PageCTAProps = {
  title: string;
  desc: string;
  icon?: LucideIcon;
  primary?: HeroCta;
  secondary?: HeroCta;
};

export default function PageCTA({ title, desc, icon: Icon, primary, secondary }: PageCTAProps) {
  return (
    <section className="relative overflow-hidden bg-ley-purple py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-ley-cyan/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-ley-orange/10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          {Icon && (
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
              <Icon size={36} className="text-ley-yellow" />
            </div>
          )}
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-purple-100">{desc}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {primary && (
                <Link
                  href={primary.href}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-ley-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-ley-orange/90 hover:shadow-lg"
                >
                  {primary.label} <ArrowRight size={16} />
                </Link>
              )}
              {secondary && (
                <Link
                  href={secondary.href}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
