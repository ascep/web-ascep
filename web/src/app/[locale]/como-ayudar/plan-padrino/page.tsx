import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path";
import { fotos } from "@/data/fotos";
import { getPageContent, getPadrinos, localize, sanityImage } from "@/lib/sanity/fetch";
import PadProfileCard from "@/components/PadProfileCard";

export const metadata: Metadata = {
  title: "Plan Padrino - ASCEP",
  description:
    "Conviertete en padrino o madrina de un joven en proceso de egreso del sistema de proteccion y acompanalo en su transicion a la vida independiente.",
};

const pasos = [1, 2, 3, 4];

export default async function PlanPadrinoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "planPadrino" });
  const pageData = await getPageContent("plan-padrino");
  const profiles = await getPadrinos();

  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.planPadrino.hero)}
        bgColor={pageData?.hero?.bgColor || "bg-brand-teal"}
        tag={localize(pageData?.hero?.tag, locale) || "PLAN PADRINO"}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || ""}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      {/* Profiles Grid */}
      <section className="section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.planPadrino.section)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center" delay={0.1}>
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              PERFILES
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("browseProfiles") || "Conoce a quienes necesitan tu apoyo"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-muted)]">
              {t("browseProfilesDesc") || "Cada joven tiene una historia unica de superacion. Conoce sus procesos y acompaña su camino hacia la autonomia."}
            </p>
          </AnimatedSection>

          {profiles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile, i) => (
                <PadProfileCard key={profile._id} profile={profile} index={i} />
              ))}
            </div>
          ) : (
            <AnimatedSection delay={0.2}>
              <div className="rounded-[10px] border-2 border-dashed border-white/20 p-12 text-center">
                <p className="text-lg text-white/60">
                  {t("noProfilesYet") || "Proximamente compartiremos las historias de los jovenes que necesitan tu apoyo."}
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Como funciona */}
      <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
        <CursorGlow color="rgba(236, 102, 32, 0.04)" size={500} opacity={0.4} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center" delay={0.1}>
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              PROCESO
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("comoFunciona")}
            </h2>
          </AnimatedSection>

          <div className="mx-auto mb-16 max-w-3xl">
            {pasos.map((i) => (
              <AnimatedSection key={i} delay={0.05 * i} direction="up">
                <div className="relative flex items-start gap-5 border-l-2 border-white/20 pb-8 pl-8 last:pb-0">
                  <div className="absolute -left-[1.15rem] flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-brand-secondary shadow-md">
                    {i}
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-white">{t(`paso${i}`)}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{t(`paso${i}Desc`)}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.25}>
            <div className="rounded-[10px] bg-gradient-to-br from-brand-teal to-brand-blue-dark p-8 text-center text-white sm:p-12">
              <CheckCircle size={40} className="mx-auto mb-4 text-white/80" />
              <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
              <p className="mb-8 text-white/80">{t("ctaDesc")}</p>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-brand-teal transition-all hover:bg-white/90"
              >
                {t("ctaBtn")} <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
