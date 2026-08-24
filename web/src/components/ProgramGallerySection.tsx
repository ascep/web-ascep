import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import ImageParallax from "@/components/ImageParallax";
import DecoShapes from "@/components/DecoShapes";
import { FileText } from "lucide-react";

type Magazine = { title: string; href: string; cover?: string };

type ProgramGallerySectionProps = {
  images: string[];
  overlayLabel: string;
  magazines: Magazine[];
  locale: string;
};

export default async function ProgramGallerySection({
  images,
  overlayLabel,
  magazines,
  locale,
}: ProgramGallerySectionProps) {
  const t = await getTranslations({ locale, namespace: "programas" });

  return (
    <section className="relative overflow-hidden bg-section-light py-20">
      <DecoShapes variant="orange" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
            {t("galeriaTag")}
          </span>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            {t.rich("galeriaTitle", { span: (c) => <span className="text-brand-purple">{c}</span> })}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            {t("galeriaDesc")}
          </p>
        </AnimatedSection>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.slice(0, 8).map((src, i) => (
            <AnimatedSection key={`${src}-${i}`} direction="up" delay={i * 0.06} className="mb-4 break-inside-avoid">
              <div className="group relative overflow-hidden rounded-[10px]">
                <ImageParallax
                  src={src}
                  alt={overlayLabel}
                  width={0}
                  height={0}
                  className="transition-transform duration-500 group-hover:scale-105"
                  intensity={0.1}
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="p-4 text-sm font-semibold text-white">{overlayLabel}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {magazines.length > 0 ? (
          <AnimatedSection className="mt-14 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("revistasTag")}
            </span>
            <h3 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
              {t.rich("revistasTitle", { span: (c) => <span className="text-brand-orange">{c}</span> })}
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-[var(--color-text-secondary)]">
              {t("revistasDesc")}
            </p>
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {magazines.map((doc, i) => (
                <AnimatedSection key={doc.title} direction="up" delay={i * 0.04}>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-3 rounded-[10px] border border-brand-orange/20 bg-bg-card p-3 text-left transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    {doc.cover ? (
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-[6px]">
                        <Image
                          src={doc.cover}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-brand-orange/10">
                        <FileText size={22} className="text-brand-orange" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-bold text-[var(--color-text-primary)]">{doc.title}</h4>
                      <p className="text-xs text-[var(--color-text-secondary)]">{t("revistasVer")}</p>
                    </div>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        ) : null}
      </div>
    </section>
  );
}
