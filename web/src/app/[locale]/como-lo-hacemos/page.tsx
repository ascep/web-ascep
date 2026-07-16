import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { User, Home, Zap } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { fotos } from "@/data/fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Como lo Hacemos - ASCEP",
  description:
    "Conoce la metodologia y el enfoque de ASCEP: conexion, formacion, programas e incidencia para transformar el sistema de proteccion estatal.",
  openGraph: {
    description:
      "Conoce la metodologia y el enfoque de ASCEP: conexion, formacion, programas e incidencia para transformar el sistema de proteccion estatal.",
  },
};

export default async function ComoLoHacemosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comoLoHacemos" });
  const pageData = await getPageContent("como-lo-hacemos");

  const strategies = [
    {
      title: t("estrategia1Title"),
      items: [
        t("estrategia1Item1"),
        t("estrategia1Item2"),
      ],
    },
    {
      title: t("estrategia2Title"),
      items: [
        t("estrategia2Item1"),
        t("estrategia2Item2"),
      ],
    },
    {
      title: t("estrategia3Title"),
      items: [
        t("estrategia3Item1"),
        t("estrategia3Item2"),
      ],
    },
    {
      title: t("estrategia4Title"),
      items: [
        t("estrategia4Item1"),
        t("estrategia4Item2"),
      ],
    },
  ];

  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath("/images/encuentro-2025/GIS06448.webp")}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </div>

          <div className="relative mb-12 overflow-hidden rounded-[10px]">
            <Image
              src={assetPath(fotos.comoLoHacemos.estrategiasImage)}
              alt=""
              width={1200}
              height={400}
              className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-purple/70" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="max-w-xl text-lg leading-relaxed text-white">
                {t("bannerDesc")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {strategies.map((strategy) => (
              <div key={strategy.title} className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md">
                <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{strategy.title}</h3>
                <ul className="space-y-2">
                  {strategy.items.map((item, i) => (
                    <li key={i} className="text-sm text-[var(--color-text-secondary)]">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("enfoqueTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("enfoqueTitle")}
            </h2>
          </div>

          <div className="relative mb-12 overflow-hidden rounded-[10px]">
            <Image
              src={assetPath("/images/eventos/20241112_092855.webp")}
              alt=""
              width={1200}
              height={300}
              className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-purple/70" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="max-w-xl text-sm leading-relaxed text-white/90">
                {t("enfoqueBanner")}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: t("enfoqueCard1Title"), desc: t("enfoqueCard1Desc"), icon: User },
              { title: t("enfoqueCard2Title"), desc: t("enfoqueCard2Desc"), icon: Home },
              { title: t("enfoqueCard3Title"), desc: t("enfoqueCard3Desc"), icon: Zap },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                    <Icon size={22} className="text-brand-purple" />
                  </div>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{item.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("dimensionesTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("dimensionesTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              {t("dimensionesDesc")}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: t("dim1Title"), desc: t("dim1Desc"), color: "border-brand-teal" },
              { title: t("dim2Title"), desc: t("dim2Desc"), color: "border-brand-orange" },
              { title: t("dim3Title"), desc: t("dim3Desc"), color: "border-brand-purple" },
              { title: t("dim4Title"), desc: t("dim4Desc"), color: "border-brand-yellow" },
              { title: t("dim5Title"), desc: t("dim5Desc"), color: "border-brand-teal" },
              { title: t("dim6Title"), desc: t("dim6Desc"), color: "border-brand-orange" },
            ].map((item) => (
              <div key={item.title} className={`rounded-[10px] border-l-4 ${item.color} bg-white p-6 shadow-sm transition-all hover:shadow-md`}>
                <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{item.title}</h4>
                <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        <section className="bg-brand-teal/5 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {t("lineasEstrategicasTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("lineasEstrategicasTitle")} <span className="text-brand-purple">{t("lineasEstrategicasHighlight")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
                {t("lineasEstrategicasDesc")}
              </p>
            </div>
            <div className="relative mb-10 overflow-hidden rounded-[10px]">
              <Image
                src={assetPath(fotos.comoLoHacemos.lineasImage)}
                alt=""
                width={1200}
                height={300}
                className="h-48 w-full object-cover"
              />
            </div>
            <div className="grid gap-6">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md">
                  <h3 className="mb-3 text-lg font-bold text-brand-purple">
                    {t(`le${n}Title`)}
                  </h3>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                        {t(`le${n}Item${item}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("galeriaTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("galeriaTitle")}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              assetPath("/images/encuentro-2025/GIS06453.webp"),
              assetPath("/images/equipo-shoot/GIS08543.webp"),
              assetPath("/images/equipo-shoot/GIS08540.webp"),
            ].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt=""
                width={600}
                height={400}
                className="h-56 w-full rounded-[10px] object-cover transition-transform duration-500 hover:scale-105"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
