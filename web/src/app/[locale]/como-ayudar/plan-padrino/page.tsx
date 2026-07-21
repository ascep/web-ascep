import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import ImageParallax from "@/components/ImageParallax";
import { Heart, CheckCircle, ArrowRight, Gift, Users, Shield, Target } from "lucide-react";
import { assetPath } from "@/lib/asset-path"
import { fotos } from "@/data/fotos";;
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Plan Padrino - ASCEP",
  description:
    "Conviertete en padrino o madrina de un joven en proceso de egreso del sistema de proteccion y acompanalo en su transicion a la vida independiente.",
  openGraph: {
    description:
      "Conviertete en padrino o madrina de un joven en proceso de egreso del sistema de proteccion y acompanalo en su transicion a la vida independiente.",
  },
};

const beneficios = [
  { icon: Heart, titleKey: "beneficio1", descKey: "beneficio1Desc", color: "text-brand-teal", bg: "bg-brand-teal/10" },
  { icon: Users, titleKey: "beneficio2", descKey: "beneficio2Desc", color: "text-brand-orange", bg: "bg-brand-orange/10" },
  { icon: Shield, titleKey: "beneficio3", descKey: "beneficio3Desc", color: "text-brand-purple", bg: "bg-brand-purple/10" },
  { icon: Target, titleKey: "beneficio4", descKey: "beneficio4Desc", color: "text-brand-teal", bg: "bg-brand-teal/10" },
];

const pasos = [1, 2, 3, 4];

export default async function PlanPadrinoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "planPadrino" });
  const pageData = await getPageContent("plan-padrino");
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

      <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-20 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("queEs")}
              </span>
              <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                {t("queEs")}
              </h2>
              <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
                {t("queEsDesc")}
              </p>
            </div>
            <div className="relative">
              <ImageParallax
                src={assetPath(fotos.planPadrino.section)}
                alt=""
                width={600}
                height={400}
                className="w-full rounded-[10px] object-cover shadow-lg"
                style={{ aspectRatio: "3/2" }}
              />
              <div className="absolute -bottom-4 -left-4 flex h-20 w-20 items-center justify-center rounded-[10px] bg-brand-teal text-white shadow-lg">
                <Gift size={28} />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-12 text-center" delay={0.1}>
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              BENEFICIOS
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("beneficios")}
            </h2>
          </AnimatedSection>

          <div className="mb-20 grid gap-6 sm:grid-cols-2">
            {beneficios.map((b, i) => {
              const Icon = b.icon;
              return (
                <AnimatedSection key={i} delay={0.1 * i} direction="up">
                  <div className="glass-card flex gap-5 rounded-[10px] p-6 transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-white/10">
                      <Icon size={22} className="text-brand-secondary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-bold text-[var(--color-text-primary)]">{t(b.titleKey)}</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">{t(b.descKey)}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="mb-12 text-center" delay={0.2}>
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              PROCESO
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("comoFunciona")}
            </h2>
          </AnimatedSection>

          <div className="mx-auto mb-20 max-w-3xl">
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



