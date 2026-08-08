import { getTranslations } from "next-intl/server";
import Link from "next/link";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import AnimatedSection from "@/components/AnimatedSection";
import PageCTA from "@/components/PageCTA";
import type { CSSProperties } from "react";
import { User, Home, Zap, CheckCircle2, HeartHandshake } from "lucide-react";
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

const dimensionAccents = [
  { icon: "text-ley-teal", bg: "bg-ley-teal/10" },
  { icon: "text-ley-orange", bg: "bg-ley-orange/10" },
  { icon: "text-ley-cyan", bg: "bg-ley-cyan/10" },
  { icon: "text-ley-yellow", bg: "bg-ley-yellow/10" },
  { icon: "text-ley-teal", bg: "bg-ley-teal/10" },
  { icon: "text-ley-orange", bg: "bg-ley-orange/10" },
];

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
      items: [t("estrategia1Item1"), t("estrategia1Item2")],
    },
    {
      title: t("estrategia2Title"),
      items: [t("estrategia2Item1"), t("estrategia2Item2")],
    },
    {
      title: t("estrategia3Title"),
      items: [t("estrategia3Item1"), t("estrategia3Item2")],
    },
    {
      title: t("estrategia4Title"),
      items: [t("estrategia4Item1"), t("estrategia4Item2")],
    },
  ];

  const enfoqueCards = [
    { title: t("enfoqueCard1Title"), desc: t("enfoqueCard1Desc"), icon: User, iconColor: "bg-ley-cyan/15 text-ley-cyan" },
    { title: t("enfoqueCard2Title"), desc: t("enfoqueCard2Desc"), icon: Home, iconColor: "bg-ley-teal/15 text-ley-teal" },
    { title: t("enfoqueCard3Title"), desc: t("enfoqueCard3Desc"), icon: Zap, iconColor: "bg-ley-yellow/15 text-ley-yellow" },
  ];

  const dimensiones = [
    { title: t("dim1Title"), desc: t("dim1Desc") },
    { title: t("dim2Title"), desc: t("dim2Desc") },
    { title: t("dim3Title"), desc: t("dim3Desc") },
    { title: t("dim4Title"), desc: t("dim4Desc") },
    { title: t("dim5Title"), desc: t("dim5Desc") },
    { title: t("dim6Title"), desc: t("dim6Desc") },
  ];

  return (
    <div>
      <DossierHero
        images={[
          sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.comoLoHacemos.hero),
          assetPath(fotos.comoLoHacemos.estrategiasImage),
          assetPath(fotos.comoLoHacemos.lineasImage),
        ]}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
        accent="cyan"
        primaryCta={{ label: t("sectionTag"), href: "#estrategias" }}
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Zap size={28} className="text-ley-cyan" />
            </div>
            <div>
              <p className="text-xl font-extrabold">{t("enfoqueTitle")}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-cyan">
                {t("dimensionesTag")}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-purple-100">
            {t("dimensionesDesc")}
          </p>
          <Link
            href={`/${locale}/como-ayudar`}
            className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
          >
            {t("ctaBtn")}
          </Link>
        </div>
      </DossierHero>

      <section id="estrategias" className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("sectionTag")}
            title={t("sectionTitle")}
            accent="cyan"
          />

          <div className="relative mb-12 overflow-hidden rounded-3xl">
            <ImageParallax
              src={assetPath(fotos.comoLoHacemos.estrategiasImage)}
              alt=""
              width={1200}
              height={400}
              className="h-64 w-full object-cover"
              intensity={0.15}
            />
            <div className="absolute inset-0 bg-ley-purple/70" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="max-w-xl text-lg leading-relaxed text-white">
                {t("bannerDesc")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {strategies.map((strategy, i) => (
              <AnimatedSection key={strategy.title} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-border-default bg-white p-6 transition-all hover:-translate-y-1 hover:border-ley-cyan/40 hover:shadow-md">
                  <h3 className="mb-3 font-bold text-[var(--color-text-primary)]">{strategy.title}</h3>
                  <ul className="space-y-2">
                    {strategy.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-ley-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${assetPath(fotos.comoLoHacemos.lineasImage)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("enfoqueTag")}
            title={t("enfoqueTitle")}
            accent="white"
            dark
          />

          <div className="relative mb-12 overflow-hidden rounded-3xl">
            <ImageParallax
              src={assetPath(fotos.aliados.hero)}
              alt=""
              width={1200}
              height={300}
              className="h-48 w-full object-cover"
              intensity={0.12}
            />
            <div className="absolute inset-0 bg-ley-purple/70" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="max-w-xl text-sm leading-relaxed text-white/90">
                {t("enfoqueBanner")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {enfoqueCards.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} direction="up" delay={i * 0.1}>
                  <div className="glass-card h-full rounded-3xl p-6 text-center transition-all hover:bg-white/15">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconColor}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="mb-1 font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("dimensionesTag")}
            title={t("dimensionesTitle")}
            desc={t("dimensionesDesc")}
            accent="cyan"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dimensiones.map((item, i) => {
              const accent = dimensionAccents[i % dimensionAccents.length];
              return (
                <AnimatedSection key={item.title} direction="up" delay={i * 0.06}>
                  <div className="h-full rounded-3xl border border-border-default bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-ley-cyan/40 hover:shadow-md">
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${accent.bg}`}>
                      <CheckCircle2 size={18} className={accent.icon} />
                    </div>
                    <h3 className="mb-1 font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${assetPath(fotos.comoLoHacemos.estrategiasImage)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("lineasEstrategicasTag")}
            title={t("lineasEstrategicasTitle")}
            highlight={t("lineasEstrategicasHighlight")}
            desc={t("lineasEstrategicasDesc")}
            accent="white"
            dark
          />
          <div className="relative mb-10 overflow-hidden rounded-3xl">
            <ImageParallax
              src={assetPath(fotos.comoLoHacemos.lineasImage)}
              alt=""
              width={1200}
              height={300}
              className="h-48 w-full object-cover"
              intensity={0.12}
            />
          </div>
          <div className="grid gap-6">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <AnimatedSection key={n} direction="up" delay={i * 0.06}>
                <div className="glass-card rounded-3xl p-6 transition-all hover:bg-white/15">
                  <h3 className="mb-3 text-lg font-bold text-white">
                    {t(`le${n}Title`)}
                  </h3>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-ley-cyan" />
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

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("galeriaTag")}
            title={t("galeriaTitle")}
            accent="cyan"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              assetPath(fotos.comoLoHacemos.estrategiasGallery[0]),
              assetPath(fotos.comoLoHacemos.estrategiasGallery[1]),
              assetPath(fotos.comoLoHacemos.estrategiasGallery[2]),
            ].map((src, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <ImageParallax
                  src={src}
                  alt=""
                  width={600}
                  height={400}
                  className="h-56 w-full rounded-3xl object-cover"
                  intensity={0.12}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title={t("ctaTitle")}
        desc={t("ctaDesc")}
        icon={HeartHandshake}
        primary={{ label: t("ctaBtn"), href: `/${locale}/como-ayudar` }}
      />
    </div>
  );
}
