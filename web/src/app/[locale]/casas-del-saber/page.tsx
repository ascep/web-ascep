import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Home, BookOpen, Compass } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Casas del Saber y la Transformacion - ASCEP",
  description:
    "Un espacio de acompanamiento integral para jovenes en proceso de egreso del sistema de proteccion estatal, con modalidad habitacional y externa.",
  openGraph: {
    description:
      "Un espacio de acompanamiento integral para jovenes en proceso de egreso del sistema de proteccion estatal, con modalidad habitacional y externa.",
  },
};

export default async function CasasDelSaberPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaber" });
  const pageData = await getPageContent("casas-del-saber");

  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath("/images/encuentro-2025/GIS06475.webp")}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 rounded-[10px] bg-brand-purple p-8 text-white">
            <p className="text-center text-lg font-medium italic leading-relaxed">
              {t("quote")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: t("seccion1Title"),
                href: "modalidades",
                desc: t("seccion1Desc"),
                icon: Home,
                color: "border-brand-teal",
              },
              {
                title: t("seccion2Title"),
                href: "lineas",
                desc: t("seccion2Desc"),
                icon: BookOpen,
                color: "border-brand-orange",
              },
              {
                title: t("seccion3Title"),
                href: "ruta-egreso",
                desc: t("seccion3Desc"),
                icon: Compass,
                color: "border-brand-purple/20",
              },
            ].map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={`/${locale}/casas-del-saber/${section.href}`}>
                  <div className={`rounded-[10px] border ${section.color} bg-bg-card p-6 transition-all hover:shadow-md`}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-purple/10">
                      <Icon size={20} className="text-brand-purple" />
                    </div>
                    <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{section.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{section.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("objetivoTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("objetivoTitle")}
            </h2>
          </div>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
            {t("objetivoDesc")}
          </p>
        </div>
      </section>

      <section className="bg-bg-base py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("estructuraTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("estructuraTitle")}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { role: t("role1Title"), desc: t("role1Desc") },
              { role: t("role2Title"), desc: t("role2Desc") },
              { role: t("role3Title"), desc: t("role3Desc") },
              { role: t("role4Title"), desc: t("role4Desc") },
              { role: t("role5Title"), desc: t("role5Desc") },
              { role: t("role6Title"), desc: t("role6Desc") },
            ].map((item) => (
              <div key={item.role} className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md">
                <h3 className="mb-2 font-bold text-brand-teal">{item.role}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
