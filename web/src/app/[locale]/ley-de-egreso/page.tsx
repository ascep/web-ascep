import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ImageCarousel from "@/components/ImageCarousel";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("leyDeEgreso.title"),
    description: t("leyDeEgreso.description"),
    openGraph: {
      description: t("leyDeEgreso.description"),
    },
  };
}

const objectives = ["obj1", "obj2", "obj3", "obj4", "obj5"] as const;

const targetGroups = ["dir1", "dir2", "dir3"] as const;
const extraGroups = ["dirExtra1", "dirExtra2"] as const;

const estableceItems = ["est1", "est2", "est3", "est4", "est5"] as const;

const implItems = ["impl1", "impl2", "impl3", "impl4", "impl5"] as const;

const papelEgresadosItems = ["pe1", "pe2", "pe3", "pe4", "pe5"] as const;

const papelASCEPItems = ["pa1", "pa2", "pa3", "pa4", "pa5", "pa6"] as const;

const sectionIcons: Record<string, string> = {
  queEs: "⚖️",
  objetivos: "🎯",
  dirigida: "👥",
  cambio: "🔄",
  implementacion: "🏛️",
  papelEgresados: "⭐",
  papelASCEP: "💜",
  proceso: "📜",
  participa: "🤝",
};

type KeyItem = {
  key: string;
  title: string;
  desc?: string;
  icon?: string;
};

export default async function LeyDeEgresoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "leyEgreso" });
  const pageData = await getPageContent("ley-egreso");

  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.leyEgreso.hero)}
        bgColor="bg-brand-orange"
        tag={localize(pageData?.hero?.tag, locale) || "LEY DE EGRESO"}
        title={localize(pageData?.hero?.title, locale) || "Ley"}
        highlight={localize(pageData?.hero?.highlight, locale) || "Hijos del Estado"}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("subtitle")}
      />

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.leyEgreso.context)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("galeriaTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("title")}
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <ImageCarousel
              images={[
                { src: assetPath(fotos.leyEgreso.gallery[0]) },
                { src: assetPath(fotos.leyEgreso.gallery[1]) },
                { src: assetPath(fotos.leyEgreso.gallery[2]) },
                { src: assetPath(fotos.leyEgreso.gallery[3]) },
                { src: assetPath(fotos.leyEgreso.gallery[4]) },
                { src: assetPath(fotos.leyEgreso.gallery[5]) },
                { src: assetPath(fotos.leyEgreso.gallery[6]) },
              ]}
              interval={5000}
            />
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div id="que-es" className="mb-20">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("queEsTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("queEs")}
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-8 shadow-sm transition-all hover:shadow-md">
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    {t("queEsDesc")}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="rounded-[10px] border-l-4 border-l-brand-orange bg-bg-card p-6 shadow-sm">
                    <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">
                      2479
                    </h4>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Ley aprobada por el Congreso de Colombia el 15 de julio de 2025
                    </p>
                  </div>
                  <div className="rounded-[10px] border-l-4 border-l-brand-secondary bg-bg-card p-6 shadow-sm">
                    <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">
                      "Hijos e Hijas del Estado"
                    </h4>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Nombre con el que se conoce esta ley que protege a los jovenes egresados del sistema de proteccion estatal
                    </p>
                  </div>
                  <div className="rounded-[10px] border-l-4 border-l-brand-purple bg-bg-card p-6 shadow-sm">
                    <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">
                      Programa Nacional de Acompanamiento Integral
                    </h4>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Crea el programa que brinda apoyo en educacion, empleo, vivienda y salud mental
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div id="objetivos" className="mb-20">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("objetivosTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("objetivos")}
              </h2>
            </AnimatedSection>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {objectives.map((key, i) => (
                <AnimatedSection key={key} direction="up" delay={i * 0.06}>
                  <div className="group flex h-full flex-col rounded-[10px] border border-brand-orange/20 bg-bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-md">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[8px] bg-brand-orange/10 text-lg font-bold text-brand-orange">
                      {i + 1}
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                      {t(key)}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.leyEgreso.context)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div id="establece" className="mb-16">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("establece")}
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {t("establece")}
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {estableceItems.map((key, i) => (
                  <AnimatedSection key={key} direction="up" delay={i * 0.06}>
                    <div className="glass-card flex h-full flex-col rounded-[10px] p-6 transition-all hover:bg-white/15">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10 text-lg font-bold text-brand-secondary">
                        {i + 1}
                      </div>
                      <h4 className="mb-2 text-base font-bold text-white">
                        {t(key)}
                      </h4>
                      <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {t(`${key}Desc`)}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <div id="dirigida" className="mb-16">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("dirigidaTag")}
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {t("dirigida")}
              </h2>
            </AnimatedSection>
            <div className="grid gap-6 sm:grid-cols-3">
              {targetGroups.map((key, i) => (
                <AnimatedSection key={key} direction="up" delay={i * 0.08}>
                  <div className="glass-card flex h-full flex-col items-center rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-white/10">
                      <span className="text-2xl font-bold text-brand-secondary">
                        {i + 1}
                      </span>
                    </div>
                    <div className="text-base font-bold text-white">{t(key)}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {extraGroups.map((key) => (
                <AnimatedSection key={key} direction="up">
                  <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                    <div className="mb-1 text-base font-bold text-white">
                      {t(key)}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {t(`${key}Desc`)}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div id="cambio">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("cambioTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("cambio")}
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="mb-6 rounded-[10px] border border-brand-orange/20 bg-bg-card p-8 shadow-sm">
                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  {t("cambioDesc")}
                </p>
              </div>
            </AnimatedSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-[10px] border-l-4 border-l-brand-primary bg-bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <h4 className="mb-2 font-bold text-[var(--color-text-primary)]">
                  ICBF
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                  El ICBF es la entidad responsable de formular, coordinar e implementar el Programa Nacional de Acompanamiento Integral para los jovenes egresados del sistema de proteccion estatal.
                </p>
              </div>
              <div className="rounded-[10px] border-l-4 border-l-brand-secondary bg-bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <h4 className="mb-2 font-bold text-[var(--color-text-primary)]">
                  Unidades de Acompanamiento al Egresado
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Equipos interdisciplinarios encargados de brindar apoyo personalizado a cada joven durante su transicion a la vida independiente, incluyendo orientacion psicologica, social y laboral.
                </p>
              </div>
              <div className="rounded-[10px] border-l-4 border-l-brand-orange bg-bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <h4 className="mb-2 font-bold text-[var(--color-text-primary)]">
                  Registro Nacional de Egresados
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Sistema de informacion que permite identificar, caracterizar y hacer seguimiento a los jovenes que egresan del sistema de proteccion, facilitando la articulacion de la oferta estatal.
                </p>
              </div>
              <div className="rounded-[10px] border-l-4 border-l-brand-yellow bg-bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <h4 className="mb-2 font-bold text-[var(--color-text-primary)]">
                  Subsidio Economico
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Asignacion economica mensual durante los primeros 6 meses posteriores al egreso, gestionada a traves del Departamento de Prosperidad Social (DPS), para garantizar una transicion segura.
                </p>
              </div>
              <div className="rounded-[10px] border-l-4 border-l-brand-purple bg-bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <h4 className="mb-2 font-bold text-[var(--color-text-primary)]">
                  Acceso Prioritario a Educacion y Empleo
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Cupos prioritarios en instituciones de educacion basica, media y superior (ICETEX, SENA), y en programas de empleo formal y emprendimiento del Gobierno Nacional.
                </p>
              </div>
              <div className="rounded-[10px] border-l-4 border-l-brand-secondary bg-bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <h4 className="mb-2 font-bold text-[var(--color-text-primary)]">
                  Redes de Apoyo Comunitario
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Participacion de organizaciones de la sociedad civil, sector privado, organizaciones religiosas y voluntariado en el fortalecimiento de redes de apoyo para los jovenes egresados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.leyEgreso.context)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div id="implementacion">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("implementacion")}
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {t("implementacion")}
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="glass-card mb-8 rounded-[10px] p-8">
                <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
                  {t("implementacionDesc")}
                </p>
              </div>
            </AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-2">
              {implItems.map((key, i) => (
                <AnimatedSection key={key} direction="up" delay={i * 0.06}>
                  <div className="glass-card flex items-start gap-4 rounded-[10px] p-5 transition-all hover:bg-white/15">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-white/10 text-sm font-bold text-brand-secondary">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {t(key)}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div id="papel-egresados">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("papelEgresados")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("papelEgresados")}
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="mb-8 rounded-[10px] border border-brand-orange/20 bg-bg-card p-8 shadow-sm">
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {t("papelEgresadosDesc")}
                </p>
              </div>
            </AnimatedSection>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {papelEgresadosItems.map((key, i) => (
                <AnimatedSection key={key} direction="up" delay={i * 0.06}>
                  <div className="flex h-full items-center rounded-[10px] bg-brand-orange p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="w-full">
                      <span className="mb-2 block text-xl font-bold text-white opacity-60">
                        0{i + 1}
                      </span>
                      <div className="text-base font-bold leading-snug text-white">
                        {t(key)}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.leyEgreso.context)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div id="papel-ascep">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("papelASCEP")}
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {t("papelASCEP")}
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="glass-card mb-8 rounded-[10px] p-8">
                <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
                  {t("papelASCEPDesc")}
                </p>
              </div>
            </AnimatedSection>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {papelASCEPItems.map((key, i) => (
                <AnimatedSection key={key} direction="up" delay={i * 0.06}>
                  <div className="glass-card flex h-full flex-col items-center justify-center rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10 text-sm font-bold text-brand-secondary">
                      {i + 1}
                    </span>
                    <div className="text-sm font-semibold text-white">
                      {t(key)}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div id="proceso">
              <AnimatedSection className="mb-8">
                <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                  {t("procesoTag")}
                </span>
                <h2 className="mb-6 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                  {t("proceso")}
                </h2>
              </AnimatedSection>
              <AnimatedSection>
                <div className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-8 shadow-sm">
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    {t("procesoDesc")}
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <div id="participa">
              <AnimatedSection className="mb-8">
                <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                  {t("participaTag")}
                </span>
                <h2 className="mb-6 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                  {t("participa")}
                </h2>
              </AnimatedSection>
              <AnimatedSection>
                <div className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-8 shadow-sm">
                  <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    {t("participaDesc")}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <AnimatedSection delay={0.2} className="mt-16">
            <div className="rounded-[10px] bg-brand-orange p-10 text-center shadow-sm transition-all hover:shadow-md">
              <h2 className="mb-4 text-3xl font-bold text-white">{t("cta")}</h2>
              <p className="mb-6 text-lg text-white/80">{t("ctaDesc")}</p>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLScg4IqA-YJ_5v97NQI1K2DZ1HDHoGmAVSeOvcH11iBB_7PbMw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[10px] bg-white px-8 py-3 font-semibold text-brand-orange transition-all hover:bg-white/90 hover:shadow-lg"
              >
                {t("cta")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}