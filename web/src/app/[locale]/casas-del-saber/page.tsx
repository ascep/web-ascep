import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import CasasHero from "./CasasHero";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import AnimatedSection from "@/components/AnimatedSection";
import { Home, Layers, BookOpen, Compass, Users, Heart, Star, Target } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { casasDelSaberGallery, casasDelSaberHeroImages } from "@/data/casas-del-saber-photos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("casasDelSaber.title"),
    description: t("casasDelSaber.description"),
    openGraph: {
      description: t("casasDelSaber.description"),
    },
  };
}

export default async function CasasDelSaberPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaber" });

  const slides = [
    { tag: t("heroSlide1Tag"), title: t("heroSlide1Title"), desc: t("heroSlide1Desc") },
    { tag: t("heroSlide2Tag"), title: t("heroSlide2Title"), desc: t("heroSlide2Desc") },
    { tag: t("heroSlide3Tag"), title: t("heroSlide3Title"), desc: t("heroSlide3Desc") },
  ];

  const sections = [
    {
      title: t("seccion1Title"),
      href: "modalidades",
      desc: t("seccion1Desc"),
      icon: Home,
    },
    {
      title: t("seccion2Title"),
      href: "areas",
      desc: t("seccion2Desc"),
      icon: Layers,
    },
    {
      title: t("seccion3Title"),
      href: "lineas",
      desc: t("seccion3Desc"),
      icon: BookOpen,
    },
    {
      title: t("seccion4Title"),
      href: "ruta-egreso",
      desc: t("seccion4Desc"),
      icon: Compass,
    },
  ];

  const roles = [
    { title: t("role1Title"), desc: t("role1Desc"), icon: Home },
    { title: t("role2Title"), desc: t("role2Desc"), icon: BookOpen },
    { title: t("role3Title"), desc: t("role3Desc"), icon: Users },
    { title: t("role4Title"), desc: t("role4Desc"), icon: Heart },
    { title: t("role5Title"), desc: t("role5Desc"), icon: Star },
    { title: t("role6Title"), desc: t("role6Desc"), icon: Target },
  ];

  return (
    <div>
      <CasasHero
        slides={slides}
        images={casasDelSaberHeroImages.map(assetPath)}
        ctaLabel={t("heroCta")}
        ctaHref={`/${locale}/casas-del-saber/modalidades`}
        secondaryLabel={t("heroSecondary")}
        secondaryHref={`/${locale}/casas-del-saber/ruta-egreso`}
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <AnimatedSection key={section.href} direction="up" delay={i * 0.08}>
                  <Link href={`/${locale}/casas-del-saber/${section.href}`}>
                    <div className="group h-full rounded-[10px] border border-[var(--color-border-subtle)] bg-bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-purple/10">
                        <Icon size={20} className="text-brand-purple" />
                      </div>
                      <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{section.title}</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">{section.desc}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20"
        style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.hero)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("propositoTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("propositoTitle")}
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <blockquote className="mx-auto max-w-4xl text-center text-lg font-medium italic leading-relaxed text-white sm:text-xl">
              {t("quote")}
            </blockquote>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-white/75">
              {t("objetivoDesc")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section
        className="section-bg-image relative overflow-hidden bg-purple-bg py-20"
        style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.hero)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("estructuraTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("estructuraTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, i) => {
              const Icon = role.icon;
              return (
                <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                  <div className="glass-card h-full rounded-[10px] p-6 transition-all hover:bg-white/15">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                      <Icon size={22} className="text-ley-teal" />
                    </div>
                    <h3 className="mb-2 font-bold text-white">{role.title}</h3>
                    <p className="text-sm leading-relaxed text-white/70">{role.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {casasDelSaberGallery.length > 0 && (
        <section className="relative overflow-hidden bg-section-light py-20">
          <DecoShapes variant="orange" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {t("galeriaTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("galeriaTitle")}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[var(--color-text-muted)]">
                {t("galeriaDesc")}
              </p>
            </AnimatedSection>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {casasDelSaberGallery.map((src, i) => (
                <AnimatedSection key={src} direction="up" delay={i * 0.03}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                    <Image
                      src={assetPath(src)}
                      alt="Casas del Saber"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-brand-purple py-20">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-teal/10" />
        <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-brand-orange/10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("ctaTag")}
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/donar`}
                className="inline-flex items-center gap-2 rounded-[10px] bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 hover:shadow-lg"
              >
                {t("ctaPrimary")}
              </Link>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center rounded-[10px] border-2 border-white/40 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-white/70 hover:bg-white/10"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
