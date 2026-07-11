import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Ruta de Egreso Progresivo - Casas del Saber - ASCEP",
};

const fases = [
  {
    fase: "Fase 1",
    periodo: "Meses 1 - 6",
    nombre: "Acogida y Diagnostico",
    items: [
      "Evaluacion psicosocial inicial.",
      "Construccion del itinerario individual.",
      "Vinculacion a la linea tematica.",
      "Regularizacion documental.",
      "Establecimiento de metas de corto plazo.",
      "Mapeo de la red de apoyo.",
    ],
  },
  {
    fase: "Fase 2",
    periodo: "Meses 7 - 18",
    nombre: "Formacion y Consolidacion",
    items: [
      "Desarrollo activo en la linea tematica.",
      "Formacion en la Escuela de Vida Independiente.",
      "Practicas laborales y primer acercamiento al mercado.",
      "Fortalecimiento de redes.",
      "Seguimiento psicoemocional trimestral.",
      "Construccion del proyecto productivo.",
    ],
  },
  {
    fase: "Fase 3",
    periodo: "Meses 19 - 24",
    nombre: "Egreso y Seguimiento",
    items: [
      "Plan de egreso personalizado.",
      "Consolidacion del proyecto laboral o emprendimiento.",
      "Transferencia progresiva de responsabilidades.",
      "Cierre de ciclo terapeutico.",
      "Integracion a redes de egresados.",
      "Seguimiento post-egreso a los 3, 6 y 12 meses.",
    ],
  },
];

const badgeColors = [
  "bg-brand-purple",
  "bg-brand-teal",
  "bg-brand-orange",
];

const borderColors = [
  "border border-brand-purple/20",
  "border border-brand-teal/20",
  "border border-brand-orange/20",
];

export default function RutaEgresoPage() {
  return (
    <div>
      <PageHero
        bgImage="/images/encuentro-2025/GIS06475.JPG"
        tag="Proceso"
        title="Ruta de Egreso"
        highlight="Progresivo"
        subtitle="El egreso no es un evento, es un proceso."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Fases
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Proceso de egreso progresivo
            </h2>
          </div>
          <div className="space-y-8">
            {fases.map((fase, index) => (
              <div
                key={fase.fase}
                className={`rounded-[10px] ${borderColors[index]} bg-bg-card p-6 transition-all hover:shadow-md sm:p-8`}
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${badgeColors[index]} text-sm font-bold text-white`}>
                    {index + 1}
                  </span>
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-brand-purple">
                      {fase.fase} | {fase.periodo}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                      {fase.nombre}
                    </h3>
                  </div>
                </div>
                <ul className="ml-14 grid gap-2 sm:grid-cols-2">
                  {fase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
