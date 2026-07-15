import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { Heart, Users, Star, Briefcase, ArrowRight, CheckCircle } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Voluntariado - ASCEP",
  description:
    "Tu tiempo y talento pueden transformar la vida de un joven egresado del sistema de proteccion. Conoce los roles de voluntariado en ASCEP.",
  openGraph: {
    description:
      "Tu tiempo y talento pueden transformar la vida de un joven egresado del sistema de proteccion. Conoce los roles de voluntariado en ASCEP.",
  },
};

export default async function VoluntariadoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "voluntariado" });
  const pageData = await getPageContent("voluntariado");

  const roles = [
    { title: t("rol1"), desc: t("rol1Desc"), icon: Heart, color: "text-brand-purple", bg: "bg-brand-purple/10" },
    { title: t("rol2"), desc: t("rol2Desc"), icon: Star, color: "text-brand-orange", bg: "bg-brand-orange/10" },
    { title: t("rol3"), desc: t("rol3Desc"), icon: Briefcase, color: "text-brand-teal", bg: "bg-brand-teal/10" },
    { title: t("rol4"), desc: t("rol4Desc"), icon: Users, color: "text-brand-purple", bg: "bg-brand-purple/10" },
  ];

  const requisitos = [1, 2, 3, 4, 5];

  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath("/images/eventos/20241112_100049.webp")}
        bgColor={pageData?.hero?.bgColor || "bg-brand-purple"}
        tag={localize(pageData?.hero?.tag, locale) || "VOLUNTARIADO"}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || ""}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="bg-bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-20 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {t("porque")}
              </span>
              <h2 className="mb-6 text-3xl font-bold text-text-primary sm:text-4xl">
                {t("porque")}
              </h2>
              <p className="text-base leading-relaxed text-text-secondary">
                {t("porqueDesc")}
              </p>
            </div>
            <div className="relative">
              <Image
                src={assetPath("/images/eventos/20241112_102515.webp")}
                alt=""
                width={600}
                height={400}
                className="w-full rounded-[10px] object-cover shadow-lg"
                style={{ aspectRatio: "3/2" }}
              />
              <div className="absolute -bottom-4 -right-4 flex h-20 w-20 items-center justify-center rounded-[10px] bg-brand-purple text-white shadow-lg">
                <Heart size={28} />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                ROLES
              </span>
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                {t("roles")}
              </h2>
            </div>
          </AnimatedSection>

          <div className="mb-20 grid gap-6 sm:grid-cols-2">
            {roles.map((rol, i) => {
              const Icon = rol.icon;
              return (
                <AnimatedSection key={i} delay={0.1 * i}>
                  <div className="flex gap-5 rounded-[10px] border border-border-subtle bg-bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] ${rol.bg}`}>
                      <Icon size={22} className={rol.color} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-bold text-text-primary">{rol.title}</h3>
                      <p className="text-sm text-text-muted">{rol.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={0.2}>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                REQUISITOS
              </span>
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                {t("requisitos")}
              </h2>
            </div>
          </AnimatedSection>

          <div className="mx-auto mb-20 max-w-2xl">
            {requisitos.map((i) => (
              <AnimatedSection key={i} delay={0.05 * i}>
                <div className="flex items-start gap-3 border-b border-border-subtle py-4 last:border-0">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-brand-purple" />
                  <p className="text-sm text-text-secondary">{t(`requisito${i}`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.25}>
            <div className="rounded-[10px] bg-gradient-to-br from-brand-purple to-brand-blue-dark p-8 text-center text-white sm:p-12">
              <Heart size={40} className="mx-auto mb-4 text-white/80" />
              <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
              <p className="mb-8 text-white/80">{t("ctaDesc")}</p>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-white/90"
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
