import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerGrid from "@/components/StaggerGrid";

export const metadata: Metadata = {
  title: "Voluntariado - ASCEP",
};

export default async function VoluntariadoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "voluntariado" });

  const roles = [
    { title: t("rol1"), desc: t("rol1Desc") },
    { title: t("rol2"), desc: t("rol2Desc") },
    { title: t("rol3"), desc: t("rol3Desc") },
    { title: t("rol4"), desc: t("rol4Desc") },
  ];

  return (
    <div>
      <HeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        auroraColors={["#019E9F", "#EC6620", "#EC6620"]}
        cta={<span />}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-text-primary">{t("porque")}</h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t("porqueDesc")}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="mb-8 text-3xl font-bold text-text-primary">{t("roles")}</h2>
        </AnimatedSection>

        <StaggerGrid className="mb-12 grid gap-6 sm:grid-cols-2" staggerDelay={0.1}>
          {roles.map((rol, i) => (
            <div
              key={i}
              className="rounded-[10px] border border-border-subtle bg-bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-bold text-text-primary">{rol.title}</h3>
              <p className="text-text-muted">{rol.desc}</p>
            </div>
          ))}
        </StaggerGrid>

        <AnimatedSection delay={0.3}>
          <h2 className="mb-6 text-3xl font-bold text-text-primary">{t("requisitos")}</h2>
          <ul className="mb-12 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="flex items-start gap-3 text-text-secondary">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-purple" />
                {t(`requisito${i}`)}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="rounded-[10px] bg-brand-purple p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
            <p className="mb-6 text-white/80">{t("ctaDesc")}</p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center rounded-[10px] bg-[var(--color-bg-card)] px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-[var(--color-bg-elevated)]"
            >
              {t("ctaBtn")}
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
