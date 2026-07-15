import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Heart, MapPin, Scale, Shield, AlertTriangle, Handshake, Users, Star, Brain, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getProgramBySlug, localize, sanityImage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Mi Cuerpo, Mi Sexualidad, Mi Decision - ASCEP",
  description:
    "Programa para proveer condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad de jovenes en el sistema de proteccion.",
  openGraph: {
    description:
      "Programa para proveer condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad de jovenes en el sistema de proteccion.",
  },
};

const iconMap: Record<string, LucideIcon> = {
  Heart, MapPin, Scale, Shield, AlertTriangle, Handshake, Users, Star, Brain,
};

const fallbackComponents = [
  { title: "Derechos sexuales y reproductivos", desc: "Promocion de los derechos sexuales y reproductivos.", icon: Heart },
  { title: "Ruta de atencion integral", desc: "Ruta de atencion integral en Salud Sexual y Reproductiva.", icon: MapPin },
  { title: "Enfoque y equidad de genero", desc: "Enfoque y equidad de genero.", icon: Scale },
  { title: "Violencias basadas en genero", desc: "Abordaje de las violencias basadas en genero y violencias sexuales.", icon: Shield },
  { title: "Prevencion de ITS/VIH/SIDA", desc: "Prevencion de ITS/VIH/SIDA.", icon: AlertTriangle },
  { title: "Consentimiento y relaciones saludables", desc: "Educacion en Consentimiento y Relaciones Saludables.", icon: Handshake },
  { title: "Diversidad sexual y afectiva", desc: "Educacion sobre Diversidad Sexual y Afectiva.", icon: Users },
  { title: "Autonomia y toma de decisiones", desc: "Promocion de la Autonomia y Toma de Decisiones.", icon: Star },
  { title: "Salud mental", desc: "Acceso a Servicios de Salud Mental.", icon: Brain },
];

const fallbackSecundarios = [
  "Desarrollar procesos formativos en los centros de proteccion.",
  "Capacitar al personal para que pueda desarrollar estrategias de Promocion de los DRSyR en los centros.",
  "Integrar los grupos de trabajo a otros grupos, colectivos y redes externas a ICBF y los centros de proteccion.",
];

export default async function MiCuerpoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cms = await getProgramBySlug("mi-cuerpo");

  const components = cms?.components && cms.components.length > 0
    ? cms.components.map((c: any) => ({
        title: localize(c.title, locale) || "",
        desc: localize(c.description, locale) || "",
        icon: (c.icon && iconMap[c.icon]) || Heart,
      }))
    : fallbackComponents;

  const objetivosSecundarios = cms?.secondaryObjectives && cms.secondaryObjectives.length > 0
    ? cms.secondaryObjectives.map((o: any) => localize(o, locale) || "")
    : fallbackSecundarios;

  return (
    <>
      <PageHero
        bgImage={sanityImage(cms?.heroImage) || assetPath("/images/eventos/20241112_092951.webp")}
        tag="Programa"
        title="Mi Cuerpo, Mi Sexualidad, Mi Vida"
        subtitle="Promovemos el ejercicio pleno de los derechos sexuales y reproductivos."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Informacion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Que es <span className="text-brand-purple">Mi Cuerpo, Mi Sexualidad, Mi Decision</span>?
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-[10px] bg-brand-purple/5 md:h-96">
              <Image src={sanityImage(cms?.programLogo) || assetPath("/images/programas/logo-MCSD.png")} alt="Mi Cuerpo, Mi Sexualidad, Mi Decision" width={240} height={150} className="h-auto max-h-48 w-auto max-w-[80%] object-contain" />
            </div>
            <div className="space-y-6 text-base text-[var(--color-text-secondary)]">
              <p>
                El programa esta disenado para proveer a los adolescentes y jovenes que viven bajo proteccion del Estado las condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad y el desarrollo en comunidad desde el punto de vista social, economico, cultural y politico.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Objetivos
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Objetivos <span className="text-brand-purple">Especificos</span>
            </h2>
          </div>
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-[10px] border border-brand-purple/20 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                Prevenir, promover, generar y desarrollar acciones que permitan las condiciones para el ejercicio pleno y autonomo de los derechos sexuales y reproductivos de los ninos, ninas, adolescentes y jovenes que viven bajo proteccion del Estado con enfoque de genero diferencial, contribuyendo a la preparacion para la vida adulta independiente.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {objetivosSecundarios.map((item, i) => (
                <div key={i} className="flex gap-4 rounded-[10px] bg-white p-6 shadow-sm transition-all hover:shadow-md border border-brand-purple/10">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-purple/10 text-lg font-bold text-brand-purple">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Componentes
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Componentes del <span className="text-brand-purple">Programa</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((comp) => {
              const Icon = comp.icon;
              return (
                <div key={comp.title} className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                    <Icon size={22} className="text-brand-purple" />
                  </div>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{comp.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">{comp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
