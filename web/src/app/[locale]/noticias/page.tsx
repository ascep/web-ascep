import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import { Newspaper } from "lucide-react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getClient } from "@/lib/sanity/client";
import { noticiasQuery } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Noticias - ASCEP",
  description:
    "Mantente informado sobre las actividades, logros y novedades de ASCEP en la transformacion del sistema de cuidados alternativos en Colombia.",
  openGraph: {
    description:
      "Mantente informado sobre las actividades, logros y novedades de ASCEP en la transformacion del sistema de cuidados alternativos en Colombia.",
  },
};

async function getNoticias() {
  const client = getClient();
  if (!client) return [];
  try {
    return await client.fetch(noticiasQuery);
  } catch {
    return [];
  }
}

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

          {noticias.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {noticias.map((noticia: any, i: number) => (
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
                        {t(noticia.category) || noticia.category}
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
          ) : (
            <AnimatedSection>
              <div className="rounded-[10px] border-2 border-dashed border-white/20 bg-white/5 p-16 text-center">
                <Newspaper size={48} className="mx-auto mb-4 text-[var(--color-text-muted)]" />
                <p className="mb-2 text-lg font-semibold text-[var(--color-text-muted)]">
                  {t("proximamente")}
                </p>
                <p className="text-[var(--color-text-muted)]">{t("proximamenteDesc")}</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
}



