import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Areas de Intervencion - Casas del Saber - ASCEP",
};

const areas = [
  {
    num: 1,
    title: "Cobertura de Necesidades Basicas",
    desc: "Garantizar las condiciones minimas de bienestar: vivienda, alimentacion, salud y emergencias para que el joven pueda enfocarse en su proceso formativo y de insercion.",
  },
  {
    num: 2,
    title: "Acompanamiento Psicosocial Integral y Continuo",
    desc: "Brindar acompanamiento emocional sostenido a traves de evaluacion psicosocial, psicoterapia individual y grupal, espacios colectivos de cuidado y un plan psicoemocional personalizado.",
  },
  {
    num: 3,
    title: "Acompanamiento Socioeducativo",
    desc: "Fortalecer la autonomia educativa, el proyecto de vida y el plan de egreso progresivo mediante tutorias integrales, la Escuela de Vida Independiente y guia vocacional.",
  },
  {
    num: 4,
    title: "Insercion Socio-Laboral",
    desc: "Facilitar la incorporacion al mundo del trabajo a traves de talleres de empleo, evaluacion vocacional, alianzas con el sector privado, practicas laborales y acceso a certificaciones tecnicas.",
  },
  {
    num: 5,
    title: "Coordinacion de Recursos e Incidencia",
    desc: "Articular esfuerzos interinstitucionales con ICBF, sector educativo, salud y cooperacion internacional. Incluye mapa de aliados, acompanamiento juridico-administrativo y monitoreo individualizado.",
  },
];

const borderColors = [
  "border-brand-purple/20",
  "border-brand-teal/20",
  "border-brand-orange/20",
  "border-brand-orange/20",
  "border-brand-purple/20",
];

export default function AreasPage() {
  return (
    <div>
      <PageHero
        bgImage="/images/encuentro-2025/GIS06448.JPG"
        tag="Intervencion"
        title="Areas de"
        highlight="Intervencion"
        subtitle="Las cinco areas constituyen la base operativa del programa y aplican a todos los jovenes vinculados, independientemente de su modalidad o linea tematica."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Areas
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Las cinco areas de intervencion
            </h2>
          </div>
          <div className="space-y-6">
            {areas.map((area) => (
              <div
                key={area.num}
                className={`rounded-[10px] border ${borderColors[area.num - 1]} bg-bg-card p-6 transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-brand-purple text-lg font-bold text-white">
                    {area.num}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">{area.title}</h3>
                    <p className="text-[var(--color-text-secondary)]">{area.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
