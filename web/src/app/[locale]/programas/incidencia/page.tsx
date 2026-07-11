import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { ArrowUpRight, Home, Search, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Incidencia y Participacion - ASCEP",
};

const objetivos = [
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

const lineas = [
  {
    title: "Autonomia Progresiva",
    desc: "Trabajamos en el desarrollo e implementacion de programas y recursos que empoderen a las personas con experiencia en el cuidado y a los jovenes sin cuidado parental, brindandoles herramientas para alcanzar su independencia personal, economica y social.",
    icon: ArrowUpRight,
  },
  {
    title: "Cuidados Alternativos, Desinstitucionalizacion y Prevencion a la Separacion Familiar",
    desc: "Abogamos por la implementacion y fortalecimiento de politicas que fomenten el cuidado basado en la familia como la principal alternativa para los ninos sin cuidado parental en Colombia, como recurso para evitar la desinstitucionalizacion.",
    icon: Home,
  },
  {
    title: "Investigacion y Diseno de Politicas Publicas",
    desc: "Realizamos investigaciones para comprender mejor las necesidades y desafios de las personas con experiencia en el cuidado y los ninos sin cuidado parental en Colombia, para el diseno de politicas publicas mas efectivas y orientadas a garantizar los derechos de los jovenes en transicion y egresados de proteccion.",
    icon: Search,
  },
  {
    title: "Participacion Intersectorial",
    desc: "Facilitar espacios de dialogo y colaboracion entre diferentes sectores y actores relevantes, como organizaciones de la sociedad civil, instituciones gubernamentales, academicos y jovenes, con el fin de promover la participacion activa y la construccion conjunta de soluciones.",
    icon: Users,
  },
];

const resultados = [
  "Politicas publicas que transformen los cuidados alternativos y la atencion a ninos, ninas, adolescentes y jovenes en transicion.",
  "Jovenes lideres que transformen y ejerzan su ciudadania, fortaleciendo el proyecto de vida de sus pares.",
  "Instalacion y funcionamiento de una mesa intersectorial para la autonomia progresiva, que permita la colaboracion y coordinacion entre diferentes actores y sectores involucrados.",
];

export default function IncidenciaPage() {
  return (
    <>
      <PageHero
        bgImage="/images/programas/incidencia-scaled-1.jpg"
        tag="Programa"
        title="Incidencia y Participacion"
        subtitle="Fortalecemos la participacion ciudadana y la incidencia politica de los jovenes egresados."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Informacion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Que es <span className="text-brand-purple">Incidencia y Participacion</span>?
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative h-72 overflow-hidden rounded-[10px] md:h-96">
              <Image src="/images/programas/incidencia-scaled-1.jpg" alt="Incidencia y Participacion" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="space-y-6 text-base text-[var(--color-text-secondary)]">
              <p>
                El Programa de Incidencia y Participacion tiene como objetivo desarrollar acciones que involucren a los actores clave y tomadores de decisiones en la construccion de estrategias que contribuyan a la transformacion de los cuidados alternativos, la no separacion familiar y la autonomia progresiva. Ademas, se debe realizar investigaciones que proporcione insumos para garantizar acciones claras sobre los tres ejes mencionados anteriormente.
              </p>
              <p>
                Como entidad de egresados, nos enfrentamos a desafios significativos en el fortalecimiento de los procesos de acompanamiento durante la transicion a la vida autonoma, la seleccion de equipos interdisciplinarios vinculados a los procesos de proteccion y el fortalecimiento de los cuidados alternativos en Colombia. Es precisamente por esta razon que, desde el ano 2019, hemos venido proponiendo el diseno y la promocion de un proyecto de ley que establezca un programa integral de acompanamiento para pre-egresados y garantice unos estandares minimos para aquellos que han egresado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Objetivos
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Objetivos <span className="text-brand-purple">Especificos</span>
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4">
            {objetivos.map((obj, i) => (
              <div key={i} className="flex gap-4 rounded-[10px] bg-white p-6 shadow-sm transition-all hover:shadow-md border border-brand-purple/10">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-purple/10 text-lg font-bold text-brand-purple">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h5 className="font-bold text-[var(--color-text-primary)]">{obj.title}</h5>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{obj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Lineas
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Lineas de <span className="text-brand-purple">Accion</span>
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              El programa se estructura en torno a las siguientes lineas de accion
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {lineas.map((linea) => {
              const Icon = linea.icon;
              return (
                <div key={linea.title} className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                    <Icon size={22} className="text-brand-purple" />
                  </div>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{linea.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">{linea.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Resultados
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Resultados <span className="text-brand-purple">Esperados</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {resultados.map((r, i) => (
              <div key={i} className="rounded-[10px] border border-brand-purple/20 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <p className="text-[var(--color-text-secondary)]">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
