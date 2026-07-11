import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import DonationForm from "@/components/DonationForm";
import { Heart, Users, Target, TrendingUp, Coffee, Sunrise, Star, Shield, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Donar - ASCEP",
};

const GALLERY = [
  { src: "/images/encuentro-2025/GIS06460.JPG", alt: "Jovenes en taller de habilidades" },
  { src: "/images/encuentro-2025/GIS06450.JPG", alt: "Acompanamiento psicosocial" },
  { src: "/images/encuentro-2025/GIS06470.JPG", alt: "Actividades grupales" },
  { src: "/images/encuentro-2025/GIS06447.JPG", alt: "Jornada educativa" },
  { src: "/images/encuentro-2025/GIS06475.JPG", alt: "Momentos de integracion" },
];

const CREATIVE_IMPACT = [
  {
    icon: Coffee,
    label: "$5.000",
    desc: "Un cafe que conecta. Financia materiales para un taller de arte y expresion.",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
  },
  {
    icon: Sunrise,
    label: "$20.000",
    desc: "Un amanecer con esperanza. Apoya el desayuno y transporte de un joven a su formacion.",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    icon: Star,
    label: "$50.000",
    desc: "Una estrella que guia. Provee un kit de herramientas para la busqueda de empleo.",
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
  },
  {
    icon: Shield,
    label: "$100.000",
    desc: "Un escudo de oportunidades. Financia un mes de acompanamiento psicosocial individual.",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
  },
  {
    icon: Sparkles,
    label: "$200.000",
    desc: "Un futuro brillante. Cubre un taller completo de preparacion para la vida autonoma.",
    color: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
];

export default async function DonarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donar" });

  const stats = [
    { icon: Users, value: "71.148", label: "NNA protegidos por el ICBF", color: "text-brand-teal", bg: "bg-brand-teal/10" },
    { icon: Heart, value: "13.000+", label: "Jovenes egresados", color: "text-brand-orange", bg: "bg-brand-orange/10" },
    { icon: Target, value: "5", label: "Programas activos", color: "text-brand-orange", bg: "bg-brand-orange/10" },
    { icon: TrendingUp, value: "2019", label: "Inicio de operaciones", color: "text-brand-purple", bg: "bg-brand-purple/10" },
  ];

  return (
    <div>
      {/* Video hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.webp"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        >
          <source src="/videos/FONDO-WEB-16-9.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/60 via-brand-purple/40 to-brand-purple/90" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-full border border-white/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            DONACIONES
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Tu generosidad transforma vidas
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Cada aporte, por pequeno que sea, construye un futuro digno para
            jovenes que egresan del sistema de proteccion.
          </p>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              IMPACTO
            </span>
            <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
              {t("porque")}
            </h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              {t("porqueDesc")}
            </p>
          </div>

          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[10px] border border-brand-purple/10 bg-white p-6 text-center shadow-sm">
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] ${stat.bg}`}>
                  <stat.icon size={22} className={stat.color} />
                </div>
                <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                <div className="mt-1 text-xs text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Creative impact */}
          <div className="mb-16">
            <h3 className="mb-8 text-center text-2xl font-bold text-text-primary">
              Pequenas acciones, grandes cambios
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {CREATIVE_IMPACT.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[10px] border border-brand-purple/10 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-[8px] ${item.bg}`}>
                      <Icon size={18} className={item.color} />
                    </div>
                    <div className="mb-1 text-lg font-bold text-text-primary">{item.label}</div>
                    <p className="text-xs leading-relaxed text-text-secondary">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <h3 className="mb-8 text-center text-2xl font-bold text-text-primary">
              Asi trabajamos
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sm:col-span-2 sm:row-span-2">
                <Image
                  src={GALLERY[0].src}
                  alt={GALLERY[0].alt}
                  width={800}
                  height={600}
                  className="h-full w-full rounded-[10px] object-cover"
                  style={{ minHeight: "300px" }}
                />
              </div>
              {GALLERY.slice(1).map((img) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="h-full w-full rounded-[10px] object-cover"
                  style={{ minHeight: "180px" }}
                />
              ))}
            </div>
          </div>

          {/* Form section */}
          <div className="mb-8 grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-[10px] bg-white p-8 shadow-sm">
                <h3 className="mb-2 text-center text-xl font-bold text-text-primary">
                  Elige tu donacion
                </h3>
                <p className="mb-6 text-center text-sm text-text-muted">
                  Selecciona una opcion o ingresa el monto que deseas donar
                </p>
                <DonationForm />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="rounded-[10px] bg-brand-purple p-6 text-white">
                  <h4 className="mb-4 text-lg font-bold">Tu donacion transforma vidas</h4>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      Materiales educativos y talleres de formacion
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      Acompanamiento psicosocial individual
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      Programas de insercion laboral
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      Incidencia politica para mejorar el sistema
                    </li>
                  </ul>
                </div>

                <div className="rounded-[10px] border border-brand-purple/10 bg-white p-6 shadow-sm">
                  <Image
                    src="/images/encuentro-2025/GIS06475.JPG"
                    alt=""
                    width={400}
                    height={200}
                    className="mb-3 w-full rounded-[10px] object-cover"
                    style={{ aspectRatio: "16/9" }}
                  />
                  <p className="text-sm leading-relaxed text-text-secondary">
                    Trabajamos para que ningun joven enfrente solo su egreso del
                    sistema de proteccion. Cada donacion es un paso hacia una
                    vida autonoma y digna.
                  </p>
                </div>

                <div className="rounded-[10px] border border-brand-purple/10 bg-white p-5 shadow-sm">
                  <h5 className="mb-2 text-sm font-bold text-text-primary">Transparencia</h5>
                  <p className="text-xs leading-relaxed text-text-muted">
                    ASCEP rinde cuentas de cada donacion recibida. Revisa
                    nuestros informes financieros y de impacto en la seccion de
                    transparencia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] bg-brand-purple p-8 text-center text-white">
            <p className="mb-2 text-xl font-semibold">{t("gracias")}</p>
            <p className="text-sm text-white/70">
              Juntos construimos un futuro donde cada joven tenga las herramientas
              para volar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
