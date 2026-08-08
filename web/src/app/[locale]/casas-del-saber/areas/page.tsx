import { getTranslations } from "next-intl/server";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import { CheckCircle2 } from "lucide-react";
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

  const areas = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`area${n}Title`),
    desc: t(`area${n}Desc`),
  }));

  const objetivos = [
    { code: "OE1", title: t("oe1Title"), desc: t("oe1Desc") },
    { code: "OE2", title: t("oe2Title"), desc: t("oe2Desc") },
    { code: "OE3", title: t("oe3Title"), desc: t("oe3Desc") },
    { code: "OE4", title: t("oe4Title"), desc: t("oe4Desc") },
    { code: "OE5", title: t("oe5Title"), desc: t("oe5Desc") },
    { code: "OE6", title: t("oe6Title"), desc: t("oe6Desc") },
  ];

  const matrixLines = [t("matrizLinea1"), t("matrizLinea2"), t("matrizLinea3"), t("matrizLinea4")];
  const matrixRows = [1, 2, 3, 4, 5].map((n) => ({
    area: t(`area${n}Title`),
    cells: [1, 2, 3, 4].map((c) => t(`matrizA${n}L${c}`)),
  }));

  const roles = [1, 2, 3, 4, 5, 6].map((n) => ({
    role: t(`role${n}Title`),
    desc: t(`role${n}Desc`),
  }));

  const pageData = await getPageContent("casas-del-saber-areas");
  return (
    <div>
      <DossierHero
        images={[
          sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.casasDelSaber.areas),
          assetPath(fotos.casasDelSaber.hero),
          assetPath(fotos.casasDelSaber.modalidades),
        ]}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
        accent="orange"
      />

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("objetivosTag")}
            title={t("objetivosTitle")}
            desc={t("objetivosDesc")}
            accent="orange"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {objetivos.map((oe, i) => (
              <AnimatedSection key={oe.code} direction="up" delay={i * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-3xl border border-border-default bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-ley-orange/40 hover:shadow-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ley-orange/10 text-sm font-bold text-ley-orange">
                    {oe.code}
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{oe.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{oe.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.areas)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("sectionTag")}
            title={t("sectionTitle")}
            accent="white"
            dark
          />
          <div className="space-y-6">
            {areas.map((area, i) => (
              <AnimatedSection key={area.title} direction="up" delay={i * 0.08}>
                <div className="glass-card flex items-start gap-4 rounded-3xl p-6 transition-all hover:bg-white/15">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                    <CheckCircle2 size={22} className="text-ley-orange" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-white">{area.title}</h3>
                    <p className="text-[var(--color-text-muted)]">{area.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("matrizTag")}
            title={t("matrizTitle")}
            desc={t("matrizDesc")}
            accent="orange"
          />
          <AnimatedSection direction="up" delay={0.1}>
            <div className="overflow-x-auto rounded-3xl border border-border-default shadow-sm">
              <table className="w-full min-w-[760px] border-collapse bg-white text-left text-sm">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="w-44 bg-ley-orange/5 px-4 py-3 font-semibold text-ley-orange">
                      {t("matrizColArea")}
                    </th>
                    {matrixLines.map((line) => (
                      <th key={line} className="bg-ley-orange/5 px-4 py-3 font-semibold text-ley-orange">
                        {line}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row) => (
                    <tr key={row.area} className="border-b border-border-default last:border-0">
                      <td className="px-4 py-3 align-top font-semibold text-[var(--color-text-primary)]">
                        {row.area}
                      </td>
                      {row.cells.map((cell, i) => (
                        <td key={i} className="px-4 py-3 align-top text-xs leading-relaxed text-[var(--color-text-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.areas)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("estructuraTag")}
            title={t("estructuraTitle")}
            accent="white"
            dark
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((item, i) => (
              <AnimatedSection key={item.role} direction="up" delay={i * 0.06}>
                <div className="glass-card h-full rounded-3xl p-6 transition-all hover:bg-white/15">
                  <h3 className="mb-2 font-bold text-white">{item.role}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
