import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Users, Calendar, GraduationCap, Layers, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Impacto - ASCEP",
};

const impactStats = [
  { end: 71148, suffix: "", label: "NNA en PARD protegidos por el ICBF" },
  { end: 2019, suffix: "", label: "Inicio de operaciones" },
  { end: 13000, suffix: "+", label: "Jovenes egresados (2011-2024)" },
  { end: 5, suffix: "+", label: "Programas activos" },
  { end: 28, suffix: "", label: "Rango de edad de atencion" },
];

const statIcons = [Users, Calendar, GraduationCap, Layers, Target];

const statColors = [
  { bg: "bg-brand-purple/10", icon: "text-brand-purple", num: "text-brand-purple" },
  { bg: "bg-brand-teal/10", icon: "text-brand-teal", num: "text-brand-teal" },
  { bg: "bg-brand-orange/10", icon: "text-brand-orange", num: "text-brand-orange" },
  { bg: "bg-brand-orange/10", icon: "text-brand-orange", num: "text-brand-orange" },
  { bg: "bg-brand-purple/10", icon: "text-brand-purple", num: "text-brand-purple" },
];

const resultados = [
  "Politicas publicas que transformen los cuidados alternativos y la atencion a ninos, ninas, adolescentes y jovenes en transicion.",
  "Jovenes lideres que transformen y ejerzan su ciudadania, fortaleciendo el proyecto de vida de sus pares.",
  "Instalacion y funcionamiento de una mesa intersectorial para la autonomia progresiva.",
  "Jovenes con experiencia laboral, habilidades fortalecidas y estabilidad economica.",
];

const galeriaImages = [
  "/images/encuentro-2025/GIS06448.JPG",
  "/images/encuentro-2025/GIS06455.JPG",
  "/images/encuentro-2025/GIS06462.JPG",
  "/images/encuentro-2025/GIS06470.JPG",
  "/images/equipo-shoot/GIS08514.JPG",
  "/images/equipo-shoot/GIS08522.JPG",
  "/images/equipo-shoot/GIS08531.JPG",
  "/images/equipo-shoot/GIS08544.JPG",
  "/images/eventos/20241112_095957.jpg",
  "/images/eventos/20241112_100147.jpg",
  "/images/eventos/20241112_102405.jpg",
  "/images/eventos/20241112_115147.jpg",
];

export default function ImpactoPage() {
  return (
    <div>
      <PageHero
        bgImage="/images/encuentro-2025/GIS06455.JPG"
        tag="NUESTRO IMPACTO"
        title="Impacto en Cifras"
        subtitle="Conoce el alcance de nuestro trabajo y las metas que nos proponemos."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat, i) => {
              const Icon = statIcons[i];
              const colors = statColors[i];
              return (
                <div
                  key={i}
                  className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
                >
                  <div
                    className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-[10px] ${colors.bg}`}
                  >
                    <Icon size={24} className={colors.icon} />
                  </div>
                  <div className={`text-3xl font-bold ${colors.num}`}>
                    {stat.end}
                    {stat.suffix}
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              RESULTADOS
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Resultados <span className="text-brand-purple">Esperados</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {resultados.map((item, i) => (
              <div
                key={i}
                className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md"
              >
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              GALERIA
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Galeria <span className="text-brand-purple">de Impacto</span>
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {galeriaImages.map((src, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[10px]"
              >
                <Image
                  src={src}
                  alt=""
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
