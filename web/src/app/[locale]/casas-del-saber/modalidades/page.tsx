import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Home, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Modalidades - Casas del Saber - ASCEP",
};

export default function ModalidadesPage() {
  return (
    <div>
      <PageHero
        bgImage="/images/encuentro-2025/GIS06460.JPG"
        tag="Vinculacion"
        title="Modalidades de Participacion"
        subtitle="Dos formas de participar en las Casas del Saber."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Modalidades
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Dos formas de participar
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[10px] border border-brand-purple/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                <Home size={24} className="text-brand-purple" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[var(--color-text-primary)]">
                Con servicio habitacional (Residentes)
              </h3>
              <p className="mb-6 text-[var(--color-text-secondary)]">
                Para jovenes sin red de apoyo ni condiciones habitacionales
                estables. Acceden a una casa fisica compartida (maximo 8 personas
                por vivienda) como espacio seguro, pedagogico y comunitario.
              </p>
              <ul className="space-y-3">
                {[
                  "Capacidad habitacional: 8 jovenes por casa",
                  "Incluye: vivienda, alimentacion (gestionada autonomamente), acompanamiento integral y formacion en lineas tematicas",
                  "Duracion: hasta 24 meses, con egreso progresivo y planificado",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-teal/10">
                <Users size={24} className="text-brand-teal" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-brand-teal">
                Sin servicio habitacional (Externos)
              </h3>
              <p className="mb-6 text-[var(--color-text-secondary)]">
                Para jovenes con condiciones habitacionales basicas resueltas que
                requieren acompanamiento en su proceso de egreso y construccion de
                autonomia.
              </p>
              <ul className="space-y-3">
                {[
                  "No requieren residir en la casa",
                  "Incluye: acompanamiento psicosocial, socioeducativo, insercion laboral, coordinacion y formacion en lineas tematicas",
                  "Capacidad por linea tematica: hasta 12 participantes entre residentes y externos",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
