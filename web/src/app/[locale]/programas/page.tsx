import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Baby,
  Briefcase,
  Gavel,
  HandHeart,
  HeartPulse,
  Home,
  Megaphone,
  PersonStanding,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import DossierHero from "@/components/DossierHero";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("programas.title"),
    description: t("programas.description"),
    openGraph: {
      description: t("programas.description"),
    },
  };
}

type ProjectRow = { proyecto: string; periodo: string; resultado: string };
type ProjectCard = { titulo: string; desc: string };

export default async function ProgramasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });

  const incidenciaProjects = t.raw("incidenciaProjects") as ProjectRow[];
  const avanzaProjects = t.raw("avanzaProjects") as ProjectRow[];
  const empleoProjects = t.raw("empleoProjects") as ProjectCard[];
  const miCuerpoProjects = t.raw("miCuerpoProjects") as ProjectCard[];
  const casasProjects = t.raw("casasProjects") as ProjectCard[];

  const stats: { value: string; label: string; icon: LucideIcon; color: string; bg: string }[] = [
    { value: t("cifra1"), label: t("cifra1Label"), icon: Users, color: "text-ley-purple", bg: "bg-ley-purple/10" },
    { value: t("cifra2"), label: t("cifra2Label"), icon: Shield, color: "text-ley-teal", bg: "bg-ley-teal/10" },
    { value: t("cifra3"), label: t("cifra3Label"), icon: Baby, color: "text-ley-cyan", bg: "bg-ley-cyan/10" },
    { value: t("cifra4"), label: t("cifra4Label"), icon: HandHeart, color: "text-ley-orange", bg: "bg-ley-orange/10" },
  ];

  return (
    <>
      {/* Hero — visual only */}
      <div className="relative h-[50vh] overflow-hidden bg-ley-orange sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${assetPath(fotos.programas.hero)}")` }}
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,16,32,0.45) 0%, transparent 50%)" }} />
      </div>

      {/* Hero text */}
      <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={assetPath("/logos/12 logo ascep blanco sin slogan.png")}
                  alt="ASCEP"
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("badge")}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
                {t("title")} <span className="text-brand-orange">{t("titleHighlight")}</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {t("desc")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/quienes-somos`} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-orange px-7 py-3 text-sm font-bold text-white transition-all hover:bg-brand-orange/90 hover:shadow-lg">
                  {t("heroCta1")}
                </Link>
                <a href="#portafolio" className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-orange/30 px-7 py-3 text-sm font-bold text-brand-orange transition-all hover:border-brand-orange/60 hover:bg-brand-orange/5">
                  {t("heroCta2")}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-ley-teal/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ley-teal">
              {t("estadisticasTag")}
            </span>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              {t("estadisticasTitle")}
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <AnimatedSection key={i} direction="up" delay={i * 0.08}>
                  <div className="h-full rounded-3xl border border-border-default bg-bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                    <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg}`}>
                      <Icon size={26} className={stat.color} />
                    </div>
                    <p className="text-4xl font-black tracking-tight text-ley-purple">{stat.value}</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">{stat.label}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection direction="up" delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl bg-ley-purple p-6 text-white sm:flex-row sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ley-teal">
                  <Gavel size={26} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ley-yellow">{t("leyBannerTag")}</p>
                  <h3 className="mt-1 text-lg font-extrabold">{t("leyBannerTitle")}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-purple-100">{t("leyBannerDesc")}</p>
                </div>
              </div>
              <Link
                href={`/${locale}/ley-de-egreso`}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ley-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-ley-orange/90 hover:shadow-lg"
              >
                {t("leyBannerCta")} <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="portafolio" className="section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-ley-yellow/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ley-yellow">
              {t("portafolioTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("portafolioTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-purple-100">
              {t("portafolioDesc")}
            </p>
          </AnimatedSection>

          <div className="space-y-10">
            <AnimatedSection direction="up">
              <ProgramTable
                icon={Megaphone}
                logo={assetPath(fotos.home.programs.incidencia.logo)}
                iconBg="bg-ley-orange/15"
                title={t("incidenciaTitle")}
                desc={t("incidenciaDesc")}
                rows={incidenciaProjects}
                theadClass="bg-ley-orange"
                btnClass="bg-ley-orange text-white hover:bg-ley-orange/90"
                href={`/${locale}/programas/incidencia`}
                leerMas={t("leerMas")}
                colProyecto={t("tablaColProyecto")}
                colPeriodo={t("tablaColPeriodo")}
                colResultado={t("tablaColResultado")}
              />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1}>
              <ProgramTable
                icon={PersonStanding}
                logo={assetPath(fotos.home.programs.avanzaJoven.logo)}
                iconBg="bg-ley-cyan/15"
                title={t("avanzaTitle")}
                desc={t("avanzaDesc")}
                rows={avanzaProjects}
                theadClass="bg-ley-cyan"
                btnClass="bg-ley-cyan text-white hover:bg-ley-cyan/90"
                href={`/${locale}/programas/avanza-joven`}
                leerMas={t("leerMas")}
                colProyecto={t("tablaColProyecto")}
                colPeriodo={t("tablaColPeriodo")}
                colResultado={t("tablaColResultado")}
              />
            </AnimatedSection>

            <div className="grid gap-6 lg:grid-cols-3">
              <AnimatedSection direction="up" delay={0.15}>
                <ProgramCard
                  icon={Briefcase}
                  logo={assetPath(fotos.home.programs.fomento.logo)}
                  iconBg="bg-ley-yellow/25"
                  title={t("empleoTitle")}
                  desc={t("empleoDesc")}
                  items={empleoProjects}
                  href={`/${locale}/programas/empleo`}
                  leerMas={t("leerMas")}
                />
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.25}>
                <ProgramCard
                  icon={HeartPulse}
                  logo={assetPath(fotos.home.programs.miCuerpo.logo)}
                  iconBg="bg-ley-purple/10"
                  title={t("miCuerpoTitle")}
                  desc={t("miCuerpoDesc")}
                  items={miCuerpoProjects}
                  href={`/${locale}/programas/mi-cuerpo`}
                  leerMas={t("leerMas")}
                />
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.35}>
                <ProgramCard
                  icon={Home}
                  iconBg="bg-ley-cyan"
                  title={t("casasTitle")}
                  desc={t("casasDesc")}
                  items={casasProjects}
                  href={`/${locale}/casas-del-saber`}
                  leerMas={t("leerMas")}
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProgramTable({
  icon: Icon,
  logo,
  iconBg,
  btnClass = "bg-ley-purple text-white",
  title,
  desc,
  rows,
  theadClass,
  href,
  leerMas,
  colProyecto,
  colPeriodo,
  colResultado,
}: {
  icon: LucideIcon;
  logo?: string;
  iconBg: string;
  btnClass?: string;
  title: string;
  desc: string;
  rows: ProjectRow[];
  theadClass: string;
  href: string;
  leerMas: string;
  colProyecto: string;
  colPeriodo: string;
  colResultado: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border-default bg-bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border-default p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>
            {logo ? (
              <Image src={logo} alt={title} width={48} height={48} className="h-full w-full rounded-2xl object-contain p-1.5" />
            ) : (
              <Icon size={24} className="text-white" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-text-primary">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">{desc}</p>
          </div>
        </div>
        <Link
          href={href}
          className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:shadow-md ${btnClass}`}
        >
          {leerMas} <ArrowRight size={14} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">{title}</caption>
          <thead className={theadClass}>
            <tr>
              <th scope="col" className="p-4 font-semibold text-white">{colProyecto}</th>
              <th scope="col" className="p-4 font-semibold text-white">{colPeriodo}</th>
              <th scope="col" className="p-4 font-semibold text-white">{colResultado}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default bg-bg-card">
            {rows.map((row) => (
              <tr key={row.proyecto} className="transition-colors hover:bg-ley-purple/5">
                <td className="p-4 font-bold text-text-primary">{row.proyecto}</td>
                <td className="whitespace-nowrap p-4 font-medium text-text-muted">{row.periodo}</td>
                <td className="p-4 text-text-secondary">{row.resultado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProgramCard({
  icon: Icon,
  logo,
  iconBg,
  btnClass = "bg-ley-purple text-white",
  title,
  desc,
  items,
  href,
  leerMas,
}: {
  icon: LucideIcon;
  logo?: string;
  iconBg: string;
  btnClass?: string;
  title: string;
  desc: string;
  items: ProjectCard[];
  href: string;
  leerMas: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border-default bg-bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>
          {logo ? (
            <Image src={logo} alt={title} width={48} height={48} className="h-full w-full rounded-2xl object-contain p-1.5" />
          ) : (
            <Icon size={24} className="text-white" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-extrabold leading-snug text-text-primary">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">{desc}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item.titulo} className="rounded-2xl border border-border-default bg-bg-elevated p-4">
            <p className="text-sm font-bold text-text-primary">{item.titulo}</p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <Link
          href={href}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:shadow-md ${btnClass}`}
        >
          {leerMas} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
