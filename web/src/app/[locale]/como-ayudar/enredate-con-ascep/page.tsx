import { getTranslations } from "next-intl/server";
import EnredateHero from "./EnredateHero";
import EnredatePilares from "./EnredatePilares";
import EnredateAbout from "./EnredateAbout";
import VideoGrid from "./VideoGrid";
import EnredateActividades from "./EnredateActividades";
import EnredateStats from "./EnredateStats";
import EnredateTestimonials from "./EnredateTestimonials";
import EnredateCTA from "./EnredateCTA";
import PodcastSection from "./PodcastSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import type { CSSProperties } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("enredateConAscep.title"),
    description: t("enredateConAscep.description"),
    openGraph: {
      description: t("enredateConAscep.description"),
    },
  };
}

export default async function EnredatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "enredateConAscep" });

  const slides = [
    { tag: t("heroSlide1Tag"), title: t("heroSlide1Title"), desc: t("heroSlide1Desc") },
    { tag: t("heroSlide2Tag"), title: t("heroSlide2Title"), desc: t("heroSlide2Desc") },
    { tag: t("heroSlide3Tag"), title: t("heroSlide3Title"), desc: t("heroSlide3Desc") },
  ];

  const pilares = [
    { title: t("pilar1Title"), desc: t("pilar1Desc") },
    { title: t("pilar2Title"), desc: t("pilar2Desc") },
    { title: t("pilar3Title"), desc: t("pilar3Desc") },
    { title: t("pilar4Title"), desc: t("pilar4Desc") },
  ];

  const aboutItems = [
    t("aboutItem1"),
    t("aboutItem2"),
    t("aboutItem3"),
  ];

  const actividades = [
    { title: t("actividad1Title"), desc: t("actividad1Desc"), cta: t("actividad1Cta") },
    { title: t("actividad2Title"), desc: t("actividad2Desc"), cta: t("actividad2Cta") },
    { title: t("actividad3Title"), desc: t("actividad3Desc"), cta: t("actividad3Cta") },
    { title: t("actividad4Title"), desc: t("actividad4Desc"), cta: t("actividad4Cta") },
  ];

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
    { value: t("stat4Value"), label: t("stat4Label") },
  ];

  const testimonios = [
    { text: t("testimonio1Text"), author: t("testimonio1Author"), role: t("testimonio1Role") },
    { text: t("testimonio2Text"), author: t("testimonio2Author"), role: t("testimonio2Role") },
    { text: t("testimonio3Text"), author: t("testimonio3Author"), role: t("testimonio3Role") },
  ];

  const uneteList = [
    t("uneteList1"),
    t("uneteList2"),
    t("uneteList3"),
    t("uneteList4"),
  ];

  return (
    <div>
      <EnredateHero
        slides={slides}
        ctaLabel={t("heroCta")}
        ctaHref={`/${locale}/donar`}
        secondaryLabel={t("heroSecondary")}
        secondaryHref={`/${locale}/contacto`}
      />

      <EnredatePilares
        tag={t("pilaresTag")}
        title={t("pilaresTitle")}
        pilares={pilares}
      />

      <EnredateAbout
        locale={locale}
        tag={t("aboutTag")}
        title={t("aboutTitle")}
        desc={t("aboutDesc")}
        items={aboutItems}
        ctaLabel={t("aboutCta")}
        ctaHref="como-ayudar/plan-padrino"
        badgeText={t("aboutImageBadge")}
        galleryImages={fotos.enredate.gallery}
      />

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.enredate.gallery[0])})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("section1Tag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("section1Title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--color-text-muted)]">
              {t("section1Desc")}
            </p>
          </AnimatedSection>
          <VideoGrid />
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.enredate.gallery[0])})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("podcastTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("podcastTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--color-text-muted)]">
              {t("podcastDesc")}
            </p>
          </AnimatedSection>
          <PodcastSection />
        </div>
      </section>

      <EnredateActividades
        tag={t("actividadesTag")}
        title={t("actividadesTitle")}
        actividades={actividades}
        locale={locale}
      />

      <EnredateStats
        tag={t("statsTag")}
        title={t("statsTitle")}
        stats={stats}
      />

      <EnredateTestimonials
        tag={t("testimoniosTag")}
        title={t("testimoniosTitle")}
        testimonios={testimonios}
      />

      <EnredateCTA
        tag={t("uneteTag")}
        title={t("uneteTitle")}
        desc={t("uneteDesc")}
        list={uneteList}
        formName={t("uneteFormName")}
        formEmail={t("uneteFormEmail")}
        formMsg={t("uneteFormMsg")}
        formSubmit={t("uneteFormSubmit")}
      />
    </div>
  );
}

