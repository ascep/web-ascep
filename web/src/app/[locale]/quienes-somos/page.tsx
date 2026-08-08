import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import TimelineRoute, { type RouteItem } from "@/components/TimelineRoute";
import DossierHero from "@/components/DossierHero";
import StatsRings, { type RingStat } from "@/components/StatsRings";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import TeamFan from "@/components/TeamFan";
import { getTranslations } from "next-intl/server";
import {
  Target,
  Eye,
  Heart,
  Link2,
  Wrench,
  Rocket,
  Handshake,
  ShieldCheck,
  Scale,
  Compass,
  Gavel,
  Users,
  SearchCheck,
  Sparkles,
  Home,
  Sprout,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Megaphone,
  RefreshCw,
} from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import LogoLoop from "@/components/LogoLoop";
import { imageUrl } from "@/lib/sanity/image";
import { getTeamMembers } from "@/lib/sanity/fetch";
import { buildTrayectoria } from "@/data/trayectoria";

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
    icon: Wrench,
    tileClass: "bg-brand-yellow/15 text-brand-yellow",
  },
  {
    titleKey: "oe4Title",
    descKey: "oe4Desc",
    icon: SearchCheck,
    tileClass: "bg-white/15 text-white",
  },
];

const dimensionKeys = [
  { titleKey: "dimensionTitle1", descKey: "dimensionDesc1", icon: Sparkles, color: "text-brand-primary border-brand-primary/30" },
  { titleKey: "dimensionTitle2", descKey: "dimensionDesc2", icon: Users, color: "text-brand-teal border-brand-teal/30" },
  { titleKey: "dimensionTitle3", descKey: "dimensionDesc3", icon: Home, color: "text-brand-orange border-brand-orange/30" },
  { titleKey: "dimensionTitle4", descKey: "dimensionDesc4", icon: Compass, color: "text-brand-primary-dark border-brand-primary-dark/30" },
  { titleKey: "dimensionTitle5", descKey: "dimensionDesc5", icon: Target, color: "text-brand-accent-dark border-brand-accent-dark/30" },
  { titleKey: "dimensionTitle6", descKey: "dimensionDesc6", icon: Sprout, color: "text-brand-teal-dark border-brand-teal-dark/30" },
];

const areas = [
  { titleKey: "areaATitle", descKey: "areaADesc", icon: Heart, tileClass: "bg-brand-orange/15 text-brand-orange" },
  { titleKey: "areaBTitle", descKey: "areaBDesc", icon: GraduationCap, tileClass: "bg-brand-teal/15 text-brand-teal" },
  { titleKey: "areaCTitle", descKey: "areaCDesc", icon: HeartPulse, tileClass: "bg-brand-yellow/15 text-brand-yellow" },
  { titleKey: "areaDTitle", descKey: "areaDDesc", icon: Briefcase, tileClass: "bg-brand-primary/15 text-brand-primary" },
  { titleKey: "areaETitle", descKey: "areaEDesc", icon: Megaphone, tileClass: "bg-brand-secondary/15 text-brand-secondary" },
  { titleKey: "areaFTitle", descKey: "areaFDesc", icon: RefreshCw, tileClass: "bg-white/15 text-white" },
];

const comoHacemos = [
  {
    icon: Link2,
    titleKey: "conectarTitle",
    descKey: "conectarDesc",
    tileClass: "bg-brand-teal/15 text-brand-teal",
  },
  {
    icon: Wrench,
    titleKey: "facilitarTitle",
    descKey: "facilitarDesc",
    tileClass: "bg-brand-orange/15 text-brand-orange",
  },
  {
    icon: Rocket,
    titleKey: "impulsarTitle",
    descKey: "impulsarDesc",
    tileClass: "bg-brand-purple/15 text-brand-purple",
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

  const fallbackAliados = fotos.home.aliados.map((item) => ({
    ...item,
    src: assetPath(item.src),
  }));

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
      {/* HERO */}
      <DossierHero
        images={[
          assetPath(fotos.quienesSomos.hero),
          assetPath(fotos.quienesSomos.sectionImage),
          assetPath(fotos.quienesSomos.objetivoImage),
          assetPath(fotos.quienesSomos.poblacionImage),
          assetPath(fotos.quienesSomos.areasImage),
        ]}
        tag={t("heroTag")}
        title={t("heroTitle")}
        highlight={t("heroHighlight")}
        subtitle={t("heroSubtitle")}
        accent="orange"
        primaryCta={{ label: t("heroCtaPrimary"), href: `/${locale}/programas` }}
        secondaryCta={{ label: t("heroCtaSecondary"), href: `/${locale}/contacto` }}
      />

      {/* Hitos de origen */}
      <section className="relative overflow-hidden bg-surface py-10">
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

      {/* Historia */}
      <section className="relative overflow-hidden bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <AnimatedSection direction="left">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-[10px] shadow-xl">
                  <ImageParallax
                    src={assetPath(fotos.quienesSomos.historiaImage)}
                    alt={t("historiaTitle")}
                    fill
                    className="object-cover"
                  />
                </div>
                {fotos.quienesSomos.historiaGallery.map((src, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-[10px] shadow-md">
                    <ImageParallax
                      src={assetPath(src)}
                      alt={`${t("historiaTitle")} ${i + 1}`}
                      fill
                      className="object-cover"
                      intensity={0.15}
                    />
                  </div>
                ))}
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

          {/* Fundadores */}
          <AnimatedSection direction="up" delay={0.15} className="mt-14">
            <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-brand-purple">
              {t("fundadoresTag")}
            </p>
            <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => {
                const name = t(`fundador${i}`);
                const photo = i === 2 ? assetPath(fotos.quienesSomos.team.maicol) : null;
                const initials = name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("");
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-[10px] border border-border-subtle bg-bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-brand-teal/30 bg-brand-teal/10">
                      {photo ? (
                        <Image src={photo} alt={name} fill sizes="64px" className="object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-lg font-bold text-brand-purple-dark">
                          {initials}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">{name}</p>
                    <span className="mt-2 inline-block rounded-full bg-brand-purple/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-purple">
                      Fundador
                    </span>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Cifras nacionales */}
      <section className="relative overflow-hidden bg-section-light py-20">
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
            <p className="mb-10 text-center text-sm text-text-muted">{t("cifrasSource")}</p>
          </AnimatedSection>
          <StatsRings stats={cifrasStats} />
        </div>
      </section>

      {/* Ley 2479 */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{
          "--section-bg-image": `url(${assetPath(fotos.quienesSomos.objetivoImage)})`,
        } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
            <AnimatedSection direction="left">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 text-brand-yellow">
                <Gavel size={28} strokeWidth={1.6} aria-hidden="true" />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="mb-4 inline-block rounded-[10px] bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-brand-yellow">
                {t("ley2479Tag")}
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">{t("ley2479Title")}</h2>
              <p className="max-w-[66ch] text-lg leading-relaxed text-white/80">{t("ley2479Desc")}</p>
              <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-white/70">
                <span className="h-2 w-2 rounded-full bg-white/40" aria-hidden="true" />
                <span>{t("ley2479Start")}</span>
                <span className="relative h-px max-w-[140px] flex-1 overflow-hidden bg-white/30" aria-hidden="true">
                  <span className="absolute inset-y-0 left-0 w-full bg-brand-yellow" />
                </span>
                <span className="h-2 w-2 rounded-full bg-brand-yellow" aria-hidden="true" />
                <span>{t("ley2479End")}</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trayectoria / ruta */}
      <section className="relative overflow-hidden bg-section-light py-20">
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
          <TimelineRoute
            items={trayectoria}
            hitoSingular={t("hitoSingular")}
            hitoPlural={t("hitoPlural")}
          />
        </div>
      </section>

      {/* Proposito / Mision / Vision */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{
          "--section-bg-image": `url(${assetPath(fotos.quienesSomos.sectionImage)})`,
        } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("propositoTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("propositoTitle")} <span className="text-white/80">{t("propositoHighlight")}</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-5 sm:grid-cols-3">
            <AnimatedSection direction="up" className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-white/15">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-ley-cyan/40 bg-ley-cyan/10">
                <Target size={20} className="text-ley-cyan" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{t("misionTitle")}</h3>
              <p className="text-sm leading-relaxed text-white/75">{t("misionDesc")}</p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1} className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-white/15">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-ley-orange/40 bg-ley-orange/10">
                <Eye size={20} className="text-ley-orange" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{t("visionTitle")}</h3>
              <p className="text-sm leading-relaxed text-white/75">{t("visionDesc")}</p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2} className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-white/15">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-ley-yellow/40 bg-ley-yellow/10">
                <Heart size={20} className="text-ley-yellow" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{t("propositoCardTitle")}</h3>
              <p className="text-sm leading-relaxed text-white/75">{t("propositoCardDesc")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Como lo hacemos */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("comoTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("comoTitle")} <span className="text-brand-purple">{t("comoHighlight")}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mx-auto mb-10 max-w-3xl text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t("comoDesc")}
            </p>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {comoHacemos.map((item, i) => (
              <AnimatedSection key={item.titleKey} direction="up" delay={i * 0.1}>
                <div className="h-full rounded-[10px] border border-brand-teal/20 bg-bg-card p-8 transition-all hover:shadow-md">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] ${item.tileClass}`}>
                    <item.icon size={22} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    {t(item.descKey)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Objetivo general y objetivos estrategicos */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{
          "--section-bg-image": `url(${assetPath(fotos.quienesSomos.objetivoGeneralImage)})`,
        } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("objetivoTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("objetivoTitle")} <span className="text-white/80">{t("objetivoHighlight")}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="relative mx-auto mb-16 max-w-3xl overflow-hidden rounded-[10px] border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
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

      {/* Poblacion objetivo */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <AnimatedSection direction="up">
                <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                  {t("poblacionTag")}
                </span>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                  {t("poblacionTitle")} <span className="text-brand-orange">{t("poblacionHighlight")}</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.15}>
                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  {t("poblacionDesc")}
                </p>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.2}>
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

      {/* Enfoque / Dimensiones */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("enfoqueTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("enfoqueTitle")} <span className="text-brand-purple">{t("enfoqueHighlight")}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mx-auto mb-8 max-w-3xl text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t("enfoqueDesc")}
            </p>
          </AnimatedSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dimensionKeys.map((item, i) => (
              <AnimatedSection key={item.titleKey} direction="up" delay={i * 0.05}>
                <div className="h-full rounded-[10px] border border-border-subtle bg-bg-card p-6 transition-all hover:shadow-md">
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full border ${item.color}`}>
                    <item.icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {t(item.descKey)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Areas de trabajo */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{ "--section-bg-image": `url(${assetPath(fotos.quienesSomos.areasImage)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("areasTrabajoTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("areasTrabajoTitle")} <span className="text-white/80">{t("areasTrabajoHighlight")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
              {t("areasTrabajoDesc")}
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, i) => (
              <AnimatedSection key={area.titleKey} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-[10px] border border-white/10 bg-white/10 p-6 transition-all hover:bg-white/15">
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] ${area.tileClass}`}>
                    <area.icon size={22} />
                  </div>
                  <h3 className="mb-2 font-bold text-white">
                    {t(area.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/75">
                    {t(area.descKey)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Valores y ODS */}
      <section className="relative overflow-hidden bg-section-light py-20">
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

      {/* Equipo */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{ "--section-bg-image": `url(${assetPath(fotos.quienesSomos.equipoImage)})` } as CSSProperties}
      >
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

      {/* Aliados */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("aliadosTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("aliadosTitle")}
            </h2>
          </AnimatedSection>
          <LogoLoop logos={fallbackAliados} />
        </div>
      </section>

      {/* CTA final */}
      <section
        className="bg-brand-purple py-20 section-bg-image"
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
