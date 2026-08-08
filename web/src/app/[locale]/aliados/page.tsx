import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import AnimatedSection from "@/components/AnimatedSection";
import { Building2, Globe, Briefcase, GraduationCap, Heart, Radio, type LucideIcon } from "lucide-react";
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

const sectorAccents = [
  { icon: "text-ley-teal", bg: "bg-ley-teal/10" },
  { icon: "text-ley-cyan", bg: "bg-ley-cyan/10" },
  { icon: "text-ley-orange", bg: "bg-ley-orange/10" },
  { icon: "text-ley-yellow", bg: "bg-ley-yellow/10" },
];

export default async function AliadosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aliados" });

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

  const sectors: { sector: string; desc: string; aliados: string; icon: LucideIcon }[] = [
    { sector: t("sector1"), desc: t("sector1Desc"), aliados: t("sector1Aliados"), icon: Building2 },
    { sector: t("sector2"), desc: t("sector2Desc"), aliados: t("sector2Aliados"), icon: Globe },
    { sector: t("sector3"), desc: t("sector3Desc"), aliados: t("sector3Aliados"), icon: Briefcase },
    { sector: t("sector4"), desc: t("sector4Desc"), aliados: t("sector4Aliados"), icon: GraduationCap },
    { sector: t("sector5"), desc: t("sector5Desc"), aliados: t("sector5Aliados"), icon: Heart },
    { sector: t("sector6"), desc: t("sector6Desc"), aliados: t("sector6Aliados"), icon: Radio },
  ];

  return (
    <div>
      <DossierHero
        images={[
          assetPath(fotos.aliados.hero),
          assetPath(fotos.quienesSomos.hero),
          assetPath(fotos.impacto.hero),
        ]}
        tag={t("heroTag")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        accent="teal"
        primaryCta={{ label: t("sectionTag"), href: "#aliados" }}
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Building2 size={28} className="text-ley-teal" />
            </div>
            <div>
              <p className="text-xl font-extrabold">{t("heroTitle")}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-teal">
                {t("sectoresTitle")}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-purple-100">
            {t("sectionTitle")}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
          >
            {t("sectoresTag")}
          </Link>
        </div>
      </DossierHero>

      <section id="aliados" className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("sectionTag")}
            title={t("sectionTitle")}
            accent="teal"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerLogos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center rounded-2xl border border-border-default bg-white p-8 transition-all hover:-translate-y-1 hover:border-ley-teal/40 hover:shadow-md"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={60}
                  className="h-14 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${assetPath(fotos.aliados.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("sectoresTag")}
            title={t("sectoresTitle")}
            accent="white"
            dark
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((item, i) => {
              const Icon = item.icon;
              const accent = sectorAccents[i % sectorAccents.length];
              return (
                <AnimatedSection key={item.sector} direction="up" delay={i * 0.08}>
                  <div className="glass-card flex h-full flex-col items-center rounded-3xl p-6 text-center transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${accent.bg}`}>
                      <Icon size={22} className={accent.icon} />
                    </div>
                    <h3 className="mb-1 font-bold text-white">{item.sector}</h3>
                    <p className="mb-2 text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                    <p className="mt-auto text-xs font-medium uppercase tracking-wider text-ley-teal">{item.aliados}</p>
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
