import { getTranslations } from "next-intl/server";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import ImageParallax from "@/components/ImageParallax";
import { ArrowRight, CheckCircle, UserPlus, DollarSign, FileText, Heart, ArrowDown, Gift } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, getPadrinos, sanityImage } from "@/lib/sanity/fetch";
import PadProfileCard from "@/components/PadProfileCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("planPadrino.title"),
    description: t("planPadrino.description"),
  };
}

const steps = [
  { icon: UserPlus, titleKey: "paso1", descKey: "paso1Desc", color: "text-brand-primary", bg: "bg-brand-primary/15" },
  { icon: DollarSign, titleKey: "paso2", descKey: "paso2Desc", color: "text-brand-orange", bg: "bg-brand-orange/15" },
  { icon: FileText, titleKey: "paso3", descKey: "paso3Desc", color: "text-brand-teal", bg: "bg-brand-teal/15" },
  { icon: Heart, titleKey: "paso4", descKey: "paso4Desc", color: "text-brand-yellow", bg: "bg-brand-yellow/15" },
];

export default async function PlanPadrinoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "planPadrino" });
  const pageData = await getPageContent("plan-padrino");
  const profiles = await getPadrinos();
  const heroImg = sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.planPadrino.hero);
  const sectionImg = assetPath(fotos.planPadrino.section);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden sm:min-h-[85vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm">
              PLAN PADRINO
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {t("heroSubtitle")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#perfiles"
                className="inline-flex items-center gap-2 rounded-[10px] bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-orange-dark active:scale-95"
              >
                {t("browseProfiles")} <ArrowDown size={16} />
              </a>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 rounded-[10px] border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                {t("ctaBtn")} <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Que es el Plan Padrino */}
      <section className="section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${sectionImg})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid items-center gap-10 lg:grid-cols-2" delay={0.1}>
            <div>
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {t("queEs")}
              </span>
              <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                {t("queEs")}
              </h2>
              <p className="text-base leading-relaxed text-white/70">
                {t("queEsDesc")}
              </p>
            </div>
            <div className="relative">
              <ImageParallax
                src={sectionImg}
                alt=""
                width={600}
                height={400}
                className="w-full rounded-[10px] object-cover shadow-lg"
                style={{ aspectRatio: "3/2" }}
              />
              <div className="absolute -bottom-4 -left-4 flex h-20 w-20 items-center justify-center rounded-[10px] bg-brand-teal text-white shadow-lg">
                <Gift size={28} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Profiles Grid */}
      <section id="perfiles" className="section-dark relative overflow-hidden bg-purple-bg py-20">
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="subtle" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center" delay={0.1}>
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              PERFILES
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("browseProfiles")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
              {t("browseProfilesDesc")}
            </p>
          </AnimatedSection>

          {profiles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile, i) => (
                <PadProfileCard key={profile._id} profile={profile} index={i} />
              ))}
            </div>
          ) : (
            <AnimatedSection delay={0.2}>
              <div className="mx-auto max-w-md rounded-[10px] border-2 border-dashed border-white/20 p-12 text-center">
                <Heart size={40} className="mx-auto mb-4 text-white/30" />
                <p className="text-lg text-white/50">
                  {t("noProfilesYet")}
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Como funciona - Cards */}
      <section className="section-dark relative overflow-hidden bg-purple-bg py-20">
        <CursorGlow color="rgba(236, 102, 32, 0.04)" size={500} opacity={0.4} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center" delay={0.1}>
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              PROCESO
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("comoFunciona")}
            </h2>
          </AnimatedSection>

          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={i} delay={0.1 * i} direction="up">
                  <div className="glass-card group flex h-full flex-col items-center rounded-[10px] p-6 text-center transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${step.bg} transition-transform group-hover:scale-110`}>
                      <Icon size={24} className={step.color} />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-white">{t(step.titleKey)}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{t(step.descKey)}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={0.25}>
            <div className="rounded-[10px] bg-gradient-to-br from-brand-teal to-brand-blue-dark p-8 text-center text-white sm:p-12">
              <CheckCircle size={40} className="mx-auto mb-4 text-white/80" />
              <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
              <p className="mb-8 text-white/80">{t("ctaDesc")}</p>
              <Link
                href={`/${locale}/contacto?nombre=&asunto=Quiero+ser+padrino+o+madrina`}
                className="inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-brand-teal transition-all hover:bg-white/90"
              >
                {t("ctaBtn")} <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>


        </div>
      </section>
    </div>
  );
}
