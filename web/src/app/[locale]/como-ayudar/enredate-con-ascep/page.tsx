import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import EnredateHero from "./EnredateHero";
import EnredatePilares from "./EnredatePilares";
import EnredateAbout from "./EnredateAbout";
import VideoGrid from "./VideoGrid";
import MiniDocumentalesSection from "@/components/MiniDocumentalesSection";
import EnredateActividades from "./EnredateActividades";
import EnredateStats from "./EnredateStats";
import EnredateTestimonials from "./EnredateTestimonials";
import DonationForm from "@/components/DonationForm";
import BankTransferOption from "./BankTransferOption";
import PodcastSection from "./PodcastSection";
import PadProfileCard from "@/components/PadProfileCard";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";
import ImageParallax from "@/components/ImageParallax";
import { ArrowRight, Briefcase, CheckCircle, Heart, Star, Users, UserPlus, DollarSign, FileText, ArrowDown, Quote, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, getPadrinos, localize } from "@/lib/sanity/fetch";
import { homeVideos } from "@/data/homeVideos";

const VOLUNTARIADO_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc-EXSof_cbaIWX01248FIRCmmB-JSnmOSJxQxMLXXolM-zuQ/viewform";

const padrinoSteps = [
  { icon: UserPlus, titleKey: "paso1", descKey: "paso1Desc", color: "text-brand-primary", bg: "bg-brand-primary/15" },
  { icon: DollarSign, titleKey: "paso2", descKey: "paso2Desc", color: "text-brand-orange", bg: "bg-brand-orange/15" },
  { icon: FileText, titleKey: "paso3", descKey: "paso3Desc", color: "text-brand-teal", bg: "bg-brand-teal/15" },
  { icon: Heart, titleKey: "paso4", descKey: "paso4Desc", color: "text-brand-yellow", bg: "bg-brand-yellow/15" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("enredateConAscep.title"),
    description: t("enredateConAscep.description"),
    openGraph: {
      description: t("enredateConAscep.description"),
    },
  };
}

export default async function EnredatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "enredateConAscep" });
  const tVol = await getTranslations({ locale, namespace: "voluntariado" });
  const tPad = await getTranslations({ locale, namespace: "planPadrino" });
  const volData = await getPageContent("voluntariado");
  const padrinos = await getPadrinos();

  const slides = [
    { tag: t("heroSlide1Tag"), title: t("heroSlide1Title"), desc: t("heroSlide1Desc") },
    { tag: t("heroSlide2Tag"), title: t("heroSlide2Title"), desc: t("heroSlide2Desc") },
    { tag: t("heroSlide3Tag"), title: t("heroSlide3Title"), desc: t("heroSlide3Desc") },
  ];

  const pilares = [
    { title: t("pilar1Title"), desc: t("pilar1Desc") },
    { title: t("pilar2Title"), desc: t("pilar2Desc") },
    { title: t("pilar3Title"), desc: t("pilar3Desc") },
    { title: t("pilar4Title"), desc: t("pilar4Desc") },
  ];

  const aboutItems = [t("aboutItem1"), t("aboutItem2"), t("aboutItem3")];

  const actividades = [
    { title: t("actividad1Title"), desc: t("actividad1Desc"), cta: t("actividad1Cta") },
    { title: t("actividad2Title"), desc: t("actividad2Desc"), cta: t("actividad2Cta") },
    { title: t("actividad3Title"), desc: t("actividad3Desc"), cta: t("actividad3Cta") },
    { title: t("actividad4Title"), desc: t("actividad4Desc"), cta: t("actividad4Cta") },
  ];

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
    { value: t("stat4Value"), label: t("stat4Label") },
  ];

  const testimonios = [
    { text: t("testimonio1Text"), author: t("testimonio1Author"), role: t("testimonio1Role") },
    { text: t("testimonio2Text"), author: t("testimonio2Author"), role: t("testimonio2Role") },
    { text: t("testimonio3Text"), author: t("testimonio3Author"), role: t("testimonio3Role") },
  ];

  const miniDocs = [
    { youtubeId: homeVideos.playlists["enredate-mini-doc-1"] || "", title: "Comoleider" },
    { youtubeId: homeVideos.playlists["enredate-mini-doc-2"] || "", title: "Emprendedores" },
    { youtubeId: homeVideos.playlists["enredate-mini-doc-3"] || "", title: "Liderazgo Juvenil" },
  ].filter((d) => d.youtubeId);

  const volRoles: { title: string; desc: string; icon: LucideIcon; color: string; bg: string }[] = [
    { title: tVol("rol1"), desc: tVol("rol1Desc"), icon: Heart, color: "text-ley-teal", bg: "bg-ley-teal/10" },
    { title: tVol("rol2"), desc: tVol("rol2Desc"), icon: Star, color: "text-ley-orange", bg: "bg-ley-orange/10" },
    { title: tVol("rol3"), desc: tVol("rol3Desc"), icon: Briefcase, color: "text-ley-cyan", bg: "bg-ley-cyan/10" },
    { title: tVol("rol4"), desc: tVol("rol4Desc"), icon: Users, color: "text-ley-yellow", bg: "bg-ley-yellow/15" },
  ];

  const heroImage = assetPath(fotos.enredate.gallery[0]);

  return (
    <div>
      {/* 1. Hero */}
      <EnredateHero
        slides={slides}
        ctaLabel={t("heroCta")}
        ctaHref="#donar"
        secondaryLabel={t("heroSecondary")}
        secondaryHref="#voluntariado"
      />

      {/* 2. Que es EnredATe — 2 columnas */}
      <EnredateAbout
        locale={locale}
        tag={t("aboutTag")}
        title={t("aboutTitle")}
        desc={t("aboutDesc")}
        items={aboutItems}
        ctaLabel={t("aboutCta")}
        ctaHref="#padrino"
        badgeText={t("aboutImageBadge")}
        galleryImages={fotos.enredate.gallery}
      />

      {/* 3. Pilares */}
      <EnredatePilares
        tag={t("pilaresTag")}
        title={t("pilaresTitle")}
        pilares={pilares}
      />

      {/* 4. Donar — formulario real */}
      <section id="donar" className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Izquierda — texto + stats + transferencia bancaria */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Donacion
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                Tu donacion <span className="text-brand-orange">transforma vidas</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                Cada donacion nos permite seguir acompañando a jovenes egresados del sistema de proteccion en su camino hacia la autonomia. Elige el monto que quieras aportar y haz parte de esta red de transformacion.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: "13.000+", label: "Jovenes beneficiados" },
                  { value: "6", label: "Modulos formativos" },
                  { value: "2019", label: "Iniciando el cambio" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-extrabold text-brand-orange">{stat.value}</p>
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* 4b. Transferencia Bancaria */}
              <div className="mt-12">
                <BankTransferOption />
              </div>
            </AnimatedSection>

            {/* Derecha — formulario de donacion */}
            <AnimatedSection direction="right">
              <div className="rounded-3xl border border-border-default bg-bg-card p-6 shadow-lg sm:p-8">
                <DonationForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("section1Tag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("section1Title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--color-text-muted)]">{t("section1Desc")}</p>
          </AnimatedSection>
          <VideoGrid />
        </div>
      </section>

      <MiniDocumentalesSection
        tag={t("miniDocsTag")}
        title={t("miniDocsTitle")}
        desc={t("miniDocsDesc")}
        docs={miniDocs}
      />

      {/* 6. Podcast */}
      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("podcastTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("podcastTitle")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--color-text-muted)]">{t("podcastDesc")}</p>
          </AnimatedSection>
          <PodcastSection />
        </div>
      </section>

      {/* 7. Voluntariado — texto izq + imagen der */}
      <section id="voluntariado" className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-ley-teal/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ley-teal">
                Voluntariado
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                {tVol("heroTitle")} <span className="text-ley-teal">ASCEP</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {tVol("heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={VOLUNTARIADO_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-ley-orange px-7 py-3 text-sm font-bold text-white transition-all hover:bg-ley-orange/90 hover:shadow-lg"
                >
                  {tVol("formBtn")} <ArrowRight size={16} />
                </a>
                <a href="#vol-roles" className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ley-teal/30 px-7 py-3 text-sm font-bold text-ley-teal transition-all hover:border-ley-teal/60 hover:bg-ley-teal/5">
                  {tVol("porque")}
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={assetPath(fotos.voluntariado.section)}
                  alt="Voluntariado ASCEP"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Roles de voluntariado */}
          <div id="vol-roles" className="mt-16 grid gap-6 sm:grid-cols-2">
            {volRoles.map((rol, i) => {
              const Icon = rol.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.08} direction="up">
                  <div className="flex gap-4 rounded-3xl border border-border-default bg-bg-card p-6 transition-all hover:shadow-lg">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${rol.bg}`}>
                      <Icon size={22} className={rol.color} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--color-text-primary)]">{rol.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{rol.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Plan Padrino — proceso + perfiles */}
      <section id="plan-padrino" className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${assetPath(fotos.planPadrino.section)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Plan Padrino
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{tPad("heroTitle")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/60">{tPad("heroSubtitle")}</p>
          </AnimatedSection>

          {/* Proceso en 4 pasos */}
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {padrinoSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1} direction="up">
                  <div className="glass-card group flex h-full flex-col items-center rounded-3xl p-6 text-center transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${step.bg} transition-transform group-hover:scale-110`}>
                      <Icon size={24} className={step.color} />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-white">{tPad(step.titleKey)}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{tPad(step.descKey)}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Perfiles de padrinos */}
          <AnimatedSection className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-white">{tPad("browseProfiles")}</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">{tPad("browseProfilesDesc")}</p>
          </AnimatedSection>

          {padrinos.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {padrinos.map((profile, i) => (
                <PadProfileCard key={profile._id} profile={profile} index={i} />
              ))}
            </div>
          ) : (
            <AnimatedSection delay={0.2}>
              <div className="mx-auto max-w-md rounded-3xl border-2 border-dashed border-white/20 p-12 text-center">
                <Heart size={40} className="mx-auto mb-4 text-white/30" />
                <p className="text-lg text-white/50">{tPad("noProfilesYet")}</p>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection delay={0.3}>
            <div className="mt-12 rounded-3xl bg-brand-primary p-8 text-center text-white sm:p-12">
              <CheckCircle size={40} className="mx-auto mb-4 text-white/80" />
              <h3 className="mb-4 text-2xl font-bold">{tPad("ctaTitle")}</h3>
              <p className="mb-8 text-white/80">{tPad("ctaDesc")}</p>
              <Link
                href={`/${locale}/contacto?nombre=&asunto=Quiero+ser+padrino+o+madrina`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-teal transition-all hover:bg-white/90"
              >
                {tPad("ctaBtn")} <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 9. Actividades */}
      <EnredateActividades
        tag={t("actividadesTag")}
        title={t("actividadesTitle")}
        actividades={actividades}
        locale={locale}
      />

      {/* 10. Stats */}
      <EnredateStats
        tag={t("statsTag")}
        title={t("statsTitle")}
        stats={stats}
      />

      {/* 11. Testimonios */}
      <EnredateTestimonials
        tag={t("testimoniosTag")}
        title={t("testimoniosTitle")}
        testimonios={testimonios}
      />

      {/* 12. CTA final */}
      <section className="relative overflow-hidden bg-ley-purple py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-ley-cyan/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-ley-orange/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
              <Heart size={36} className="text-ley-yellow" />
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("uneteTitle")}</h2>
            <p className="mt-4 text-base leading-relaxed text-purple-100">{t("uneteDesc")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#donar"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-orange px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#d15a1a] hover:shadow-lg"
              >
                Quiero donar
              </a>
              <a
                href={VOLUNTARIADO_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
              >
                Ser voluntario
              </a>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
              >
                Contactanos
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
