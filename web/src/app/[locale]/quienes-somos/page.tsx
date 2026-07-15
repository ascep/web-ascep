import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Timeline from "@/components/Timeline";
import AnimatedSection from "@/components/AnimatedSection";
import { getTranslations } from "next-intl/server";
import { Target, Eye, Heart } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
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
  { name: "Maicol Londoño", role: "Director", src: assetPath("/images/equipo/maicol.png") },
  { name: "Kevin Ortega", role: "Coordinador", src: assetPath("/images/equipo/phtos-ascep-kevin.png") },
  { name: "Monica", role: "Equipo Psicosocial", src: assetPath("/images/equipo/phtos-ascep-monica.png") },
  { name: "Jhon Eduard Angulo", role: "Equipo de Formacion", src: assetPath("/images/equipo/phtos-ascep-jhon.png") },
  { name: "Ana", role: "Equipo ASCEP", src: assetPath("/images/equipo/phtos-ascep.png") },
];

const fallbackMilestones = [
  { year: "2019", title: "Nacimiento de ASCEP", description: "Un grupo de egresados del sistema de proteccion estatal se organiza para construir un proyecto colectivo que transforme la forma en que el Estado aborda el egreso.", image: assetPath("/images/eventos/20241112_092855.webp") },
  { year: "2020", title: "Primeras alianzas", description: "Establecemos vinculos con actores politicos y organizaciones internacionales como UNICEF, OIM y USAID para impulsar la agenda del egreso.", image: assetPath("/images/eventos/20241112_092951.webp") },
  { year: "2021", title: "Premio Civico", description: "Ganamos el primer lugar del Premio Civico por nuestro trabajo en liderazgo juvenil y procesos formativos con egresados del sistema de proteccion.", image: assetPath("/images/eventos/20241112_095957.webp") },
  { year: "2023", title: "Proyecto de Ley", description: "Impulsamos el proyecto de Ley de Egreso, construido colectivamente con egresados de todo el pais y respaldado por la senadora Lorena Rios.", image: assetPath("/images/eventos/20241112_100147.webp") },
  { year: "2025", title: "Ley 2479 de 2025", description: "Se sanciona la Ley Hijos del Estado, creando el Programa Nacional de Acompanamiento Integral al Egresado del ICBF.", image: assetPath("/images/eventos/20241112_111016.webp") },
];

const dimensions = [
  { title: "Autoaceptacion", desc: "Valoracion positiva de si mismo y de la propia historia." },
  { title: "Relaciones Positivas", desc: "Capacidad de establecer y mantener relaciones sociales de calidad y confianza." },
  { title: "Dominio del Entorno", desc: "Percepcion de control del medio y habilidad para crear entornos favorables." },
  { title: "Autonomia", desc: "Capacidad de sostener la propia individualidad y autodeterminacion personal." },
  { title: "Proposito en la Vida", desc: "Capacidad de tener metas claras y definir objetivos vitales." },
  { title: "Crecimiento Personal", desc: "Desarrollo de las potencialidades individuales para crecer como persona." },
  { title: "enredete con ascep", desc: "Desarrollo de las potencialidades individuales para crecer como persona." },
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

  const team = cmsTeam.length > 0
    ? cmsTeam.map((m) => ({
        name: m.name?.es || "",
        role: m.role?.es || "",
        src: imageUrl(m.photo) || "",
      }))
    : fallbackTeam;

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
        bgImage={assetPath("/images/equipo-shoot/GIS08542.webp")}
        title={t("heroTitle")}
        highlight={t("heroHighlight")}
        subtitle={t("heroSubtitle")}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left" className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-[10px] bg-brand-purple/10" />
              <Image
                src={assetPath("/images/equipo-shoot/GIS08550.webp")}
                alt="Equipo ASCEP"
                width={600}
                height={400}
                className="relative w-full rounded-[10px] object-cover shadow-lg"
                style={{ aspectRatio: "3/2" }}
              />
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
        </section>

        <section className="mb-20">
          <div className="mb-12 text-center">
            <AnimatedSection direction="up">
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {t("propositoTag")}
              </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("propositoTitle")} <span className="text-brand-purple">{t("propositoHighlight")}</span>
              </h2>
            </AnimatedSection>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <AnimatedSection direction="up" className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-teal/10">
                <Target size={22} className="text-brand-teal" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">
                {t("misionTitle")}
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                {t("misionDesc")}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1} className="rounded-[10px] border border-brand-purple/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                <Eye size={22} className="text-brand-purple" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">
                {t("visionTitle")}
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                {t("visionDesc")}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2} className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-orange/10">
                <Heart size={22} className="text-brand-orange" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">
                {t("propositoCardTitle")}
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                {t("propositoCardDesc")}
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="mb-20">
          <AnimatedSection direction="up" className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("trayectoriaTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("trayectoriaTitle")} <span className="text-brand-purple">{t("trayectoriaHighlight")}</span>
            </h2>
          </AnimatedSection>
          <Timeline items={milestones} />
        </section>

        <section className="mb-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <AnimatedSection direction="left">
                <span className="mb-3 inline-block rounded-[10px] bg-brand-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                  {t("equipoTag")}
                </span>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                  {t("equipoTitle")} <span className="text-brand-purple">{t("equipoHighlight")}</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.2}>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {t("equipoDesc")}
                </p>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {team.slice(0, 4).map((member, i) => (
                  <AnimatedSection key={member.name} direction="up" delay={i * 0.08}>
                    <div className="flex items-center gap-4 rounded-[10px] bg-white p-4 shadow-sm transition-all hover:shadow-md">
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
                        <h4 className="text-lg font-bold text-brand-purple">
                          {member.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-text-muted">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              {team.length > 4 && (
                <AnimatedSection direction="up" delay={0.4} className="mt-4 flex justify-center sm:justify-start">
                  <div className="flex w-full items-center gap-4 rounded-[10px] bg-white p-4 shadow-sm transition-all hover:shadow-md sm:w-[calc(50%-0.5rem)]">
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
                      <h4 className="text-lg font-bold text-brand-purple">
                        {team[4].name}
                      </h4>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {team[4].role}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <AnimatedSection direction="up" className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("enfoqueTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("enfoqueTitle")} <span className="text-brand-purple">{t("enfoqueHighlight")}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
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
        </section>

        <AnimatedSection direction="up">
          <section className="rounded-[10px] bg-brand-purple p-10 text-center shadow-sm transition-all hover:shadow-md">
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
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
