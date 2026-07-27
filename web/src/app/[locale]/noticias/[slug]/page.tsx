import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getClient } from "@/lib/sanity/client";
import { noticiaBySlugQuery } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import PageHero from "@/components/PageHero";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

async function getNoticia(slug: string) {
  const client = getClient();
  if (!client) return null;
  try {
    return await client.fetch(noticiaBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const fotos = getFotos();
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "noticias" });
  const noticia = await getNoticia(slug);

  if (!noticia) {
    notFound();
  }

  return (
    <div>
      <PageHero
        bgImage={noticia.coverImage ? imageUrl(noticia.coverImage, 1920, 800) || assetPath(fotos.noticias.hero) : assetPath(fotos.noticias.hero)}
        tag="Actualidad"
        title={noticia.title}
        subtitle={noticia.excerpt || ""}
      />

      <section className="bg-bg-primary py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/noticias`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-teal hover:text-brand-teal/80"
          >
            <ArrowLeft size={16} />
            {t("backToNoticias") || "Volver a noticias"}
          </Link>

          <div className="mb-8 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            {noticia.category && (
              <span className="rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-medium text-brand-teal">
                {t(noticia.category) || noticia.category}
              </span>
            )}
            {noticia.publishedAt && (
              <time dateTime={noticia.publishedAt}>
                {new Date(noticia.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : locale === "pt" ? "pt-BR" : "es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {noticia.author && (
              <span>{noticia.author}</span>
            )}
          </div>

          <article className="prose prose-lg max-w-none">
            {noticia.body ? (
              <PortableText value={noticia.body} />
            ) : (
              <p className="text-center text-[var(--color-text-muted)]">
                {t("proximamente")}
              </p>
            )}
          </article>
        </div>
      </section>
    </div>
  );
}


