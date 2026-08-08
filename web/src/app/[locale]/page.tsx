import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSlideshow from "@/components/HeroSlideshow";
import HomeKpiStrip from "@/components/HomeKpiStrip";
import CaminoSection from "@/components/CaminoSection";
import HomeTestimonials from "@/components/HomeTestimonials";
import HomeCTA from "@/components/HomeCTA";
import TimelineRoute, { type RouteItem } from "@/components/TimelineRoute";
import ModeloGrid from "@/components/ModeloGrid";
import ProgramGrid from "@/components/ProgramGrid";
import LogoLoop from "@/components/LogoLoop";
import GallerySection from "@/components/GallerySection";
import NewsGrid, { type NewsGridItem } from "@/components/NewsGrid";
import ProgramCardGallery from "@/components/ProgramCardGallery";
import ImageParallax from "@/components/ImageParallax";
import { assetPath } from "@/lib/asset-path";
import { imageUrl } from "@/lib/sanity/image";
import { getFotos } from "@/lib/get-fotos";
import { buildTrayectoria } from "@/data/trayectoria";
import {
  getFeaturedPartners,
  getImpactStats,
  getTestimonials,
} from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("home.title"),
    description: t("home.description"),
  };
}

const fallbackStats = [
  { value: "71148", label: "NNA protegidos por el ICBF", icon: "Users", color: "#007374" },
  { value: "13000+", label: "Jovenes egresados", icon: "GraduationCap", color: "#44BCC5" },
  { value: "5+", label: "Programas activos", icon: "Layers", color: "#C45118" },
  { value: "2017", label: "Constitucion formal", icon: "Calendar", color: "#C45118" },
];

const fallbackTestimonialsKeys = [
  { textKey: "testimonial1Text", authorKey: "testimonial1Author", roleKey: "testimonial1Role" },
  { textKey: "testimonial2Text", authorKey: "testimonial2Author", roleKey: "testimonial2Role" },
  { textKey: "testimonial3Text", authorKey: "testimonial3Author", roleKey: "testimonial3Role" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const h = await getTranslations({ locale, namespace: "home" });
  const g = await getTranslations({ locale, namespace: "generales" });
  const nt = await getTranslations({ locale, namespace: "noticias" });

  const [cmsPartners, cmsStats, cmsTestimonials] = await Promise.all([
    getFeaturedPartners(),
    getImpactStats(),
    getTestimonials("home"),
  ]);

  const fotos = await getFotos();

  const qs = await getTranslations({ locale, namespace: "quienesSomos" });
  const trayectoria: RouteItem[] = buildTrayectoria(qs.raw("trayectoria") as RouteItem[], assetPath);

  const gallery = fotos.home.gallery.map((item) => ({
    ...item,
    src: assetPath(item.src),
  }));

  const fallbackPrograms = [
    {
      title: "Incidencia y Participacion",
      desc: "Desarrollamos acciones que involucran a actores clave y tomadores de decisiones en la transformacion de los cuidados alternativos.",
      ...fotos.home.programs.incidencia,
      slug: "incidencia",
      image: assetPath(fotos.home.programs.incidencia.image),
      logo: assetPath(fotos.home.programs.incidencia.logo),
    },
    {
      title: "Avanza Joven",
      desc: "Programa disenado para brindar apoyo y herramientas a adolescentes que viven institucionalizados, potenciando habilidades para la vida.",
      ...fotos.home.programs.avanzaJoven,
      slug: "avanza-joven",
      image: assetPath(fotos.home.programs.avanzaJoven.image),
      logo: assetPath(fotos.home.programs.avanzaJoven.logo),
    },
    {
      title: "Fomento para el Empleo y Emprendimiento",
      desc: "Modelo piloto para promover capacidades laborales y fortalecer la empleabilidad de jovenes en proceso de egreso del sistema de proteccion.",
      ...fotos.home.programs.fomento,
      slug: "empleo",
      image: assetPath(fotos.home.programs.fomento.image),
      logo: assetPath(fotos.home.programs.fomento.logo),
    },
    {
      title: "Mi Cuerpo, Mi Sexualidad, Mi Decision",
      desc: "Programa para proveer condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad.",
      ...fotos.home.programs.miCuerpo,
      slug: "mi-cuerpo",
      image: assetPath(fotos.home.programs.miCuerpo.image),
      logo: assetPath(fotos.home.programs.miCuerpo.logo),
    },
    {
      title: "Casas del Saber",
      desc: "Espacio de acompanamiento integral para jovenes en proceso de egreso del sistema de proteccion estatal.",
      ...fotos.home.programs.casasDelSaber,
      slug: "casas-del-saber",
      href: `/${locale}/casas-del-saber`,
      image: assetPath(fotos.home.programs.casasDelSaber.image),
      logo: assetPath(fotos.home.programs.casasDelSaber.logo),
    },
  ];

  const fallbackAliados = fotos.home.aliados.map((item) => ({
    ...item,
    src: assetPath(item.src),
  }));

  const resolvedPrograms = fallbackPrograms;

  const cmsAliados = cmsPartners.length > 0
    ? cmsPartners.map((p) => ({
        src: imageUrl(p.logo) || "",
        alt: p.name?.es || "",
      })).filter((l) => l.src)
    : [];
  const resolvedAliados = cmsAliados.length > 0 ? cmsAliados : fallbackAliados;

  const resolvedStats = cmsStats.length > 0
    ? cmsStats.map((s) => ({
        value: s.prefix ? `${s.prefix}${s.value}` : `${s.value}${s.suffix || ""}`,
        label: s.label?.es || "",
        icon: s.icon || "Users",
        color: s.color || "#007374",
      }))
    : fallbackStats;

  const testimonials = cmsTestimonials.length > 0
    ? cmsTestimonials.map((t) => ({
        text: t.quote?.es || "",
        author: t.author?.es || "",
        role: t.role?.es || "",
      }))
    : fallbackTestimonialsKeys.map((t) => ({
        text: h(t.textKey),
        author: h(t.authorKey),
        role: h(t.roleKey),
      }));

  const newsItems: NewsGridItem[] = [
    {
      id: "ley-hijos-del-estado",
      href: `/${locale}/noticias/ley-hijos-del-estado`,
      image: assetPath(fotos.leyEgreso.hero),
      tag: nt("leyTag"),
      title: nt("leyTitle"),
      excerpt: nt("leyExcerpt"),
      color: "#4A154B",
    },
    {
      id: "dia-del-egresado",
      href: `/${locale}/noticias/dia-del-egresado`,
      image: assetPath("/images/eventos/encuentro-2025/GIS06445.webp"),
      tag: nt("egresadoTag"),
      title: nt("egresadoTitle"),
      excerpt: nt("egresadoExcerpt"),
      color: "#F7921E",
    },
    {
      id: "casas-del-saber",
      href: `/${locale}/noticias/casas-del-saber`,
      image: assetPath(fotos.casasDelSaber.hero),
      tag: nt("casasTag"),
      title: nt("casasTitle"),
      excerpt: nt("casasExcerpt"),
      color: "#00A896",
    },
  ];

  const heroImages = [
    assetPath(fotos.home.heroImage),
    assetPath(fotos.impacto.hero),
    assetPath("/images/eventos/2024/20241112_102432.webp"),
    assetPath("/images/eventos/2024/20241112_092855.webp"),
    assetPath("/images/eventos/2024/20241112_095957.webp"),
    assetPath("/images/eventos/2024/20241112_100147.webp"),
    assetPath("/images/eventos/2024/20241112_102440.webp"),
    assetPath("/images/eventos/2024/20241112_103725.webp"),
    assetPath("/images/eventos/2024/20241112_111016.webp"),
    assetPath("/images/eventos/encuentro-2025/GIS06447.webp"),
    assetPath("/images/eventos/encuentro-2025/GIS06450.webp"),
    assetPath("/images/eventos/encuentro-2025/GIS06460.webp"),
    assetPath("/images/eventos/encuentro-2025/GIS06475.webp"),
  ];

  return (
    <div>
      <HeroSlideshow
        images={heroImages}
        tag={h("heroTag")}
        title={h("heroTitle")}
        subtitle={h("heroSubtitle")}
        accent="teal"
        primaryCta={{ label: h("aboutCta"), href: `/${locale}/quienes-somos` }}
        secondaryCta={{ label: g("verMasImpacto"), href: `/${locale}/impacto` }}
      />

      <HomeKpiStrip stats={resolvedStats} />

      <CaminoSection
        bgImage="/images/afiches/exp8-bg.webp"
        tag={h("caminoTag")}
        title={h("caminoTitle")}
        stepLabel={h("caminoStep")}
        prevLabel={h("caminoPrev")}
        nextLabel={h("caminoNext")}
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-[10px] bg-brand-purple/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {h("aboutTag")}
              </span>
              <h2 className="mb-4 text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl">
                {h("aboutTitle")}
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {h("aboutDesc")}
              </p>
              <ul className="mb-8 space-y-3">
                {["aboutItem1", "aboutItem2", "aboutItem3"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple/10">
                      <span className="h-2 w-2 rounded-full bg-brand-purple" />
                    </span>
                    <span className="text-sm text-[var(--color-text-secondary)]">{h(item)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/quienes-somos`}
                className="inline-flex items-center rounded-[10px] bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple-dark hover:shadow-lg"
              >
                {h("aboutCta")}
              </Link>
            </div>
            <div className="relative pb-4 pr-4">
              <div className="relative inline-block w-full">
                <div className="absolute -left-4 -top-4 h-full w-full rounded-[10px] bg-brand-purple/10" />
                <ImageParallax
                  src={assetPath(fotos.home.aboutImage)}
                  alt="Equipo ASCEP"
                  width={600}
                  height={400}
                  containerClassName="relative z-10"
                  className="w-full rounded-[10px] shadow-xl"
                  intensity={0.2}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 z-20 flex h-28 w-28 flex-col items-center justify-center rounded-[10px] bg-brand-orange text-white shadow-lg">
                <span className="text-2xl font-extrabold">2017</span>
                <span className="text-[10px] font-semibold uppercase leading-tight tracking-wider">{h("heroBadge")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-[10px] bg-brand-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {h("retosTag")}
              </span>
              <h2 className="mb-4 text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl">
                {h("retosTitle")}
              </h2>
              <p className="mb-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {h("retosDesc1")}
              </p>
              <p className="text-base font-semibold text-[var(--color-text-primary)]">
                {h("retosDesc2")}
              </p>
            </div>
            <div className="relative">
              <ImageParallax
                src={assetPath(fotos.home.retosImage)}
                alt="Jovenes en taller"
                width={600}
                height={400}
                className="w-full rounded-[10px] object-cover shadow-xl"
                intensity={0.2}
                style={{ aspectRatio: "3/2" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <ProgramCardGallery
          locale={locale}
          tag={h("porQueTag")}
          title={h("porQueTitle")}
          subtitle={h("porQueDesc")}
          accent="orange"
        />
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="subtle" />
        <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent">
            {h("trayectoriaTag")}
          </span>
          <h2 className="mb-12 text-center text-3xl font-bold text-[var(--color-text-primary)]">
            {h("trayectoriaTitle")}
          </h2>
          <TimelineRoute
            items={trayectoria}
            hitoSingular={qs("hitoSingular")}
            hitoPlural={qs("hitoPlural")}
          />
        </AnimatedSection>
      </section>

      <section className="relative overflow-hidden">
        <DecoShapes variant="mixed" />
        <ModeloGrid variant="dark" />
      </section>

      <ProgramGrid programs={resolvedPrograms} locale={locale} />

      <HomeTestimonials
        tag={h("testimonialsTag")}
        title={h("testimonialsTitle")}
        testimonials={testimonials}
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {h("noticiasTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {h("noticiasTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              {h("noticiasDesc")}
            </p>
          </div>

          <NewsGrid items={newsItems} locale={locale} />

          <div className="mt-10 flex justify-center">
            <Link
              href={`/${locale}/noticias`}
              className="inline-flex items-center gap-2 rounded-[10px] border border-brand-purple px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-brand-purple/10"
            >
              {h("verTodasNoticias")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <GallerySection
        tag={h("galeriaTag")}
        title={h("galeriaTitle")}
        images={gallery}
        bgImage={assetPath(fotos.home.gallery[0].src)}
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent">
            {h("aliadosTag")}
          </span>
          <h2 className="mb-10 text-center text-3xl font-bold text-[var(--color-text-primary)]">
            {h("aliadosTitle")}
          </h2>
          <LogoLoop logos={resolvedAliados} />
        </AnimatedSection>
      </section>

      <HomeCTA
          tag={h("ctaTag")}
          title={h("ctaTitle")}
          description={h("ctaDesc")}
          phone={h("ctaPhone")}
          email={h("ctaEmail")}
          location={h("ctaLocation")}
          formTitle={h("ctaFormTitle")}
          formNamePlaceholder={h("ctaFormName")}
          formEmailPlaceholder={h("ctaFormEmail")}
          formMessagePlaceholder={h("ctaFormMsg")}
          formSubmit={h("ctaFormSubmit")}
        />
    </div>
  );
}

