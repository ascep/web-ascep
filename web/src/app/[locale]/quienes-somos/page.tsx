import TimelineRoute, { type RouteItem } from "@/components/TimelineRoute";
import StatsRings, { type RingStat } from "@/components/StatsRings";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import Image from "next/image";
import VideoFacade from "@/components/VideoFacade";
import WaveMask from "@/components/WaveMask";
import LogoLoop from "@/components/LogoLoop";
import CtaAccordion from "@/components/CtaAccordion";
import DonationForm from "@/components/DonationForm";
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
    ana: assetPath(fotos.quienesSomos.team.ana),
    monica: assetPath(fotos.quienesSomos.team.monica),
    "m\u00f3nica": assetPath(fotos.quienesSomos.team.monica),
    jhon: assetPath(fotos.quienesSomos.team.jhon),
    deyerli: assetPath(fotos.quienesSomos.team.ana),
  };

  const fallbackTeamPhoto = (name: string) =>
    localTeamPhotos[name.trim().toLowerCase()] || assetPath(fotos.quienesSomos.team.ana);

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
        { name: "Maicol Londo\u00f1o", role: t("teamMaicolRole"), src: assetPath(fotos.quienesSomos.team.maicol) },
        { name: "Ana", role: t("teamAnaRole"), src: assetPath(fotos.quienesSomos.team.ana) },
        { name: "M\u00f3nica", role: t("teamMonicaRole"), src: assetPath(fotos.quienesSomos.team.monica) },
        { name: "Jhon", role: t("teamJhonRole"), src: assetPath(fotos.quienesSomos.team.jhon) },
        { name: "Mayerli", role: t("teamDeyerliRole"), src: assetPath(fotos.quienesSomos.team.ana) },
      ];

  const hitos = t.raw("hitos") as { value: string; label: string; detail: string }[];

  const qsRaw = t.raw("trayectoria") as Array<{ year: string; title?: string; description?: string; items?: string[] }>;
  const trayectoria: RouteItem[] = qsRaw.map((m, i) => ({
    year: m.year,
    items: m.items || [m.title || "", m.description || ""].filter(Boolean),
    image: assetPath(fotos.home.trayectoria[i] || ""),
  }));

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

  const fallbackAliados = (fotos.home?.aliados || []).map((item: { src: string; alt: string }) => ({
    src: assetPath(item.src),
    alt: item.alt,
  }));

  return (
    <div className="min-h-screen">
      {/* 1. HERO — video de fondo local, sin controles */}
      <section className="relative min-h-[80svh] overflow-hidden bg-ley-purple">
        {/* Fondo puramente visual: mp4 local en vez del iframe de YouTube, que
            mostraba su propio boton de play cuando el autoplay no arrancaba.
            Los videos de testimonio (VideoFacade) conservan su reproduccion. */}
        <div aria-hidden="true" className="absolute inset-0">
          <video
            src={assetPath("/videos/FONDO-WEB-16-9.mp4")}
            poster={assetPath(fotos.quienesSomos.hero)}
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
              "linear-gradient(to top, rgba(74,21,75,0.92) 0%, rgba(74,21,75,0.6) 40%, rgba(74,21,75,0.25) 70%, transparent 100%)",
          }}
        />
        {/* z-[5] para quedar por encima del degradado morado (z-2), si no la
            onda blanca se tine de morado y la transicion parece un error */}
        <WaveMask tone="white" className="z-[5]" />
      </section>

      {/* 2. HISTORIA + HITOS — editorial claro, fotografia protagonista al lado */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="orange" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hitos compactos */}
          <div className="mb-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {hitos.map((h, i) => (
              <AnimatedSection key={h.label} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-[10px] border border-border-subtle bg-bg-card p-4 shadow-sm">
                  <p className="text-2xl font-extrabold text-brand-primary sm:text-3xl">{h.value}</p>
                  <p className="mt-1 text-sm font-bold text-brand-accent">{h.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">{h.detail}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Historia */}
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary-dark">
                {t("historiaTag")}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
                {t("historiaTitle")} <span className="text-brand-primary">{t("historiaHighlight")}</span>
              </h2>
              {[1, 2, 3, 4, 5].map((i) => (
                <AnimatedSection key={i} direction="up" delay={0.1 * i}>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {t(`historiaP${i}`)}
                  </p>
                </AnimatedSection>
              ))}
            </AnimatedSection>
            <AnimatedSection direction="right">
              {/* apaisada en movil, vertical editorial en desktop */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg lg:aspect-[4/5]">
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.historiaImage)}
                  alt={t("historiaTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
        <WaveMask tone="cream" />
      </section>

      {/* 3. TRAYECTORIA — crema; TimelineRoute usa tarjetas claras */}
      {/* TRAYECTORIA — fondo claro: TimelineRoute usa tarjetas claras. */}
      <section className="relative overflow-hidden bg-bg-cream py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-4 text-center">
            <span className="mb-3 inline-block rounded-[10px] bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary-dark">
              {t("trayectoriaTag")}
            </span>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              {t("trayectoriaTitle")} <span className="text-brand-primary">{t("trayectoriaHighlight")}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mx-auto mb-2 max-w-2xl text-center text-lg leading-relaxed text-text-secondary">
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
        <WaveMask tone="teal" />
      </section>

      {/* 4. MISION / VISION / PROPOSITO — teal estructural, sin foto de fondo */}
      <section
        className="section-dark relative overflow-hidden bg-brand-primary py-16 sm:py-20"
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mision */}
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="glass-card rounded-3xl border border-white/10 bg-white/10 p-8 transition-all hover:-translate-y-1 hover:bg-white/15 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-primary/40 bg-brand-primary/15">
                  <Target size={22} className="text-brand-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{t("misionTitle")}</h3>
                <p className="text-sm leading-relaxed text-white/75">{t("misionDesc")}</p>
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
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
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
              <div className="glass-card rounded-3xl border border-white/10 bg-white/10 p-8 transition-all hover:-translate-y-1 hover:bg-white/15 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-orange/40 bg-brand-orange/15">
                  <Eye size={22} className="text-brand-orange" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{t("visionTitle")}</h3>
                <p className="text-sm leading-relaxed text-white/75">{t("visionDesc")}</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Proposito */}
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="glass-card rounded-3xl border border-white/10 bg-white/10 p-8 transition-all hover:-translate-y-1 hover:bg-white/15 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-yellow/40 bg-brand-yellow/15">
                  <Heart size={22} className="text-brand-yellow" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{t("propositoCardTitle")}</h3>
                <p className="text-sm leading-relaxed text-white/75">{t("propositoCardDesc")}</p>
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
        <WaveMask tone="white" />
      </section>

      {/* 5. PROPOSITO EN VIDEO — claro (condicional) */}
      {homeVideos.transformando && (
        <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
          <DecoShapes variant="teal" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <AnimatedSection direction="left">
                <span className="mb-3 inline-block rounded-[10px] bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary-dark">
                  {t("propositoTag")}
                </span>
                <h2 className="mt-4 text-3xl font-bold text-text-primary sm:text-4xl">
                  {t("propositoTitle")} <span className="text-brand-primary">{t("propositoHighlight")}</span>
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

      {/* 6. PREMIO CIVICO — reconocimiento sobre fondo claro */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="orange" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("premioTag")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-text-primary sm:text-4xl">
                {t("premioTitle")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
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
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-lg">
                  <ImageParallax
                    src={assetPath(fotos.home.trayectoria[1])}
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
        </div>
        <WaveMask tone="purple" />
      </section>

      {/* 7. OBJETIVO GENERAL — morado identidad, sin foto de fondo */}
      <section
        className="section-dark relative overflow-hidden bg-ley-purple py-16 sm:py-20"
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("objetivoTag")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                {t("objetivoTitle")} <span className="text-white/80">{t("objetivoHighlight")}</span>
              </h2>
              <div className="relative mt-6 overflow-hidden rounded-[10px] border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-white/15 text-white">
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
          <AnimatedSection className="mt-12 mb-8 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("objetivosEstrategicosTag")}
            </span>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              {t("objetivosEstrategicosTitle")} <span className="text-white/80">{t("objetivosEstrategicosHighlight")}</span>
            </h3>
          </AnimatedSection>
          <div className="grid gap-5 sm:grid-cols-2">
            {objetivosEstrategicos.map((oe, i) => (
              <AnimatedSection key={oe.titleKey} direction="up" delay={i * 0.1}>
                <div className="h-full rounded-[10px] border border-white/10 bg-white/10 p-6 transition-all hover:bg-white/15 backdrop-blur-sm">
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
        <WaveMask tone="cream" />
      </section>

      {/* 8. CIFRAS — crema; maximo contraste para la evidencia */}
      {/* CIFRAS — fondo claro: las tarjetas de StatsRings son claras y sobre
          seccion oscura los numeros quedaban blancos sobre blanco. */}
      <section className="relative overflow-hidden bg-bg-cream py-16 sm:py-20">
        <DecoShapes variant="orange" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-6 text-center">
            <span className="mb-3 inline-block rounded-[10px] bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary-dark">
              {t("cifrasTag")}
            </span>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
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
        <WaveMask tone="white" />
      </section>

      {/* 9. POBLACION — claro; el dato de edad va dentro de la imagen */}
      {/* POBLACION — editorial sobre fondo claro. El dato de edad se superpone
          DENTRO de los limites de la imagen para que overflow-hidden no lo corte. */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <AnimatedSection direction="left">
                <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary-dark">
                  {t("poblacionTag")}
                </span>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
                  {t("poblacionTitle")} <span className="text-brand-accent">{t("poblacionHighlight")}</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.15}>
                <p className="text-lg leading-relaxed text-text-secondary">
                  {t("poblacionDesc")}
                </p>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.2}>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {[1, 2, 3].map((i) => (
                    <li
                      key={i}
                      className="rounded-full border border-border-default bg-bg-card px-4 py-1.5 text-[13px] font-semibold text-text-secondary"
                    >
                      {t(`poblacionChip${i}`)}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative mx-auto max-w-md">
                <div className="relative w-full overflow-hidden rounded-[10px] shadow-xl">
                  <ImageParallax
                    src={assetPath(fotos.quienesSomos.poblacionImage)}
                    alt=""
                    width={0}
                    height={0}
                    className="rounded-[10px]"
                    intensity={0.2}
                  />
                  <div className="absolute bottom-4 left-4 rounded-[10px] bg-brand-accent px-5 py-4 shadow-lg">
                    <p className="text-4xl font-extrabold tabular-nums leading-none text-white sm:text-5xl">
                      {t("poblacionEdadValor")}
                    </p>
                    <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white/90">
                      {t("poblacionEdadLabel")}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        <WaveMask tone="cream" />
      </section>

      {/* 10. EQUIPO — crema, tarjetas limpias sin overlay */}
      {/* EQUIPO — fondo claro para que las fotografias de las personas respiren */}
      <section className="relative overflow-hidden bg-bg-cream py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8 text-center">
            <span className="mb-3 inline-block rounded-[10px] bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary-dark">
              {t("equipoTag")}
            </span>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              {t("equipoTitle")} <span className="text-brand-primary">{t("equipoHighlight")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary">
              {t("equipoDesc")}
            </p>
          </AnimatedSection>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} direction="up" delay={i * 0.08}>
                <div className="group overflow-hidden rounded-2xl border border-border-subtle bg-bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.src}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-text-primary">{member.name}</h4>
                    <p className="mt-0.5 text-xs text-text-muted">{member.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        <WaveMask tone="white" />
      </section>

      {/* 11. VALORES Y ODS — descanso visual claro */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="orange" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("valoresTag")}
            </span>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              {t("valoresTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((v, i) => (
              <AnimatedSection key={v.title} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-[10px] border border-border-subtle bg-bg-card p-6 transition-all hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-brand-orange/30 text-brand-orange">
                    <v.icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-text-primary">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{v.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.15}>
            <div className="mt-10 border-t border-border-subtle pt-8">
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

      {/* 12. ALIADOS — claro, transicion limpia sin mascara */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("aliadosTag")}
            </span>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              {t("aliadosTitle")}
            </h2>
          </AnimatedSection>
          {fallbackAliados.length > 0 && (
            <LogoLoop logos={fallbackAliados} />
          )}
        </div>
        <WaveMask tone="orange" />
      </section>

      {/* 13. CTA — naranja accion */}
      <section className="section-dark relative overflow-hidden bg-brand-accent py-16 sm:py-20">
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              {t("ctaDesc")}
            </p>
          </AnimatedSection>
          <CtaAccordion
            contactTitle={t("ctaBtn")}
            contactDescription={t("ctaDesc")}
            contactButtonLabel={t("ctaBtn")}
            contactButtonHref={`/${locale}/contacto`}
            donateTitle={t("ctaBtnDonar")}
          >
            <DonationForm dark />
          </CtaAccordion>
        </div>
      </section>
    </div>
  );
}
