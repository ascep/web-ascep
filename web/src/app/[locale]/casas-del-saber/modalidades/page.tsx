import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Home, Users } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Modalidades - Casas del Saber - ASCEP",
};

export default async function ModalidadesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaberModalidades" });

  return (
    <div>
      <PageHero
        bgImage={assetPath("/images/encuentro-2025/GIS06460.JPG")}
        tag={t("heroTag")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[10px] border border-brand-purple/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                <Home size={24} className="text-brand-purple" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[var(--color-text-primary)]">
                {t("modalidad1Title")}
              </h3>
              <p className="mb-6 text-[var(--color-text-secondary)]">
                {t("modalidad1Desc")}
              </p>
              <ul className="space-y-3">
                {[
                  t("modalidad1Item1"),
                  t("modalidad1Item2"),
                  t("modalidad1Item3"),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-teal/10">
                <Users size={24} className="text-brand-teal" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-brand-teal">
                {t("modalidad2Title")}
              </h3>
              <p className="mb-6 text-[var(--color-text-secondary)]">
                {t("modalidad2Desc")}
              </p>
              <ul className="space-y-3">
                {[
                  t("modalidad2Item1"),
                  t("modalidad2Item2"),
                  t("modalidad2Item3"),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
