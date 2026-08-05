import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import ImageParallax from "@/components/ImageParallax";
import { ArrowRight, Briefcase, CheckCircle, Heart, Quote, Star, Users, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

const VOLUNTARIADO_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc-EXSof_cbaIWX01248FIRCmmB-JSnmOSJxQxMLXXolM-zuQ/viewform";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("voluntariado.title"),
    description: t("voluntariado.description"),
    openGraph: {
      description: t("voluntariado.description"),
    },
  };
}

export default async function VoluntariadoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "voluntariado" });
  const pageData = await getPageContent("voluntariado");

  const roles: { title: string; desc: string; icon: LucideIcon; color: string; bg: string }[] = [
    { title: t("rol1"), desc: t("rol1Desc"), icon: Heart, color: "text-ley-teal", bg: "bg-ley-teal/10" },
    { title: t("rol2"), desc: t("rol2Desc"), icon: Star, color: "text-ley-orange", bg: "bg-ley-orange/10" },
    { title: t("rol3"), desc: t("rol3Desc"), icon: Briefcase, color: "text-ley-cyan", bg: "bg-ley-cyan/10" },
    { title: t("rol4"), desc: t("rol4Desc"), icon: Users, color: "text-ley-yellow", bg: "bg-ley-yellow/15" },
  ];

  const requisitos = [1, 2, 3, 4, 5];
  const heroImage = sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.voluntariado.hero);

  return (
    <div>
      <section className="relative overflow-hidden bg-ley-purple text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            priority
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 hidden lg:block">
          <Quote size={340} strokeWidth={1} className="text-white opacity-10" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-ley-cyan/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-ley-orange/10" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-block rounded-full border border-ley-yellow/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ley-yellow">
                {localize(pageData?.hero?.tag, locale) || t("heroBadge")}
              </span>
              <h1 className="mt-6 break-words text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                {localize(pageData?.hero?.title, locale) || t("heroTitle")}{" "}
                <span className="text-ley-cyan">{localize(pageData?.hero?.highlight, locale) || "ASCEP"}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-purple-100 sm:text-lg">
                {localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={VOLUNTARIADO_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-ley-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-ley-orange/90 hover:shadow-lg"
                >
                  {t("formBtn")} <ArrowRight size={16} />
                </a>
                <a
                  href="#porque"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
                >
                  {t("porque")}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                    <Heart size={28} className="text-ley-yellow" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold">ASCEP</p>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-cyan">
                      {t("cardTag")}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-purple-100">{t("heroSubtitle")}</p>
                <a
                  href={VOLUNTARIADO_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
                >
                  {t("formBtn")} <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="porque" className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full border border-ley-teal/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ley-teal">
                {t("porque")}
              </span>
              <h2 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">{t("porque")}</h2>
              <p className="mt-6 text-base leading-relaxed text-text-secondary">{t("porqueDesc")}</p>
            </div>
            <div className="relative">
              <ImageParallax
                src={assetPath(fotos.voluntariado.section)}
                alt=""
                width={600}
                height={400}
                className="w-full rounded-3xl object-cover shadow-lg"
                style={{ aspectRatio: "3/2" }}
              />
              <div className="absolute -bottom-4 -right-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-ley-orange text-white shadow-lg">
                <Heart size={28} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section
        className="section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24"
        style={{ "--section-bg-image": `url(${assetPath(fotos.voluntariado.section)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-ley-yellow/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ley-yellow">
              ROLES
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("roles")}</h2>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2">
            {roles.map((rol, i) => {
              const Icon = rol.icon;
              return (
                <AnimatedSection key={i} delay={0.1 * i} direction="up">
                  <div className="glass-card flex gap-5 rounded-3xl p-6 transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${rol.bg}`}>
                      <Icon size={22} className={rol.color} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{rol.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-purple-100">{rol.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-ley-teal/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ley-teal">
              REQUISITOS
            </span>
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">{t("requisitos")}</h2>
          </AnimatedSection>

          <div className="mx-auto max-w-2xl">
            {requisitos.map((i) => (
              <AnimatedSection key={i} delay={0.05 * i} direction="up">
                <div className="flex items-start gap-3 border-b border-border-default py-4 last:border-0">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-ley-teal" />
                  <p className="text-sm leading-relaxed text-text-secondary">{t(`requisito${i}`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ley-purple py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-ley-cyan/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-ley-orange/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
              <Heart size={36} className="text-ley-yellow" />
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("ctaTitle")}</h2>
            <p className="mt-4 text-base leading-relaxed text-purple-100">{t("ctaDesc")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={VOLUNTARIADO_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-ley-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-ley-orange/90 hover:shadow-lg"
              >
                {t("formBtn")} <ArrowRight size={16} />
              </a>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
              >
                {t("ctaBtn")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
