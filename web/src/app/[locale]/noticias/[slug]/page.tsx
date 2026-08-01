import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, CalendarDays, ChevronRight, Clock, UserRound } from "lucide-react";
import { getClient } from "@/lib/sanity/client";
import { noticiaBySlugQuery } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import { categoryColor } from "@/lib/category-colors";
import PostShare from "@/components/PostShare";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const noticia = await getNoticia(slug);
  if (!noticia) {
    return { title: t("noticias.title"), description: t("noticias.description") };
  }
  return {
    title: `${noticia.title} - ASCEP`,
    description: noticia.excerpt || t("noticias.description"),
  };
}

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
  const fotos = await getFotos();
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "noticias" });
  const noticia = await getNoticia(slug);

  if (!noticia) {
    notFound();
  }

  const color = categoryColor(noticia.category);
  const heroImage = noticia.coverImage ? imageUrl(noticia.coverImage, 1920, 800) : null;
  const coverSource = heroImage || assetPath(fotos.noticias.hero);

  const bodyText = (noticia.body || []).reduce((acc: string, block: { _type?: string; children?: { text?: string }[] }) => {
    if (block && block._type === "block" && Array.isArray(block.children)) {
      acc += " " + block.children.map((c) => c.text || "").join(" ");
    }
    return acc;
  }, "");
  const readMinutes = Math.max(1, Math.round(bodyText.split(/\s+/).filter(Boolean).length / 200));

  return (
    <div>
      <section className="relative overflow-hidden py-20 sm:py-24" style={{ backgroundColor: color }}>
        <div className="absolute inset-0">
          <Image
            src={coverSource}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.10), transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            <Link href={`/${locale}`} className="transition-colors hover:text-white">
              {t("breadcrumbInicio")}
            </Link>
            <ChevronRight size={14} className="text-white/40" />
            <Link href={`/${locale}/noticias`} className="transition-colors hover:text-white">
              {t("breadcrumbNoticias")}
            </Link>
            {noticia.category && (
              <>
                <ChevronRight size={14} className="text-white/40" />
                <span className="text-white/50">{t(noticia.category) || noticia.category}</span>
              </>
            )}
          </nav>

          {noticia.category && (
            <span className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {t(noticia.category) || noticia.category}
            </span>
          )}

          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {noticia.title}
          </h1>

          {noticia.excerpt && (
            <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
              {noticia.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80">
            {noticia.author && (
              <span className="inline-flex items-center gap-2">
                <UserRound size={15} className="text-white/60" />
                {noticia.author}
              </span>
            )}
            {noticia.publishedAt && (
              <time dateTime={noticia.publishedAt} className="inline-flex items-center gap-2">
                <CalendarDays size={15} className="text-white/60" />
                {new Date(noticia.publishedAt).toLocaleDateString(
                  locale === "en" ? "en-US" : locale === "pt" ? "pt-BR" : "es-CO",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </time>
            )}
            <span className="inline-flex items-center gap-2">
              <Clock size={15} className="text-white/60" />
              {t("lecturaMin", { count: readMinutes })}
            </span>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-16 bg-white/30" />
            <PostShare title={noticia.title} accent="#ffffff" shareLabel={t("compartir")} />
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/noticias`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-teal hover:text-brand-teal/80"
          >
            <ArrowLeft size={16} />
            {t("backToNoticias")}
          </Link>

          <article className="prose prose-lg max-w-none">
            {noticia.body ? (
              <PortableText value={noticia.body} />
            ) : (
              <p className="text-center text-[var(--color-text-muted)]">
                {t("proximamente")}
              </p>
            )}
          </article>

          <div className="mt-14 flex justify-center">
            <Link
              href={`/${locale}/noticias`}
              className="inline-flex items-center gap-2 rounded-[10px] border border-brand-purple px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-brand-purple/10"
            >
              <ArrowLeft size={16} />
              {t("backToNoticias")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
