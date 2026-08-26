import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import ProgramVideosSection from "@/components/ProgramVideosSection";
import { BookOpen, Briefcase, Building, Search, Compass, Route, CheckCircle, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getProgramBySlug, getVideos, localize, sanityImage } from "@/lib/sanity/fetch";
import YoutubeHeroBg from "@/components/YoutubeHeroBg";
import { homeVideos } from "@/data/homeVideos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("empleo.title"),
    description: t("empleo.description"),
    openGraph: {
      description: t("empleo.description"),
    },
  };
}

const iconMap: Record<string, LucideIcon> = {
  BookOpen, Briefcase, Building, Search, Compass, Route,
};

const compAccents = [
  { icon: "text-ley-orange", bg: "bg-ley-orange/10" },
  { icon: "text-ley-cyan", bg: "bg-ley-cyan/10" },
  { icon: "text-ley-yellow", bg: "bg-ley-yellow/10" },
  { icon: "text-ley-teal", bg: "bg-ley-teal/10" },
];

const fallbackObjetivos = [
  "Promover espacios de insercion social, capacidades y competencias aptas para la insercion laboral en adolescentes y jovenes.",
  "Impulsar la aplicacion de talleres experimentales que permitan a los jovenes conocer las ofertas laborales y su contenido a traves del ejercicio practico del area de conocimiento, talleres aplicados por las entidades competentes.",
  "Vincular laboralmente a los jovenes pre-egresados que se encuentran en la ultima instancia de egreso de proteccion y de aquellos que ya egresaron.",
  "Disminuir el fracaso que experimentan los jovenes por motivos de escasa educacion para desarrollarse en un determinado trabajo u oficio.",
];

const fallbackComponentes = [
  { title: "Formacion y busqueda de empleo", desc: "Espacio para la formacion y busqueda de empleo con apoyo profesional.", icon: BookOpen },
  { title: "Intermediacion laboral", desc: "Intermediacion laboral y entrenamiento en competencias y habilidades personales para el empleo.", icon: Briefcase },
  { title: "Experiencias vocacionales", desc: "Acceso a experiencias vocacionales en empresa como primera toma de contacto con el mercado laboral.", icon: Building },
  { title: "Identificacion de oportunidades", desc: "Identificacion de jovenes con pocas oportunidades de desarrollo.", icon: Search },
  { title: "Orientacion laboral", desc: "Orientacion, informacion y planificacion de la busqueda laboral.", icon: Compass },
  { title: "Itinerario formativo", desc: "Itinerario de formacion e intermediacion laboral para practicas en empresas.", icon: Route },
];

const fallbackResultados = [
  "Jovenes con experiencia laboral.",
  "Jovenes con habilidades laborales fortalecidas.",
  "Jovenes con estabilidad economica.",
  "Jovenes que contribuyen al desarrollo social.",
];

export default async function EmpleoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });
  const cms = await getProgramBySlug("empleo");

  const videos = await getVideos(locale);

  const videoTabs = [
    { id: "testimonios", label: t("videoTabTestimonios") },
    { id: "eventos", label: t("videoTabEventos") },
  ];

  const objetivos = cms?.objectives && cms.objectives.length > 0
    ? cms.objectives.map((o) => localize(o.description, locale) || "")
    : fallbackObjetivos;

  const componentes = cms?.components && cms.components.length > 0
    ? cms.components.map((c) => ({
        title: localize(c.title, locale) || "",
        desc: localize(c.description, locale) || "",
        icon: (c.icon && iconMap[c.icon]) || BookOpen,
      }))
    : fallbackComponentes;

  const resultados = cms?.results && cms.results.length > 0
    ? cms.results.map((r) => localize(r, locale) || "")
    : fallbackResultados;

  const heroImage = sanityImage(cms?.heroImage) || assetPath(fotos.empleo.hero);
  const logoImage = sanityImage(cms?.programLogo) || assetPath(fotos.programas.cards.fomento.image);
  // Empleo solo cuenta con una fotografia propia; se apoya en fotos reales de
  // actividades/talleres de ASCEP para no repetir siempre la misma imagen.
  const supportImage1 = assetPath(fotos.impacto.gallery[2]);
  const supportImage2 = assetPath(fotos.impacto.gallery[5]);

  return (
    <>
      {/* Hero — visual only */}
      <div className="relative h-[50vh] overflow-hidden bg-ley-purple sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        <YoutubeHeroBg
          videoUrl={homeVideos.programas["empleo"].hero || ""}
          fallbackImage={heroImage}
        />
      </div>

      {/* 2. Intro — video/foto izquierda + texto derecha */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — imagen/video */}
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={logoImage}
                  alt="Fomento para el Empleo"
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-ley-purple backdrop-blur-sm">
                  <Briefcase size={16} className="text-brand-orange" />
                  Programa
                </div>
              </div>
            </AnimatedSection>

            {/* Derecha — texto */}
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Programa
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
                Fomento para el Empleo <span className="text-brand-orange">Juvenil</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                Estrategias de formacion y vinculacion laboral para jovenes sin cuidados parentales.
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
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Programa</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#objetivo" className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-orange px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#d15a1a] hover:shadow-lg">
                  Conocer el programa
                </a>
                <a href="#componentes" className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-brand-orange/30 px-7 py-3 text-sm font-bold text-brand-orange transition-all hover:border-brand-orange/60 hover:bg-brand-orange/5">
                  Componentes del programa
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Que es — texto izquierda + imagen derecha */}
      <section id="objetivo" className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — texto */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Informacion
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                Que es el <span className="text-brand-orange">Programa?</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                <p>
                  El programa buscar desarrollar un modelo piloto, verificable y posteriormente replicable para promover capacidades y habilidades laborales y fortalecer la capacidad de empleabilidad y de vinculacion al mercado laboral de los y las adolescentes y jovenes en proceso de egreso o egresados del sistema de proteccion estatal colombiano- ICBF-.
                </p>
                <p>
                  A traves de un proceso de formacion que reconozca sus necesidades especiales y desventajas frente a la poblacion juvenil general y les permitan superar los deficits sociales, educativos y actitudinales, producto de largos anos de institucionalizacion, aislamiento social y separacion familiar.
                </p>
              </div>
            </AnimatedSection>

            {/* Derecha — imagen */}
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={heroImage}
                  alt="Fomento para el Empleo"
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

      {/* 4. Objetivo General — texto izquierda + imagen derecha (dark) */}
      <section className="section-dark section-bg-image relative overflow-hidden bg-ley-purple py-16 sm:py-20" style={{ "--section-bg-image": `url(${supportImage1})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — texto */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Objetivo
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl">
                Objetivo <span className="text-ley-orange">General</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Generar estrategias de formacion y vinculacion laboral en adolescentes y jovenes sin cuidados parentales que esten en la ultima instancia del sistema de proteccion estatal y egresados, que les permita encontrar un empleo digno para el desarrollo de su proyecto de vida y la insercion socio laboral.
              </p>
            </AnimatedSection>

            {/* Derecha — imagen */}
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={heroImage}
                  alt="Objetivo General"
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

      {/* 5. Objetivos Especificos */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Objetivos" title="Objetivos" highlight="Especificos" accent="orange" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
            {objetivos.map((item, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 rounded-3xl border border-border-default bg-bg-card p-6 transition-all hover:shadow-lg">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-brand-orange" />
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{item}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Componentes — dark grid */}
      <section id="componentes" className="section-dark section-bg-image relative overflow-hidden bg-ley-purple py-16 sm:py-20" style={{ "--section-bg-image": `url(${supportImage2})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Componentes" title="Componentes del" highlight="Programa" accent="white" dark />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {componentes.map((comp, i) => {
              const Icon = comp.icon;
              const accent = compAccents[i % compAccents.length];
              return (
                <AnimatedSection key={comp.title} direction="up" delay={i * 0.06}>
                  <div className="glass-card rounded-3xl p-6 transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent.bg}`}>
                        <Icon size={22} className={accent.icon} />
                      </div>
                      <h3 className="font-bold text-white">{comp.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">{comp.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Metas — bloque de color solido, sin repetir otra vez la misma foto */}
      <section className="relative overflow-hidden bg-brand-orange py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              Metas
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl">
              Metas del Componente Estrategia
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/85">
              Garantizar la inclusion laboral de los jovenes, articulando esfuerzos con el sector empresarial, de manera que sea un trabajo en conjunto donde la empresa suministra una persona que acompana al joven en su actividad laboral dentro de la compania.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              Nosotros suministramos un representante y en el proceso de evaluacion ambas partes determinan las debilidades y fortalezas del joven.
            </p>
          </AnimatedSection>
        </div>
      </section>
      {/* TODO: agregar fotografia o video real de jovenes en procesos de formacion/vinculacion laboral del programa de Empleo */}

      {/* 8. Resultados — dark */}
      <section className="section-dark section-bg-image relative overflow-hidden bg-ley-purple py-16 sm:py-20" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Resultados" title="Resultados" highlight="Esperados" accent="white" dark />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resultados.map((result, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="glass-card flex h-full flex-col items-center rounded-3xl p-6 text-center transition-all hover:-translate-y-1 hover:bg-white/15">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ley-orange/10">
                    <CheckCircle size={22} className="text-ley-orange" />
                  </div>
                  <p className="font-medium text-white/80">{result}</p>
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
