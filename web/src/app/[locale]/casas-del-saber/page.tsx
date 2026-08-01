import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import AnimatedSection from "@/components/AnimatedSection";
import { Home, BookOpen, Compass } from "lucide-react";
import type { CSSProperties } from "react";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getPageContent, localize, sanityImage } from "@/lib/sanity/fetch";

async function getCasasDelSaberGallery(): Promise<string[]> {
  try {
    const dir = join(process.cwd(), "public", "images", "casas-del-saber");
    const files = await readdir(dir, { withFileTypes: true });
    const entries = await Promise.all(
      files
        .filter((f) => f.isFile() && f.name.endsWith(".webp"))
        .map(async (f) => {
          try {
            const s = await stat(join(dir, f.name));
            return s.size > 0 ? f.name : null;
          } catch {
            return null;
          }
        }),
    );
    return entries
      .filter((n): n is string => n !== null)
      .sort()
      .map((f) => assetPath(`/images/casas-del-saber/${f}`));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("casasDelSaber.title"),
    description: t("casasDelSaber.description"),
    openGraph: {
      description: t("casasDelSaber.description"),
    },
  };
}

export default async function CasasDelSaberPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasDelSaber" });
  const pageData = await getPageContent("casas-del-saber");
  const casasGallery = await getCasasDelSaberGallery();

  return (
    <div>
      <PageHero
        bgImage={sanityImage(pageData?.hero?.bgImage) || assetPath(fotos.casasDelSaber.hero)}
        tag={localize(pageData?.hero?.tag, locale) || t("heroTag")}
        title={localize(pageData?.hero?.title, locale) || t("heroTitle")}
        highlight={localize(pageData?.hero?.highlight, locale) || t("heroHighlight")}
        subtitle={localize(pageData?.hero?.subtitle, locale) || t("heroSubtitle")}
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="rounded-[10px] bg-brand-purple p-8 text-white">
            <p className="text-center text-lg font-medium italic leading-relaxed">
              {t("quote")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("sectionTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: t("seccion1Title"),
                href: "modalidades",
                desc: t("seccion1Desc"),
                icon: Home,
              },
              {
                title: t("seccion2Title"),
                href: "lineas",
                desc: t("seccion2Desc"),
                icon: BookOpen,
              },
              {
                title: t("seccion3Title"),
                href: "ruta-egreso",
                desc: t("seccion3Desc"),
                icon: Compass,
              },
            ].map((section, i) => {
              const Icon = section.icon;
              return (
                <AnimatedSection key={section.href} direction="up" delay={i * 0.1}>
                  <Link href={`/${locale}/casas-del-saber/${section.href}`}>
                    <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10">
                        <Icon size={20} className="text-brand-secondary" />
                      </div>
                      <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{section.title}</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">{section.desc}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              {t("objetivoTag")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {t("objetivoTitle")}
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t("objetivoDesc")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.casasDelSaber.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("estructuraTag")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("estructuraTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { role: t("role1Title"), desc: t("role1Desc") },
              { role: t("role2Title"), desc: t("role2Desc") },
              { role: t("role3Title"), desc: t("role3Desc") },
              { role: t("role4Title"), desc: t("role4Desc") },
              { role: t("role5Title"), desc: t("role5Desc") },
              { role: t("role6Title"), desc: t("role6Desc") },
            ].map((item, i) => (
              <AnimatedSection key={item.role} direction="up" delay={i * 0.06}>
                <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                  <h3 className="mb-2 font-bold text-white">{item.role}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {casasGallery.length > 0 && (
        <section className="relative overflow-hidden bg-section-light py-20">
          <DecoShapes variant="orange" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {t("galeriaTag")}
              </span>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                {t("galeriaTitle")}
              </h2>
            </AnimatedSection>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {casasGallery.map((src, i) => (
                <AnimatedSection key={src} direction="up" delay={i * 0.03}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                    <Image
                      src={src}
                      alt="Casas del Saber"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

