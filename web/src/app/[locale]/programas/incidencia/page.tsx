import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import ProgramVideosSection from "@/components/ProgramVideosSection";
import { ArrowUpRight, Home, Search, Users, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getProgramBySlug, getVideos, localize, sanityImage } from "@/lib/sanity/fetch";
import YoutubeHeroBg from "@/components/YoutubeHeroBg";
import { homeVideos, extractYouTubeId } from "@/data/homeVideos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("incidencia.title"),
    description: t("incidencia.description"),
    openGraph: {
      description: t("incidencia.description"),
    },
  };
}

const iconMap: Record<string, LucideIcon> = {
  ArrowUpRight, Home, Search, Users,
};

const fallbackObjetivos = [
  {
    title: "Ampliar y mejorar las alternativas de cuidado familiar y comunitario",
    desc: "Extender y diversificar la cobertura de opciones de cuidado, evaluando la efectividad de los programas existentes y, si es necesario, reformandolos o creando nuevos para prevenir el ingreso de miles de NNAJ al proceso administrativo de restablecimiento de derechos.",
  },
  {
    title: "Fomentar la participacion protagonica de los adolescentes jovenes en la toma de decisiones",
    desc: "Participacion activa de los jovenes en su vida cotidiana dentro de los dispositivos de cuidado, asi como en el diseno e implementacion de politicas publicas que los afectan, permitiendoles ejercer su ciudadania y contribuir a la transformacion de sus realidades y la construccion de su proyecto de vida.",
  },
  {
    title: "Generar y difundir informacion sobre el proceso de egreso de proteccion",
    desc: "Hacer publica la informacion relacionada con las trayectorias de vida de los jovenes tras su egreso, con el fin de facilitar la toma de decisiones basadas en evidencia, fortaleciendo el conocimiento y las capacidades de las autoridades y operadores de programas.",
  },
  {
    title: "Fortalecer la colaboracion interinstitucional",
    desc: "Consolidar espacios de trabajo conjunto entre el ICBF, operadores, jovenes, y diversos actores sociales, incluyendo el sector privado, investigadores, y organizaciones de la sociedad civil, para mejorar los sistemas de cuidado y apoyar a los activistas y organizaciones juveniles que trabajan en su transformacion.",
  },
  {
    title: "Planificar el egreso como un proceso integral",
    desc: "Tratar el egreso de NNAJ como un proceso planificado dentro de un plan de restitucion de derechos que involucre tanto al joven como a su entorno familiar y comunitario, ampliando la vision mas alla de la empleabilidad y la educacion, e incluyendo iniciativas que potencien la autonomia y los derechos de los jovenes.",
  },
];

const fallbackLineas = [
  { title: "Autonomia Progresiva", desc: "Trabajamos en el desarrollo e implementacion de programas y recursos que empoderen a las personas con experiencia en el cuidado y a los jovenes sin cuidado parental, brindandoles herramientas para alcanzar su independencia personal, economica y social.", icon: ArrowUpRight },
  { title: "Cuidados Alternativos, Desinstitucionalizacion y Prevencion a la Separacion Familiar", desc: "Abogamos por la implementacion y fortalecimiento de politicas que fomenten el cuidado basado en la familia como la principal alternativa para los ninos sin cuidado parental en Colombia, como recurso para evitar la desinstitucionalizacion.", icon: Home },
  { title: "Investigacion y Diseno de Politicas Publicas", desc: "Realizamos investigaciones para comprender mejor las necesidades y desafios de las personas con experiencia en el cuidado y los ninos sin cuidado parental en Colombia, para el diseno de politicas publicas mas efectivas y orientadas a garantizar los derechos de los jovenes en transicion y egresados de proteccion.", icon: Search },
  { title: "Participacion Intersectorial", desc: "Facilitar espacios de dialogo y colaboracion entre diferentes sectores y actores relevantes, como organizaciones de la sociedad civil, instituciones gubernamentales, academicos y jovenes, con el fin de promover la participacion activa y la construccion conjunta de soluciones.", icon: Users },
];

const fallbackResultados = [
  "Politicas publicas que transformen los cuidados alternativos y la atencion a ninos, ninas, adolescentes y jovenes en transicion.",
  "Jovenes lideres que transformen y ejerzan su ciudadania, fortaleciendo el proyecto de vida de sus pares.",
  "Instalacion y funcionamiento de una mesa intersectorial para la autonomia progresiva, que permita la colaboracion y coordinacion entre diferentes actores y sectores involucrados.",
];

export default async function IncidenciaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });
  const cms = await getProgramBySlug("incidencia");

  const cmsVideos = await getVideos(locale);

  const incidenciaVideos = homeVideos.programas.incidencia;
  const homeVideoEntries: typeof cmsVideos = [
    ...(incidenciaVideos?.support || []).map((id, i) => ({
      _id: `home-support-${i}`,
      title: "",
      description: "",
      source: "youtube" as const,
      youtubeId: extractYouTubeId(id) || id,
      videoUrl: null,
      thumbnail: null,
      category: "eventos",
      order: i,
    })),
  ];
  const videos = [...cmsVideos, ...homeVideoEntries];

  const videoTabs = [
    { id: "testimonios", label: t("videoTabTestimonios") },
    { id: "eventos", label: t("videoTabEventos") },
  ];

  const objetivos = cms?.objectives && cms.objectives.length > 0
    ? cms.objectives.map((o) => ({
        title: localize(o.title, locale) || "",
        desc: localize(o.description, locale) || "",
      }))
    : fallbackObjetivos;

  const lineas = cms?.actionLines && cms.actionLines.length > 0
    ? cms.actionLines.map((l) => ({
        title: localize(l.title, locale) || "",
        desc: localize(l.description, locale) || "",
        icon: (l.icon && iconMap[l.icon]) || ArrowUpRight,
      }))
    : fallbackLineas;

  const resultados = cms?.results && cms.results.length > 0
    ? cms.results.map((r) => localize(r, locale) || "")
    : fallbackResultados;

  const heroImage = sanityImage(cms?.heroImage) || assetPath(fotos.programas.cards.incidencia.image);
  const logoImage = assetPath(fotos.home.programs.incidencia.logo);
  // La incidencia de ASCEP nacio del mismo proceso que dio origen a la Ley
  // 2479 — usamos esas fotografias reales para dar variedad visual aqui.
  const leyGallery = fotos.leyEgreso.gallery.map((src) => assetPath(src));

  return (
    <>
      {/* Hero — visual only */}
      <div className="relative h-[50vh] overflow-hidden bg-ley-purple sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        <YoutubeHeroBg
          videoUrl={homeVideos.programas["incidencia"].hero || ""}
          fallbackImage={heroImage}
        />
      </div>

      {/* Hero text */}
      <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — imagen */}
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={heroImage}
                  alt="Incidencia y Participacion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-ley-purple backdrop-blur-sm">
                  <Users size={16} className="text-brand-orange" />
                  Programa
                </div>
              </div>
            </AnimatedSection>

            {/* Derecha — texto */}
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                {t("pillPrograma")}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
                {t("incidenciaHeroTitle")} <span className="text-brand-orange">{t("incidenciaHeroHighlight")}</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {t("incidenciaHeroSubtitle")}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={logoImage}
                  alt="ASCEP"
                  width={80}
                  height={80}
                  className="h-14 w-14 rounded-2xl object-contain"
                />
                <div>
                  <p className="font-extrabold text-[var(--color-text-primary)]">ASCEP</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">{t("incidenciaTitle")}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">{t("incidenciaDesc")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/ley-de-egreso`}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-orange px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#d15a1a] hover:shadow-lg"
                >
                  {t("incidenciaHeroCta")}
                </Link>
                <Link
                  href={`/${locale}/quienes-somos`}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-orange/30 px-7 py-3 text-sm font-bold text-brand-orange transition-all hover:border-brand-orange/60 hover:bg-brand-orange/5"
                >
                  {t("heroCta1")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Que es — texto izquierda + imagen derecha */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — texto */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Informacion
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                Que es <span className="text-brand-orange">Incidencia y Participacion?</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                <p>
                  El Programa de Incidencia y Participacion tiene como objetivo desarrollar acciones que involucren a los actores clave y tomadores de decisiones en la construccion de estrategias que contribuyan a la transformacion de los cuidados alternativos, la no separacion familiar y la autonomia progresiva. Ademas, se debe realizar investigaciones que proporcione insumos para garantizar acciones claras sobre los tres ejes mencionados anteriormente.
                </p>
                <p>
                  Como entidad de egresados, nos enfrentamos a desafios significativos en el fortalecimiento de los procesos de acompanamiento durante la transicion a la vida autonoma, la seleccion de equipos interdisciplinarios vinculados a los procesos de proteccion y el fortalecimiento de los cuidados alternativos en Colombia. Es precisamente por esta razon que, desde el ano 2019, hemos venido proponiendo el diseno y la promocion de un proyecto de ley que establezca un programa integral de acompanamiento para pre-egresados y garantice unos estandares minimos para aquellos que han egresado.
                </p>
              </div>
            </AnimatedSection>

            {/* Derecha — imagen */}
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={heroImage}
                  alt="Incidencia y Participacion"
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

      {/* Fotografia grande, sin texto — respiro editorial entre "que es" y los objetivos */}
      <div className="relative h-[45vh] overflow-hidden sm:h-[55vh]">
        <ImageParallax
          src={leyGallery[4] || heroImage}
          alt="Incidencia de ASCEP"
          fill
          className="object-cover"
          sizes="100vw"
          intensity={0.08}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ley-purple/70 via-transparent to-transparent" />
      </div>

      {/* Objetivos Especificos — texto izquierda + imagen derecha (dark) */}
      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${leyGallery[1] || heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — texto */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Objetivos
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl">
                Objetivos <span className="text-brand-orange">Especificos</span>
              </h2>
              <div className="mt-8 space-y-4">
                {objetivos.map((obj, i) => (
                  <div key={i} className="flex gap-4 rounded-3xl glass-card p-5 transition-all hover:bg-white/15">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{obj.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{obj.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Derecha — imagen */}
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={leyGallery[2] || heroImage}
                  alt="Objetivos Especificos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.1}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Lineas"
            title="Lineas de"
            highlight="Accion"
            accent="orange"
            desc="El programa se estructura en torno a las siguientes lineas de accion"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {lineas.map((linea, i) => {
              const Icon = linea.icon;
              return (
                <AnimatedSection key={linea.title} direction="up" delay={i * 0.06}>
                  <div className="rounded-3xl border border-border-default bg-bg-card p-6 text-center transition-all hover:shadow-md">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10">
                      <Icon size={22} className="text-brand-orange" />
                    </div>
                    <h3 className="mb-1 font-bold text-text-primary">{linea.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{linea.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${leyGallery[5] || heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Resultados" title="Resultados" highlight="Esperados" accent="white" dark />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {resultados.map((r, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="glass-card rounded-3xl p-6 transition-all hover:bg-white/15">
                  <p className="text-white/70">{r}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ProgramVideosSection
        videos={videos}
        tabs={videoTabs}
        bgImage={heroImage}
        locale={locale}
      />
    </>
  );
}



