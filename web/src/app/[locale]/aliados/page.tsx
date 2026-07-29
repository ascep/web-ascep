import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import AnimatedSection from "@/components/AnimatedSection";
import { Building2, Globe, Briefcase, GraduationCap, Heart, Radio } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getPartners } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("aliados.title"),
    description: t("aliados.description"),
    openGraph: {
      description: t("aliados.description"),
    },
  };
}

export default async function AliadosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aliados" });
  const g = await getTranslations({ locale, namespace: "generales" });

  const fotos = await getFotos();

  const fallbackLogos = fotos.aliados.logos.map((item) => ({
    ...item,
    src: assetPath(item.src),
  }));

  const cmsPartners = await getPartners();
  const cmsLogos = cmsPartners.length > 0
    ? cmsPartners.map((p) => ({
        src: imageUrl(p.logo) || "",
        alt: p.name?.es || "",
      })).filter((l) => l.src)
    : [];
  const partnerLogos = cmsLogos.length > 0 ? cmsLogos : fallbackLogos;

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
        bgImage={assetPath(fotos.aliados.hero)}
        tag={t("heroTag")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </AnimatedSection>
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

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.aliados.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("sectoresTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("sectoresTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.sector} direction="up" delay={i * 0.08}>
                  <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{item.sector}</h4>
                    <p className="mb-2 text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">{item.aliados}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

