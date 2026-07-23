import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { fotos } from "@/data/fotos";
import { getPrograms, localize, sanityImage } from "@/lib/sanity/fetch";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Programas - ASCEP",
  description:
    "Descubre los programas de ASCEP disenados para acompanar a jovenes en su transicion a la vida adulta: incidencia, avanza joven, empleo y formacion.",
  openGraph: {
    description:
      "Descubre los programas de ASCEP disenados para acompanar a jovenes en su transicion a la vida adulta: incidencia, avanza joven, empleo y formacion.",
  },
};

const slugLabels: Record<string, string> = {
  incidencia: "Liderazgo",
  "avanza-joven": "Formacion",
  empleo: "Insercion",
  "mi-cuerpo": "Bienestar",
  "marco-politico": "Incidencia",
  "casas-del-saber": "Programa",
};

const slugToMsgKey: Record<string, string> = {
  incidencia: "incidencia",
  "avanza-joven": "avanza",
  empleo: "empleo",
  "mi-cuerpo": "miCuerpo",
  "marco-politico": "marcoPolitico",
  "casas-del-saber": "casas",
};

export default async function ProgramasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });

  const cmsPrograms = await getPrograms();

  const programs = cmsPrograms.length > 0
    ? cmsPrograms.map((p) => ({
        title: localize(p.title, locale) || "",
        slug: p.slug?.current || "",
        desc: localize(p.shortDescription, locale) || "",
        image: sanityImage(p.heroImage) || (p.programLogo ? sanityImage(p.programLogo) : "") || "",
        label: slugLabels[p.slug?.current || ""] || "",
        msgKey: slugToMsgKey[p.slug?.current || ""] || p.slug?.current || "",
      }))
    : [
        { title: t("incidenciaTitle"), slug: "incidencia", desc: t("incidenciaDesc"), image: assetPath(fotos.programas.cards.incidencia.image), label: t("pillLiderazgo"), msgKey: "incidencia" },
        { title: t("avanzaTitle"), slug: "avanza-joven", desc: t("avanzaDesc"), image: assetPath(fotos.programas.cards.avanzaJoven.image), label: t("pillFormacion"), msgKey: "avanza" },
        { title: t("empleoTitle"), slug: "empleo", desc: t("empleoDesc"), image: assetPath(fotos.programas.cards.fomento.image), label: t("pillInsercion"), msgKey: "empleo" },
        { title: t("miCuerpoTitle"), slug: "mi-cuerpo", desc: t("miCuerpoDesc"), image: assetPath(fotos.programas.cards.miCuerpo.image), label: t("pillBienestar"), msgKey: "miCuerpo" },
        { title: t("casasTitle"), slug: "casas-del-saber", desc: t("casasDesc"), image: "", label: t("pillPrograma"), msgKey: "casas" },
      ];

  return (
    <>
      <PageHero
        bgImage={assetPath(fotos.programas.hero)}
        tag={t("badge")}
        title={t("title")}
        subtitle={t("desc")}
      />

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, i) => (
              <AnimatedSection key={program.slug} direction="up" delay={i * 0.1}>
                <div className="group overflow-hidden rounded-[10px] bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-52 overflow-hidden">
                    {(() => {
                      const href = program.slug === "casas-del-saber"
                        ? `/${locale}/casas-del-saber`
                        : `/${locale}/programas/${program.slug}`;
                      return program.image && program.image.endsWith(".webp") ? (
                        <Link href={href} className="relative block h-full">
                          <ImageParallax src={program.image} alt={program.title} fill containerClassName="h-full" className="object-cover transition-transform duration-500 group-hover:scale-105" intensity={0.12} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <span className="absolute bottom-4 left-4 rounded-[10px] bg-brand-purple px-3 py-1 text-xs font-semibold text-white z-10">{program.label}</span>
                        </Link>
                      ) : program.image ? (
                        <Link href={href} className="relative block h-full">
                          <div className="flex h-full w-full items-center justify-center bg-brand-teal/5">
                            <Image src={program.image} alt={program.title} width={160} height={100} className="h-auto max-h-32 w-auto max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105" />
                          </div>
                          <span className="absolute bottom-4 left-4 rounded-[10px] bg-brand-purple px-3 py-1 text-xs font-semibold text-white z-10">{program.label}</span>
                        </Link>
                      ) : (
                        <Link href={href} className="flex h-full w-full items-center justify-center bg-brand-purple/10">
                          <span className="text-5xl font-bold text-brand-purple/20">{program.title.charAt(0)}</span>
                        </Link>
                      );
                    })()}
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">
                      {program.title}
                    </h3>
                    <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                      {program.desc}
                    </p>
                    <div className="mb-4 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                        {t("resultadosTitle")}
                      </p>
                      <ul className="space-y-1">
                        {[1, 2, 3].map((ri) => {
                          try {
                            const res = t(`${program.msgKey}Result${ri}`);
                            return (
                              <li key={ri} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                                {res}
                              </li>
                            );
                          } catch {
                            return null;
                          }
                        })}
                      </ul>
                    </div>
                    <Link
                      href={program.slug === "casas-del-saber" ? `/${locale}/casas-del-saber` : `/${locale}/programas/${program.slug}`}
                      className="inline-flex items-center gap-2 rounded-[10px] bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md"
                    >
                      {t("leerMas")} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


