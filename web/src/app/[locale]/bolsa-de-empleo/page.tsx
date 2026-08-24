import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("bolsaDeEmpleo.title"),
    description: t("bolsaDeEmpleo.description"),
    openGraph: {
      description: t("bolsaDeEmpleo.description"),
    },
  };
}

export default async function BolsaDeEmpleoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bolsaDeEmpleo" });
  const fotos = await getFotos();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary/10 via-bg-surface to-brand-orange/5 py-32 md:py-48">
        <CursorGlow color="rgba(74, 144, 226, 0.1)" size={500} opacity={0.3} />
        <DecoShapes variant="teal" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <span className="mb-4 inline-block rounded-full border border-brand-primary/40 bg-brand-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {t("badge")}
            </span>
            
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-6xl">
              {t("title")}
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary md:text-xl">
              {t("subtitle")}
            </p>

            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={`/${locale}/como-ayudar`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-primary/90 hover:shadow-lg md:text-base"
              >
                {t("ctaExplore")}
                <ArrowRight size={18} />
              </Link>
              
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-primary px-8 py-4 text-sm font-bold text-brand-primary transition-all hover:bg-brand-primary/5 md:text-base"
              >
                {t("ctaContact")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-text-primary">
                {t("sectionTitle")}
              </h2>
              <p className="mt-4 text-lg text-text-secondary">
                {t("sectionDesc")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { key: "feature1", icon: "1" },
                { key: "feature2", icon: "2" },
                { key: "feature3", icon: "3" },
              ].map((feature) => (
                <div
                  key={feature.key}
                  className="rounded-2xl border border-border-default bg-white p-8 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                    <span className="font-bold text-brand-primary">{feature.icon}</span>
                  </div>
                  <h3 className="mt-4 font-bold text-text-primary">
                    {t(`${feature.key}Title`)}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {t(`${feature.key}Desc`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-text-primary">
                {t("notificationTitle")}
              </h3>
              <p className="mt-4 text-text-secondary">
                {t("notificationDesc")}
              </p>
              
              <form className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="flex-1 rounded-lg border border-border-default bg-white px-4 py-3 text-sm text-text-primary transition-all focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  required
                />
                <button
                  type="submit"
                  className="rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-all hover:bg-brand-primary/90"
                >
                  {t("notifyBtn")}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-brand-primary py-24 text-white sm:py-32">
        <CursorGlow color="rgba(255, 255, 255, 0.1)" size={500} opacity={0.2} />
        <DecoShapes variant="mixed" />
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              {t("ctaDesc")}
            </p>
            
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 font-bold text-brand-primary transition-all hover:bg-white/90"
              >
                {t("ctaContactBtn")} <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
