import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Areas de Intervencion - Casas del Saber - ASCEP",
  description:
    "Las cinco areas de intervencion del programa Casas del Saber: necesidades basicas, apoyo psicosocial, formacion, insercion laboral e incidencia.",
  openGraph: {
    description:
      "Las cinco areas de intervencion del programa Casas del Saber: necesidades basicas, apoyo psicosocial, formacion, insercion laboral e incidencia.",
  },
};

const borderColors = [
  "border-brand-purple/20",
  "border-brand-teal/20",
  "border-brand-orange/20",
  "border-brand-orange/20",
  "border-brand-purple/20",
];

export default async function AreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaberAreas" });

  const areas = [
    {
      num: 1,
      title: t("area1Title"),
      desc: t("area1Desc"),
    },
    {
      num: 2,
      title: t("area2Title"),
      desc: t("area2Desc"),
    },
    {
      num: 3,
      title: t("area3Title"),
      desc: t("area3Desc"),
    },
    {
      num: 4,
      title: t("area4Title"),
      desc: t("area4Desc"),
    },
    {
      num: 5,
      title: t("area5Title"),
      desc: t("area5Desc"),
    },
  ];

  return (
    <div>
      <PageHero
        bgImage={assetPath("/images/encuentro-2025/GIS06448.webp")}
        tag={t("heroTag")}
        title={t("heroTitle")}
        highlight={t("heroHighlight")}
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
          <div className="space-y-6">
            {areas.map((area) => (
              <div
                key={area.num}
                className={`rounded-[10px] border ${borderColors[area.num - 1]} bg-bg-card p-6 transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-brand-purple text-lg font-bold text-white">
                    {area.num}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">{area.title}</h3>
                    <p className="text-[var(--color-text-secondary)]">{area.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
