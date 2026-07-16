import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ImpactMap from "@/components/ImpactMap";
import ParallaxSection from "@/components/ParallaxSection";
import CountUp from "@/components/CountUp";
import { Users, Calendar, GraduationCap, Layers, Target, AlertTriangle, Heart, ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { fotos } from "@/data/fotos";
import { getImpactStats, getGalleryAlbums } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Impacto - ASCEP",
  description:
    "Conoce el impacto de ASCEP en cifras: jovenes acompanados, programas activos, resultados esperados y metas para la transformacion del sistema de proteccion.",
  openGraph: {
    description:
      "Conoce el impacto de ASCEP en cifras: jovenes acompanados, programas activos, resultados esperados y metas para la transformacion del sistema de proteccion.",
  },
};

const fallbackStats = [
  { end: 71148, suffix: "", label: "NNA en PARD protegidos por el ICBF", icon: "Users" },
  { end: 12576, suffix: "", label: "NNA en declaratoria de adoptabilidad", icon: "Calendar" },
  { end: 3025, suffix: "", label: "NNA adoptados (2021-2024)", icon: "GraduationCap" },
  { end: 13000, suffix: "+", label: "Jovenes egresados del sistema (2011-2024)", icon: "Layers" },
  { end: 2019, suffix: "", label: "Inicio de operaciones de ASCEP", icon: "Calendar" },
  { end: 5, suffix: "+", label: "Programas activos", icon: "Target" },
  { end: 28, suffix: "", label: "Rango de edad de atencion", icon: "Users" },
];

const iconMap: Record<string, React.ElementType> = {
  Users, Calendar, GraduationCap, Layers, Target,
};

const statColors = [
  "bg-brand-purple/10", "bg-brand-teal/10", "bg-brand-orange/10",
  "bg-brand-purple/10", "bg-brand-teal/10", "bg-brand-orange/10", "bg-brand-purple/10",
];

const fallbackGaleria = fotos.impacto.gallery.map((src) => assetPath(src));

const riesgos = ["riesgo1", "riesgo2", "riesgo3", "riesgo4", "riesgo5"];

export default async function ImpactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impacto" });

  const [cmsStats, cmsAlbums] = await Promise.all([
    getImpactStats(),
    getGalleryAlbums(),
  ]);

  const impactStats = cmsStats.length > 0
    ? cmsStats.map((s) => ({
        end: s.value || 0,
        suffix: s.suffix || "",
        label: s.label?.es || "",
        icon: s.icon || "Users",
      }))
    : fallbackStats;

  const cmsGaleria = cmsAlbums.length > 0
    ? cmsAlbums.flatMap((a) =>
        (a.images || []).map((img) => imageUrl(img)).filter(Boolean) as string[]
      )
    : [];
  const galeriaImages = cmsGaleria.length > 0 ? cmsGaleria : fallbackGaleria;

  return (
    <div>
      <PageHero
        bgImage={assetPath(fotos.impacto.hero)}
        tag={t("heroTag")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
      />

      <ParallaxSection
        bgImage={assetPath(fotos.impacto.contextParallax)}
        overlay="bg-black/70"
        className="py-20"
      >
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {t("contextTag")}
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t("contextTitle")}
          </h2>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-3">
            <p className="text-base leading-relaxed text-white/80">{t("contextP1")}</p>
            <p className="text-base leading-relaxed text-white/80">{t("contextP2")}</p>
            <p className="text-base font-semibold leading-relaxed text-white">{t("contextP3")}</p>
          </div>
          <div className="lg:col-span-2">
            <Image
              src={assetPath(fotos.impacto.contextImage)}
              alt=""
              width={600}
              height={450}
              className="w-full rounded-[10px] object-cover shadow-lg"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </div>
      </ParallaxSection>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            {t("statsTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {impactStats.map((stat, i) => {
              const Icon = iconMap[stat.icon] || Users;
              return (
                <div
                  key={i}
                  className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
                >
                  <div
                    className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-[10px] ${statColors[i] || "bg-brand-purple/10"}`}
                  >
                    <Icon size={24} className="text-brand-purple" />
                  </div>
                  <div className="text-3xl font-bold text-brand-purple">
                    <CountUp
                      end={parseInt(stat.end.toString().replace(/[^0-9]/g, ""))}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("porQueTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("porQueTitle")}
            </h2>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="mb-8 space-y-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                <p>{t("porQueP1")}</p>
                <p className="font-semibold text-brand-orange">{t("porQueP2")}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {riesgos.map((r) => (
                  <div
                    key={r}
                    className="flex items-start gap-3 rounded-[10px] border border-brand-orange/20 bg-brand-orange/5 p-4"
                  >
                    <AlertTriangle size={18} className="mt-0.5 shrink-0 text-brand-orange" />
                    <span className="text-sm text-[var(--color-text-secondary)]">{t(r)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <Image
                src={assetPath(fotos.impacto.porQueImage)}
                alt=""
                width={600}
                height={450}
                className="w-full rounded-[10px] object-cover shadow-lg"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("resultadosTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("resultadosTitle")} <span className="text-brand-purple">{t("resultadosHighlight")}</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md"
              >
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t(`resultado${i}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-[10px] bg-brand-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("presenciaTag")}
              </span>
              <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("presenciaTitle")} <span className="text-brand-orange">{t("presenciaHighlight")}</span>
              </h2>
              <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                {t("presenciaDesc")}
              </p>
            </div>
            <div className="h-[300px] w-full rounded-[10px] shadow-lg">
              <ImpactMap />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("galeriaTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("galeriaTitle")} <span className="text-brand-purple">{t("galeriaHighlight")}</span>
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {galeriaImages.map((src, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[10px]"
              >
                <Image
                  src={src}
                  alt=""
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-purple py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 inline-block rounded-[10px] bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {t("ctaTag")}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/80">
            {t("ctaDesc")}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/donar`}
              className="inline-flex items-center gap-2 rounded-[10px] bg-brand-orange px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-orange-dark hover:shadow-lg"
            >
              <Heart size={18} />
              {t("ctaDonar")}
            </Link>
            <Link
              href={`/${locale}/participa`}
              className="inline-flex items-center gap-2 rounded-[10px] border-2 border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              {t("ctaParticipa")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
