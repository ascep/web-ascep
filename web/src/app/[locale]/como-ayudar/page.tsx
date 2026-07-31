import { getTranslations } from "next-intl/server";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
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
      color: "text-white",
    },
    {
      title: t("planPadrino"),
      desc: t("planPadrinoDesc"),
      href: `/${locale}/como-ayudar/plan-padrino`,
      icon: Users,
      color: "text-white",
    },
    {
      title: t("voluntariado"),
      desc: t("voluntariadoDesc"),
      href: `/${locale}/como-ayudar/voluntariado`,
      icon: Briefcase,
      color: "text-white",
    },
  ];

  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.home.retosImage)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || ""}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.comoLoHacemos.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80">
              {t("intro")}
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-3">
            {ways.map((way, i) => {
              const Icon = way.icon;
              return (
                <AnimatedSection key={way.title} direction="up" delay={i * 0.1}>
                  <Link href={way.href}>
                    <div className="glass-card flex h-full flex-col items-center rounded-[10px] p-8 text-center transition-all hover:bg-white/15">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-white/10">
                        <Icon size={26} className={way.color} />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{way.title}</h3>
                      <p className="mb-4 text-sm text-[var(--color-text-muted)]">{way.desc}</p>
                      <ArrowRight size={18} className="mt-auto text-white" />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("impactTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("impactTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              {t("impactDesc")}
            </p>
          </AnimatedSection>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              { value: t("stat1"), label: t("stat1Label") },
              { value: t("stat2"), label: t("stat2Label") },
              { value: t("stat3"), label: t("stat3Label") },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} direction="up" delay={i * 0.1}>
                <div className="rounded-[10px] border border-brand-purple/20 bg-bg-card p-6 text-center transition-all hover:shadow-md">
                  <p className="text-3xl font-extrabold text-brand-orange">{stat.value}</p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              NIVELES DE APOYO
            </span>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
              Elige tu nivel de compromiso
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--color-text-secondary)]">
              Cada nivel de apoyo tiene un impacto directo en la vida de los jovenes que acompanamos.
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-3">
            <AnimatedSection direction="up">
              <div className="rounded-[10px] border border-brand-purple/10 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-brand-purple/10">
                  <Heart size={24} className="text-brand-purple" />
                </div>
                <h4 className="mb-1 text-lg font-bold text-[var(--color-text-primary)]">Amigo ASCEP</h4>
                <p className="mb-2 text-sm text-[var(--color-text-muted)]">Donacion mensual</p>
                <p className="mb-4 text-3xl font-bold text-brand-purple">$30.000</p>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Ayudas a cubrir materiales educativos y transporte para talleres de formacion de un joven.
                </p>
                <Link
                  href={`/${locale}/donar`}
                  className="inline-block w-full rounded-[10px] border border-brand-purple/30 px-4 py-2 text-sm font-semibold text-brand-purple transition-all hover:bg-brand-purple hover:text-white"
                >
                  Quiero ser Amigo
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <div className="rounded-[10px] border-2 border-brand-orange/30 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-brand-orange/10">
                  <Users size={24} className="text-brand-orange" />
                </div>
                <span className="mb-2 inline-block rounded-full bg-brand-orange/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                  Recomendado
                </span>
                <h4 className="mb-1 text-lg font-bold text-[var(--color-text-primary)]">Padrino ASCEP</h4>
                <p className="mb-2 text-sm text-[var(--color-text-muted)]">Donacion mensual</p>
                <p className="mb-4 text-3xl font-bold text-brand-orange">$70.000</p>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Financias el acompanamiento psicosocial mensual de un joven en transicion a la vida independiente.
                </p>
                <Link
                  href={`/${locale}/como-ayudar/plan-padrino`}
                  className="inline-block w-full rounded-[10px] bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-orange-dark"
                >
                  Quiero ser Padrino
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <div className="rounded-[10px] border border-brand-teal/10 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-brand-teal/10">
                  <Briefcase size={24} className="text-brand-teal" />
                </div>
                <h4 className="mb-1 text-lg font-bold text-[var(--color-text-primary)]">Empresa Aliada</h4>
                <p className="mb-2 text-sm text-[var(--color-text-muted)]">Alianza corporativa</p>
                <p className="mb-4 text-xl font-bold text-brand-teal">Desde $500.000</p>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Tu empresa puede apadrinar programas completos, ofrecer practicas laborales o realizar donaciones corporativas.
                </p>
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-block w-full rounded-[10px] border border-brand-teal/30 px-4 py-2 text-sm font-semibold text-brand-teal transition-all hover:bg-brand-teal hover:text-white"
                >
                  Quiero ser Aliado
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2} className="mt-16">
            <div className="rounded-[10px] bg-brand-purple p-8 text-center text-white">
              <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
              <p className="mb-6 text-white/80">{t("ctaDesc")}</p>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-white/90"
              >
                {t("ctaBtn")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}



