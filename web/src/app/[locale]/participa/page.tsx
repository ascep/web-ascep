import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import Link from "next/link";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import PageCTA from "@/components/PageCTA";
import { Users, HeartHandshake, Handshake, DollarSign, CheckCircle2 } from "lucide-react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";
import { homeVideos } from "@/data/homeVideos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("participa.title"),
    description: t("participa.description"),
    openGraph: {
      description: t("participa.description"),
    },
  };
}

const wayStyles = [
  { icon: Users, iconColor: "bg-ley-yellow/15 text-ley-yellow" },
  { icon: HeartHandshake, iconColor: "bg-ley-teal/15 text-ley-teal" },
  { icon: Handshake, iconColor: "bg-ley-cyan/15 text-ley-cyan" },
  { icon: DollarSign, iconColor: "bg-ley-orange/15 text-ley-orange" },
];

export default async function ParticipaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "participa" });
  const pageData = await getPageContent("participa");
  return (
    <div>
      {/* Hero — visual only */}
      <div className="relative h-[50vh] overflow-hidden bg-ley-yellow sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        <div aria-hidden="true" className="absolute inset-0">
          {homeVideos.pages.participa.hero ? (
            <video
              src={homeVideos.pages.participa.hero}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${assetPath(fotos.participa.hero)}")` }}
            />
          )}
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
                <ImageParallax
                  src={assetPath(fotos.participa.section)}
                  alt={t("heroTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-full border border-brand-yellow/30 bg-brand-yellow/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">
                {t("heroTag")}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
                {t("heroTitle")} <span className="text-brand-yellow">{t("sectionTag")}</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {t("heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#formas" className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-yellow px-7 py-3 text-sm font-bold text-[var(--color-text-primary)] transition-all hover:bg-brand-yellow/90 hover:shadow-lg">
                  {t("sectionTag")}
                </a>
                <Link href={`/${locale}/contacto`} className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-yellow/30 px-7 py-3 text-sm font-bold text-brand-yellow transition-all hover:border-brand-yellow/60 hover:bg-brand-yellow/5">
                  {t("ctaBtn")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="formas" className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${assetPath(fotos.participa.section)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("sectionTag")}
            title={t("sectionTitle")}
            accent="white"
            dark
          />

          <AnimatedSection direction="up" className="mb-12">
            <div className="relative overflow-hidden rounded-3xl">
              <ImageParallax
                src={assetPath(fotos.participa.section)}
                alt=""
                width={1200}
                height={300}
                className="h-48 w-full object-cover"
                intensity={0.1}
              />
              <div className="absolute inset-0 bg-ley-teal/70" />
              <div className="absolute inset-0 flex items-center p-8">
                <p className="max-w-2xl text-lg leading-relaxed text-white">
                  {t("bannerDesc")}
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((n, i) => {
              const style = wayStyles[i % wayStyles.length];
              const Icon = style.icon;
              return (
                <AnimatedSection key={n} direction="up" delay={i * 0.08}>
                  <div className="glass-card flex h-full flex-col rounded-3xl p-6 transition-all hover:bg-white/15">
                    <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${style.iconColor}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="mb-1 font-bold text-white">{t(`way${n}Title`)}</h3>
                    <p className="mb-4 text-sm text-[var(--color-text-muted)]">{t(`way${n}Desc`)}</p>
                    <ul className="mt-auto space-y-1">
                      {[1, 2, 3].map((j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-ley-yellow" />
                          {t(`way${n}Item${j}`)}
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

      <PageCTA
        title={t("ctaTitle")}
        desc={t("ctaDesc")}
        icon={Users}
        primary={{ label: t("ctaBtn"), href: `/${locale}/contacto` }}
      />
    </div>
  );
}
