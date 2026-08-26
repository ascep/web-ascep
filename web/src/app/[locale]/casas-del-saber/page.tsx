import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import CasasHero from "./CasasHero";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import AnimatedSection from "@/components/AnimatedSection";
import ImageParallax from "@/components/ImageParallax";
import VideoFacade from "@/components/VideoFacade";
import { Home, Layers, BookOpen, Compass, Users, Heart, Star, Target } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { homeVideos } from "@/data/homeVideos";

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
    { title: t("seccion1Title"), href: "modalidades", desc: t("seccion1Desc"), icon: Home },
    { title: t("seccion2Title"), href: "areas", desc: t("seccion2Desc"), icon: Layers },
    { title: t("seccion3Title"), href: "lineas", desc: t("seccion3Desc"), icon: BookOpen },
    { title: t("seccion4Title"), href: "ruta-egreso", desc: t("seccion4Desc"), icon: Compass },
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
      {/* 1. Hero — slideshow */}
      <CasasHero
        slides={slides}
        images={fotos.casasDelSaber.heroSlideshow.map(assetPath)}
        ctaLabel={t("heroCta")}
        ctaHref={`/${locale}/casas-del-saber/modalidades`}
        secondaryLabel={t("heroSecondary")}
        secondaryHref={`/${locale}/casas-del-saber/ruta-egreso`}
      />

      {/* 2. Que es Casas del Saber — 2 col */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {t("comoEsTag")}
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.25rem]">
                {t("comoEsTitle")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {t("comoEsDesc1")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {t("comoEsDesc2")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {t("comoEsDesc3")}
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-black text-brand-purple">{t("comoEsStat1")}</p>
                  <p className="mt-1 text-xs font-medium text-text-muted">{t("comoEsStat1Label")}</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-brand-orange">{t("comoEsStat2")}</p>
                  <p className="mt-1 text-xs font-medium text-text-muted">{t("comoEsStat2Label")}</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-brand-teal">{t("comoEsStat3")}</p>
                  <p className="mt-1 text-xs font-medium text-text-muted">{t("comoEsStat3Label")}</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <ImageParallax
                  src={assetPath(fotos.casasDelSaber.hero)}
                  alt={t("comoEsTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Proposito — dark section */}
      <section
        className="section-bg-image section-dark relative overflow-hidden bg-ley-purple py-16 sm:py-20"
        style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.heroSlideshow[2] || fotos.casasDelSaber.hero)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-6 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("propositoTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("propositoTitle")}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <blockquote className="mx-auto max-w-4xl text-center text-lg font-medium italic leading-relaxed text-white sm:text-xl">
              {t("quote")}
            </blockquote>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-white/75">
              {t("objetivoDesc")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. Navegacion — 4 cards to sub-pages */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="orange" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <AnimatedSection key={section.href} direction="up" delay={i * 0.08}>
                  <Link href={`/${locale}/casas-del-saber/${section.href}`}>
                    <div className="group flex items-start gap-5 rounded-3xl border border-[var(--color-border-subtle)] bg-bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-purple/40 hover:shadow-lg">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10">
                        <Icon size={22} className="text-brand-purple" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--color-text-primary)]">{section.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{section.desc}</p>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Estructura y roles */}
      <section
        className="section-bg-image relative overflow-hidden bg-ley-purple py-16 sm:py-20"
        style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.galleryPhotos[3] || fotos.casasDelSaber.hero)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  <div className="glass-card h-full rounded-3xl p-6 transition-all hover:bg-white/15">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
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

      {/* 6. Galeria */}
      {fotos.casasDelSaber.galleryPhotos.length > 0 && (
        <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
          <DecoShapes variant="teal" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
              {fotos.casasDelSaber.galleryPhotos.map((src, i) => (
                <AnimatedSection key={src} direction="up" delay={i * 0.03} className="mb-3 break-inside-avoid">
                  <div className="group relative overflow-hidden rounded-3xl">
                    <Image
                      src={assetPath(src)}
                      alt="Casas del Saber"
                      width={800}
                      height={600}
                      className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Testimonios en video */}
      {homeVideos.programas["casas-del-saber"]?.testimonials && homeVideos.programas["casas-del-saber"].testimonials.length > 0 && (
        <section className="section-dark section-bg-image relative overflow-hidden bg-ley-purple py-16 sm:py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.heroSlideshow[5] || fotos.casasDelSaber.hero)})` } as CSSProperties}>
          <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
          <DecoShapes variant="teal" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Testimonios
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Voces de las <span className="text-white/80">Casas del Saber</span>
              </h2>
            </AnimatedSection>
            <div className="grid gap-8 md:grid-cols-2">
              {homeVideos.programas["casas-del-saber"].testimonials!.map((id, i) => (
                <AnimatedSection key={id} direction="up" delay={i * 0.1}>
                  <VideoFacade
                    youtubeId={id}
                    title="Testimonio Casas del Saber"
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA */}
      <section className="relative overflow-hidden bg-brand-purple py-16 sm:py-20">
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
