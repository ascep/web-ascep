import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import DonationForm from "@/components/DonationForm";
import FaqAccordion from "@/components/FaqAccordion";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import { Heart, Users, Target, TrendingUp, Coffee, Sunrise, Star, Shield, Sparkles, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getImpactStats, getDonationTiers, getFaqByPage, getGalleryAlbums, localize } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Donar - ASCEP",
  description:
    "Tu donacion transforma vidas. Apoya a jovenes egresados del sistema de proteccion estatal con programas de formacion, apoyo psicosocial y oportunidades laborales.",
  openGraph: {
    description:
      "Tu donacion transforma vidas. Apoya a jovenes egresados del sistema de proteccion estatal con programas de formacion, apoyo psicosocial y oportunidades laborales.",
  },
};

const iconMap: Record<string, LucideIcon> = {
  Heart, Users, Target, TrendingUp, Coffee, Sunrise, Star, Shield, Sparkles,
};

const fallbackTiers = [
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

const tierColorMap: Record<string, { color: string; bg: string }> = {
  "#019E9F": { color: "text-brand-teal", bg: "bg-brand-teal/10" },
  "#005C5D": { color: "text-brand-teal", bg: "bg-brand-teal/10" },
  "#44BCC5": { color: "text-brand-teal", bg: "bg-brand-teal/10" },
  "#EC6620": { color: "text-brand-orange", bg: "bg-brand-orange/10" },
  "#F2CA11": { color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
};

const fallbackStats = [
  { icon: Users, value: "71.148", label: "NNA protegidos por el ICBF", color: "text-brand-teal", bg: "bg-brand-teal/10" },
  { icon: Heart, value: "13.000+", label: "Jovenes egresados", color: "text-brand-orange", bg: "bg-brand-orange/10" },
  { icon: Target, value: "5", label: "Programas activos", color: "text-brand-orange", bg: "bg-brand-orange/10" },
  { icon: TrendingUp, value: "2019", label: "Inicio de operaciones", color: "text-brand-purple", bg: "bg-brand-purple/10" },
];

const fallbackFaq = [
  {
    question: "¿Cómo se utiliza mi donación?",
    answer: "Tu donación se destina directamente a nuestros programas de formación, apoyo psicosocial y oportunidades laborales para jóvenes egresados del sistema de protección estatal. Publicamos informes periódicos de transparencia con el detalle de ingresos y gastos.",
  },
  {
    question: "¿Mi donación es deducible de impuestos?",
    answer: "ASCEP es una organización constituida legalmente en Colombia. Las donaciones pueden ser deducibles de impuestos. Consúltanos a contacto@ascep.org para recibir la certificación correspondiente y conocer los requisitos fiscales.",
  },
  {
    question: "¿Puedo hacer una donación recurrente?",
    answer: "Sí. Puedes configurar donaciones mensuales a través de Mercado Pago o Stripe seleccionando el monto de tu preferencia. También puedes contactarnos para establecer un Plan Padrino con aportes periódicos.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos pagos con tarjeta de crédito, débito (a través de Mercado Pago y Stripe), y también donaciones por PSE, Nequi y efectivo a través de Donatario.",
  },
  {
    question: "¿Cómo sé que mi donación llegó?",
    answer: "Recibirás un comprobante de tu transacción y, si nos proporcionas tu correo electrónico, te enviaremos información sobre el impacto de tu contribución. También publicamos informes de transparencia trimestrales.",
  },
];

export default async function DonarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donar" });

  const fallbackGallery = [
    { src: assetPath(fotos.donar.gallery[0].src), alt: "Jovenes en taller de habilidades" },
    { src: assetPath(fotos.donar.gallery[1].src), alt: "Acompanamiento psicosocial" },
    { src: assetPath(fotos.donar.gallery[2].src), alt: "Actividades grupales" },
    { src: assetPath(fotos.donar.gallery[3].src), alt: "Jornada educativa" },
    { src: assetPath(fotos.donar.gallery[4].src), alt: "Momentos de integracion" },
  ];

  const [cmsStats, cmsTiers, cmsFaq, cmsAlbums] = await Promise.all([
    getImpactStats(),
    getDonationTiers(),
    getFaqByPage("donar"),
    getGalleryAlbums(),
  ]);

  const stats = cmsStats.length > 0
    ? cmsStats.map((s) => {
        const Icon = s.icon && iconMap[s.icon] ? iconMap[s.icon] : Users;
        const v = s.value?.toLocaleString(locale) ?? "0";
        return {
          icon: Icon,
          value: v + (s.suffix || ""),
          label: localize(s.label, locale) || "",
          color: s.color ? tierColorMap[s.color]?.color || "text-brand-purple" : "text-brand-purple",
          bg: s.color ? tierColorMap[s.color]?.bg || "bg-brand-purple/10" : "bg-brand-purple/10",
        };
      })
    : fallbackStats;

  const tiers = cmsTiers.length > 0
    ? cmsTiers.map((t) => {
        const Icon = t.icon && iconMap[t.icon] ? iconMap[t.icon] : Heart;
        const c = t.color && tierColorMap[t.color] ? tierColorMap[t.color] : { color: "text-brand-purple", bg: "bg-brand-purple/10" };
        const label = localize(t.label, locale) || `$${t.monthlyCop?.toLocaleString(locale)}`;
        const desc = localize(t.description, locale) || "";
        return { icon: Icon, label, desc, color: c.color, bg: c.bg };
      })
    : fallbackTiers;

  const cmsGallery = cmsAlbums.length > 0
    ? cmsAlbums.flatMap((a) =>
        (a.images || []).map((img) => ({
          src: imageUrl(img) || "",
          alt: localize(img.alt, locale) || "",
        }))
      ).filter((g) => g.src)
    : [];
  const gallery = cmsGallery.length > 0 ? cmsGallery : fallbackGallery;

  const faqItems = cmsFaq?.items && cmsFaq.items.length > 0
    ? cmsFaq.items.map((item) => ({
        question: localize(item.question, locale) || "",
        answer: localize(item.answer, locale) || "",
      }))
    : fallbackFaq;

  return (
    <div>
      {/* Video hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={assetPath(fotos.donar.heroPoster)}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        >
          <source src={assetPath("/videos/FONDO-WEB-16-9.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/60 via-brand-purple/40 to-brand-purple/90" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-full border border-white/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {t("heroTag")}
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Impact stats */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{ "--section-bg-image": `url(${assetPath(fotos.donar.gallery[0].src)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("impactoTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("porque")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              {t("porqueDesc")}
            </p>
          </AnimatedSection>

          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} direction="up" delay={i * 0.08}>
                <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                    <stat.icon size={22} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    <CountUp end={parseInt(stat.value.replace(/[^0-9]/g, ""))} suffix={stat.value.includes("+") ? "+" : ""} />
                  </div>
                  <div className="mt-1 text-xs text-[var(--color-text-muted)]">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Donation tiers */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
              {t("pequenasAcciones")}
            </h3>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {tiers.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.label} direction="up" delay={i * 0.06}>
                  <div className="rounded-[10px] border border-brand-purple/10 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-[8px] ${item.bg}`}>
                      <Icon size={18} className={item.color} />
                    </div>
                    <div className="mb-1 text-lg font-bold text-[var(--color-text-primary)]">{item.label}</div>
                    <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">{item.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{ "--section-bg-image": `url(${assetPath(fotos.donar.gallery[2].src)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("asiTrabajamos")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("porque")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection direction="up" className="sm:col-span-2 sm:row-span-2">
              <div className="group relative h-full min-h-[300px] overflow-hidden rounded-[10px]">
                <ImageParallax
                  src={gallery[0]?.src || ""}
                  alt={gallery[0]?.alt || ""}
                  width={800}
                  height={600}
                  className="h-full w-full rounded-[10px] object-cover transition-transform duration-500 group-hover:scale-105"
                  intensity={0.12}
                  style={{ minHeight: "300px" }}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
            </AnimatedSection>
            {gallery.slice(1).map((img, i) => (
              <AnimatedSection key={img.src} direction="up" delay={i * 0.06}>
                <div className="group relative h-full min-h-[180px] overflow-hidden rounded-[10px]">
                  <ImageParallax
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="h-full w-full rounded-[10px] object-cover transition-transform duration-500 group-hover:scale-105"
                    intensity={0.1}
                    style={{ minHeight: "180px" }}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("eligeDonacion")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("eligeDonacion")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              {t("eligeDonacionDesc")}
            </p>
          </AnimatedSection>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <AnimatedSection direction="left">
                <div className="rounded-[10px] border border-brand-purple/10 bg-white p-8 shadow-sm">
                  <DonationForm />
                </div>
              </AnimatedSection>
            </div>

            <div className="space-y-4 lg:col-span-2">
              <AnimatedSection direction="right">
                <div className="rounded-[10px] bg-brand-purple p-6 text-white">
                  <h4 className="mb-4 text-lg font-bold">{t("donacionTransforma")}</h4>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      {t("donacionItem1")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      {t("donacionItem2")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      {t("donacionItem3")}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      {t("donacionItem4")}
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.1}>
                <div className="rounded-[10px] border border-brand-purple/10 bg-white p-6 shadow-sm">
                  <ImageParallax
                    src={assetPath(fotos.donar.gallerySecond)}
                    alt=""
                    width={400}
                    height={200}
                    className="mb-3 w-full rounded-[10px] object-cover"
                    intensity={0.1}
                    style={{ aspectRatio: "16/9" }}
                  />
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {t("donacionSideDesc")}
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.15}>
                <div className="rounded-[10px] border border-brand-purple/10 bg-white p-5 shadow-sm">
                  <h5 className="mb-2 text-sm font-bold text-[var(--color-text-primary)]">{t("transparenciaLabel")}</h5>
                  <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                    {t("transparenciaSideDesc")}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <AnimatedSection delay={0.2} className="mt-8">
            <div className="rounded-[10px] bg-brand-purple p-8 text-center text-white">
              <p className="mb-2 text-xl font-semibold">{t("gracias")}</p>
              <p className="text-sm text-white/70">
                {t("graciasDesc")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section-dark relative overflow-hidden bg-purple-bg py-20 section-bg-image"
        style={{ "--section-bg-image": `url(${assetPath(fotos.donar.gallerySecond)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Preguntas frecuentes sobre donaciones
            </h2>
          </AnimatedSection>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <FaqAccordion items={faqItems} />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}



