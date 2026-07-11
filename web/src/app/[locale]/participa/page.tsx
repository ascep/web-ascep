import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Users, HeartHandshake, Handshake, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Participa - ASCEP",
};

const ways = [
  {
    title: "Para Jovenes",
    desc: "Si eres un joven en proceso de egreso o egresado del sistema de proteccion, queremos conocerte.",
    items: [
      "Participa en nuestros programas",
      "Accede a formacion y acompanamiento",
      "Conecta con otros egresados",
    ],
    icon: Users,
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
  },
  {
    title: "Para Voluntarios",
    desc: "Tu tiempo y talento pueden hacer la diferencia en la vida de un joven.",
    items: [
      "Mentorias y acompanamiento",
      "Talleres y formaciones",
      "Apoyo en proyectos",
    ],
    icon: HeartHandshake,
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    title: "Para Aliados",
    desc: "Si representas a una organizacion, empresa o institucion, sumate a nuestra red.",
    items: [
      "Alianzas estrategicas",
      "Patrocinio de programas",
      "Co-inversion en proyectos",
    ],
    icon: Handshake,
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
  },
  {
    title: "Para Donantes",
    desc: "Tu contribucion economica nos permite seguir transformando vidas.",
    items: [
      "Donaciones unicas",
      "Donaciones recurrentes",
      "Apadrinamiento de programas",
    ],
    icon: DollarSign,
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
  },
];

export default async function ParticipaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div>
      <PageHero
        bgImage="/images/eventos/20241112_103406.jpg"
        tag="Involucrate"
        title="Formas de Participar"
        subtitle="Hay muchas maneras de sumarte a nuestra causa y contribuir a la transformacion del sistema de proteccion estatal en Colombia."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-12 overflow-hidden rounded-[10px]">
            <Image
              src="/images/equipo-shoot/GIS08547.JPG"
              alt=""
              width={1200}
              height={300}
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-teal/70" />
            <div className="absolute inset-0 flex items-center p-8">
              <p className="max-w-2xl text-lg leading-relaxed text-white">
                Hay muchas formas de sumarte a nuestra causa y contribuir a la
                transformacion del sistema de proteccion estatal en Colombia.
              </p>
            </div>
          </div>
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Como Sumarte
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Elige tu forma de participar
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {ways.map((way) => {
              const Icon = way.icon;
              return (
                <div key={way.title} className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] ${way.bg}`}>
                    <Icon size={22} className={way.color} />
                  </div>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{way.title}</h4>
                  <p className="mb-4 text-sm text-[var(--color-text-muted)]">{way.desc}</p>
                  <ul className="space-y-1">
                    {way.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-text-muted)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-16 rounded-[10px] bg-brand-purple p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">Listo para participar?</h2>
            <p className="mb-6 text-white/80">
              Escribenos y te contaremos como puedes sumarte.
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center rounded-[10px] bg-bg-card px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-bg-elevated"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
