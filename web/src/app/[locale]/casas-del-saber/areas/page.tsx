import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("casasDelSaberAreas.title"),
    description: t("casasDelSaberAreas.description"),
    openGraph: {
      description: t("casasDelSaberAreas.description"),
    },
  };
}

export default async function AreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaberAreas" });

  const areas = [
    {
      num: 1,
      title: t("area1Title"),
      desc: t("area1Desc"),
    },
    {
      num: 2,
      title: t("area2Title"),
      desc: t("area2Desc"),
    },
    {
      num: 3,
      title: t("area3Title"),
      desc: t("area3Desc"),
    },
    {
      num: 4,
      title: t("area4Title"),
      desc: t("area4Desc"),
    },
    {
      num: 5,
      title: t("area5Title"),
      desc: t("area5Desc"),
    },
  ];

  const pageData = await getPageContent("casas-del-saber-areas");
  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.casasDelSaber.areas)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.areas)})` } as CSSProperties}>
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
          <div className="space-y-6">
            {areas.map((area, i) => (
              <AnimatedSection key={area.num} direction="up" delay={i * 0.08}>
                <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-lg font-bold text-brand-secondary">
                      {area.num}
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">{area.title}</h3>
                      <p className="text-[var(--color-text-muted)]">{area.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



