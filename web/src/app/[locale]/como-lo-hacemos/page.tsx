import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";
import PageCTA from "@/components/PageCTA";
import LineasAccordion from "@/components/LineasAccordion";
import VideoFacade from "@/components/VideoFacade";
import WaveMask from "@/components/WaveMask";
import { homeVideos } from "@/data/homeVideos";
import type { CSSProperties, ReactNode } from "react";
import {
  User,
  Home,
  Zap,
  CheckCircle2,
  HeartHandshake,
  UsersRound,
  GraduationCap,
  ClipboardList,
  Landmark,
} from "lucide-react";
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

function SectionIntro({
  src,
  alt,
  children,
  dark = false,
  className = "",
}: {
  src: string;
  alt: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`grid items-center gap-8 lg:grid-cols-2 ${className}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div>{children}</div>
    </div>
  );
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
      items: [t("estrategia1Item1"), t("estrategia1Item2")],
      icon: UsersRound,
      iconClass: "bg-ley-teal/10 text-ley-teal",
    },
    {
      title: t("estrategia2Title"),
      items: [t("estrategia2Item1"), t("estrategia2Item2")],
      icon: GraduationCap,
      iconClass: "bg-ley-orange/10 text-ley-orange",
    },
    {
      title: t("estrategia3Title"),
      items: [t("estrategia3Item1"), t("estrategia3Item2")],
      icon: ClipboardList,
      iconClass: "bg-ley-cyan/10 text-ley-cyan",
    },
    {
      title: t("estrategia4Title"),
      items: [t("estrategia4Item1"), t("estrategia4Item2")],
      icon: Landmark,
      iconClass: "bg-ley-yellow/10 text-ley-yellow",
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

  const lineas = [
    { title: t("le1Title"), items: [t("le1Item1"), t("le1Item2"), t("le1Item3")] },
    { title: t("le2Title"), items: [t("le2Item1"), t("le2Item2"), t("le2Item3")] },
    { title: t("le3Title"), items: [t("le3Item1"), t("le3Item2"), t("le3Item3")] },
    { title: t("le4Title"), items: [t("le4Item1"), t("le4Item2"), t("le4Item3")] },
    { title: t("le5Title"), items: [t("le5Item1"), t("le5Item2"), t("le5Item3")] },
  ];

  const galeria = fotos.impacto.gallery.slice(0, 8);
  const heroImage = sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.comoLoHacemos.hero);

  return (
    <div>
      {/* Hero visual */}
      <div className="relative h-[50vh] overflow-hidden bg-ley-cyan sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${heroImage}")` }}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,16,32,0.45) 0%, transparent 50%)" }}
        />
      </div>

      {/* Hero text below */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={assetPath(fotos.comoLoHacemos.estrategiasImage)}
                  alt={t("heroTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {localize(pageData?.hero?.tag, locale) || t("heroTag")}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
                {localize(pageData?.hero?.title, locale) || t("heroTitle")}{" "}
                <span className="text-brand-primary">
                  {localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
                </span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#estrategias"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-primary px-7 py-3 text-sm font-bold text-white transition-all hover:bg-brand-primary-dark hover:shadow-lg"
                >
                  {t("sectionTag")}
                </Link>
                <Link
                  href={`/${locale}/como-ayudar`}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-primary/30 px-7 py-3 text-sm font-bold text-brand-primary transition-all hover:border-brand-primary/60 hover:bg-brand-primary/5"
                >
                  {t("ctaBtn")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="estrategias" className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("sectionTag")}
            title={t("sectionTitle")}
            accent="cyan"
          />

          <SectionIntro
            src={assetPath(fotos.comoLoHacemos.estrategiasImage)}
            alt={t("sectionTitle")}
            className="mt-12 mb-12"
          >
            <p className="text-lg leading-relaxed text-text-secondary">
              {t("bannerDesc")}
            </p>
          </SectionIntro>

          <div className="grid gap-6 sm:grid-cols-2">
            {strategies.map((strategy, i) => {
              const Icon = strategy.icon;
              return (
                <AnimatedSection key={strategy.title} direction="up" delay={i * 0.08}>
                  <div className="h-full rounded-3xl border border-border-subtle bg-white p-6">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${strategy.iconClass}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-[var(--color-text-primary)]">{strategy.title}</h3>
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-brand-primary py-16 sm:py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.comoLoHacemos.lineasImage)})` } as CSSProperties}>
        <WaveMask fill="#FFFFFF" flip />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("enfoqueTag")}
            title={t("enfoqueTitle")}
            accent="white"
            dark
          />

          {homeVideos.transformando ? (
            <AnimatedSection delay={0.1} className="mx-auto mt-12 max-w-3xl">
              <VideoFacade
                youtubeId={homeVideos.transformando}
                title={t("enfoqueTitle")}
              />
            </AnimatedSection>
          ) : (
            <>
              <SectionIntro
                src={assetPath(fotos.comoLoHacemos.estrategiasGallery[0])}
                alt={t("enfoqueTitle")}
                dark
                className="mt-12 mb-12"
              >
                <p className="text-lg leading-relaxed text-purple-100">
                  {t("enfoqueBanner")}
                </p>
              </SectionIntro>

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
            </>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <WaveMask fill="#800080" flip />
        <DecoShapes variant="orange" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("dimensionesTag")}
            title={t("dimensionesTitle")}
            desc={t("dimensionesDesc")}
            accent="cyan"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dimensiones.map((item, i) => {
              const accent = dimensionAccents[i % dimensionAccents.length];
              return (
                <AnimatedSection key={item.title} direction="up" delay={i * 0.06}>
                  <div className="h-full rounded-3xl border border-border-subtle bg-white p-6">
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${accent.bg}`}>
                      <span className={`text-sm font-bold ${accent.icon}`}>{String(i + 1).padStart(2, "0")}</span>
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

      <section className="section-dark section-bg-image relative overflow-hidden bg-brand-primary py-16 sm:py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.comoLoHacemos.estrategiasImage)})` } as CSSProperties}>
        <WaveMask fill="#FFFFFF" flip />
        <DecoShapes variant="teal" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("lineasEstrategicasTag")}
            title={t("lineasEstrategicasTitle")}
            highlight={t("lineasEstrategicasHighlight")}
            accent="white"
            dark
          />
          <SectionIntro
            src={assetPath(fotos.comoLoHacemos.lineasImage)}
            alt={t("lineasEstrategicasTitle")}
            dark
            className="mt-12 mb-10"
          >
            <p className="text-lg leading-relaxed text-purple-100">
              {t("lineasEstrategicasDesc")}
            </p>
          </SectionIntro>
          <div className="mx-auto max-w-4xl">
            <LineasAccordion items={lineas} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <WaveMask fill="#800080" flip />
        <DecoShapes variant="teal" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("galeriaTag")}
            title={t("galeriaTitle")}
            desc={t("galeriaDesc")}
            accent="cyan"
          />
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galeria.map((src, i) => (
              <AnimatedSection key={`${src}-${i}`} direction="up" delay={i * 0.06} className="mb-4 break-inside-avoid">
                <div className="group relative overflow-hidden rounded-3xl">
                  <Image
                    src={assetPath(src)}
                    alt={t("galeriaTitle")}
                    width={600}
                    height={400}
                    className="w-full rounded-3xl object-cover"
                  />
                </div>
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
