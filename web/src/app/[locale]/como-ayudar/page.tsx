import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Como Ayudar - ASCEP",
};

export default async function ComoAyudarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comoAyudar" });

  const ways = [
    {
      title: t("donacionMonetaria"),
      desc: t("donacionMonetariaDesc"),
      href: `/${locale}/donar`,
      color: "border-brand-orange/20",
    },
    {
      title: t("planPadrino"),
      desc: t("planPadrinoDesc"),
      href: `/${locale}/como-ayudar/plan-padrino`,
      color: "border-brand-teal/20",
    },
    {
      title: t("voluntariado"),
      desc: t("voluntariadoDesc"),
      href: `/${locale}/como-ayudar/voluntariado`,
      color: "border-brand-purple/20",
    },
  ];

  return (
    <div>
      <PageHero
        bgImage={assetPath("/images/eventos/20241112_102357.jpg")}
        tag={t("heroTag")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-12 text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
            {t("intro")}
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {ways.map((way) => (
              <Link key={way.title} href={way.href}>
                <div className={`h-full rounded-[10px] border ${way.color} bg-bg-card p-6 transition-all hover:shadow-md`}>
                  <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{way.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{way.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-[10px] bg-brand-purple p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
            <p className="mb-6 text-white/80">{t("ctaDesc")}</p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center rounded-[10px] bg-bg-card px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-bg-elevated"
            >
              {t("ctaBtn")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
