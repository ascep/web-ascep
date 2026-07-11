import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Building2, Globe, Briefcase, GraduationCap, Heart, Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "Aliados - ASCEP",
};

const partnerLogos = [
  { src: "/images/aliados/colombia.svg", alt: "Colombia" },
  { src: "/images/aliados/empower-logo-blue.svg", alt: "Empower" },
  { src: "/images/aliados/gapi-icesi-logo.jpg", alt: "GAPI Icesi" },
  { src: "/images/aliados/Vaki.png", alt: "Vaki" },
];

const sectors = [
  { sector: "Sector Publico", desc: "ICBF, Ministerios, entidades gubernamentales.", aliados: "Instituto Colombiano de Bienestar Familiar", icon: Building2 },
  { sector: "Cooperacion Internacional", desc: "Organismos internacionales y agencias de cooperacion.", aliados: "UNICEF, OIM, USAID", icon: Globe },
  { sector: "Sector Privado", desc: "Empresas comprometidas con la responsabilidad social.", aliados: "Empresas aliadas", icon: Briefcase },
  { sector: "Academia", desc: "Universidades y centros de investigacion.", aliados: "Instituciones educativas", icon: GraduationCap },
  { sector: "Organizaciones Sociales", desc: "ONG y organizaciones de la sociedad civil.", aliados: "Red de organizaciones", icon: Heart },
  { sector: "Medios de Comunicacion", desc: "Aliados para la difusion y sensibilizacion.", aliados: "Medios aliados", icon: Radio },
];

export default function AliadosPage() {
  return (
    <div>
      <PageHero
        bgImage="/images/eventos/20241112_092855.jpg"
        tag="Aliados Estrategicos"
        title="Aliados Estrategicos"
        subtitle="Creemos en el poder de las alianzas para generar cambios profundos y sostenibles. Trabajamos con actores del sector publico, privado, academia y cooperacion internacional."
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Nuestros Aliados
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Organizaciones que confian en nosotros
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerLogos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center rounded-[10px] bg-bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={60}
                  className="h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Sectores
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Areas de Alianza
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((item) => {
              const Icon = item.icon;
              return (
                <div className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md" key={item.sector}>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                    <Icon size={22} className="text-brand-purple" />
                  </div>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{item.sector}</h4>
                  <p className="mb-2 text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">{item.aliados}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
