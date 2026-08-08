import { getTranslations } from "next-intl/server";
import Link from "next/link";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import PageCTA from "@/components/PageCTA";
import { Heart, Users, Briefcase, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

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
  const pageData = await getPageContent("como-ayudar");

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
      name: "Amigo ASCEP",
      plan: "Donacion mensual",
      price: "$30.000",
      desc: "Ayudas a cubrir materiales educativos y transporte para talleres de formacion de un joven.",
      cta: "Quiero ser Amigo",
      href: `/${locale}/donar`,
      iconBg: "bg-ley-teal/10",
      iconColor: "text-ley-teal",
      priceColor: "text-ley-teal",
      btn: "border-ley-teal/30 text-ley-teal hover:bg-ley-teal hover:text-white",
      icon: Heart,
    },
    {
      name: "Padrino ASCEP",
      plan: "Donacion mensual",
      price: "$70.000",
      desc: "Financias el acompanamiento psicosocial mensual de un joven en transicion a la vida independiente.",
      cta: "Quiero ser Padrino",
      href: `/${locale}/como-ayudar/plan-padrino`,
      iconBg: "bg-ley-orange/10",
      iconColor: "text-ley-orange",
      priceColor: "text-ley-orange",
      btn: "border-transparent bg-ley-orange text-white hover:bg-ley-orange/90",
      recommended: true,
      icon: Users,
    },
    {
      name: "Empresa Aliada",
      plan: "Alianza corporativa",
      price: "Desde $500.000",
      desc: "Tu empresa puede apadrinar programas completos, ofrecer practicas laborales o realizar donaciones corporativas.",
      cta: "Quiero ser Aliado",
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
      <DossierHero
        images={[
          sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.home.retosImage),
          assetPath(fotos.home.aboutImage),
          assetPath(fotos.home.gallery[0].src),
        ]}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || ""}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
        accent="orange"
        primaryCta={{ label: t("donacionMonetaria"), href: `/${locale}/donar` }}
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Heart size={28} className="text-ley-orange" />
            </div>
            <div>
              <p className="text-xl font-extrabold">{t("heroTitle")}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-orange">
                {t("impactTag")}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-purple-100">
            {t("impactDesc")}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
          >
            {t("ctaBtn")}
          </Link>
        </div>
      </DossierHero>

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
            tag="NIVELES DE APOYO"
            title="Elige tu nivel de compromiso"
            desc="Cada nivel de apoyo tiene un impacto directo en la vida de los jovenes que acompanamos."
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
                        Recomendado
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
