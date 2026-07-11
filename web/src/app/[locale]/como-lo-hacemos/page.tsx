import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { User, Home, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Como lo Hacemos - ASCEP",
};

const strategies = [
  {
    title: "Conexion y Participacion Activa",
    items: [
      "Conectamos a la comunidad con actores clave y jovenes egresados o proximos a egresar del sistema.",
      "Convocamos a egresados para que sean referentes positivos en la preparacion para la vida adulta.",
    ],
  },
  {
    title: "Formacion y Desarrollo de Capacidades",
    items: [
      "Facilitamos espacios y herramientas para desarrollar habilidades para la vida y autonomia.",
      "Apoyamos a operadores y centros de proteccion en el diseno de estrategias.",
    ],
  },
  {
    title: "Diseno y Ejecucion de Programas",
    items: [
      "Disenamos programas que responden a las necesidades especificas de adolescentes y jovenes bajo proteccion estatal.",
      "Generamos estrategias de articulacion con el ICBF y operadores de proteccion.",
    ],
  },
  {
    title: "Incidencia y Transformacion del Sistema",
    items: [
      "Impulsamos la transformacion de los cuidados alternativos en Colombia y Latinoamerica.",
      "Contribuimos con insumos y propuestas para influir en las politicas publicas.",
    ],
  },
];

export default function ComoLoHacemosPage() {
  return (
    <div>
      <PageHero
        bgImage="/images/encuentro-2025/GIS06448.JPG"
        tag="Metodologia"
        title="Como lo"
        highlight="Hacemos"
        subtitle="Para lograr nuestro proposito, implementamos estrategias clave que permiten fortalecer a los adolescentes y jovenes en transito y egresados del sistema de proteccion estatal."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Estrategias
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Nuestras estrategias clave
            </h2>
          </div>

          <div className="relative mb-12 overflow-hidden rounded-[10px]">
            <Image
              src="/images/encuentro-2025/GIS06452.JPG"
              alt=""
              width={1200}
              height={400}
              className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-purple/70" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="max-w-xl text-lg leading-relaxed text-white">
                Para lograr nuestro proposito, implementamos estrategias clave que
                permiten fortalecer a los adolescentes y jovenes en transito y
                egresados del sistema de proteccion estatal, conectandolos con
                oportunidades y la transformacion del modelo de cuidados alternativos
                en Colombia.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {strategies.map((strategy) => (
              <div key={strategy.title} className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md">
                <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{strategy.title}</h3>
                <ul className="space-y-2">
                  {strategy.items.map((item, i) => (
                    <li key={i} className="text-sm text-[var(--color-text-secondary)]">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Enfoque
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Enfoque Metodologico
            </h2>
          </div>

          <div className="relative mb-12 overflow-hidden rounded-[10px]">
            <Image
              src="/images/eventos/20241112_092855.jpg"
              alt=""
              width={1200}
              height={300}
              className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-purple/70" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="max-w-xl text-sm leading-relaxed text-white/90">
                Nuestro modelo esta centrado en el fortalecimiento del ser,
                implementando un modelo de intervencion centrado en la autonomia y la
                responsabilidad, donde la pertenencia y la asuncion de las propias
                acciones y consecuencias son pilares fundamentales del crecimiento
                personal.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Un Referente", desc: "Cada joven cuenta con una figura de acompanamiento", icon: User },
              { title: "Un Espacio", desc: "Un lugar seguro para el crecimiento y la formacion", icon: Home },
              { title: "Algo para Hacer", desc: "Oportunidades de accion y desarrollo personal", icon: Zap },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                    <Icon size={22} className="text-brand-purple" />
                  </div>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{item.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Galeria
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Nuestro trabajo en accion
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "/images/encuentro-2025/GIS06453.JPG",
              "/images/equipo-shoot/GIS08543.JPG",
              "/images/equipo-shoot/GIS08540.JPG",
            ].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt=""
                width={600}
                height={400}
                className="h-56 w-full rounded-[10px] object-cover transition-transform duration-500 hover:scale-105"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
