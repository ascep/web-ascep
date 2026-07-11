import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Noticias - ASCEP",
};

export default async function NoticiasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "noticias" });

  const categorias = ["todas", "programas", "incidencia", "eventos", "ley"];

  return (
    <div>
      <PageHero
        bgImage="/images/eventos/20241112_103725.jpg"
        tag="Actualidad"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                disabled
                className="rounded-[10px] border border-border-subtle bg-bg-card px-4 py-2 text-sm text-[var(--color-text-muted)] opacity-60"
              >
                {t(cat)}
              </button>
            ))}
          </div>

          <div className="rounded-[10px] border-2 border-dashed border-border-default p-16 text-center">
            <Newspaper size={48} className="mx-auto mb-4 text-[var(--color-text-muted)]" />
            <p className="mb-2 text-lg font-semibold text-[var(--color-text-muted)]">
              {t("proximamente")}
            </p>
            <p className="text-[var(--color-text-muted)]">{t("proximamenteDesc")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
