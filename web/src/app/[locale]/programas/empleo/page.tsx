import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import { BookOpen, Briefcase, Building, Search, Compass, Route, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getProgramBySlug, localize, sanityImage } from "@/lib/sanity/fetch";

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
  const cms = await getProgramBySlug("empleo");

  const objetivos = cms?.objectives && cms.objectives.length > 0
    ? cms.objectives.map((o: any) => localize(o.description, locale) || "")
    : fallbackObjetivos;

  const componentes = cms?.components && cms.components.length > 0
    ? cms.components.map((c: any) => ({
        title: localize(c.title, locale) || "",
        desc: localize(c.description, locale) || "",
        icon: (c.icon && iconMap[c.icon]) || BookOpen,
      }))
    : fallbackComponentes;

  const resultados = cms?.results && cms.results.length > 0
    ? cms.results.map((r: any) => localize(r, locale) || "")
    : fallbackResultados;

  return (
    <>
      <PageHero
        bgImage={sanityImage(cms?.heroImage) || assetPath(fotos.empleo.hero)}
        bgColor="bg-brand-orange"
        tag="Programa"
        title="Fomento para el Empleo Juvenil"
        subtitle="Estrategias de formacion y vinculacion laboral para jovenes sin cuidados parentales."
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Informacion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Que es el <span className="text-brand-orange">Programa</span>?
            </h2>
          </AnimatedSection>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <AnimatedSection direction="left">
              <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-[10px] bg-brand-orange/5 md:h-96">
                <ImageParallax src={sanityImage(cms?.programLogo) || assetPath(fotos.programas.cards.fomento.image)} alt="Fomento para el Empleo y Emprendimiento" width={240} height={150} className="h-auto max-h-48 w-auto max-w-[80%] object-contain" intensity={0.2} />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-6 text-base text-[var(--color-text-secondary)]">
                <p>
                  El programa buscar desarrollar un modelo piloto, verificable y posteriormente replicable para promover capacidades y habilidades laborales y fortalecer la capacidad de empleabilidad y de vinculacion al mercado laboral de los y las adolescentes y jovenes en proceso de egreso o egresados del sistema de proteccion estatal colombiano- ICBF- a traves de un proceso de formacion que reconozca sus necesidades especiales y desventajas frente a la poblacion juvenil general y les permitan superar los deficits sociales, educativos y actitudinales, producto de largos anos de institucionalizacion, aislamiento social y separacion familiar.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.empleo.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Objetivo
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Objetivo <span className="text-white/80">General</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up">
            <div className="mx-auto max-w-4xl rounded-[10px] glass-card p-6 transition-all hover:bg-white/15">
              <p className="text-lg leading-relaxed text-white/70">
                Generar estrategias de formacion y vinculacion laboral en adolescentes y jovenes sin cuidados parentales que esten en la ultima instancia del sistema de proteccion estatal y egresados, que les permita encontrar un empleo digno para el desarrollo de su proyecto de vida y la insercion socio laboral, contribuyendo asi al cierre de brechas en el empleo juvenil.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Objetivos
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Objetivos <span className="text-brand-orange">Especificos</span>
            </h2>
          </AnimatedSection>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {objetivos.map((item, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 rounded-[10px] border border-brand-orange/20 bg-bg-card p-6 transition-all hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-orange/10 text-lg font-bold text-brand-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)]">{item}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.empleo.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Componentes
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Componentes del <span className="text-white/80">Programa</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {componentes.map((comp, i) => {
              const Icon = comp.icon;
              return (
                <AnimatedSection key={comp.title} direction="up" delay={i * 0.06}>
                  <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                      <Icon size={22} className="text-brand-secondary" />
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

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Metas
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Metas del Componente <span className="text-brand-orange">Estrategia</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up">
            <div className="mx-auto max-w-4xl rounded-[10px] border border-brand-orange/20 bg-bg-card p-6 transition-all hover:shadow-md">
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                Garantizar la inclusion laboral de los jovenes, articulando esfuerzos con el sector empresarial, de manera que sea un trabajo en conjunto donde la empresa suministra una persona que acompana al joven en su actividad laboral dentro de la compania, nosotros suministramos un representante y en el proceso de evaluacion ambas partes determinan las debilidades y fortalezas del joven.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.empleo.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Resultados
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Resultados <span className="text-white/80">Esperados</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resultados.map((result, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                  <p className="font-medium text-white/80">{result}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}



