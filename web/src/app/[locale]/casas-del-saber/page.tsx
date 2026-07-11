import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Home, BookOpen, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Casas del Saber y la Transformacion - ASCEP",
};

export default async function CasasDelSaberPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <PageHero
        bgImage="/images/encuentro-2025/GIS06475.JPG"
        tag="Programa Integral"
        title="Casas del"
        highlight="Saber"
        subtitle="Un espacio de acompanamiento integral para jovenes en proceso de egreso del sistema de proteccion estatal."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 rounded-[10px] bg-brand-purple p-8 text-white">
            <p className="text-center text-lg font-medium italic leading-relaxed">
              &quot;Transformamos proyectos de vida mediante un modelo pedagogico,
              habitacional y autosostenible, orientado a fortalecer las
              capacidades de jovenes con experiencia de vida en el sistema de
              proteccion estatal.&quot;
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Navegacion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Secciones
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Modalidades de Participacion",
                href: "modalidades",
                desc: "Conoce las dos modalidades: con servicio habitacional y sin servicio habitacional.",
                icon: Home,
                color: "border-brand-teal",
              },
              {
                title: "Lineas Tematicas",
                href: "lineas",
                desc: "Cuatro lineas de formacion: Ciencias del Conocimiento, Tecnologia e Innovacion, Arte y Cultura, Desarrollo Humano y Liderazgo.",
                icon: BookOpen,
                color: "border-brand-orange",
              },
              {
                title: "Ruta de Egreso Progresivo",
                href: "ruta-egreso",
                desc: "El egreso no es un evento, es un proceso en tres fases: Acogida, Formacion y Consolidacion.",
                icon: Compass,
                color: "border-brand-purple/20",
              },
            ].map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={`/${locale}/casas-del-saber/${section.href}`}>
                  <div className={`rounded-[10px] border ${section.color} bg-bg-card p-6 transition-all hover:shadow-md`}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-purple/10">
                      <Icon size={20} className="text-brand-purple" />
                    </div>
                    <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{section.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{section.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Proposito
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Objetivo General
            </h2>
          </div>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Acompanar de manera integral a jovenes en proceso de egreso y
            egresados del sistema de proteccion estatal en su transicion hacia la
            vida adulta independiente, mediante un modelo pedagogico, habitacional
            y autosostenible que articula cinco areas de intervencion con cuatro
            lineas de formacion tematica, fortaleciendo su autonomia, bienestar
            emocional y capacidad de liderazgo para la construccion de proyectos
            de vida solidos, sostenibles y con sentido.
          </p>
        </div>
      </section>

      <section className="bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Estructura
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Capacidad y Roles
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { role: "Servicio habitacional", desc: "Maximo 8 jovenes por casa fisica. Espacio comunitario con zonas comunes equipadas." },
              { role: "Lineas tematicas", desc: "Hasta 12 participantes por linea (residentes + externos)." },
              { role: "Lideres tematicos", desc: "Un lider especializado por linea (4 en total)." },
              { role: "Equipo psicosocial", desc: "Psicologo/a y trabajador/a social que transversalizan el area 2 en todas las lineas." },
              { role: "Tutores/Mentores", desc: "Red de mentores externos vinculados por linea tematica." },
              { role: "Coordinacion general", desc: "Coordinador/a del programa responsable de la articulacion interinstitucional." },
            ].map((item) => (
              <div key={item.role} className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md">
                <h3 className="mb-2 font-bold text-brand-teal">{item.role}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
