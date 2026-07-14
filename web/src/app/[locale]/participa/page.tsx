import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Users, HeartHandshake, Handshake, DollarSign } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Participa - ASCEP",
  description:
    "Hay muchas maneras de sumarte a nuestra causa: como joven, voluntario, aliado o donante. Tu participacion transforma vidas.",
  openGraph: {
    description:
      "Hay muchas maneras de sumarte a nuestra causa: como joven, voluntario, aliado o donante. Tu participacion transforma vidas.",
  },
};

export default async function ParticipaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "participa" });
  return (
    <div>
      <PageHero
        bgImage={assetPath("/images/eventos/20241112_103406.webp")}
        tag={t("heroTag")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-12 overflow-hidden rounded-[10px]">
            <Image
              src={assetPath("/images/equipo-shoot/GIS08547.webp")}
              alt=""
              width={1200}
              height={300}
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-teal/70" />
            <div className="absolute inset-0 flex items-center p-8">
              <p className="max-w-2xl text-lg leading-relaxed text-white">
                {t("bannerDesc")}
              </p>
            </div>
          </div>
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: Users, color: "text-brand-purple", bg: "bg-brand-purple/10" },
              { icon: HeartHandshake, color: "text-brand-teal", bg: "bg-brand-teal/10" },
              { icon: Handshake, color: "text-brand-orange", bg: "bg-brand-orange/10" },
              { icon: DollarSign, color: "text-brand-orange", bg: "bg-brand-orange/10" },
            ].map((way, i) => {
              const Icon = way.icon;
              const n = i + 1;
              return (
                <div key={n} className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] ${way.bg}`}>
                    <Icon size={22} className={way.color} />
                  </div>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{t(`way${n}Title`)}</h4>
                  <p className="mb-4 text-sm text-[var(--color-text-muted)]">{t(`way${n}Desc`)}</p>
                  <ul className="space-y-1">
                    {[1, 2, 3].map((j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-text-muted)]" />
                        {t(`way${n}Item${j}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-16 rounded-[10px] bg-brand-purple p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
            <p className="mb-6 text-white/80">
              {t("ctaDesc")}
            </p>
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
