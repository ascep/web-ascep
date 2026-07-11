import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ImageCarousel from "@/components/ImageCarousel";

export const metadata: Metadata = {
  title: "Ley Hijos del Estado - ASCEP",
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

  return (
    <div>
      <PageHero
        bgImage="/images/eventos/20241112_111016.jpg"
        bgColor="bg-brand-orange"
        tag="LEY DE EGRESO"
        title="Ley"
        highlight="Hijos del Estado"
        subtitle={t("subtitle")}
      />

      <section className="bg-bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              GALERIA
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("title")}
            </h2>
          </div>
          <ImageCarousel
            images={[
              { src: "/images/ley-egreso/1.png" },
              { src: "/images/ley-egreso/2.png" },
              { src: "/images/ley-egreso/3.png" },
              { src: "/images/ley-egreso/4.png" },
              { src: "/images/ley-egreso/5.png" },
              { src: "/images/ley-egreso/7.png" },
              { src: "/images/ley-egreso/8.png" },
            ]}
            interval={5000}
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div id="que-es" className="mb-16">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              QUE ES
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("queEs")}
            </h2>
          </div>
          <div className="rounded-[10px] bg-bg-card p-8 shadow-sm">
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t("queEsDesc")}
            </p>
          </div>
        </div>

        <div id="objetivos" className="mb-16">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              OBJETIVOS
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("objetivos")}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {objectives.map((key) => (
              <div
                key={key}
                className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-6 transition-all hover:shadow-md"
              >
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t(key)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="establece" className="mb-16">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("establece")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("establece")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {estableceItems.map((key) => (
              <div
                key={key}
                className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-6 transition-all hover:shadow-md"
              >
                <div className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">
                  {t(key)}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t(`${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="dirigida" className="mb-16">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              DIRIGIDA A
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("dirigida")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {targetGroups.map((key, i) => (
              <div
                key={key}
                className="rounded-[10px] bg-brand-orange p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-[10px] bg-white/10">
                  <span className="text-2xl font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <div className="text-lg font-bold text-white">{t(key)}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {extraGroups.map((key) => (
              <div
                key={key}
                className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-6 transition-all hover:shadow-md"
              >
                <div className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
                  {t(key)}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t(`${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="cambio" className="mb-16">
          <div className="relative mb-8 overflow-hidden rounded-[10px]">
            <Image
              src="/images/eventos/20241112_103406.jpg"
              alt=""
              width={1200}
              height={300}
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-orange/70" />
            <div className="absolute inset-0 flex items-center p-8">
              <div>
                <span className="mb-2 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  EL CAMBIO
                </span>
                <h2 className="mb-2 text-3xl font-bold text-white">{t("cambio")}</h2>
                <p className="max-w-3xl text-lg leading-relaxed text-white/80">
                  {t("cambioDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="implementacion" className="mb-16">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("implementacion")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("implementacion")}
            </h2>
          </div>
          <div className="mb-6 rounded-[10px] bg-bg-card p-8 shadow-sm">
            <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
              {t("implementacionDesc")}
            </p>
          </div>
          <div className="space-y-3">
            {implItems.map((key) => (
              <div
                key={key}
                className="flex items-start gap-3 rounded-[10px] border border-brand-orange/20 bg-bg-card p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                  <span className="h-2 w-2 rounded-full bg-brand-orange" />
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {t(key)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div id="papel-egresados" className="mb-16">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("papelEgresados")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("papelEgresados")}
            </h2>
          </div>
          <div className="mb-6 rounded-[10px] bg-bg-card p-8 shadow-sm">
            <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
              {t("papelEgresadosDesc")}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {papelEgresadosItems.map((key) => (
              <div
                key={key}
                className="rounded-[10px] bg-brand-orange p-5 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="text-base font-bold text-white">{t(key)}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="papel-ascep" className="mb-16">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("papelASCEP")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("papelASCEP")}
            </h2>
          </div>
          <div className="mb-6 rounded-[10px] bg-bg-card p-8 shadow-sm">
            <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
              {t("papelASCEPDesc")}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {papelASCEPItems.map((key) => (
              <div
                key={key}
                className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-5 text-center transition-all hover:shadow-md"
              >
                <div className="px-3 py-1 text-sm font-semibold text-brand-orange">
                  {t(key)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="proceso" className="mb-16">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              PROCESO
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("proceso")}
            </h2>
          </div>
          <div className="rounded-[10px] bg-bg-card p-8 shadow-sm">
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t("procesoDesc")}
            </p>
          </div>
        </div>

        <div id="participa" className="mb-16">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              PARTICIPA
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("participa")}
            </h2>
          </div>
          <div className="rounded-[10px] bg-bg-card p-8 shadow-sm">
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t("participaDesc")}
            </p>
          </div>
        </div>

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
      </section>
    </div>
  );
}
