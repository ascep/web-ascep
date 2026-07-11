import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";
import BorderGlow from "@/components/BorderGlow";

export const metadata: Metadata = {
  title: "Plan Padrino - ASCEP",
};

export default async function PlanPadrinoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "planPadrino" });

  return (
    <div>
      <HeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        auroraColors={["#44BCC5", "#019E9F", "#EC6620"]}
        cta={<span />}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-brand-teal">{t("queEs")}</h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t("queEsDesc")}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="mb-8 text-3xl font-bold text-brand-teal">{t("beneficios")}</h2>
        </AnimatedSection>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <AnimatedSection key={i} delay={0.1 * i}>
              <BorderGlow
                colors={["#44BCC5", "#019E9F"]}
                backgroundColor="var(--color-bg-card)"
                borderRadius={10}
                glowIntensity={0.5}
                className="p-6"
              >
                <h3 className="mb-2 text-lg font-bold text-text-primary">
                  {t(`beneficio${i}`)}
                </h3>
                <p className="text-sm text-text-muted">
                  {t(`beneficio${i}Desc`)}
                </p>
              </BorderGlow>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.35}>
          <h2 className="mb-6 text-3xl font-bold text-brand-teal">{t("comoFunciona")}</h2>
          <ol className="mb-12 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-start gap-4 rounded-[10px] border border-border-subtle bg-bg-card p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">
                  {i}
                </span>
                <div>
                  <p className="font-semibold text-text-primary">{t(`paso${i}`)}</p>
                  <p className="text-sm text-text-muted">{t(`paso${i}Desc`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="rounded-[10px] bg-brand-purple p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
            <p className="mb-6 text-white/80">{t("ctaDesc")}</p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center rounded-[10px] bg-bg-card px-6 py-3 text-sm font-semibold text-brand-teal transition-all hover:bg-bg-elevated"
            >
              {t("ctaBtn")}
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
