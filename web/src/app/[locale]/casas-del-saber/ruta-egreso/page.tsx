import { getTranslations } from "next-intl/server";
import DossierHero from "@/components/DossierHero";
import RutaCasasDelSaber from "@/components/RutaCasasDelSaber";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("rutasDelSaber.title"),
    description: t("rutasDelSaber.description"),
    openGraph: {
      description: t("rutasDelSaber.description"),
    },
  };
}

export default async function RutaEgresoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaberRutaEgreso" });

  const pageData = await getPageContent("casas-del-saber-ruta-egreso");
  return (
    <div>
      <DossierHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.casasDelSaber.rutaEgreso)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
        accent="orange"
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RutaCasasDelSaber />
        </div>
      </section>
    </div>
  );
}



