import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import Link from "next/link";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
import PageCTA from "@/components/PageCTA";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import NoticiasFilterGrid, { type NoticiaCard } from "@/components/NoticiasFilterGrid";
import { Newspaper } from "lucide-react";
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
      id: "resolucion-4775",
      slug: "resolucion-4775",
      title: t("res4775Title"),
      excerpt: t("res4775Excerpt"),
      category: "ley",
      categoryLabel: t("leyTag"),
      ctaLabel: t("leerMas"),
      bgImage: assetPath(fotos.impacto.hero),
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
      <DossierHero
        images={[
          assetPath(fotos.noticias.hero),
          assetPath(fotos.impacto.gallery[1]),
          assetPath(fotos.impacto.gallery[2]),
        ]}
        tag="Actualidad"
        title={t("title")}
        highlight={t("heroHighlight")}
        subtitle={t("subtitle")}
        accent="yellow"
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Newspaper size={28} className="text-ley-yellow" />
            </div>
            <div>
              <p className="text-xl font-extrabold">{t("title")}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-yellow">
                {t("sliderLabel")}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-purple-100">
            {t("proximamenteDesc")}
          </p>
          <Link
            href="#categorias"
            className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
          >
            {t("categorias")}
          </Link>
        </div>
      </DossierHero>

      <section id="categorias" className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${assetPath(fotos.noticias.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag={t("categorias")} title={t("title")} accent="yellow" dark />
          <NoticiasFilterGrid locale={locale} categories={categoryOptions} cards={cards} />
        </div>
      </section>

      <PageCTA
        title={t("ctaTitle")}
        desc={t("ctaDesc")}
        icon={Newspaper}
        primary={{ label: t("ctaBtn"), href: `/${locale}/como-ayudar/enredate-con-ascep` }}
      />
    </div>
  );
}
