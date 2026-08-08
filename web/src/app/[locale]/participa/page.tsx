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
      <DossierHero
        images={[
          sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.participa.hero),
          assetPath(fotos.participa.section),
          assetPath(fotos.impacto.gallery[1]),
        ]}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || ""}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
        accent="yellow"
        primaryCta={{ label: t("sectionTag"), href: "#formas" }}
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Users size={28} className="text-ley-yellow" />
            </div>
            <div>
              <p className="text-xl font-extrabold">{t("sectionTitle")}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-yellow">
                {t("sectionTag")}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-purple-100">
            {t("bannerDesc")}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
          >
            {t("ctaBtn")}
          </Link>
        </div>
      </DossierHero>

      <section id="formas" className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${assetPath(fotos.participa.section)})` } as CSSProperties}>
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
