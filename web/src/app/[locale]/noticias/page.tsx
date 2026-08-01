import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import { Newspaper, ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getNoticias, type NoticiaEntry } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";
import Link from "next/link";

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
          <AnimatedSection className="mb-10 flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                disabled
                className="rounded-[10px] border border-white/20 bg-white/5 px-4 py-2 text-sm text-[var(--color-text-muted)] opacity-60"
              >
                {t(cat)}
              </button>
            ))}
          </AnimatedSection>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection className="sm:col-span-2 lg:col-span-3" direction="up">
              <Link
                href={`/${locale}/noticias/ley-hijos-del-estado`}
                className="group relative block overflow-hidden rounded-[10px] bg-ley-purple text-white shadow-lg transition-all hover:shadow-xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${assetPath(fotos.leyEgreso.hero)})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ley-purple/60 to-ley-purple/90" />
                <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                  <div className="max-w-2xl">
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-ley-orange px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {t("leyTag")}
                    </span>
                    <h3 className="mb-2 text-2xl font-bold leading-tight sm:text-3xl">
                      {t("leyTitle")}
                    </h3>
                    <p className="text-sm leading-relaxed text-purple-100">
                      {t("leyExcerpt")}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ley-yellow">
                      {t("leerMas")}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
            {noticias.filter((n): n is NoticiaWithSlug => Boolean(n.slug?.current)).map((noticia, i) => (
                <AnimatedSection key={noticia._id} direction="up" delay={i * 0.06}>
                  <Link
                    href={`/${locale}/noticias/${noticia.slug.current}`}
                    className="group glass-card block overflow-hidden rounded-[10px] transition-all hover:bg-white/15"
                  >
                    <div className="aspect-[16/9] overflow-hidden rounded-t-[10px] bg-white/5">
                      {noticia.coverImage ? (
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${imageUrl(noticia.coverImage) || ""})`,
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Newspaper size={32} className="text-[var(--color-text-muted)]" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="mb-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/80">
                        {noticia.category ? t(noticia.category) || noticia.category : ""}
                      </span>
                      <h3 className="mb-2 text-base font-bold text-[var(--color-text-primary)] line-clamp-2">
                        {noticia.title}
                      </h3>
                      {noticia.excerpt && (
                        <p className="line-clamp-2 text-sm text-[var(--color-text-muted)]">
                          {noticia.excerpt}
                        </p>
                      )}
                      {noticia.publishedAt && (
                        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                          {new Date(noticia.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : locale === "pt" ? "pt-BR" : "es-CO", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}



