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

  const roles = [
    { role: t("role1Title"), desc: t("role1Desc") },
    { role: t("role2Title"), desc: t("role2Desc") },
    { role: t("role3Title"), desc: t("role3Desc") },
    { role: t("role4Title"), desc: t("role4Desc") },
    { role: t("role5Title"), desc: t("role5Desc") },
    { role: t("role6Title"), desc: t("role6Desc") },
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

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("objetivosTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("objetivosTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[var(--color-text-muted)]">
              {t("objetivosDesc")}
            </p>
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2">
            {objetivos.map((oe, i) => (
              <AnimatedSection key={oe.code} direction="up" delay={i * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-[10px] border border-[var(--color-border-subtle)] bg-bg-card p-6 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-brand-purple/10 text-sm font-bold text-brand-purple">
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

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("matrizTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("matrizTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[var(--color-text-muted)]">
              {t("matrizDesc")}
            </p>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <div className="overflow-x-auto rounded-[10px] border border-[var(--color-border-subtle)] shadow-sm">
              <table className="w-full min-w-[760px] border-collapse bg-bg-card text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border-subtle)]">
                    <th className="w-44 bg-brand-purple/5 px-4 py-3 font-semibold text-brand-purple">
                      {t("matrizColArea")}
                    </th>
                    {matrixLines.map((line) => (
                      <th key={line} className="bg-brand-purple/5 px-4 py-3 font-semibold text-brand-purple">
                        {line}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row) => (
                    <tr key={row.area} className="border-b border-[var(--color-border-subtle)] last:border-0">
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

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.areas)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("estructuraTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("estructuraTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((item, i) => (
              <AnimatedSection key={item.role} direction="up" delay={i * 0.06}>
                <div className="glass-card h-full rounded-[10px] p-6 transition-all hover:bg-white/15">
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
