import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import { Users, HeartHandshake, Handshake, DollarSign } from "lucide-react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

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
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.participa.hero)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || ""}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.participa.section)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative mb-12 overflow-hidden rounded-[10px]">
              <ImageParallax
                src={assetPath(fotos.participa.section)}
                alt=""
                width={1200}
                height={300}
                className="h-48 w-full object-cover"
                intensity={0.1}
              />
              <div className="absolute inset-0 bg-brand-teal/70" />
              <div className="absolute inset-0 flex items-center p-8">
                <p className="max-w-2xl text-lg leading-relaxed text-white">
                  {t("bannerDesc")}
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: Users, color: "text-brand-secondary", bg: "bg-white/10" },
              { icon: HeartHandshake, color: "text-brand-secondary", bg: "bg-white/10" },
              { icon: Handshake, color: "text-brand-secondary", bg: "bg-white/10" },
              { icon: DollarSign, color: "text-brand-secondary", bg: "bg-white/10" },
            ].map((way, i) => {
              const Icon = way.icon;
              const n = i + 1;
              return (
                <AnimatedSection key={n} direction="up" delay={i * 0.08}>
                  <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] ${way.bg}`}>
                      <Icon size={22} className={way.color} />
                    </div>
                    <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{t(`way${n}Title`)}</h4>
                    <p className="mb-4 text-sm text-[var(--color-text-muted)]">{t(`way${n}Desc`)}</p>
                    <ul className="space-y-1">
                      {[1, 2, 3].map((j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/20" />
                          {t(`way${n}Item${j}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={0.2} className="mt-16">
            <div className="rounded-[10px] bg-brand-purple p-8 text-center text-white">
              <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
              <p className="mb-6 text-white/80">
                {t("ctaDesc")}
              </p>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-white/90"
              >
                {t("ctaBtn")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}



