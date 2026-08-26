import { getTranslations } from "next-intl/server";
import DossierHero from "@/components/DossierHero";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import ImageParallax from "@/components/ImageParallax";
import type { CSSProperties } from "react";
import { BookOpen, Monitor, Palette, Heart } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("casasDelSaberLineas.title"),
    description: t("casasDelSaberLineas.description"),
    openGraph: {
      description: t("casasDelSaberLineas.description"),
    },
  };
}

export default async function LineasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaberLineas" });

  const lineas = [
    {
      title: t("linea1Title"),
      proposito: t("linea1Proposito"),
      eje: t("linea1Eje"),
      icon: BookOpen,
      bg: "bg-brand-purple/10",
      color: "text-brand-purple",
    },
    {
      title: t("linea2Title"),
      proposito: t("linea2Proposito"),
      eje: t("linea2Eje"),
      icon: Monitor,
      bg: "bg-brand-teal/10",
      color: "text-brand-teal",
    },
    {
      title: t("linea3Title"),
      proposito: t("linea3Proposito"),
      eje: t("linea3Eje"),
      icon: Palette,
      bg: "bg-brand-orange/10",
      color: "text-brand-orange",
    },
    {
      title: t("linea4Title"),
      proposito: t("linea4Proposito"),
      eje: t("linea4Eje"),
      icon: Heart,
      bg: "bg-brand-orange/10",
      color: "text-brand-orange",
    },
  ];

  const pageData = await getPageContent("casas-del-saber-lineas");
  return (
    <div>
      <DossierHero
        images={[
          sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.casasDelSaber.modalidades),
          assetPath(fotos.casasDelSaber.hero),
          assetPath(fotos.casasDelSaber.areas),
        ]}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
        accent="orange"
      />

      <section className="section-bg-image section-dark relative overflow-hidden bg-ley-purple py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.areas)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Intro a 2 columnas: da presencia a la fotografia real del programa */}
          <div className="mb-12 grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("sectionTag")}
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {t("sectionTitle")}
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <ImageParallax
                  src={assetPath(fotos.casasDelSaber.galleryPhotos[9])}
                  alt={t("sectionTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {lineas.map((linea, i) => {
              const Icon = linea.icon;
              return (
                <AnimatedSection key={linea.title} direction="up" delay={i * 0.1}>
                  <div className="glass-card rounded-3xl p-6 text-center transition-all hover:bg-white/15">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${linea.bg}`}>
                      <Icon size={22} className={linea.color} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">{linea.title}</h3>
                    <div className="mb-4 text-left">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Proposito</p>
                      <p className="text-sm text-[var(--color-text-muted)]">{linea.proposito}</p>
                    </div>
                    <div className="text-left">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Eje productivo</p>
                      <p className="text-sm text-[var(--color-text-muted)]">{linea.eje}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

