import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import { Home, Users } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("casasDelSaberModalidades.title"),
    description: t("casasDelSaberModalidades.description"),
    openGraph: {
      description: t("casasDelSaberModalidades.description"),
    },
  };
}

export default async function ModalidadesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaberModalidades" });
  const pageData = await getPageContent("casas-del-saber-modalidades");
  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.casasDelSaber.modalidades)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || ""}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("poblacionTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("poblacionTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[var(--color-text-muted)]">
              {t("poblacionDesc")}
            </p>
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              t("poblacionItem1"),
              t("poblacionItem2"),
              t("poblacionItem3"),
            ].map((item, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="flex h-full items-start gap-3 rounded-[10px] border border-[var(--color-border-subtle)] bg-bg-card p-6 shadow-sm">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-purple" />
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{item}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.modalidades)})` } as CSSProperties}>
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
          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedSection direction="up" delay={0}>
              <div className="glass-card rounded-[10px] p-8 transition-all hover:bg-white/15">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                  <Home size={24} className="text-brand-secondary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-[var(--color-text-primary)]">
                  {t("modalidad1Title")}
                </h3>
                <p className="mb-6 text-[var(--color-text-muted)]">
                  {t("modalidad1Desc")}
                </p>
                <ul className="space-y-3">
                  {[
                    t("modalidad1Item1"),
                    t("modalidad1Item2"),
                    t("modalidad1Item3"),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1}>
              <div className="glass-card rounded-[10px] p-8 transition-all hover:bg-white/15">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                  <Users size={24} className="text-brand-secondary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-[var(--color-text-primary)]">
                  {t("modalidad2Title")}
                </h3>
                <p className="mb-6 text-[var(--color-text-muted)]">
                  {t("modalidad2Desc")}
                </p>
                <ul className="space-y-3">
                  {[
                    t("modalidad2Item1"),
                    t("modalidad2Item2"),
                    t("modalidad2Item3"),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}



