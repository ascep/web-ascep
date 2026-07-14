import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { BookOpen, Users, DollarSign, Heart, Target, Star } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Avanza Joven - ASCEP",
  description:
    "Programa disenado para brindar apoyo y herramientas a adolescentes que viven institucionalizados, potenciando habilidades para la vida y la autonomia.",
  openGraph: {
    description:
      "Programa disenado para brindar apoyo y herramientas a adolescentes que viven institucionalizados, potenciando habilidades para la vida y la autonomia.",
  },
};

const objetivosEspecificos = [
  {
    title: "Fortalecer las habilidades comunicativas de los jovenes participantes",
    desc: "Desarrollar la escucha activa, la empatia, la expresion oral y escrita, la capacidad de argumentacion y persuasion, y la resolucion de conflictos, para que los jovenes puedan comunicarse de manera efectiva en diferentes contextos y relaciones interpersonales, mejorando sus habilidades sociales, profesionales y personales, y contribuyendo a su desarrollo integral.",
  },
  {
    title: "Proporcionar a los jovenes el conocimiento y comprension de sus derechos y deberes como ciudadanos",
    desc: "Brindar formacion en derechos y deberes civiles, politicos, sociales, culturales y economicos, la Constitucion y las rutas de atencion, facilitando el acceso a informacion actualizada sobre instituciones y normativas vigentes, la orientacion en la utilizacion de recursos y servicios publicos y privados, y el fomento de actitudes de participacion y compromiso ciudadano.",
  },
  {
    title: "Proporcionar a los jovenes participantes la educacion financiera necesaria para la gestion de sus finanzas personales",
    desc: "Desarrollar habilidades y conocimientos en la gestion de finanzas personales, incluyendo la comprension de conceptos financieros basicos, la elaboracion de presupuestos y la planificacion de gastos, el acceso a opciones de ahorro y credito responsable, la prevencion del endeudamiento y el conocimiento de los derechos y responsabilidades financieras.",
  },
  {
    title: "Brindar a los jovenes informacion basada en la ciencia sobre autocuidado, desarrollo fisico, salud mental y emocional",
    desc: "Proporcionar habitos y alimentacion saludables, mediante lecturas, ejercicios, actividades y practicas concretas, para contribuir en su desarrollo equilibrado e integral, incluyendo el autoconocimiento y el manejo de emociones.",
  },
  {
    title: "Proporcionar a los adolescentes herramientas para identificar sus metas y construir su proyecto de vida",
    desc: "Ayudar a los jovenes a diferenciar entre suenos, metas y objetivos realistas y realizables, a traves de actividades formativas y orientacion personalizada, con el fin de fortalecer su capacidad de planificacion y construccion de un proyecto de vida solido.",
  },
  {
    title: "Desarrollar habilidades de liderazgo en los jovenes",
    desc: "Brindar herramientas para que los jovenes puedan influir de manera positiva en su entorno, promover el cambio social y contribuir al bienestar de sus comunidades, al tiempo que fortalecen su propio sentido de pertenencia, a traves de actividades interactivas, talleres y oportunidades practicas.",
  },
];

const modules = [
  {
    code: "Modulo 1",
    title: "En voz alta",
    desc: "Comunicacion asertiva.",
    icon: BookOpen,
  },
  {
    code: "Modulo 2",
    title: "Ciudadanos Triple A",
    desc: "Derechos y deberes ciudadanos, conocimiento de la ciudad, servicios y oportunidades.",
    icon: Users,
  },
  {
    code: "Modulo 3",
    title: "Finanza Joven",
    desc: "Educacion financiera basica: presupuesto personal.",
    icon: DollarSign,
  },
  {
    code: "Modulo 4",
    title: "Vital Joven",
    desc: "Capacitacion en autocuidado, nutricion y buenas practicas para el desarrollo fisico, emocional y mental. Autoconocimiento y manejo de emociones.",
    icon: Heart,
  },
  {
    code: "Modulo 5",
    title: "Jovenes Aptos",
    desc: "Proyecto de vida.",
    icon: Target,
  },
  {
    code: "Modulo 6",
    title: "Jovenes Agentes de Cambio",
    desc: "Liderazgo y participacion comunitaria.",
    icon: Star,
  },
];

export default function AvanzaJovenPage() {
  return (
    <>
      <PageHero
        bgImage={assetPath("/images/programas/Avanza-1-scaled-1.webp")}
        tag="Programa"
        title="Avanza"
        highlight="Joven"
        subtitle="Un programa integral para jovenes en proceso de egreso del sistema de proteccion."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Informacion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Que es <span className="text-brand-purple">Avanza Joven</span>?
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative h-72 overflow-hidden rounded-[10px] md:h-96">
              <Image src={assetPath("/images/programas/Avanza-1-scaled-1.webp")} alt="Avanza Joven" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="space-y-6 text-base text-[var(--color-text-secondary)]">
              <p>
                Avanza Joven, una iniciativa disenada especialmente para brindar apoyo y herramientas a adolescentes que viven institucionalizados. Este programa esta enfocado en potenciar el desarrollo de habilidades para la vida, permitiendoles enfrentar los desafios y alcanzar su maximo potencial mientras transitan por esta etapa crucial y se preparan para asumir su vida fuera de la institucionalidad.
              </p>
              <p>
                Sabemos que vivir en un entorno institucional puede presentar desafios unicos y que enfrentarlos puede resultar abrumador. Sin embargo, creemos firmemente en el poder del crecimiento personal y en la capacidad de cada individuo para superar las dificultades. A traves de Avanza Joven, queremos ser un apoyo significativo en ese camino hacia la autonomia y la independencia, de manera progresiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Objetivo
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Objetivo <span className="text-brand-purple">General</span>
            </h2>
          </div>
          <div className="mx-auto max-w-4xl rounded-[10px] border border-brand-teal/20 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Fomentar y desarrollar las habilidades, competencias y recursos necesarios en jovenes que se acercan al limite de edad y deben egresar del sistema de proteccion, para que puedan ejercer su transicion hacia la vida independiente y autonoma, de manera responsable y progresiva.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Objetivos
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Objetivos <span className="text-brand-purple">Especificos</span>
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {objetivosEspecificos.map((obj, i) => (
              <div key={i} className="flex gap-4 rounded-[10px] bg-white p-6 shadow-sm transition-all hover:shadow-md">
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

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Modulos
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              <span className="text-brand-purple">Modulos</span> del Programa
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div key={mod.title} className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                    <Icon size={22} className="text-brand-purple" />
                  </div>
                  <span className="mb-2 inline-block rounded-full bg-brand-purple/10 px-3 py-0.5 text-xs font-semibold text-brand-purple">
                    {mod.code}
                  </span>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{mod.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
