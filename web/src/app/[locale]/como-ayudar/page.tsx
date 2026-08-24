import { getTranslations } from "next-intl/server";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import SectionHeader from "@/components/SectionHeader";
import PageCTA from "@/components/PageCTA";
import { Heart, Users, Briefcase, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { homeVideos } from "@/data/homeVideos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("comoAyudar.title"),
    description: t("comoAyudar.description"),
    openGraph: {
      description: t("comoAyudar.description"),
    },
  };
}

export default async function ComoAyudarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comoAyudar" });

  const ways = [
    {
      title: t("donacionMonetaria"),
      desc: t("donacionMonetariaDesc"),
      href: `/${locale}/donar`,
      icon: Heart,
      iconColor: "bg-ley-orange/15 text-ley-orange",
    },
    {
      title: t("planPadrino"),
      desc: t("planPadrinoDesc"),
      href: `/${locale}/como-ayudar/plan-padrino`,
      icon: Users,
      iconColor: "bg-ley-cyan/15 text-ley-cyan",
    },
    {
      title: t("voluntariado"),
      desc: t("voluntariadoDesc"),
      href: `/${locale}/como-ayudar/voluntariado`,
      icon: Briefcase,
      iconColor: "bg-ley-teal/15 text-ley-teal",
    },
  ];

  const stats = [
    { value: t("stat1"), label: t("stat1Label") },
    { value: t("stat2"), label: t("stat2Label") },
    { value: t("stat3"), label: t("stat3Label") },
  ];

  const levels = [
    {
      name: t("level1Name"),
      plan: t("level1Plan"),
      price: t("level1Price"),
      desc: t("level1Desc"),
      cta: t("level1Cta"),
      href: `/${locale}/donar`,
      iconBg: "bg-ley-teal/10",
      iconColor: "text-ley-teal",
      priceColor: "text-ley-teal",
      btn: "border-ley-teal/30 text-ley-teal hover:bg-ley-teal hover:text-white",
      icon: Heart,
    },
    {
      name: t("level2Name"),
      plan: t("level2Plan"),
      price: t("level2Price"),
      desc: t("level2Desc"),
      cta: t("level2Cta"),
      href: `/${locale}/como-ayudar/plan-padrino`,
      iconBg: "bg-ley-orange/10",
      iconColor: "text-ley-orange",
      priceColor: "text-ley-orange",
      btn: "border-transparent bg-ley-orange text-white hover:bg-ley-orange/90",
      recommended: true,
      icon: Users,
    },
    {
      name: t("level3Name"),
      plan: t("level3Plan"),
      price: t("level3Price"),
      desc: t("level3Desc"),
      cta: t("level3Cta"),
      href: `/${locale}/contacto`,
      iconBg: "bg-ley-cyan/10",
      iconColor: "text-ley-cyan",
      priceColor: "text-ley-cyan",
      btn: "border-ley-cyan/30 text-ley-cyan hover:bg-ley-cyan hover:text-white",
      icon: Briefcase,
    },
  ];

  return (
    <div>
      {/* Hero — visual only */}
      <div
        className="relative h-[50vh] overflow-hidden bg-ley-purple sm:h-[65vh] md:h-[75vh] lg:h-[85vh]"
      >
        <div aria-hidden="true" className="absolute inset-0">
          {homeVideos.pages.comoAyudar.hero ? (
            <video
              src={homeVideos.pages.comoAyudar.hero}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${assetPath(fotos.comoLoHacemos.hero)}")` }}
            />
          )}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,16,32,0.45) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Hero text */}
      <section className="relative overflow-hidden bg-surface py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-accent/30 bg-brand-accent/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {t("heroTag")}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
              {t("heroTitle")} <span className="text-brand-accent">{t("heroHighlight")}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={`/${locale}/donar`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-accent px-7 py-3 text-sm font-bold text-white transition-all hover:bg-brand-accent/90 hover:shadow-lg"
              >
                {t("donacionMonetaria")}
              </Link>
              <Link
                href="#formas"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-accent/30 px-7 py-3 text-sm font-bold text-brand-accent transition-all hover:border-brand-accent/60 hover:bg-brand-accent/5"
              >
                {t("levelsTitle")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${assetPath(fotos.comoLoHacemos.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-purple-100">
              {t("intro")}
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-3">
            {ways.map((way, i) => {
              const Icon = way.icon;
              return (
                <AnimatedSection key={way.title} direction="up" delay={i * 0.1}>
                  <Link href={way.href}>
                    <div className="glass-card flex h-full flex-col items-center rounded-3xl p-8 text-center transition-all hover:bg-white/15">
                      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${way.iconColor}`}>
                        <Icon size={26} />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-white">{way.title}</h3>
                      <p className="mb-4 text-sm text-[var(--color-text-muted)]">{way.desc}</p>
                      <ArrowRight size={18} className="mt-auto text-white/70" />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("impactTag")}
            title={t("impactTitle")}
            desc={t("impactDesc")}
            accent="orange"
          />
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} direction="up" delay={i * 0.1}>
                <div className="rounded-3xl border border-border-default bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <p className="text-3xl font-extrabold text-ley-orange">{stat.value}</p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("levelsTag")}
            title={t("levelsTitle")}
            desc={t("levelsDesc")}
            accent="orange"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {levels.map((level, i) => {
              const Icon = level.icon;
              return (
                <AnimatedSection key={level.name} direction="up" delay={i * 0.1}>
                  <div className={`flex h-full flex-col rounded-3xl border bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${level.recommended ? "border-2 border-ley-orange/40" : "border-border-default"}`}>
                    {level.recommended ? (
                      <span className="mb-2 inline-block self-center rounded-full bg-ley-orange/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ley-orange">
                        {t("recommended")}
                      </span>
                    ) : (
                      <span className="mb-2 inline-block h-6" />
                    )}
                    <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${level.iconBg}`}>
                      <Icon size={24} className={level.iconColor} />
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-[var(--color-text-primary)]">{level.name}</h3>
                    <p className="mb-2 text-sm text-[var(--color-text-muted)]">{level.plan}</p>
                    <p className={`mb-4 text-3xl font-bold ${level.priceColor}`}>{level.price}</p>
                    <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">{level.desc}</p>
                    <Link
                      href={level.href}
                      className={`mt-auto inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all ${level.btn}`}
                    >
                      {level.cta}
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <PageCTA
        title={t("ctaTitle")}
        desc={t("ctaDesc")}
        icon={Heart}
        primary={{ label: t("ctaBtn"), href: `/${locale}/contacto` }}
      />
    </div>
  );
}
