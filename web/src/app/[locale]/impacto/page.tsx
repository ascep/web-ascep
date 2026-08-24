import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import PageCTA from "@/components/PageCTA";
import MapaAlcanceASCEP from "@/components/MapaAlcanceASCEP";
import ParallaxSection from "@/components/ParallaxSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import AnimatedSection from "@/components/AnimatedSection";
import WaveMask from "@/components/WaveMask";
import CountUp from "@/components/CountUp";
import ProgramCardGallery from "@/components/ProgramCardGallery";
import {
  Users, Calendar, GraduationCap, Layers, Target, Heart, Briefcase, type LucideIcon,
} from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getImpactStats, getGalleryAlbums } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";
import { homeVideos } from "@/data/homeVideos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("impacto.title"),
    description: t("impacto.description"),
    openGraph: {
      description: t("impacto.description"),
    },
  };
}

const fallbackStats = [
  { end: 13000, suffix: "+", label: "Jovenes egresados del sistema (2011-2024)", icon: "GraduationCap" },
  { end: 2017, suffix: "", label: "Constitucion formal de ASCEP", icon: "Calendar" },
  { end: 5, suffix: "+", label: "Programas activos", icon: "Target" },
  { end: 28, suffix: "", label: "Rango de edad de atencion", icon: "Users" },
];

const iconMap: Record<string, LucideIcon> = {
  Users, Calendar, GraduationCap, Layers, Target,
};

const statAccents = [
  { icon: "text-ley-orange", bg: "bg-ley-orange/10" },
  { icon: "text-ley-cyan", bg: "bg-ley-cyan/10" },
  { icon: "text-ley-yellow", bg: "bg-ley-yellow/10" },
  { icon: "text-ley-teal", bg: "bg-ley-teal/10" },
];

const resultadoIcons: LucideIcon[] = [Target, Users, Layers, Briefcase];

export default async function ImpactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impacto" });

  const fotos = await getFotos();

  const fallbackGaleria = fotos.impacto.gallery.map((src) => assetPath(src));

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
      {/* Hero — visual only */}
      <div
        className="relative h-[50vh] overflow-hidden bg-ley-purple sm:h-[65vh] md:h-[75vh] lg:h-[85vh]"
      >
        <div aria-hidden="true" className="absolute inset-0">
          {homeVideos.pages.impacto.hero ? (
            <video
              src={homeVideos.pages.impacto.hero}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${assetPath(fotos.impacto.hero)}")` }}
            />
          )}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,16,32,0.45) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Hero text — below visual */}
      <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
        <WaveMask fill="#4A154B" flip />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left" delay={0.1}>
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <ImageParallax
                  src={galeriaImages[0]}
                  alt=""
                  width={600}
                  height={450}
                  className="w-full object-cover"
                  intensity={0.15}
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
            <span className="mb-3 inline-block rounded-full border border-brand-accent/30 bg-brand-accent/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {t("heroTag")}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cifras"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-accent px-7 py-3 text-sm font-bold text-white transition-all hover:bg-brand-accent/90 hover:shadow-lg"
              >
                {t("statsTitle")}
              </a>
              <Link
                href={`/${locale}/donar`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-accent/30 px-7 py-3 text-sm font-bold text-brand-accent transition-all hover:border-brand-accent/60 hover:bg-brand-accent/5"
              >
                {t("ctaTitle")}
              </Link>
            </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <ParallaxSection
        bgImage={assetPath(fotos.impacto.contextParallax)}
        overlay="bg-black/70"
        className="py-24 sm:py-32"
      >
        <SectionHeader
          tag={t("contextTag")}
          title={t("contextTitle")}
          accent="orange"
          dark
        />
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection direction="left" className="space-y-4">
            <p className="text-base leading-relaxed text-white/80">{t("contextP1")}</p>
            <p className="text-base leading-relaxed text-white/80">{t("contextP2")}</p>
            <p className="text-base font-semibold leading-relaxed text-white">{t("contextP3")}</p>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <ImageParallax
              src={assetPath(fotos.impacto.contextImage)}
              alt=""
              width={600}
              height={450}
              className="w-full rounded-3xl object-cover shadow-lg"
              intensity={0.2}
              style={{ aspectRatio: "4/3" }}
            />
          </AnimatedSection>
        </div>
      </ParallaxSection>

      <section id="cifras" className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32">
        <WaveMask fill="#FFFFFF" flip />
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag={t("statsTag")} title={t("statsTitle")} accent="orange" dark />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {impactStats.map((stat, i) => {
              const Icon = iconMap[stat.icon] || Users;
              const accent = statAccents[i % statAccents.length];
              return (
                <AnimatedSection key={stat.label} direction="up" delay={i * 0.06}>
                  <div className="glass-card rounded-3xl p-6 text-center transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${accent.bg}`}>
                      <Icon size={24} className={accent.icon} />
                    </div>
                    <div className="text-3xl font-bold text-white">
                      <CountUp
                        end={parseInt(stat.end.toString().replace(/[^0-9]/g, ""))}
                        suffix={stat.suffix}
                      />
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                      {stat.label}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light">
        <WaveMask fill="#800080" flip />
        <DecoShapes variant="teal" />
        <ProgramCardGallery
          locale={locale}
          tag={t("porQueTag")}
          title={t("porQueTitle")}
          subtitle={t("porQueP1")}
          accent="orange"
        />
      </section>

      <section className="relative overflow-hidden bg-ley-purple py-24 sm:py-32">
        <WaveMask fill="#FFFFFF" flip />
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-ley-cyan/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-ley-orange/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("resultadosTag")}
            title={t("resultadosTitle")}
            highlight={t("resultadosHighlight")}
            accent="orange"
            dark
            align="left"
          />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {[1, 2, 3, 4].map((i) => {
                const Icon = resultadoIcons[i - 1];
                return (
                  <AnimatedSection key={i} direction="up" delay={i * 0.08}>
                    <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:bg-white/10">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ley-orange/10">
                        <Icon size={22} className="text-ley-orange" />
                      </div>
                      <div>
                        <p className="text-sm leading-relaxed text-purple-100">
                          {t(`resultado${i}`)}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
            <AnimatedSection direction="right" delay={0.15}>
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <ImageParallax
                  src={galeriaImages[1] || galeriaImages[0]}
                  alt={t("resultadosTitle")}
                  width={700}
                  height={560}
                  className="w-full object-cover"
                  intensity={0.15}
                  style={{ aspectRatio: "5/4" }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <WaveMask fill="#4A154B" flip />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                tag={t("presenciaTag")}
                title={t("presenciaTitle")}
                highlight={t("presenciaHighlight")}
                desc={t("presenciaDesc")}
                align="left"
                accent="orange"
              />
              <AnimatedSection direction="left" delay={0.1}>
                <div className="mt-12 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/participa`}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-ley-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-ley-orange/90 hover:shadow-lg"
                  >
                    {t("ctaParticipa")}
                  </Link>
                </div>
              </AnimatedSection>
            </div>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl shadow-lg">
                <MapaAlcanceASCEP />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section
        className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32"
        style={{ "--section-bg-image": `url(${assetPath(fotos.impacto.gallery[0])})` } as CSSProperties}
      >
        <WaveMask fill="#FFFFFF" flip />
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("galeriaTag")}
            title={t("galeriaTitle")}
            highlight={t("galeriaHighlight")}
            accent="orange"
            dark
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {galeriaImages.slice(0, 8).map((src, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="group relative overflow-hidden rounded-3xl">
                  <ImageParallax
                    src={src}
                    alt=""
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    intensity={0.1}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title={t("ctaTitle")}
        desc={t("ctaDesc")}
        icon={Heart}
        primary={{ label: t("ctaDonar"), href: `/${locale}/donar` }}
        secondary={{ label: t("ctaParticipa"), href: `/${locale}/participa` }}
      />
    </div>
  );
}
