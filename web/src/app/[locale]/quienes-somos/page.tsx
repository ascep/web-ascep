import type { CSSProperties } from "react";
import Link from "next/link";
import TimelineRoute, { type RouteItem } from "@/components/TimelineRoute";
import StatsRings, { type RingStat } from "@/components/StatsRings";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import TeamFan from "@/components/TeamFan";
import VideoFacade from "@/components/VideoFacade";
import YoutubeHeroBg from "@/components/YoutubeHeroBg";
import WaveMask from "@/components/WaveMask";
import { getTranslations } from "next-intl/server";
import {
  Target,
  Eye,
  Heart,
  Users,
  Scale,
  ShieldCheck,
  Compass,
  Handshake,
  SearchCheck,
} from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { imageUrl } from "@/lib/sanity/image";
import { getTeamMembers } from "@/lib/sanity/fetch";
import { buildTrayectoria } from "@/data/trayectoria";
import { homeVideos } from "@/data/homeVideos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("quienesSomos.title"),
    description: t("quienesSomos.description"),
    openGraph: {
      description: t("quienesSomos.description"),
    },
  };
}

const objetivosEstrategicos = [
  {
    titleKey: "oe1Title",
    descKey: "oe1Desc",
    icon: Users,
    tileClass: "bg-brand-teal/15 text-brand-teal",
  },
  {
    titleKey: "oe2Title",
    descKey: "oe2Desc",
    icon: Scale,
    tileClass: "bg-brand-orange/15 text-brand-orange",
  },
  {
    titleKey: "oe3Title",
    descKey: "oe3Desc",
    icon: SearchCheck,
    tileClass: "bg-brand-yellow/15 text-brand-yellow",
  },
  {
    titleKey: "oe4Title",
    descKey: "oe4Desc",
    icon: ShieldCheck,
    tileClass: "bg-white/15 text-white",
  },
];

export default async function QuienesSomosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quienesSomos" });
  const fotos = await getFotos();
  const cmsTeam = await getTeamMembers();

  const localTeamPhotos: Record<string, string> = {
    maicol: assetPath(fotos.quienesSomos.team.maicol),
    "maicol londo\u00f1o": assetPath(fotos.quienesSomos.team.maicol),
    kevin: assetPath(fotos.quienesSomos.team.kevin),
    ana: assetPath(fotos.quienesSomos.team.ana),
    monica: assetPath(fotos.quienesSomos.team.monica),
    "m\u00f3nica": assetPath(fotos.quienesSomos.team.monica),
    jhon: assetPath(fotos.quienesSomos.team.jhon),
    mafe: assetPath(fotos.quienesSomos.team.mafe),
  };

  const fallbackTeamPhoto = (name: string) =>
    localTeamPhotos[name.trim().toLowerCase()] || assetPath(fotos.quienesSomos.team.kevin);

  const team = cmsTeam.length > 0
    ? cmsTeam.map((m) => {
        const name = typeof m.name === "string" ? m.name : m.name?.es || "";
        return {
          name,
          role: typeof m.role === "string" ? m.role : m.role?.es || "",
          src: (m.photo ? imageUrl(m.photo) : null) || fallbackTeamPhoto(name),
        };
      })
    : [
        { name: "Maicol Londoño", role: t("teamMaicolRole"), src: assetPath(fotos.quienesSomos.team.maicol) },
        { name: "Kevin", role: t("teamKevinRole"), src: assetPath(fotos.quienesSomos.team.kevin) },
        { name: "Ana", role: t("teamAnaRole"), src: assetPath(fotos.quienesSomos.team.ana) },
        { name: "Mónica", role: t("teamMonicaRole"), src: assetPath(fotos.quienesSomos.team.monica) },
        { name: "Jhon", role: t("teamJhonRole"), src: assetPath(fotos.quienesSomos.team.jhon) },
        { name: "Mafe", role: t("teamMafeRole"), src: assetPath(fotos.quienesSomos.team.mafe) },
      ];

  const hitos = t.raw("hitos") as { value: string; label: string; detail: string }[];

  const trayectoria: RouteItem[] = buildTrayectoria(
    t.raw("trayectoria") as RouteItem[],
    assetPath,
  );

  const statSegColors = [
    ["var(--color-brand-accent)", "var(--color-brand-secondary)", "var(--color-border-default)"],
    ["var(--color-brand-primary-dark)", "var(--color-brand-secondary)"],
  ];

  const cifrasStats: RingStat[] = [
    {
      icon: "Users",
      value: 71148,
      ring: 1,
      ringColor: "var(--color-brand-primary)",
      label: t("cifrasStat1Label"),
      breakdown: (t.raw("cifrasStat1Breakdown") as { label: string; value: number }[]).map((b, i) => ({
        ...b,
        color: statSegColors[0][i] || "var(--color-border-default)",
      })),
    },
    {
      icon: "FileWarning",
      value: 12576,
      ring: 1,
      ringColor: "var(--color-brand-primary-dark)",
      label: t("cifrasStat2Label"),
      breakdown: (t.raw("cifrasStat2Breakdown") as { label: string; value: number }[]).map((b, i) => ({
        ...b,
        color: statSegColors[1][i] || "var(--color-brand-secondary)",
      })),
    },
    {
      icon: "HeartHandshake",
      value: 3025,
      ring: 3025 / 12576,
      ringColor: "var(--color-brand-accent)",
      label: t("cifrasStat3Label"),
      note: t("cifrasStat3Note"),
    },
  ];

  const valores = [
    { icon: Handshake, title: t("valor1Title"), text: t("valor1Text") },
    { icon: ShieldCheck, title: t("valor2Title"), text: t("valor2Text") },
    { icon: Scale, title: t("valor3Title"), text: t("valor3Text") },
    { icon: Compass, title: t("valor4Title"), text: t("valor4Text") },
  ];

  const ods = t.raw("ods") as string[];

  return (
    <div className="min-h-screen">
      {/* 1. HERO — video de fondo, sin texto */}
      <div
        className="relative h-[50vh] overflow-hidden bg-ley-purple sm:h-[65vh] md:h-[75vh] lg:h-[85vh]"
      >
        <div aria-hidden="true" className="absolute inset-0">
          {homeVideos.premioCivico ? (
            <YoutubeHeroBg
              videoUrl={homeVideos.premioCivico}
              fallbackImage={assetPath(fotos.quienesSomos.hero)}
              startAt={20}
            />
          ) : homeVideos.pages.quienesSomos.hero ? (
            <video
              src={homeVideos.pages.quienesSomos.hero}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${assetPath(fotos.quienesSomos.hero)}")` }}
            />
          )}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to top, rgba(74,21,75,0.85) 0%, rgba(74,21,75,0.3) 40%, transparent 100%)",
          }}
        />
        <WaveMask fill="#4A154B" />
      </div>

      {/* 2. TEXTO DEL HERO + MISION / VISION / PROPOSITO */}
      <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.hero)}
                  alt={t("heroTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {t("heroTag")}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
                {t("heroTitle")} <span className="text-brand-primary">{t("heroHighlight")}</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {t("heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/programas`}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-primary px-7 py-3 text-sm font-bold text-white transition-all hover:bg-brand-primary-dark hover:shadow-lg"
                >
                  {t("heroCtaPrimary")}
                </Link>
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-primary/30 px-7 py-3 text-sm font-bold text-brand-primary transition-all hover:border-brand-primary/60 hover:bg-brand-primary/5"
                >
                  {t("heroCtaSecondary")}
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Mision */}
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="glass-card rounded-3xl border border-border-subtle bg-bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-primary/30 bg-brand-primary/10">
                  <Target size={22} className="text-brand-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">{t("misionTitle")}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{t("misionDesc")}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.objetivoImage)}
                  alt={t("misionTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Vision */}
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.sectionImage)}
                  alt={t("visionTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="glass-card rounded-3xl border border-border-subtle bg-bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-orange/30 bg-brand-orange/10">
                  <Eye size={22} className="text-brand-orange" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">{t("visionTitle")}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{t("visionDesc")}</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Proposito */}
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="glass-card rounded-3xl border border-border-subtle bg-bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-yellow/30 bg-brand-yellow/10">
                  <Heart size={22} className="text-brand-yellow" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">{t("propositoCardTitle")}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{t("propositoCardDesc")}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.historiaGallery[0])}
                  alt={t("propositoCardTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Hitos de origen */}
      <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {hitos.map((h, i) => (
              <AnimatedSection key={h.label} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-[10px] border border-border-subtle bg-bg-card p-5">
                  <p className="text-2xl font-extrabold text-brand-primary sm:text-3xl">{h.value}</p>
                  <p className="mt-1 text-sm font-bold text-brand-orange">{h.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">{h.detail}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Historia (sin fundadores) */}
      <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] shadow-xl">
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.historiaImage)}
                  alt={t("historiaTitle")}
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <div>
              <AnimatedSection direction="right">
                <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                  {t("historiaTag")}
                </span>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)]">
                  {t("historiaTitle")} <span className="text-brand-purple">{t("historiaHighlight")}</span>
                </h2>
              </AnimatedSection>
              {[1, 2, 3, 4, 5].map((i) => (
                <AnimatedSection key={i} direction="up" delay={0.1 * i}>
                  <p className="mb-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                    {t(`historiaP${i}`)}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4b. Premio Civico */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("premioTag")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("premioTitle")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {t("premioDesc")}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right">
              {homeVideos.premioCivico ? (
                <VideoFacade
                  youtubeId={homeVideos.premioCivico}
                  title={t("premioTitle")}
                />
              ) : (
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-xl">
                  <ImageParallax
                    src={assetPath(fotos.quienesSomos.timeline[1].image)}
                    alt={t("premioTitle")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    intensity={0.15}
                  />
                </div>
              )}
            </AnimatedSection>
          </div>
          {homeVideos.premioCivicoFormativo && (
            <div className="mt-12">
              <AnimatedSection direction="up">
                <VideoFacade
                  youtubeId={homeVideos.premioCivicoFormativo}
                  title={t("premioTitle")}
                />
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>

      {/* 5. Cifras nacionales */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-6 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("cifrasTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("cifrasTitle")}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-center text-sm text-text-muted">{t("cifrasSource")}</p>
          </AnimatedSection>
          <div className="mt-12">
            <StatsRings stats={cifrasStats} />
          </div>
        </div>
      </section>

      {/* 6. ASCEP en video */}
      {homeVideos.transformando && (
        <section
          className="section-dark relative overflow-hidden bg-purple-bg py-24 sm:py-32 section-bg-image"
          style={{
            "--section-bg-image": `url(${assetPath(fotos.quienesSomos.sectionImage)})`,
          } as CSSProperties}
        >
          <WaveMask fill="#FFFFFF" flip />
          <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
          <DecoShapes variant="teal" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <AnimatedSection direction="left">
                <span className="mb-3 inline-block rounded-[10px] bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  {t("propositoTag")}
                </span>
                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  {t("propositoTitle")} <span className="text-white/80">{t("propositoHighlight")}</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.1}>
                <VideoFacade
                  youtubeId={homeVideos.transformando}
                  title={t("propositoTitle")}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* 7. Trayectoria / ruta */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-4 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("trayectoriaTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("trayectoriaTitle")} <span className="text-brand-purple">{t("trayectoriaHighlight")}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mx-auto mb-2 max-w-2xl text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t("trayectoriaLead")}
            </p>
          </AnimatedSection>
          <div className="mt-12">
            <TimelineRoute
              items={trayectoria}
              hitoSingular={t("hitoSingular")}
              hitoPlural={t("hitoPlural")}
            />
          </div>
        </div>
      </section>

      {/* 8. Objetivo general y objetivos estrategicos */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-24 sm:py-32 section-bg-image"
        style={{
          "--section-bg-image": `url(${assetPath(fotos.quienesSomos.objetivoGeneralImage)})`,
        } as CSSProperties}
      >
        <WaveMask fill="#FFFFFF" flip />
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("objetivoTag")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                {t("objetivoTitle")} <span className="text-white/80">{t("objetivoHighlight")}</span>
              </h2>
              <div className="relative mt-6 overflow-hidden rounded-[10px] border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
                <span className="absolute inset-y-0 left-0 w-1 bg-brand-yellow" aria-hidden="true" />
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-brand-yellow/15 text-brand-yellow">
                    <Target size={22} />
                  </div>
                  <p className="text-lg leading-relaxed text-white/85">
                    {t("objetivoDesc")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.objetivoImage)}
                  alt={t("objetivoTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("objetivosEstrategicosTag")}
            </span>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              {t("objetivosEstrategicosTitle")} <span className="text-white/80">{t("objetivosEstrategicosHighlight")}</span>
            </h3>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {objetivosEstrategicos.map((oe, i) => (
              <AnimatedSection key={oe.titleKey} direction="up" delay={i * 0.1}>
                <div className="h-full rounded-[10px] border border-white/10 bg-white/10 p-6 transition-all hover:bg-white/15">
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] ${oe.tileClass}`}>
                    <oe.icon size={22} />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-white">
                    {t(oe.titleKey)}
                  </h4>
                  <p className="text-sm leading-relaxed text-white/75">
                    {t(oe.descKey)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Poblacion objetivo */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <WaveMask fill="#800080" flip />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <AnimatedSection direction="left">
                <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                  {t("poblacionTag")}
                </span>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                  {t("poblacionTitle")} <span className="text-brand-orange">{t("poblacionHighlight")}</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.15}>
                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  {t("poblacionDesc")}
                </p>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.2}>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {[1, 2, 3].map((i) => (
                    <li
                      key={i}
                      className="rounded-full border border-brand-purple/30 bg-brand-purple/[0.06] px-4 py-1.5 text-[13px] font-semibold text-brand-purple-dark"
                    >
                      {t(`poblacionChip${i}`)}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative mx-auto max-w-md">
                <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border-8 border-brand-orange/20" aria-hidden="true" />
                <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full border-8 border-brand-teal/25" aria-hidden="true" />
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.poblacionImage)}
                  alt=""
                  width={600}
                  height={276}
                  className="w-full rounded-[10px] object-cover shadow-xl"
                  intensity={0.2}
                  style={{ aspectRatio: "2.17" }}
                />
                <div className="absolute -bottom-6 -left-6 rounded-[10px] border border-border-subtle bg-bg-card p-5 shadow-xl">
                  <p className="text-4xl font-extrabold tabular-nums text-brand-primary sm:text-5xl">
                    {t("poblacionEdadValor")}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-brand-orange">
                    {t("poblacionEdadLabel")}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 10. Valores y ODS */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("valoresTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("valoresTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((v, i) => (
              <AnimatedSection key={v.title} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-[10px] border border-border-subtle bg-bg-card p-6 transition-all hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-brand-orange/30 text-brand-orange">
                    <v.icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{v.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.15}>
            <div className="mt-12 border-t border-border-subtle pt-8">
              <p className="mb-4 text-sm font-bold text-brand-purple-dark">{t("odsLabel")}</p>
              <ul className="flex flex-wrap gap-2.5">
                {ods.map((o) => (
                  <li
                    key={o}
                    className="rounded-full border border-brand-purple/30 bg-brand-purple/[0.06] px-4 py-1.5 text-[13px] font-semibold text-brand-purple-dark"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 11. Equipo */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-24 sm:py-32 section-bg-image"
        style={{ "--section-bg-image": `url(${assetPath(fotos.quienesSomos.equipoImage)})` } as CSSProperties}
      >
        <WaveMask fill="#FFFFFF" flip />
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8 text-center">
            <span className="mb-3 inline-block rounded-[10px] bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("equipoTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("equipoTitle")} <span className="text-white/80">{t("equipoHighlight")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
              {t("equipoDesc")}
            </p>
          </AnimatedSection>
        </div>
        <TeamFan members={team} />
      </section>

      {/* 12. CTA final */}
      <section
        className="bg-brand-purple py-24 sm:py-32 section-bg-image"
        style={{ "--section-bg-image": `url(${assetPath(fotos.quienesSomos.hero)})` } as CSSProperties}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="rounded-[10px] bg-white/10 p-10 text-center backdrop-blur-sm">
            <h2 className="mb-4 text-3xl font-bold text-white">
              {t("ctaTitle")}
            </h2>
            <p className="mb-6 text-lg text-white/80">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-white/90 hover:shadow-lg"
              >
                {t("ctaBtn")}
              </Link>
              <Link
                href={`/${locale}/donar`}
                className="inline-flex items-center rounded-[10px] border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-brand-purple"
              >
                {t("ctaBtnDonar")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
