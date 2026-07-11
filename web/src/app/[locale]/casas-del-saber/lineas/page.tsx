import type { Metadata } from "next";
import { BookOpen, Monitor, Palette, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Lineas Tematicas - Casas del Saber - ASCEP",
};

const lineas = [
  {
    title: "Ciencias del Conocimiento",
    proposito: "Formar investigadores comunitarios capaces de leer, documentar y transformar su entorno social.",
    eje: "Investigacion aplicada, sistematizacion de experiencias y consultoria de datos comunitarios.",
    icon: BookOpen,
    bg: "bg-brand-purple/10",
    color: "text-brand-purple",
  },
  {
    title: "Tecnologia e Innovacion",
    proposito: "Desarrollar creatividad tecnologica e innovacion orientada a la solucion de problemas reales con impacto social.",
    eje: "Desarrollo de soluciones digitales, apps y productos tecnologicos para organizaciones y comunidades.",
    icon: Monitor,
    bg: "bg-brand-teal/10",
    color: "text-brand-teal",
  },
  {
    title: "Arte y Cultura",
    proposito: "Fomentar la identidad, la expresion artistica y el desarrollo de proyectos creativos con valor cultural y economico.",
    eje: "Produccion y comercializacion artistica, gestion cultural y servicios creativos.",
    icon: Palette,
    bg: "bg-brand-orange/10",
    color: "text-brand-orange",
  },
  {
    title: "Desarrollo Humano y Liderazgo",
    proposito: "Promover el bienestar emocional, el proyecto de vida y el liderazgo comunitario como ejes de transformacion social.",
    eje: "Facilitacion de talleres, consultoria en desarrollo organizacional y acompanamiento psicosocial comunitario.",
    icon: Heart,
    bg: "bg-brand-orange/10",
    color: "text-brand-orange",
  },
];

export default function LineasPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-purple py-24">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-teal/10" />
        <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-brand-orange/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Formacion
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Lineas <span className="text-brand-orange">Tematicas</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Las cuatro lineas tematicas son el eje de identidad y formacion del
            programa. Son comunidades de practica donde los jovenes aprenden
            haciendo, construyen proyectos colectivos y desarrollan capacidades para
            la vida y el trabajo en sectores especificos.
          </p>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Lineas
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Comunidades de practica
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {lineas.map((linea) => {
              const Icon = linea.icon;
              return (
                <div key={linea.title} className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] ${linea.bg}`}>
                    <Icon size={22} className={linea.color} />
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-[var(--color-text-primary)]">{linea.title}</h4>
                  <div className="mb-4 text-left">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Proposito</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{linea.proposito}</p>
                  </div>
                  <div className="text-left">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Eje productivo</p>
                    <p className="text-sm text-[var(--color-text-muted)]">{linea.eje}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
