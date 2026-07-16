import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Users, Calendar, GraduationCap, Layers, Target } from "lucide-react";
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
  { end: 71148, suffix: "", label: "NNA en PARD protegidos por el ICBF" },
  { end: 2019, suffix: "", label: "Inicio de operaciones" },
  { end: 13000, suffix: "+", label: "Jovenes egresados (2011-2024)" },
  { end: 5, suffix: "+", label: "Programas activos" },
  { end: 28, suffix: "", label: "Rango de edad de atencion" },
];

const statIcons = [Users, Calendar, GraduationCap, Layers, Target];

const statColors = [
  { bg: "bg-brand-purple/10", icon: "text-brand-purple", num: "text-brand-purple" },
  { bg: "bg-brand-teal/10", icon: "text-brand-teal", num: "text-brand-teal" },
  { bg: "bg-brand-orange/10", icon: "text-brand-orange", num: "text-brand-orange" },
  { bg: "bg-brand-orange/10", icon: "text-brand-orange", num: "text-brand-orange" },
  { bg: "bg-brand-purple/10", icon: "text-brand-purple", num: "text-brand-purple" },
];

const fallbackGaleria = fotos.impacto.gallery.map((src) => assetPath(src));

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

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat, i) => {
              const Icon = statIcons[i] || statIcons[0];
              const colors = statColors[i] || statColors[0];
              return (
                <div
                  key={i}
                  className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
                >
                  <div
                    className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-[10px] ${colors.bg}`}
                  >
                    <Icon size={24} className={colors.icon} />
                  </div>
                  <div className={`text-3xl font-bold ${colors.num}`}>
                    {stat.end}
                    {stat.suffix}
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
    </div>
  );
}
