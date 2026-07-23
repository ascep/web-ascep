import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ImageCarousel from "@/components/ImageCarousel";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import { assetPath } from "@/lib/asset-path"
import { fotos } from "@/data/fotos";;
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Ley Hijos del Estado - ASCEP",
  description:
    "Ley 2479 de 2025: crea el Programa Nacional de Acompanamiento Integral al Egresado del ICBF. Un paso hacia la autonomia de los jovenes en proteccion.",
  openGraph: {
    description:
      "Ley 2479 de 2025: crea el Programa Nacional de Acompanamiento Integral al Egresado del ICBF. Un paso hacia la autonomia de los jovenes en proteccion.",
  },
};

const objectives = [
  "obj1",
  "obj2",
  "obj3",
  "obj4",
  "obj5",
] as const;

const targetGroups = ["dir1", "dir2", "dir3"] as const;
const extraGroups = ["dirExtra1", "dirExtra2"] as const;

const estableceItems = ["est1", "est2", "est3", "est4", "est5"] as const;

const implItems = ["impl1", "impl2", "impl3", "impl4", "impl5"] as const;

const papelEgresadosItems = ["pe1", "pe2", "pe3", "pe4", "pe5"] as const;

const papelASCEPItems = ["pa1", "pa2", "pa3", "pa4", "pa5", "pa6"] as const;

export default async function LeyDeEgresoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div id="que-es" className="mb-16">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("queEsTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("queEs")}
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-8 shadow-sm">
                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  {t("queEsDesc")}
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div id="objetivos" className="mb-16">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("objetivosTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("objetivos")}
              </h2>
            </AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-2">
              {objectives.map((key, i) => (
                <AnimatedSection key={key} direction="up" delay={i * 0.06}>
                  <div className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-6 transition-all hover:shadow-md">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {t(key)}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div id="establece" className="mb-16">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("establece")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("establece")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {estableceItems.map((key, i) => (
              <AnimatedSection key={key} direction="up" delay={i * 0.06}>
                <div className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-6 transition-all hover:shadow-md">
                  <div className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">
                    {t(key)}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.leyEgreso.context)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div id="dirigida">
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
                  <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-[10px] bg-white/10">
                      <span className="text-2xl font-bold text-brand-secondary">
                        {i + 1}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-[var(--color-text-primary)]">{t(key)}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {extraGroups.map((key) => (
                <AnimatedSection key={key} direction="up">
                  <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                    <div className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div id="cambio">
            <AnimatedSection>
              <div className="relative mb-8 overflow-hidden rounded-[10px]">
                <ImageParallax
                  src={assetPath(fotos.leyEgreso.context)}
                  alt=""
                  width={1200}
                  height={300}
                  className="h-48 w-full object-cover"
                  intensity={0.1}
                />
                <div className="absolute inset-0 bg-brand-orange/70" />
                <div className="absolute inset-0 flex items-center p-8">
                  <div>
                    <span className="mb-2 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      {t("cambioTag")}
                    </span>
                    <h2 className="mb-2 text-3xl font-bold text-white">{t("cambio")}</h2>
                    <p className="max-w-3xl text-lg leading-relaxed text-white/80">
                      {t("cambioDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.leyEgreso.context)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
              <div className="glass-card mb-6 rounded-[10px] p-8 transition-all hover:bg-white/15">
                <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
                  {t("implementacionDesc")}
                </p>
              </div>
            </AnimatedSection>
            <div className="space-y-3">
              {implItems.map((key) => (
                <AnimatedSection key={key} direction="up">
                  <div className="glass-card flex items-start gap-3 rounded-[10px] p-4 transition-all hover:bg-white/15">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <span className="h-2 w-2 rounded-full bg-brand-secondary" />
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
              <div className="mb-6 rounded-[10px] border border-brand-orange/20 bg-bg-card p-8 shadow-sm">
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {t("papelEgresadosDesc")}
                </p>
              </div>
            </AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-2">
              {papelEgresadosItems.map((key) => (
                <AnimatedSection key={key} direction="up">
                  <div className="rounded-[10px] bg-brand-orange p-5 text-center shadow-sm transition-all hover:shadow-md">
                    <div className="text-base font-bold text-white">{t(key)}</div>
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
              <div className="glass-card mb-6 rounded-[10px] p-8 transition-all hover:bg-white/15">
                <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
                  {t("papelASCEPDesc")}
                </p>
              </div>
            </AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-3">
              {papelASCEPItems.map((key) => (
                <AnimatedSection key={key} direction="up">
                  <div className="glass-card rounded-[10px] p-5 text-center transition-all hover:bg-white/15">
                    <div className="px-3 py-1 text-sm font-semibold text-white">
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div id="proceso">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("procesoTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
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
            <AnimatedSection className="mb-12 mt-16 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("participaTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
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



