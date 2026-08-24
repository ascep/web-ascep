import { getTranslations } from "next-intl/server";
import Link from "next/link";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
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

const infoCards = [
  { icon: MapPin, iconColor: "bg-ley-cyan/15 text-ley-cyan", titleKey: "ubicacionTitle", valueKey: "ubicacionValue" },
  { icon: Mail, iconColor: "bg-ley-teal/15 text-ley-teal", titleKey: "emailTitle", valueKey: "emailValue" },
  { icon: MessageCircle, iconColor: "bg-ley-yellow/15 text-ley-yellow", titleKey: "whatsapp", valueKey: "phone" },
  { icon: Share2, iconColor: "bg-ley-orange/15 text-ley-orange", titleKey: "redesTitle", valueKey: "redesDesc" },
];

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
      {/* Hero — visual only */}
      <div className="relative h-[50vh] overflow-hidden bg-ley-cyan sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${assetPath(fotos.contacto.hero)}")` }}
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,16,32,0.45) 0%, transparent 50%)" }} />
      </div>

      {/* Hero text */}
      <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <ImageParallax
                  src={assetPath(fotos.contacto.section)}
                  alt={t("heroTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {t("heroTag")}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
                {t("heroTitle")} <span className="text-brand-primary">{t("formTag")}</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {t("heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#form" className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-primary px-7 py-3 text-sm font-bold text-white transition-all hover:bg-brand-primary-dark hover:shadow-lg">
                  {t("formTag")}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="form" className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${assetPath(fotos.contacto.section)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                tag={t("formTag")}
                title={t("formTitle")}
                accent="white"
                dark
              />
              <AnimatedSection direction="left">
                <ContactForm />
              </AnimatedSection>
            </div>

            <div>
              <AnimatedSection direction="right">
                <div className="relative mb-6 overflow-hidden rounded-3xl">
                  <ImageParallax
                    src={assetPath(fotos.contacto.section)}
                    alt=""
                    width={600}
                    height={300}
                    className="h-40 w-full object-cover"
                    intensity={0.12}
                  />
                  <div className="absolute inset-0 bg-ley-purple/60" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <p className="text-center text-lg font-semibold text-white">
                      {t("bannerText")}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
              <div className="space-y-6">
                {infoCards.map((card, i) => {
                  const Icon = card.icon;
                  const isWhatsapp = card.titleKey === "whatsapp";
                  const isEmail = card.titleKey === "emailTitle";
                  const title = isWhatsapp ? tw("cardTitle") : t(card.titleKey);
                  const value = isWhatsapp
                    ? "+57 302 555 0107"
                    : isEmail
                      ? t(card.valueKey)
                      : t(card.valueKey);
                  const body = (
                    <>
                      <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconColor}`}>
                        <Icon size={24} />
                      </div>
                      <h4 className="mb-2 text-lg font-bold text-white">{title}</h4>
                      <p className="text-sm text-[var(--color-text-muted)]">{value}</p>
                    </>
                  );
                  const className = "glass-card block rounded-3xl p-8 text-center transition-all hover:bg-white/15";
                  return (
                    <AnimatedSection key={card.titleKey} direction="right" delay={0.05 + i * 0.05}>
                      {isWhatsapp ? (
                        <a
                          href="https://wa.me/573025550107"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={tw("ariaLabel")}
                          className={className}
                        >
                          {body}
                        </a>
                      ) : isEmail ? (
                        <a href={`mailto:${t("emailValue")}`} className={className}>
                          {body}
                        </a>
                      ) : (
                        <div className={className}>{body}</div>
                      )}
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("ubicacionTitle")}
            title="Donde Encontrarnos"
            highlight="Encontrarnos"
            desc={t("ubicacionValue")}
            accent="cyan"
            align="left"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-lg">
                <ImageParallax
                  src={assetPath(fotos.contacto.hero)}
                  alt={t("ubicacionValue")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="relative h-[400px] overflow-hidden rounded-3xl border border-border-default shadow-sm">
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
          {/* TODO: agregar fotografia real de la oficina/sede de ASCEP en Cali cuando este disponible */}
        </div>
      </section>
    </div>
  );
}
