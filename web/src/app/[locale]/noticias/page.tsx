import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import PageHero from "@/components/PageHero";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import NoticiasFilterGrid, { type NoticiaCard } from "@/components/NoticiasFilterGrid";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getNoticias, type NoticiaEntry } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("noticias.title"),
    description: t("noticias.description"),
    openGraph: {
      description: t("noticias.description"),
    },
  };
}

type NoticiaWithSlug = NoticiaEntry & { slug: { current: string } };

export default async function NoticiasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "noticias" });
  const noticias = await getNoticias();

  const categorias = ["todas", "programas", "incidencia", "eventos", "ley"];
  const categoryOptions = categorias.map((key) => ({ key, label: t(key) }));

  const dateFormatter = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : locale === "pt" ? "pt-BR" : "es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const cards: NoticiaCard[] = [
    {
      id: "ley-2479",
      slug: "ley-hijos-del-estado",
      title: t("leyTitle"),
      excerpt: t("leyExcerpt"),
      category: "ley",
      categoryLabel: t("leyTag"),
      ctaLabel: t("leerMas"),
      bgImage: assetPath(fotos.leyEgreso.hero),
      featured: true,
    },
    {
      id: "casas-del-saber",
      slug: "casas-del-saber",
      title: t("casasTitle"),
      excerpt: t("casasExcerpt"),
      category: "programas",
      categoryLabel: t("programas"),
      ctaLabel: t("leerMas"),
      bgImage: assetPath(fotos.casasDelSaber.hero),
    },
    {
      id: "dia-del-egresado",
      slug: "dia-del-egresado",
      title: t("egresadoTitle"),
      excerpt: t("egresadoExcerpt"),
      category: "eventos",
      categoryLabel: t("eventos"),
      ctaLabel: t("leerMas"),
      bgImage: assetPath("/images/eventos/encuentro-2025/GIS06445.webp"),
    },
    ...noticias
      .filter((n): n is NoticiaWithSlug => Boolean(n.slug?.current))
      .map((noticia) => ({
        id: noticia._id,
        slug: noticia.slug.current,
        title: noticia.title ?? "",
        excerpt: noticia.excerpt,
        category: noticia.category,
        categoryLabel: noticia.category ? t(noticia.category) || noticia.category : "",
        publishedAt: noticia.publishedAt ? dateFormatter(noticia.publishedAt) : undefined,
        imageUrl: noticia.coverImage ? imageUrl(noticia.coverImage) || undefined : undefined,
      })),
  ];

  return (
    <div>
      <PageHero
        bgImage={assetPath(fotos.noticias.hero)}
        tag="Actualidad"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.noticias.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NoticiasFilterGrid locale={locale} categories={categoryOptions} cards={cards} />
        </div>
      </section>
    </div>
  );
}



