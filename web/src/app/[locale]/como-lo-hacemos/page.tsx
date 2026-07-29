import { getTranslations } from "next-intl/server";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import AnimatedSection from "@/components/AnimatedSection";
import type { CSSProperties } from "react";
import { User, Home, Zap } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("comoLoHacemos.title"),
    description: t("comoLoHacemos.description"),
    openGraph: {
      description: t("comoLoHacemos.description"),
    },
  };
}

export default async function ComoLoHacemosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
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
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.comoLoHacemos.hero)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </AnimatedSection>

          <div className="relative mb-12 overflow-hidden rounded-[10px]">
            <ImageParallax
              src={assetPath(fotos.comoLoHacemos.estrategiasImage)}
              alt=""
              width={1200}
              height={400}
              className="h-64 w-full object-cover"
              intensity={0.15}
            />
            <div className="absolute inset-0 bg-brand-purple/70" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="max-w-xl text-lg leading-relaxed text-white">
                {t("bannerDesc")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {strategies.map((strategy, i) => (
              <AnimatedSection key={strategy.title} direction="up" delay={i * 0.08}>
                <div className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md">
                  <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{strategy.title}</h3>
                  <ul className="space-y-2">
                    {strategy.items.map((item, j) => (
                      <li key={j} className="text-sm text-[var(--color-text-secondary)]">{item}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

        <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.comoLoHacemos.lineasImage)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("enfoqueTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("enfoqueTitle")}
            </h2>
          </AnimatedSection>

          <div className="relative mb-12 overflow-hidden rounded-[10px]">
            <ImageParallax
              src={assetPath(fotos.aliados.hero)}
              alt=""
              width={1200}
              height={300}
              className="h-48 w-full object-cover"
              intensity={0.12}
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
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} direction="up" delay={i * 0.1}>
                  <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                      <Icon size={22} className="text-brand-secondary" />
                    </div>
                    <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{item.title}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("dimensionesTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("dimensionesTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              {t("dimensionesDesc")}
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: t("dim1Title"), desc: t("dim1Desc"), color: "border-brand-teal" },
              { title: t("dim2Title"), desc: t("dim2Desc"), color: "border-brand-orange" },
              { title: t("dim3Title"), desc: t("dim3Desc"), color: "border-brand-purple" },
              { title: t("dim4Title"), desc: t("dim4Desc"), color: "border-brand-yellow" },
              { title: t("dim5Title"), desc: t("dim5Desc"), color: "border-brand-teal" },
              { title: t("dim6Title"), desc: t("dim6Desc"), color: "border-brand-orange" },
            ].map((item, i) => (
              <AnimatedSection key={item.title} direction="up" delay={i * 0.06}>
                <div className={`rounded-[10px] border-l-4 ${item.color} bg-white p-6 shadow-sm transition-all hover:shadow-md`}>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{item.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          </div>
        </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.comoLoHacemos.estrategiasImage)})` } as CSSProperties}>
          <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
          <DecoShapes variant="teal" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("lineasEstrategicasTag")}
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {t("lineasEstrategicasTitle")} <span className="text-white/80">{t("lineasEstrategicasHighlight")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                {t("lineasEstrategicasDesc")}
              </p>
            </AnimatedSection>
            <AnimatedSection className="relative mb-10 overflow-hidden rounded-[10px]">
              <ImageParallax
                src={assetPath(fotos.comoLoHacemos.lineasImage)}
                alt=""
                width={1200}
                height={300}
                className="h-48 w-full object-cover"
                intensity={0.12}
              />
            </AnimatedSection>
            <div className="grid gap-6">
              {[1, 2, 3, 4, 5].map((n, i) => (
                <AnimatedSection key={n} direction="up" delay={i * 0.06}>
                  <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                    <h3 className="mb-3 text-lg font-bold text-white">
                      {t(`le${n}Title`)}
                    </h3>
                    <ul className="space-y-2">
                      {[1, 2, 3].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                          {t(`le${n}Item${item}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("galeriaTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("galeriaTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              assetPath(fotos.comoLoHacemos.estrategiasGallery[0]),
              assetPath(fotos.comoLoHacemos.estrategiasGallery[1]),
              assetPath(fotos.comoLoHacemos.estrategiasGallery[2]),
            ].map((src, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <ImageParallax
                  key={i}
                  src={src}
                  alt=""
                  width={600}
                  height={400}
                  className="h-56 w-full rounded-[10px] object-cover"
                  intensity={0.12}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


