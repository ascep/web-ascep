import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import PageCTA from "@/components/PageCTA";
import MapaAlcanceASCEP from "@/components/MapaAlcanceASCEP";
import AnimatedSection from "@/components/AnimatedSection";
import ImageParallax from "@/components/ImageParallax";
import VideoFacade from "@/components/VideoFacade";
import WaveMask from "@/components/WaveMask";
import CountUp from "@/components/CountUp";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import { Heart, Compass, Handshake, Network, ArrowDown, type LucideIcon } from "lucide-react";
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

// Cifras de CONTEXTO del sistema de proteccion, no resultados de ASCEP.
// La etiqueta de cada una conserva su periodo/alcance.
const fallbackStats = [
  { end: 13000, suffix: "+", label: "Jovenes egresados del sistema (2011-2024)" },
  { end: 2017, suffix: "", label: "Constitucion formal de ASCEP" },
  { end: 5, suffix: "+", label: "Programas activos" },
  { end: 28, suffix: "", label: "Rango de edad de atencion" },
];

const statAccents = [
  "var(--color-brand-primary)",
  "var(--color-brand-accent)",
  "var(--color-brand-primary-dark)",
  "var(--color-ley-purple)",
];

const metodologiaIcons: LucideIcon[] = [Compass, Handshake, Network];

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
      }))
    : fallbackStats;

  const cmsGaleria = cmsAlbums.length > 0
    ? cmsAlbums.flatMap((a) =>
        (a.images || []).map((img) => imageUrl(img)).filter(Boolean) as string[]
      )
    : [];
  const galeriaImages = cmsGaleria.length > 0 ? cmsGaleria : fallbackGaleria;

  const riesgos = [1, 2, 3, 4, 5].map((i) => t(`riesgo${i}`));
  const testimonios = [1, 2, 3].map((i) => ({
    quote: t(`testimonio${i}`),
    name: t(`testimonio${i}Name`),
    role: t(`testimonio${i}Role`),
  }));

  return (
    <div>
      {/* 1. HERO — video protagonista, mensaje con aire, sin tarjetas encima */}
      <section className="relative flex min-h-[85svh] items-end overflow-hidden bg-ley-purple">
        <div aria-hidden="true" className="absolute inset-0">
          <video
            src={assetPath("/videos/FONDO-WEB-16-9.mp4")}
            poster={assetPath(fotos.impacto.hero)}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to top, rgba(74,21,75,0.94) 0%, rgba(74,21,75,0.62) 42%, rgba(74,21,75,0.22) 72%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
          <AnimatedSection>
            <span className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("heroTag")}
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="mt-6 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {t("heroTitle")}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.18}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t("heroSubtitle")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.26}>
            <a
              href="#desafio"
              className="mt-9 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-white/90"
            >
              {t("desafioTitle")} <ArrowDown size={16} />
            </a>
          </AnimatedSection>
        </div>

        {/* z-[5]: por encima del degradado (z-2), por debajo del contenido (z-10) */}
        <WaveMask tone="cream" className="z-[5]" />
      </section>

      {/* 2. EL PROBLEMA — los 5 riesgos, lista editorial numerada (no tarjetas) */}
      <section className="relative overflow-hidden bg-bg-cream py-16 sm:py-20">
        <DecoShapes variant="orange" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            {/* sin lg:sticky: la seccion tiene overflow-hidden y sticky no
                funciona de forma fiable dentro de ese contexto */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-accent/30 bg-brand-accent/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                {t("porQueTag")}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
                {t("porQueTitle")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-text-secondary">
                {t("porQueP2")}
              </p>
            </AnimatedSection>

            <div className="divide-y divide-border-subtle border-y border-border-subtle">
              {riesgos.map((riesgo, i) => (
                <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                  <div className="flex items-baseline gap-5 py-5 sm:gap-7">
                    <span className="shrink-0 text-2xl font-extrabold tabular-nums text-brand-accent/40 sm:text-3xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
                      {riesgo}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
        <WaveMask tone="white" />
      </section>

      {/* 3. POR QUE LO HACEMOS — contexto editorial, fotografia lateral */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary-dark">
                {t("contextTag")}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
                {t("contextTitle")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-text-secondary">{t("contextP1")}</p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">{t("contextP2")}</p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-text-primary">
                {t("contextP3")}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg lg:aspect-[4/5]">
                <ImageParallax
                  src={assetPath(fotos.impacto.porQueImage)}
                  alt={t("contextTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
        <WaveMask tone="teal" />
      </section>

      {/* 4. COMO ACOMPANAMOS — teal estructural */}
      <section className="section-dark relative overflow-hidden bg-brand-primary py-16 sm:py-20">
        <CursorGlow color="rgba(255,255,255,0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="subtle" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("metodologiaTag")}
            title={t("metodologiaTitle")}
            accent="white"
            dark
            align="left"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => {
              const Icon = metodologiaIcons[i];
              return (
                <AnimatedSection key={n} direction="up" delay={i * 0.08}>
                  <div className="glass-card h-full rounded-3xl p-7 transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {t(`metodologia${n}Title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/75">
                      {t(`metodologia${n}Desc`)}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
        <WaveMask tone="white" />
      </section>

      {/* 5. VOCES — los 4 videos reales son los protagonistas de la pagina */}
      <section id="voces" className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-2xl">
            <span className="mb-3 inline-block rounded-full border border-brand-accent/30 bg-brand-accent/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {t("testimoniosTag")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
              {t("testimoniosTitle")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              {t("historiaDetras")}
            </p>
          </AnimatedSection>

          {/* El primer video ocupa el doble: el video manda, no la tarjeta */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homeVideos.testimonios.map((v, i) => (
              <AnimatedSection
                key={v.youtubeId}
                direction="up"
                delay={i * 0.08}
                className={i === 0 ? "lg:col-span-2" : ""}
              >
                <VideoFacade youtubeId={v.youtubeId} title={`${v.author} — ${v.role}`} />
                <p className="mt-3 text-base font-bold text-text-primary">{v.author}</p>
                <p className="text-sm text-text-muted">{v.role}</p>
              </AnimatedSection>
            ))}
          </div>

          {/* Testimonios en texto: cita editorial, sin tarjeta generica */}
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {testimonios.map((tst, i) => (
              <AnimatedSection key={tst.name} direction="up" delay={i * 0.08}>
                <blockquote>
                  <p className="text-base italic leading-relaxed text-text-secondary">
                    &ldquo;{tst.quote}&rdquo;
                  </p>
                  <footer className="mt-4">
                    <p className="text-sm font-bold text-text-primary">{tst.name}</p>
                    <p className="text-xs text-text-muted">{tst.role}</p>
                  </footer>
                </blockquote>
              </AnimatedSection>
            ))}
          </div>
        </div>
        <WaveMask tone="cream" />
      </section>

      {/* 6. EL DESAFIO EN CIFRAS — contexto, no resultados de ASCEP.
          Fondo claro para que los numeros tengan maximo contraste. */}
      <section id="desafio" className="relative overflow-hidden bg-bg-cream py-16 sm:py-20">
        <DecoShapes variant="subtle" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-2xl">
            <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary-dark">
              {t("desafioTag")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
              {t("desafioTitle")}
            </h2>
          </AnimatedSection>

          {/* Jerarquia: numero -> etiqueta */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, i) => (
              <AnimatedSection key={`${stat.label}-${i}`} direction="up" delay={i * 0.08}>
                <div className="border-t-2 border-border-default pt-5">
                  <p
                    className="text-4xl font-extrabold tabular-nums leading-none sm:text-5xl"
                    style={{ color: statAccents[i % statAccents.length] }}
                  >
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Puente hacia las historias: la idea central de la pagina */}
          <AnimatedSection delay={0.2}>
            <div className="mt-14 border-t border-border-subtle pt-8">
              <p className="text-xl font-bold text-text-primary sm:text-2xl">
                {t("historiaDetras")}
              </p>
              <a
                href="#voces"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-brand-accent transition-colors hover:text-brand-accent-dark"
              >
                {t("verVoces")} <ArrowDown size={15} className="-rotate-90" />
              </a>
            </div>
          </AnimatedSection>
        </div>
        <WaveMask tone="white" />
      </section>

      {/* 7. PRESENCIA — mapa */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                tag={t("presenciaTag")}
                title={t("presenciaTitle")}
                highlight={t("presenciaHighlight")}
                desc={t("presenciaDesc")}
                align="left"
                accent="teal"
              />
              <AnimatedSection direction="left" delay={0.1}>
                <Link
                  href={`/${locale}/participa`}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-accent px-7 py-3 text-sm font-bold text-white transition-all hover:bg-brand-accent-dark hover:shadow-lg"
                >
                  {t("ctaParticipa")}
                </Link>
              </AnimatedSection>
            </div>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="mx-auto w-full max-w-[560px] overflow-hidden">
                <MapaAlcanceASCEP />
              </div>
            </AnimatedSection>
          </div>
        </div>
        <WaveMask tone="purple" />
      </section>

      {/* 8. LO QUE BUSCAMOS — son METAS, no logros alcanzados */}
      <section className="section-dark relative overflow-hidden bg-ley-purple py-16 sm:py-20">
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("resultadosTag")}
            title={t("resultadosTitle")}
            highlight={t("resultadosHighlight")}
            accent="white"
            dark
            align="left"
          />
          {/* borde por item: `divide-y` en grid de 2 columnas dibuja lineas en
              posiciones impredecibles */}
          <div className="grid sm:grid-cols-2 sm:gap-x-12">
            {[1, 2, 3, 4].map((n, i) => (
              <AnimatedSection key={n} direction="up" delay={i * 0.08}>
                <div className="flex items-baseline gap-5 border-t border-white/15 py-6">
                  <span className="shrink-0 text-xl font-extrabold tabular-nums text-white/35">
                    {String(n).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-purple-100">{t(`resultado${n}`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        <WaveMask tone="cream" />
      </section>

      {/* 9. GALERIA — masonry, proporciones reales */}
      <section className="relative overflow-hidden bg-bg-cream py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("galeriaTag")}
            title={t("galeriaTitle")}
            highlight={t("galeriaHighlight")}
            accent="teal"
            align="left"
          />
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galeriaImages.slice(0, 9).map((src, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.05} className="mb-4 break-inside-avoid">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src={src}
                    alt=""
                    width={0}
                    height={0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="block h-auto w-full"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        {/* PageCTA es un componente global y su fondo es morado (lo comparten
            7 paginas). La mascara respeta ese color real en vez de anunciar uno
            que no existe. Ver nota sobre el CTA naranja en el reporte. */}
        <WaveMask tone="purple" />
      </section>

      {/* 10. CTA */}
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
