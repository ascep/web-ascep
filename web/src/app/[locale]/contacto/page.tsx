import { getTranslations } from "next-intl/server";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import type { CSSProperties } from "react";
import { MapPin, Mail, MessageCircle, Share2 } from "lucide-react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("contacto.title"),
    description: t("contacto.description"),
    openGraph: {
      description: t("contacto.description"),
    },
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacto" });
  const tw = await getTranslations({ locale, namespace: "whatsapp" });
  const pageData = await getPageContent("contacto");
  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.contacto.hero)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || ""}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.contacto.section)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <AnimatedSection direction="left">
                <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  {t("formTag")}
                </span>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.1}>
                <h2 className="mb-8 text-3xl font-bold text-white">
                  {t("formTitle")}
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.15}>
                <ContactForm />
              </AnimatedSection>
            </div>

            <div>
              <AnimatedSection direction="right">
                <div className="relative mb-6 overflow-hidden rounded-[10px]">
                  <ImageParallax
                    src={assetPath(fotos.contacto.section)}
                    alt=""
                    width={600}
                    height={300}
                    className="h-40 w-full object-cover"
                    intensity={0.12}
                  />
                  <div className="absolute inset-0 bg-brand-purple/60" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <p className="text-center text-lg font-semibold text-white">
                      {t("bannerText")}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
              <div className="space-y-6">
                <AnimatedSection direction="right" delay={0.05}>
                  <div className="glass-card rounded-[10px] p-8 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-white/10">
                      <MapPin size={24} className="text-brand-secondary" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{t("ubicacionTitle")}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{t("ubicacionValue")}</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.1}>
                  <div className="glass-card rounded-[10px] p-8 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-white/10">
                      <Mail size={24} className="text-brand-secondary" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{t("emailTitle")}</h4>
                    <a
                      href={`mailto:${t("emailValue")}`}
                      className="text-sm text-white transition-colors hover:text-brand-secondary-dark hover:underline"
                    >
                      {t("emailValue")}
                    </a>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.15}>
                  <a
                    href="https://wa.me/573025550107"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tw("ariaLabel")}
                    className="glass-card block rounded-[10px] p-8 text-center transition-all hover:bg-white/15"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-white/10">
                      <MessageCircle size={24} className="text-brand-secondary" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{tw("cardTitle")}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{tw("cardDesc")}</p>
                    <p className="mt-1 text-sm font-semibold text-white transition-colors hover:text-brand-secondary-dark hover:underline">
                      +57 302 555 0107
                    </p>
                  </a>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2}>
                  <div className="glass-card rounded-[10px] p-8 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-white/10">
                      <Share2 size={24} className="text-brand-secondary" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{t("redesTitle")}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{t("redesDesc")}</p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("ubicacionTitle")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Donde <span className="text-brand-purple">Encontrarnos</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              {t("ubicacionValue")}
            </p>
          </AnimatedSection>
          <AnimatedSection direction="up">
            <div className="relative h-[400px] overflow-hidden rounded-[10px] border border-brand-purple/20 shadow-sm">
              <iframe
                title="Ubicacion ASCEP"
                src="https://www.google.com/maps?q=Cali,Colombia&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}




