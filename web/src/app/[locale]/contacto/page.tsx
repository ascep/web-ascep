import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { MapPin, Mail, Share2 } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Contacto - ASCEP",
  description:
    "Contacta a ASCEP para conocer nuestros programas, sumarte como aliado o recibir informacion sobre nuestro trabajo con jovenes egresados.",
  openGraph: {
    description:
      "Contacta a ASCEP para conocer nuestros programas, sumarte como aliado o recibir informacion sobre nuestro trabajo con jovenes egresados.",
  },
};

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacto" });
  const pageData = await getPageContent("contacto");
  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath("/images/equipo-shoot/GIS08546.webp")}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {t("formTag")}
              </span>
              <h2 className="mb-8 text-3xl font-bold text-[var(--color-text-primary)]">
                {t("formTitle")}
              </h2>

              <ContactForm />
            </div>

            <div>
              <div className="relative mb-6 overflow-hidden rounded-[10px]">
                <Image
                  src={assetPath("/images/equipo-shoot/GIS08545.webp")}
                  alt=""
                  width={600}
                  height={300}
                  className="h-40 w-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-purple/60" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <p className="text-center text-lg font-semibold text-white">
                    {t("bannerText")}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
              <div className="rounded-[10px] bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-brand-purple/10">
                  <MapPin size={24} className="text-brand-purple" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{t("ubicacionTitle")}</h4>
                <p className="text-sm text-[var(--color-text-muted)]">{t("ubicacionValue")}</p>
              </div>

              <div className="rounded-[10px] bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-brand-purple/10">
                  <Mail size={24} className="text-brand-purple" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{t("emailTitle")}</h4>
                <a
                  href={`mailto:${t("emailValue")}`}
                  className="text-sm text-brand-purple transition-colors hover:text-brand-purple-dark hover:underline"
                >
                  {t("emailValue")}
                </a>
              </div>

              <div className="rounded-[10px] bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-brand-purple/10">
                  <Share2 size={24} className="text-brand-purple" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">{t("redesTitle")}</h4>
                <p className="text-sm text-[var(--color-text-muted)]">{t("redesDesc")}</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
