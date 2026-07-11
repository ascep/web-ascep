import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import EnredateHero from "./EnredateHero";
import EnredatePilares from "./EnredatePilares";
import EnredateAbout from "./EnredateAbout";
import VideoGrid from "./VideoGrid";
import EnredateActividades from "./EnredateActividades";
import EnredateStats from "./EnredateStats";
import EnredateTestimonials from "./EnredateTestimonials";
import EnredateCTA from "./EnredateCTA";

export const metadata: Metadata = {
  title: "Enredate con ASCEP - ASCEP",
};

export default async function EnredatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
      />

      <section className="relative bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-purple/10 px-4 py-1 text-sm font-semibold text-brand-purple">
              {t("section1Tag")}
            </span>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              {t("section1Title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-secondary">
              {t("section1Desc")}
            </p>
          </div>
          <VideoGrid />
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
