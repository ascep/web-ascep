import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import { assetPath } from "@/lib/asset-path"
import { fotos } from "@/data/fotos";;
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Ruta de Egreso Progresivo - Casas del Saber - ASCEP",
  description:
    "El egreso no es un evento, es un proceso. Conoce las tres fases de la ruta de egreso progresivo: acogida, formacion y consolidacion.",
  openGraph: {
    description:
      "El egreso no es un evento, es un proceso. Conoce las tres fases de la ruta de egreso progresivo: acogida, formacion y consolidacion.",
  },
};

export default async function RutaEgresoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaberRutaEgreso" });

  const fases = [
    {
      fase: t("fase1Label"),
      periodo: t("fase1Periodo"),
      nombre: t("fase1Nombre"),
      items: [
        t("fase1Item1"),
        t("fase1Item2"),
        t("fase1Item3"),
        t("fase1Item4"),
        t("fase1Item5"),
        t("fase1Item6"),
      ],
    },
    {
      fase: t("fase2Label"),
      periodo: t("fase2Periodo"),
      nombre: t("fase2Nombre"),
      items: [
        t("fase2Item1"),
        t("fase2Item2"),
        t("fase2Item3"),
        t("fase2Item4"),
        t("fase2Item5"),
        t("fase2Item6"),
      ],
    },
    {
      fase: t("fase3Label"),
      periodo: t("fase3Periodo"),
      nombre: t("fase3Nombre"),
      items: [
        t("fase3Item1"),
        t("fase3Item2"),
        t("fase3Item3"),
        t("fase3Item4"),
        t("fase3Item5"),
        t("fase3Item6"),
      ],
    },
  ];

  const pageData = await getPageContent("casas-del-saber-ruta-egreso");
  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.casasDelSaber.rutaEgreso)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </AnimatedSection>
          <div className="space-y-8">
            {fases.map((fase, i) => (
              <AnimatedSection key={fase.fase} direction="up" delay={i * 0.1}>
                <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15 sm:p-8">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-sm font-bold text-brand-secondary">
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-brand-secondary">
                        {fase.fase} | {fase.periodo}
                      </span>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                        {fase.nombre}
                      </h3>
                    </div>
                  </div>
                  <ul className="ml-14 grid gap-2 sm:grid-cols-2">
                    {fase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



