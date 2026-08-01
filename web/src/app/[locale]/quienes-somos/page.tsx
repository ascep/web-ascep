import type { CSSProperties } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Timeline from "@/components/Timeline";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import ParallaxSection from "@/components/ParallaxSection";
import TeamFan from "@/components/TeamFan";
import { getTranslations } from "next-intl/server";
import { Target, Eye, Heart } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import LogoLoop from "@/components/LogoLoop";
import { imageUrl } from "@/lib/sanity/image";
import { getTeamMembers, getMilestones } from "@/lib/sanity/fetch";

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

const dimensions = [
  { title: "Autoaceptacion", desc: "Valoracion positiva de si mismo y de la propia historia." },
  { title: "Relaciones Positivas", desc: "Capacidad de establecer y mantener relaciones sociales de calidad y confianza." },
  { title: "Dominio del Entorno", desc: "Percepcion de control del medio y habilidad para crear entornos favorables." },
  { title: "Autonomia", desc: "Capacidad de sostener la propia individualidad y autodeterminacion personal." },
  { title: "Proposito en la Vida", desc: "Capacidad de tener metas claras y definir objetivos vitales." },
  { title: "Crecimiento Personal", desc: "Desarrollo de las potencialidades individuales para crecer como persona." },
];

const objetivosEstrategicos = [
  { titleKey: "oe1Title", descKey: "oe1Desc" },
  { titleKey: "oe2Title", descKey: "oe2Desc" },
  { titleKey: "oe3Title", descKey: "oe3Desc" },
  { titleKey: "oe4Title", descKey: "oe4Desc" },
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
  const cmsMilestones = await getMilestones();

  const fallbackAliados = fotos.home.aliados.map((item) => ({
    ...item,
    src: assetPath(item.src),
  }));

  const team = cmsTeam.length > 0
    ? cmsTeam.map((m) => ({
        name: typeof m.name === "string" ? m.name : m.name?.es || "",
        role: typeof m.role === "string" ? m.role : m.role?.es || "",
        src: (m.photo ? imageUrl(m.photo) : null) || assetPath(fotos.quienesSomos.team.kevin),
      }))
    : [
        { name: "Kevin", role: t("equipoKevinRole"), src: assetPath(fotos.quienesSomos.team.kevin) },
      ];

  const milestones = cmsMilestones.length > 0
    ? cmsMilestones.map((m) => ({
        year: m.year || "",
        title: m.title?.es || "",
        description: m.description?.es || "",
        image: (m.image ? imageUrl(m.image) : null) || assetPath(fotos.home.timeline[0]?.image || ""),
      }))
    : [
        { year: "2018", title: "Fundacion", description: "Inicio de actividades de la fundacion ASCEP.", image: assetPath(fotos.quienesSomos.historiaImage) },
      ];

  const areasGallery = [fotos.quienesSomos.historiaImage, fotos.quienesSomos.objetivoImage, fotos.quienesSomos.poblacionImage];

  return (
    <div className="min-h-screen">
      <PageHero
        bgImage={assetPath(fotos.quienesSomos.hero)}
        tag={t("heroTag")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
      />

      {/* Historia */}
      <section className="relative overflow-hidden bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimatedSection direction="left">
              <div className="relative overflow-hidden rounded-[10px] shadow-xl">
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.historiaImage)}
                  alt={t("historiaTitle")}
                  className="aspect-[4/3] w-full object-cover"
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
                <AnimatedSection key={i} direction="up" delay={0.15 * i}>
                  <p className="mb-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    {t(`historiaP${i}`)}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
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
          <div className="grid gap-6 sm:grid-cols-3">
            <AnimatedSection direction="up" className="glass-card rounded-[10px] p-8 transition-all hover:bg-white/15">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                <Target size={22} className="text-brand-secondary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{t("misionTitle")}</h3>
              <p className="text-white/75">{t("misionDesc")}</p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1} className="glass-card rounded-[10px] p-8 transition-all hover:bg-white/15">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                <Eye size={22} className="text-brand-secondary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{t("visionTitle")}</h3>
              <p className="text-white/75">{t("visionDesc")}</p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2} className="glass-card rounded-[10px] p-8 transition-all hover:bg-white/15">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                <Heart size={22} className="text-brand-secondary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{t("propositoCardTitle")}</h3>
              <p className="text-white/75">{t("propositoCardDesc")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Objetivo General */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("objetivoTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("objetivoTitle")} <span className="text-brand-purple">{t("objetivoHighlight")}</span>
            </h2>
          </AnimatedSection>
          <div className="grid items-center gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <AnimatedSection direction="up" delay={0.15}>
                <div className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-8">
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    {t("objetivoDesc")}
                  </p>
                </div>
              </AnimatedSection>
            </div>
            <AnimatedSection direction="right" delay={0.2} className="lg:col-span-2">
              <ImageParallax
                src={assetPath(fotos.quienesSomos.objetivoImage)}
                alt=""
                width={600}
                height={400}
                className="w-full rounded-[10px] object-cover shadow-lg"
                intensity={0.2}
                style={{ aspectRatio: "4/3" }}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Objetivos Estrategicos */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{
          "--section-bg-image": `url(${assetPath(fotos.quienesSomos.objetivoImage)})`,
        } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("objetivosEstrategicosTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("objetivosEstrategicosTitle")} <span className="text-white/80">{t("objetivosEstrategicosHighlight")}</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {objetivosEstrategicos.map((oe, i) => (
              <AnimatedSection key={oe.titleKey} direction="up" delay={i * 0.1}>
                <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {t(oe.titleKey)}
                  </h3>
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
      <ParallaxSection
        bgImage={assetPath(fotos.quienesSomos.poblacionParallax)}
        overlay="bg-black/70"
        className="py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <AnimatedSection direction="up">
                <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {t("poblacionTag")}
                </span>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                  {t("poblacionTitle")} <span className="text-brand-orange">{t("poblacionHighlight")}</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.15}>
                <p className="text-lg leading-relaxed text-white/80">
                  {t("poblacionDesc")}
                </p>
              </AnimatedSection>
            </div>
            <AnimatedSection direction="right" delay={0.2} className="lg:col-span-2">
              <ImageParallax
                src={assetPath(fotos.quienesSomos.poblacionImage)}
                alt=""
                width={600}
                height={400}
                className="w-full rounded-[10px] object-cover shadow-lg"
                intensity={0.2}
                style={{ aspectRatio: "4/3" }}
              />
            </AnimatedSection>
          </div>
        </div>
      </ParallaxSection>

      {/* Trayectoria */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("trayectoriaTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("trayectoriaTitle")} <span className="text-brand-purple">{t("trayectoriaHighlight")}</span>
            </h2>
          </AnimatedSection>
          <Timeline items={milestones} />
        </div>
      </section>

      {/* Equipo */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{ "--section-bg-image": `url(${assetPath(fotos.quienesSomos.team.kevin)})` } as CSSProperties}
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
            <p className="mb-8 text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t("enfoqueDesc")}
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dimensions.map((item, i) => (
              <AnimatedSection key={item.title} direction="up" delay={i * 0.05}>
                <div className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md">
                  <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {item.desc}
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
          <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areasGallery.map((src: string, i: number) => (
              <AnimatedSection
                key={src}
                direction="up"
                delay={i * 0.06}
                className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
              >
                <div className={`group relative w-full overflow-hidden rounded-[10px] ${
                  i === 0 ? "h-56 sm:h-full" : "h-56"
                }`}>
                  <ImageParallax
                    src={assetPath(src)}
                    alt=""
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    intensity={0.1}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { titleKey: "areaATitle", descKey: "areaADesc" },
              { titleKey: "areaBTitle", descKey: "areaBDesc" },
              { titleKey: "areaCTitle", descKey: "areaCDesc" },
              { titleKey: "areaDTitle", descKey: "areaDDesc" },
              { titleKey: "areaETitle", descKey: "areaEDesc" },
              { titleKey: "areaFTitle", descKey: "areaFDesc" },
            ].map((area, i) => (
              <AnimatedSection key={area.titleKey} direction="up" delay={i * 0.08}>
                <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                  <h3 className="mb-2 font-bold text-white">
                    {t(area.titleKey)}
                  </h3>
                  <p className="text-sm text-white/75">
                    {t(area.descKey)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
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
