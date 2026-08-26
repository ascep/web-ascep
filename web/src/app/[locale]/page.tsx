import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";
import CaminoSection from "@/components/CaminoSection";
import CtaBanner from "@/components/CtaBanner";
import WaveMask from "@/components/WaveMask";
import HomeKpiStrip from "@/components/HomeKpiStrip";
import HomeCTA from "@/components/HomeCTA";
import TimelineRoute, { type RouteItem } from "@/components/TimelineRoute";
import LogoLoop from "@/components/LogoLoop";
import GallerySection from "@/components/GallerySection";
import NewsGrid, { type NewsGridItem } from "@/components/NewsGrid";
import VideoFacade from "@/components/VideoFacade";
import CountUp from "@/components/CountUp";
import ImageParallax from "@/components/ImageParallax";
import { assetPath } from "@/lib/asset-path";
import { imageUrl } from "@/lib/sanity/image";
import { getFotos } from "@/lib/get-fotos";
import { programasPorQue } from "@/data/programasPorQue";
import { homeVideos } from "@/data/homeVideos";
import {
  getFeaturedPartners,
  getImpactStats,
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
  { value: "1500+", label: "Jovenes Acompanados", icon: "Users", color: "#007374", description: "egresados del sistema de proteccion estatal con acompañamiento integral" },
  { value: "25+", label: "Aliados Estrategicos", icon: "Heart", color: "#44BCC5", description: "organizaciones que fortalecen nuestra mision" },
  { value: "6+", label: "Anos de Trabajo", icon: "Calendar", color: "#C45118", description: "de trayectoria transformando el cuidado alternativo" },
  { value: "12", label: "Departamentos", icon: "MapPin", color: "#C45118", description: "con presencia en todo el pais" },
  { value: "200+", label: "Talleres Realizados", icon: "Layers", color: "#007374", description: "de formacion en habilidades para la vida y empleo" },
  { value: "300+", label: "Jovenes Lideres", icon: "GraduationCap", color: "#44BCC5", description: "formados para transformar su comunidad" },
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
  const qs = await getTranslations({ locale, namespace: "quienesSomos" });

  const [cmsPartners, cmsStats] = await Promise.all([
    getFeaturedPartners(),
    getImpactStats(),
  ]);

  const fotos = await getFotos();

  const qsRaw = qs.raw("trayectoria") as Array<{ year: string; title?: string; description?: string; items?: string[] }>;
  const qsTrayectoria: RouteItem[] = qsRaw.map((m, i) => ({
    year: m.year,
    items: m.items || [m.title || "", m.description || ""].filter(Boolean),
    image: assetPath(fotos.home.trayectoria[i] || ""),
  }));

  const gallery = fotos.home.gallery.map((item) => ({
    ...item,
    src: assetPath(item.src),
  }));

  const fallbackAliados = fotos.home.aliados.map((item) => ({
    ...item,
    src: assetPath(item.src),
  }));

  const cmsAliados = cmsPartners.length > 0
    ? cmsPartners.map((p) => ({
        src: imageUrl(p.logo) || "",
        alt: p.name?.es || "",
      })).filter((l) => l.src)
    : [];
  const resolvedAliados = cmsAliados.length > 0 ? cmsAliados : fallbackAliados;

  function statDescription(label: string): string {
    const l = label.toLowerCase();
    if (l.includes("acompa") || l.includes("joven") && l.includes("atend")) return "egresados del sistema de proteccion estatal con acompañamiento integral";
    if (l.includes("aliado")) return "organizaciones que fortalecen nuestra mision";
    if (l.includes("ano") || l.includes("year")) return "de trayectoria transformando el cuidado alternativo";
    if (l.includes("departamento")) return "con presencia en todo el pais";
    if (l.includes("taller")) return "de formacion en habilidades para la vida y empleo";
    if (l.includes("lider")) return "formados para transformar su comunidad";
    return "";
  }

  const resolvedStats = cmsStats.length > 0
    ? cmsStats.map((s) => ({
        value: s.prefix ? `${s.prefix}${s.value}` : `${s.value}${s.suffix || ""}`,
        label: s.label?.es || "",
        icon: s.icon || "Users",
        color: s.color || "#007374",
        description: statDescription(s.label?.es || ""),
      }))
    : fallbackStats.map((s) => ({
        ...s,
        description: statDescription(s.label),
      }));

  const heroImages = fotos.home.heroSlideshow.map((src) => assetPath(src));

  const programasConVideo = programasPorQue.map((p) => ({
    ...p,
    youtubeId: homeVideos.programas[p.id]?.hero || "",
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
      image: assetPath(fotos.noticias.diaDelEgresado.hero),
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

  const cifrasNacionales = [
    {
      value: 71148,
      label: qs("cifrasStat1Label"),
    },
    {
      value: 12576,
      label: qs("cifrasStat2Label"),
    },
    {
      value: 3025,
      label: qs("cifrasStat3Label"),
      detail: qs("cifrasStat3Note"),
    },
  ];

  return (
    <div>
      {/* 1. HERO — video de fondo, sin texto */}
      <section className="relative h-[50vh] overflow-hidden bg-ley-purple sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        <div className="absolute inset-0">
          <video
            src={homeVideos.hero || "/videos/FONDO-WEB-16-9.mp4"}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(74,21,75,0.05) 0%, rgba(74,21,75,0.35) 65%, rgba(74,21,75,0.85) 100%)",
            }}
          />
          {/* Bottom blend — matches ley-purple #4A154B */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to top, rgba(74,21,75,0.95) 0%, rgba(74,21,75,0.4) 40%, transparent 100%)",
            }}
          />
        </div>

        {/* SVG wave mask — connects hero to stats */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 w-full leading-none"
        >
          <svg
            className="block h-[40px] w-full sm:h-[60px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
              fill="#4A154B"
              opacity="0.2"
            />
            <path
              d="M0,35 C200,95 450,15 700,75 C950,135 1100,25 1200,50 L1200,120 L0,120 Z"
              fill="#4A154B"
            />
          </svg>
        </div>
      </section>

      {/* 2. TEXTO + KPIs — continuation of hero */}
      <section className="bg-ley-purple pt-8 pb-10 sm:pt-10 sm:pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-xl font-bold leading-relaxed text-white/90 sm:text-2xl lg:text-3xl">
              {h("heroTitle")}
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-white/55 sm:text-sm">
              {h("heroSubtitle")}
            </p>
          </AnimatedSection>
        </div>
        <HomeKpiStrip stats={resolvedStats} />
      </section>

      {/* 3. CAMINO — 7 anos de camino */}
      <section className="relative">
        <CaminoSection
          bgImage={assetPath(fotos.home.caminoSectionBg)}
          posters={[...fotos.home.caminoSectionPosters]}
          tag={h("caminoTag")}
          title={h("caminoTitle")}
          stepLabel={h("caminoStep")}
          prevLabel={h("caminoPrev")}
          nextLabel={h("caminoNext")}
        />
        <WaveMask tone="white" />
      </section>

      {/* 3b. EL PROBLEMA — cifras nacionales reales (ICBF) */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 max-w-2xl">
            <span className="mb-3 inline-block rounded-[10px] bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {h("retosTag")}
            </span>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl">
              {h("retosTitle")}
            </h2>
            <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
              {h("retosDesc1")}
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-3">
            {cifrasNacionales.map((stat, i) => (
              <AnimatedSection key={stat.label} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-[10px] border border-border-subtle bg-bg-card p-5">
                  <p className="text-2xl font-extrabold text-brand-primary sm:text-3xl">
                    <CountUp end={stat.value} />
                  </p>
                  <p className="mt-1 text-sm font-bold text-brand-orange">{stat.label}</p>
                  {stat.detail && (
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">{stat.detail}</p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.15}>
            <p className="mt-4 text-xs text-text-muted">{qs("cifrasSource")}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. TRANSFORMANDO — video institucional */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              {homeVideos.transformando ? (
                <VideoFacade
                  youtubeId={homeVideos.transformando}
                  title={h("aboutTitle")}
                />
              ) : (
                <div className="relative aspect-video overflow-hidden rounded-[10px] bg-zinc-100">
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-text-muted">
                    Video institucional proximamente
                  </div>
                </div>
              )}
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-[10px] bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
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
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                      <span className="h-2 w-2 rounded-full bg-brand-primary" />
                    </span>
                    <span className="text-sm text-[var(--color-text-secondary)]">{h(item)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/quienes-somos`}
                className="inline-flex items-center rounded-[10px] bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-primary-dark hover:shadow-lg"
              >
                {h("aboutCta")}
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 5. TRAYECTORIA */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="subtle" />
        <AnimatedSection className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent">
            {h("trayectoriaTag")}
          </span>
          <h2 className="mb-12 text-center text-3xl font-bold text-[var(--color-text-primary)]">
            {h("trayectoriaTitle")}
          </h2>
          <TimelineRoute
            items={qsTrayectoria}
            hitoSingular={qs("hitoSingular")}
            hitoPlural={qs("hitoPlural")}
          />
        </AnimatedSection>
        <WaveMask tone="purple" />
      </section>

      {/* 5b. LEY 2479 — el logro historico de incidencia */}
      <section className="relative overflow-hidden bg-ley-purple py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-brand-teal" />
          <div className="absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-brand-orange" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-[10px] bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {qs("ley2479Tag")}
              </span>
              <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                {qs("ley2479Title")}
              </h2>
              <p className="mb-8 text-base leading-relaxed text-white/80">
                {qs("ley2479Desc")}
              </p>
              <Link
                href={`/${locale}/noticias/ley-hijos-del-estado`}
                className="inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-ley-purple transition-all hover:bg-white/90"
              >
                {g("saberMas")} <ArrowRight size={16} />
              </Link>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <ImageParallax
                  src={assetPath(fotos.leyEgreso.hero)}
                  alt={qs("ley2479Title")}
                  width={600}
                  height={450}
                  className="w-full object-cover"
                  intensity={0.15}
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
        <WaveMask tone="white" />
      </section>

      {/* 6. PROGRAMAS EN VIDEO — abrebocas de cada programa */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {h("porQueTag")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {h("porQueTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              {h("porQueDesc")}
            </p>
          </AnimatedSection>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {programasConVideo.map((prog) => {
              const href = `/${locale}${prog.path}`;
              return (
                <AnimatedSection key={prog.id} direction="up">
                  <div className="group block overflow-hidden rounded-3xl bg-bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                    {prog.youtubeId ? (
                      <VideoFacade
                        youtubeId={prog.youtubeId}
                        title={prog.title}
                        className="rounded-t-3xl"
                      />
                    ) : (
                      <Link href={href} className="block">
                        <div className="relative aspect-video overflow-hidden bg-zinc-100">
                          <div className="absolute inset-0 flex items-center justify-center text-sm text-text-muted">
                            Video proximamente
                          </div>
                        </div>
                      </Link>
                    )}
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                        Programa
                      </p>
                      <h3 className="mt-2 font-bold text-[var(--color-text-primary)]">{prog.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
                        {prog.description}
                      </p>
                      <Link
                        href={href}
                        className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-dark"
                      >
                        {g("seePrograms")} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
        <WaveMask tone="purple" />
      </section>

      {/* 7. VOCES DE NUESTRA COMUNIDAD — testimonios en texto y en video */}
      <section className="relative overflow-hidden bg-ley-purple py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-brand-teal" />
          <div className="absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-brand-orange" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-[10px] bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {h("testimonialsTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {(() => {
                const words = h("testimonialsTitle").split(" ");
                const last = words.pop();
                return <>{words.join(" ")} <span className="text-white/80">{last}</span></>;
              })()}
            </h2>
          </AnimatedSection>

          {/* Citas en texto */}
          <div className="mb-12 grid gap-8 sm:grid-cols-2">
            {[
              { text: h("testimonial1Text"), author: h("testimonial1Author"), role: h("testimonial1Role") },
              { text: h("testimonial2Text"), author: h("testimonial2Author"), role: h("testimonial2Role") },
            ].map((tst, i) => (
              <AnimatedSection key={tst.author} direction="up" delay={i * 0.08}>
                <blockquote className="relative pt-8">
                  {/* Comilla tipografica en vez de un borde decorativo lateral */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 select-none text-6xl leading-none text-brand-yellow/40"
                  >
                    &ldquo;
                  </span>
                  <p className="text-lg italic leading-relaxed text-white/90">
                    {tst.text}
                  </p>
                  <footer className="mt-4">
                    <p className="text-sm font-semibold text-white">{tst.author}</p>
                    <p className="text-xs text-white/60">{tst.role}</p>
                  </footer>
                </blockquote>
              </AnimatedSection>
            ))}
          </div>

          {/* Testimonios en video */}
          {homeVideos.testimonios.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {homeVideos.testimonios.map((test) => (
                <AnimatedSection key={test.youtubeId} direction="up">
                  <div className="overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm">
                    <VideoFacade
                      youtubeId={test.youtubeId}
                      title={`${test.author} — ${test.role}`}
                      className="rounded-t-3xl"
                    />
                    <div className="p-5 text-center">
                      <p className="text-sm font-semibold text-white">{test.author}</p>
                      <p className="text-xs text-white/60">{test.role}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
        <WaveMask tone="white" />
      </section>

      {/* 7b. LLAMADO A DONAR — justo despues de las voces, que es el punto
          emocional mas alto de la pagina */}
      <CtaBanner
        title={h("donateCtaTitle")}
        description={h("donateCtaDesc")}
        href={`/${locale}/donar`}
        buttonLabel={h("donateCtaBtn")}
      />

      {/* 8. NOVEDADES / NOTICIAS */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <AnimatedSection className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        <WaveMask tone="purple" />
      </section>

      {/* 9. GALERIA */}
      <GallerySection
        tag={h("galeriaTag")}
        title={h("galeriaTitle")}
        images={gallery}
        bgImage={assetPath(fotos.home.gallery[0].src)}
      />

      {/* 10. ALIADOS */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <AnimatedSection className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent">
            {h("aliadosTag")}
          </span>
          <h2 className="mb-10 text-center text-3xl font-bold text-[var(--color-text-primary)]">
            {h("aliadosTitle")}
          </h2>
          <LogoLoop logos={resolvedAliados} />
        </AnimatedSection>
        <WaveMask tone="orange" />
      </section>

      {/* 11. CTA / CONTACTO */}
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
