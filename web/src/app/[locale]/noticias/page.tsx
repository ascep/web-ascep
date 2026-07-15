import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Newspaper } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
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
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "noticias" });
  const noticias = await getNoticias();

  const categorias = ["todas", "programas", "incidencia", "eventos", "ley"];

  return (
    <div>
      <PageHero
        bgImage={assetPath("/images/eventos/20241112_103725.webp")}
        tag="Actualidad"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                disabled
                className="rounded-[10px] border border-border-subtle bg-bg-card px-4 py-2 text-sm text-[var(--color-text-muted)] opacity-60"
              >
                {t(cat)}
              </button>
            ))}
          </div>

          {noticias.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {noticias.map((noticia: any) => (
                <Link
                  key={noticia._id}
                  href={`/${locale}/noticias/${noticia.slug.current}`}
                  className="group rounded-[10px] border border-border-subtle bg-bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-t-[10px] bg-brand-teal/10">
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
                    <span className="mb-2 inline-block rounded-full bg-brand-teal/10 px-2 py-0.5 text-xs font-medium text-brand-teal">
                      {t(noticia.category) || noticia.category}
                    </span>
                    <h3 className="mb-2 text-base font-bold text-text-primary line-clamp-2">
                      {noticia.title}
                    </h3>
                    {noticia.excerpt && (
                      <p className="line-clamp-2 text-sm text-[var(--color-text-muted)]">
                        {noticia.excerpt}
                      </p>
                    )}
                    {noticia.publishedAt && (
                      <p className="mt-2 text-xs text-[var(--color-text-tertiary)]">
                        {new Date(noticia.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : locale === "pt" ? "pt-BR" : "es-CO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[10px] border-2 border-dashed border-border-default p-16 text-center">
              <Newspaper size={48} className="mx-auto mb-4 text-[var(--color-text-muted)]" />
              <p className="mb-2 text-lg font-semibold text-[var(--color-text-muted)]">
                {t("proximamente")}
              </p>
              <p className="text-[var(--color-text-muted)]">{t("proximamenteDesc")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
