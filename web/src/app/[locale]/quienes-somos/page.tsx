import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Timeline from "@/components/Timeline";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import ParallaxSection from "@/components/ParallaxSection";
import { getTranslations } from "next-intl/server";
import { Target, Eye, Heart } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { fotos } from "@/data/fotos";
import { imageUrl } from "@/lib/sanity/image";
import { getTeamMembers, getMilestones } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Quienes Somos - ASCEP",
  description:
    "Conoce la historia, mision, vision y equipo de ASCEP. Somos egresados del sistema de proteccion estatal unidos para transformar la ninez en Colombia.",
  openGraph: {
    description:
      "Conoce la historia, mision, vision y equipo de ASCEP. Somos egresados del sistema de proteccion estatal unidos para transformar la ninez en Colombia.",
  },
};

const fallbackTeam = [
  { name: "Maicol Londoño", role: "Director", src: assetPath(fotos.quienesSomos.team.maicol) },
  { name: "Kevin Ortega", role: "Desarrollador y dise\u00F1ador", src: assetPath(fotos.quienesSomos.team.kevin) },
  { name: "Monica", role: "Equipo Psicosocial", src: assetPath(fotos.quienesSomos.team.monica) },
  { name: "Jhon Eduard Angulo", role: "Equipo de Formacion", src: assetPath(fotos.quienesSomos.team.jhon) },
  { name: "Ana", role: "Comunicaci\u00F3n", src: assetPath(fotos.quienesSomos.team.ana) },
];

const fallbackMilestones = fotos.quienesSomos.timeline.map((item) => ({
  year: item.year,
  title: item.title,
  description: item.description,
  image: assetPath(item.image),
}));

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

  const [cmsTeam, cmsMilestones] = await Promise.all([
    getTeamMembers(),
    getMilestones(),
  ]);

  const cmsMapped = cmsTeam.length > 0
    ? cmsTeam.map((m) => ({
        name: m.name?.es || "",
        role: m.role?.es || "",
        src: imageUrl(m.photo) || "",
      })).filter((m) => m.src)
    : [];
  const team = cmsMapped.length > 0 ? cmsMapped : fallbackTeam;

  const milestones = cmsMilestones.length > 0
    ? cmsMilestones.map((m) => ({
        year: m.year || "",
        title: m.title?.es || "",
        description: m.description?.es || "",
        image: imageUrl(m.image) || fallbackMilestones[0].image,
      }))
    : fallbackMilestones;

  return (
    <div>
      <PageHero
        bgImage={assetPath(fotos.quienesSomos.hero)}
        title={t("heroTitle")}
        highlight={t("heroHighlight")}
        subtitle={t("heroSubtitle")}
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-full w-full rounded-[10px] bg-brand-purple/10" />
                <ImageParallax
                  src={assetPath(fotos.quienesSomos.historiaImage)}
                  alt="Equipo ASCEP"
                  width={600}
                  height={400}
                  containerClassName="relative"
                  className="w-full rounded-[10px] object-cover shadow-lg"
                  intensity={0.2}
                  style={{ aspectRatio: "3/2" }}
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

      <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("propositoTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("propositoTitle")} <span className="text-brand-orange">{t("propositoHighlight")}</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-3">
            <AnimatedSection direction="up" className="glass-card rounded-[10px] p-8 transition-all hover:bg-white/15">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                <Target size={22} className="text-brand-secondary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">{t("misionTitle")}</h3>
              <p className="text-[var(--color-text-muted)]">{t("misionDesc")}</p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1} className="glass-card rounded-[10px] p-8 transition-all hover:bg-white/15">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                <Eye size={22} className="text-brand-secondary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">{t("visionTitle")}</h3>
              <p className="text-[var(--color-text-muted)]">{t("visionDesc")}</p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2} className="glass-card rounded-[10px] p-8 transition-all hover:bg-white/15">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                <Heart size={22} className="text-brand-secondary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">{t("propositoCardTitle")}</h3>
              <p className="text-[var(--color-text-muted)]">{t("propositoCardDesc")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

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

      <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("objetivosEstrategicosTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("objetivosEstrategicosTitle")} <span className="text-brand-orange">{t("objetivosEstrategicosHighlight")}</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {objetivosEstrategicos.map((oe, i) => (
              <AnimatedSection key={oe.titleKey} direction="up" delay={i * 0.1}>
                <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                  <h3 className="mb-2 text-lg font-bold text-brand-secondary">
                    {t(oe.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {t(oe.descKey)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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

      <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <AnimatedSection direction="left">
                <span className="mb-3 inline-block rounded-[10px] bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
                  {t("equipoTag")}
                </span>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                  {t("equipoTitle")} <span className="text-brand-orange">{t("equipoHighlight")}</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.2}>
                <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
                  {t("equipoDesc")}
                </p>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {team.slice(0, 4).map((member, i) => (
                  <AnimatedSection key={member.name} direction="up" delay={i * 0.08}>
                    <div className="glass-card flex items-center gap-4 rounded-[10px] p-4 transition-all hover:bg-white/15">
                      <div className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[10px] sm:h-[130px] sm:w-[130px]">
                        <Image
                          src={member.src}
                          alt={member.name}
                          width={130}
                          height={130}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold text-brand-secondary">
                          {member.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              {team.length > 4 && (
                <AnimatedSection direction="up" delay={0.4} className="mt-4 flex justify-center sm:justify-start">
                  <div className="glass-card flex w-full items-center gap-4 rounded-[10px] p-4 transition-all hover:bg-white/15 sm:w-[calc(50%-0.5rem)]">
                    <div className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[10px] sm:h-[130px] sm:w-[130px]">
                      <Image
                        src={team[4].src}
                        alt={team[4].name}
                        width={130}
                        height={130}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-lg font-bold text-brand-secondary">
                        {team[4].name}
                      </h4>
                      <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                        {team[4].role}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>

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

      <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("areasTrabajoTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("areasTrabajoTitle")} <span className="text-brand-orange">{t("areasTrabajoHighlight")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-white/70">
              {t("areasTrabajoDesc")}
            </p>
          </AnimatedSection>
          <AnimatedSection className="mb-10 overflow-hidden rounded-[10px]">
            <ImageParallax
              src={assetPath(fotos.quienesSomos.areasImage)}
              alt=""
              width={1200}
              height={300}
              className="h-48 w-full object-cover"
              intensity={0.12}
            />
          </AnimatedSection>
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
                  <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">
                    {t(area.titleKey)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {t(area.descKey)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-purple py-20">
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

