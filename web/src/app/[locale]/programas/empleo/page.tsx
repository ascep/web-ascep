import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { BookOpen, Briefcase, Building, Search, Compass, Route } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Fomento para el Empleo y Emprendimiento - ASCEP",
};

const objetivosEspecificos = [
  "Promover espacios de insercion social, capacidades y competencias aptas para la insercion laboral en adolescentes y jovenes.",
  "Impulsar la aplicacion de talleres experimentales que permitan a los jovenes conocer las ofertas laborales y su contenido a traves del ejercicio practico del area de conocimiento, talleres aplicados por las entidades competentes.",
  "Vincular laboralmente a los jovenes pre-egresados que se encuentran en la ultima instancia de egreso de proteccion y de aquellos que ya egresaron.",
  "Disminuir el fracaso que experimentan los jovenes por motivos de escasa educacion para desarrollarse en un determinado trabajo u oficio.",
];

const componentes = [
  {
    title: "Formacion y busqueda de empleo",
    desc: "Espacio para la formacion y busqueda de empleo con apoyo profesional.",
    icon: BookOpen,
  },
  {
    title: "Intermediacion laboral",
    desc: "Intermediacion laboral y entrenamiento en competencias y habilidades personales para el empleo.",
    icon: Briefcase,
  },
  {
    title: "Experiencias vocacionales",
    desc: "Acceso a experiencias vocacionales en empresa como primera toma de contacto con el mercado laboral.",
    icon: Building,
  },
  {
    title: "Identificacion de oportunidades",
    desc: "Identificacion de jovenes con pocas oportunidades de desarrollo.",
    icon: Search,
  },
  {
    title: "Orientacion laboral",
    desc: "Orientacion, informacion y planificacion de la busqueda laboral.",
    icon: Compass,
  },
  {
    title: "Itinerario formativo",
    desc: "Itinerario de formacion e intermediacion laboral para practicas en empresas.",
    icon: Route,
  },
];

const resultados = [
  "Jovenes con experiencia laboral.",
  "Jovenes con habilidades laborales fortalecidas.",
  "Jovenes con estabilidad economica.",
  "Jovenes que contribuyen al desarrollo social.",
];

export default function EmpleoPage() {
  return (
    <>
      <PageHero
        bgImage={assetPath("/images/eventos/20241112_102515.webp")}
        bgColor="bg-brand-orange"
        tag="Programa"
        title="Fomento para el Empleo Juvenil"
        subtitle="Estrategias de formacion y vinculacion laboral para jovenes sin cuidados parentales."
      />

      <section className="bg-brand-orange/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Informacion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Que es el <span className="text-brand-orange">Programa</span>?
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-[10px] bg-brand-orange/5 md:h-96">
              <Image src={assetPath("/images/programas/LOGO-FOMENTO.png")} alt="Fomento para el Empleo y Emprendimiento" width={240} height={150} className="h-auto max-h-48 w-auto max-w-[80%] object-contain" />
            </div>
            <div className="space-y-6 text-base text-[var(--color-text-secondary)]">
              <p>
                El programa busca desarrollar un modelo piloto, verificable y posteriormente replicable para promover capacidades y habilidades laborales y fortalecer la capacidad de empleabilidad y de vinculacion al mercado laboral de los y las adolescentes y jovenes en proceso de egreso o egresados del sistema de proteccion estatal colombiano- ICBF- a traves de un proceso de formacion que reconozca sus necesidades especiales y desventajas frente a la poblacion juvenil general y les permitan superar los deficits sociales, educativos y actitudinales, producto de largos anos de institucionalizacion, aislamiento social y separacion familiar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Objetivo
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Objetivo <span className="text-brand-orange">General</span>
            </h2>
          </div>
          <div className="mx-auto max-w-4xl rounded-[10px] border border-brand-orange/20 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Generar estrategias de formacion y vinculacion laboral en adolescentes y jovenes sin cuidados parentales que esten en la ultima instancia del sistema de proteccion estatal y egresados, que les permita encontrar un empleo digno para el desarrollo de su proyecto de vida y la insercion socio laboral, contribuyendo asi al cierre de brechas en el empleo juvenil.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-orange/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Objetivos
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Objetivos <span className="text-brand-orange">Especificos</span>
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {objetivosEspecificos.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-[10px] bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-orange/10 text-lg font-bold text-brand-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Componentes
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Componentes del <span className="text-brand-orange">Programa</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {componentes.map((comp) => {
              const Icon = comp.icon;
              return (
                <div key={comp.title} className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-orange/10">
                    <Icon size={22} className="text-brand-orange" />
                  </div>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{comp.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">{comp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-orange/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Metas
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Metas del Componente <span className="text-brand-orange">Estrategia</span>
            </h2>
          </div>
          <div className="mx-auto max-w-4xl rounded-[10px] border border-brand-orange/20 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Garantizar la inclusion laboral de los jovenes, articulando esfuerzos con el sector empresarial, de manera que sea un trabajo en conjunto donde la empresa suministra una persona que acompana al joven en su actividad laboral dentro de la compania, nosotros suministramos un representante y en el proceso de evaluacion ambas partes determinan las debilidades y fortalezas del joven.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Resultados
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Resultados <span className="text-brand-orange">Esperados</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resultados.map((result, i) => (
              <div key={i} className="rounded-[10px] border border-brand-orange/20 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                <p className="font-medium text-[var(--color-text-primary)]">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
