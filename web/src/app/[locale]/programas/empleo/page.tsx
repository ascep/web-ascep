import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import DossierHero from "@/components/DossierHero";
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

  return (
    <>
      <DossierHero
        bgImage={heroImage}
        tag="Programa"
        title="Fomento para el Empleo"
        highlight="Juvenil"
        subtitle="Estrategias de formacion y vinculacion laboral para jovenes sin cuidados parentales."
        accent="orange"
        primaryCta={{ label: "Conocer el programa", href: "#objetivo" }}
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Image
              src={logoImage}
              alt="ASCEP"
              width={112}
              height={112}
              className="h-16 w-16 rounded-2xl bg-white/15 object-contain p-2"
            />
            <div>
              <p className="text-xl font-extrabold">ASCEP</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-orange">
                Programa
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-purple-100">
            Estrategias de formacion y vinculacion laboral para jovenes sin cuidados parentales.
          </p>
          <a
            href="#componentes"
            className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
          >
            Componentes del programa
          </a>
        </div>
      </DossierHero>

      <section id="objetivo" className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Informacion"
            title="Que es el"
            highlight="Programa?"
            accent="orange"
          />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-ley-orange/5 md:h-96">
                <ImageParallax src={logoImage} alt="Fomento para el Empleo y Emprendimiento" width={240} height={150} className="h-auto max-h-48 w-auto max-w-[80%] object-contain" intensity={0.2} />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-6 text-base text-text-secondary">
                <p>
                  El programa buscar desarrollar un modelo piloto, verificable y posteriormente replicable para promover capacidades y habilidades laborales y fortalecer la capacidad de empleabilidad y de vinculacion al mercado laboral de los y las adolescentes y jovenes en proceso de egreso o egresados del sistema de proteccion estatal colombiano- ICBF- a traves de un proceso de formacion que reconozca sus necesidades especiales y desventajas frente a la poblacion juvenil general y les permitan superar los deficits sociales, educativos y actitudinales, producto de largos anos de institucionalizacion, aislamiento social y separacion familiar.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Objetivo"
            title="Objetivo"
            highlight="General"
            accent="white"
            dark
          />
          <AnimatedSection direction="up">
            <div className="mx-auto max-w-4xl rounded-3xl glass-card p-6 transition-all hover:bg-white/15">
              <p className="text-lg leading-relaxed text-white/70">
                Generar estrategias de formacion y vinculacion laboral en adolescentes y jovenes sin cuidados parentales que esten en la ultima instancia del sistema de proteccion estatal y egresados, que les permita encontrar un empleo digno para el desarrollo de su proyecto de vida y la insercion socio laboral, contribuyendo asi al cierre de brechas en el empleo juvenil.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Objetivos"
            title="Objetivos"
            highlight="Especificos"
            accent="orange"
          />
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {objetivos.map((item, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 rounded-3xl border border-ley-orange/20 bg-bg-card p-6 transition-all hover:shadow-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ley-orange/10">
                    <CheckCircle size={20} className="text-ley-orange" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">{item}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="componentes" className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Componentes"
            title="Componentes del"
            highlight="Programa"
            accent="white"
            dark
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {componentes.map((comp, i) => {
              const Icon = comp.icon;
              const accent = compAccents[i % compAccents.length];
              return (
                <AnimatedSection key={comp.title} direction="up" delay={i * 0.06}>
                  <div className="glass-card rounded-3xl p-6 text-center transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${accent.bg}`}>
                      <Icon size={22} className={accent.icon} />
                    </div>
                    <h4 className="mb-1 font-bold text-white">{comp.title}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{comp.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Metas"
            title="Metas del Componente"
            highlight="Estrategia"
            accent="orange"
          />
          <AnimatedSection direction="up">
            <div className="mx-auto max-w-4xl rounded-3xl border border-ley-orange/20 bg-bg-card p-6 transition-all hover:shadow-md">
              <p className="text-lg leading-relaxed text-text-secondary">
                Garantizar la inclusion laboral de los jovenes, articulando esfuerzos con el sector empresarial, de manera que sea un trabajo en conjunto donde la empresa suministra una persona que acompana al joven en su actividad laboral dentro de la compania, nosotros suministramos un representante y en el proceso de evaluacion ambas partes determinan las debilidades y fortalezas del joven.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Resultados"
            title="Resultados"
            highlight="Esperados"
            accent="white"
            dark
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
