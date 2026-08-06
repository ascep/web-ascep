import { getTranslations } from "next-intl/server";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import { Home, Users, CheckCircle2 } from "lucide-react";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("casasDelSaberModalidades.title"),
    description: t("casasDelSaberModalidades.description"),
    openGraph: {
      description: t("casasDelSaberModalidades.description"),
    },
  };
}

export default async function ModalidadesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaberModalidades" });
  const pageData = await getPageContent("casas-del-saber-modalidades");
  return (
    <div>
      <DossierHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.casasDelSaber.modalidades)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || ""}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
        accent="orange"
      />

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("poblacionTag")}
            title={t("poblacionTitle")}
            desc={t("poblacionDesc")}
            accent="orange"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <AnimatedSection key={n} direction="up" delay={i * 0.1}>
                <div className="flex h-full items-start gap-3 rounded-3xl border border-border-default bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-ley-orange/40 hover:shadow-md">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-ley-orange" />
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{t(`poblacionItem${n}`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.modalidades)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("sectionTag")}
            title={t("sectionTitle")}
            accent="white"
            dark
          />
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { n: 1, icon: Home, iconColor: "bg-ley-orange/15 text-ley-orange" },
              { n: 2, icon: Users, iconColor: "bg-ley-teal/15 text-ley-teal" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.n} direction="up" delay={i * 0.1}>
                  <div className="glass-card h-full rounded-3xl p-8 transition-all hover:bg-white/15">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconColor}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white">
                      {t(`modalidad${item.n}Title`)}
                    </h3>
                    <p className="mb-6 text-[var(--color-text-muted)]">
                      {t(`modalidad${item.n}Desc`)}
                    </p>
                    <ul className="space-y-3">
                      {[1, 2, 3].map((j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-ley-orange" />
                          {t(`modalidad${item.n}Item${j}`)}
                        </li>
                      ))}
                    </ul>
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
