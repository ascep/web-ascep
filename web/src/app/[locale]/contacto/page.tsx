import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { MapPin, Mail, Share2 } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Contacto - ASCEP",
};

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacto" });
  return (
    <div>
      <PageHero
        bgImage={assetPath("/images/equipo-shoot/GIS08546.JPG")}
        tag={t("heroTag")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
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

              <form className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">{t("formName")}</label>
                  <input type="text" id="nombre" name="nombre" className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-2 text-sm transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">{t("formEmail")}</label>
                  <input type="email" id="email" name="email" className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-2 text-sm transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                </div>
                <div>
                  <label htmlFor="asunto" className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">{t("formAsunto")}</label>
                  <input type="text" id="asunto" name="asunto" className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-2 text-sm transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                </div>
                <div>
                  <label htmlFor="mensaje" className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">{t("formMensaje")}</label>
                  <textarea id="mensaje" name="mensaje" rows={5} className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-2 text-sm transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                </div>
                <button type="submit" className="rounded-[10px] bg-brand-purple px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-purple-dark hover:shadow-lg">{t("formSubmit")}</button>
              </form>
            </div>

            <div>
              <div className="relative mb-6 overflow-hidden rounded-[10px]">
                <Image
                  src={assetPath("/images/equipo-shoot/GIS08545.JPG")}
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
                <p className="text-sm text-[var(--color-text-muted)]">{t("emailValue")}</p>
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
