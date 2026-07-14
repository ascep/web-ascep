import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Programas - ASCEP",
  description:
    "Descubre los programas de ASCEP disenados para acompanar a jovenes en su transicion a la vida adulta: incidencia, avanza joven, empleo y formacion.",
  openGraph: {
    description:
      "Descubre los programas de ASCEP disenados para acompanar a jovenes en su transicion a la vida adulta: incidencia, avanza joven, empleo y formacion.",
  },
};

const programs = [
  {
    title: "Incidencia y Participacion",
    slug: "incidencia",
    desc: "Desarrollamos acciones que involucran a actores clave y tomadores de decisiones en la transformacion de los cuidados alternativos.",
    image: assetPath("/images/programas/incidencia-scaled-1.webp"),
    label: "Liderazgo",
  },
  {
    title: "Avanza Joven",
    slug: "avanza-joven",
    desc: "Programa disenado para brindar apoyo y herramientas a adolescentes que viven institucionalizados, potenciando habilidades para la vida.",
    image: assetPath("/images/programas/Avanza-1-scaled-1.webp"),
    label: "Formacion",
  },
  {
    title: "Fomento para el Empleo y Emprendimiento",
    slug: "empleo",
    desc: "Modelo piloto para promover capacidades laborales y fortalecer la empleabilidad de jovenes en proceso de egreso del sistema de proteccion.",
    image: assetPath("/images/programas/LOGO-FOMENTO.png"),
    label: "Insercion",
  },
  {
    title: "Mi Cuerpo, Mi Sexualidad, Mi Decision",
    slug: "mi-cuerpo",
    desc: "Programa para proveer condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad.",
    image: assetPath("/images/programas/logo-MCSD.png"),
    label: "Bienestar",
  },
  {
    title: "Marco Politico",
    slug: "marco-politico",
    desc: "Los fundamentos conceptuales, normativos y estrategicos que guian nuestra accion institucional.",
    image: "",
    label: "Incidencia",
  },
];

export default async function ProgramasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <PageHero
        bgImage={assetPath("/images/encuentro-2025/GIS06470.webp")}
        tag="Programas"
        title="Nuestros Programas"
        subtitle="Disenados para acompanar a adolescentes y jovenes en su transicion hacia la vida adulta."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <div key={program.slug} className="group overflow-hidden rounded-[10px] bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  {program.image && program.image.endsWith(".webp") ? (
                    <Link href={`/${locale}/programas/${program.slug}`} className="relative block h-full">
                      <Image src={program.image} alt={program.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-4 left-4 rounded-[10px] bg-brand-purple px-3 py-1 text-xs font-semibold text-white z-10">{program.label}</span>
                    </Link>
                  ) : program.image ? (
                    <Link href={`/${locale}/programas/${program.slug}`} className="relative block h-full">
                      <div className="flex h-full w-full items-center justify-center bg-brand-teal/5">
                        <Image src={program.image} alt={program.title} width={160} height={100} className="h-auto max-h-32 w-auto max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <span className="absolute bottom-4 left-4 rounded-[10px] bg-brand-purple px-3 py-1 text-xs font-semibold text-white z-10">{program.label}</span>
                    </Link>
                  ) : (
                    <Link href={`/${locale}/programas/${program.slug}`} className="flex h-full w-full items-center justify-center bg-brand-purple/10">
                      <span className="text-5xl font-bold text-brand-purple/20">{program.title.charAt(0)}</span>
                    </Link>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">
                    {program.title}
                  </h3>
                  <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                    {program.desc}
                  </p>
                  <Link
                    href={`/${locale}/programas/${program.slug}`}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md"
                  >
                    Leer mas <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
