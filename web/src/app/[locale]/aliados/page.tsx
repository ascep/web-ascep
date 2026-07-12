import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Building2, Globe, Briefcase, GraduationCap, Heart, Radio } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Aliados - ASCEP",
};

const partnerLogos = [
  { src: assetPath("/images/aliados/colombia.svg"), alt: "Colombia" },
  { src: assetPath("/images/aliados/empower-logo-blue.svg"), alt: "Empower" },
  { src: assetPath("/images/aliados/gapi-icesi-logo.webp"), alt: "GAPI Icesi" },
  { src: assetPath("/images/aliados/Vaki.png"), alt: "Vaki" },
];

export default async function AliadosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aliados" });
  const g = await getTranslations({ locale, namespace: "generales" });

  const sectors = [
    { sector: t("sector1"), desc: t("sector1Desc"), aliados: t("sector1Aliados"), icon: Building2 },
    { sector: t("sector2"), desc: t("sector2Desc"), aliados: t("sector2Aliados"), icon: Globe },
    { sector: t("sector3"), desc: t("sector3Desc"), aliados: t("sector3Aliados"), icon: Briefcase },
    { sector: t("sector4"), desc: t("sector4Desc"), aliados: t("sector4Aliados"), icon: GraduationCap },
    { sector: t("sector5"), desc: t("sector5Desc"), aliados: t("sector5Aliados"), icon: Heart },
    { sector: t("sector6"), desc: t("sector6Desc"), aliados: t("sector6Aliados"), icon: Radio },
  ];

  return (
    <div>
      <PageHero
        bgImage={assetPath("/images/eventos/20241112_092855.webp")}
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerLogos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center rounded-[10px] bg-bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={60}
                  className="h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("sectoresTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("sectoresTitle")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((item) => {
              const Icon = item.icon;
              return (
                <div className="rounded-[10px] bg-white p-6 text-center shadow-sm transition-all hover:shadow-md" key={item.sector}>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                    <Icon size={22} className="text-brand-purple" />
                  </div>
                  <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{item.sector}</h4>
                  <p className="mb-2 text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">{item.aliados}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
