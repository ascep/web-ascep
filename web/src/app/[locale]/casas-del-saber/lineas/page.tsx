import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import type { CSSProperties } from "react";
import { BookOpen, Monitor, Palette, Heart } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";

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

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-purple py-24">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-teal/10" />
        <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-brand-orange/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {t("heroTag")}
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {t("heroTitle")} <span className="text-white/80">{t("heroHighlight")}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {t("heroSubtitle")}
          </p>
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
          <div className="grid gap-6 lg:grid-cols-2">
            {lineas.map((linea, i) => {
              const Icon = linea.icon;
              return (
                <AnimatedSection key={linea.title} direction="up" delay={i * 0.1}>
                  <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                      <Icon size={22} className="text-brand-secondary" />
                    </div>
                    <h4 className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">{linea.title}</h4>
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

