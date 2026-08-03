import { getTranslations } from "next-intl/server";
import type { CSSProperties, ElementType } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import { FileText, DollarSign, BarChart3, FileBadge, Scale, Download } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getDocuments, type DocumentEntry } from "@/lib/sanity/fetch";
import { fileUrl } from "@/lib/sanity/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("transparencia.title"),
    description: t("transparencia.description"),
    openGraph: {
      description: t("transparencia.description"),
    },
  };
}

const CATEGORY_ORDER = ["financieros", "informes", "registros", "legales"] as const;

const categoryMeta: Record<
  string,
  { icon: ElementType; iconBg: string; iconColor: string; titleKey: string; descKey: string }
> = {
  financieros: { icon: DollarSign, iconBg: "bg-brand-orange/10", iconColor: "text-brand-orange", titleKey: "catFinancieros", descKey: "catFinancierosDesc" },
  informes: { icon: BarChart3, iconBg: "bg-brand-orange/10", iconColor: "text-brand-orange", titleKey: "catInformes", descKey: "catInformesDesc" },
  registros: { icon: FileBadge, iconBg: "bg-brand-purple/10", iconColor: "text-brand-purple", titleKey: "catRegistros", descKey: "catRegistrosDesc" },
  legales: { icon: Scale, iconBg: "bg-brand-teal/10", iconColor: "text-brand-teal", titleKey: "catLegales", descKey: "catLegalesDesc" },
};

type FallbackFile = { name: string; path: string };

const fallbackDocuments: Record<string, FallbackFile[]> = {
  financieros: [
    { name: "Estados Financieros 2023", path: "/documents/3.Estados_Financieros_2023_ASCEP.pdf" },
    { name: "Estados Financieros 2024", path: "/documents/3.Estados-Financieros-2024_ASCEP_firmados.pdf" },
  ],
  informes: [
    { name: "Informe de Gestion 2023", path: "/documents/2.Informe_de_Gestion_2023.pdf" },
    { name: "Informe de Gestion 2024", path: "/documents/2.Informe-de-Gestion-2024-ASCEP_Maicol-Londono.pdf" },
  ],
  registros: [
    { name: "Registro Web 2024", path: "/documents/1.Registro_Web_2024.pdf" },
    { name: "Registro Web 2025", path: "/documents/1.Registro_WEB_2025.pdf" },
  ],
  legales: [
    { name: "RUT ASCEP", path: "/documents/4.RUT_ASCEP.pdf" },
    { name: "Declaracion de Renta 2023", path: "/documents/5.Declaracion_Renta_2023.pdf" },
    { name: "Certificado Requisitos", path: "/documents/6.Certificado_requisitos.pdf" },
    { name: "Certificado Cargos Directivos", path: "/documents/7.Certificado_cargos_directivos-y-gerenciales.pdf" },
    { name: "Certificado Antecedentes Judiciales", path: "/documents/8.Certificado_antecedentes_judiciales.pdf" },
    { name: "Formato 2530-2531", path: "/documents/9.Formato_2530_2531.pdf" },
  ],
};

export default async function TransparenciaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const fotos = await getFotos();
  const t = await getTranslations({ locale, namespace: "transparencia" });

  const cmsDocs = await getDocuments();
  const grouped: Record<string, DocumentEntry[]> = {};
  for (const doc of cmsDocs) {
    const cat = doc.category || "institucionales";
    if (!(CATEGORY_ORDER as readonly string[]).includes(cat)) continue;
    (grouped[cat] ??= []).push(doc);
  }

  const hasCms = Object.keys(grouped).length > 0;

  const categories = CATEGORY_ORDER.filter(
    (cat) =>
      hasCms ? (grouped[cat]?.length ?? 0) > 0 : (fallbackDocuments[cat]?.length ?? 0) > 0,
  ).map((cat) => {
    const meta = categoryMeta[cat];
    const files = hasCms
      ? grouped[cat].map((d) => ({
          name: d.title?.es || "Documento",
          path: d.externalUrl || fileUrl(d.file) || "#",
        }))
      : fallbackDocuments[cat];
    return {
      cat,
      title: t(meta.titleKey),
      desc: t(meta.descKey),
      files,
      icon: meta.icon,
      iconBg: meta.iconBg,
      iconColor: meta.iconColor,
    };
  });

  return (
    <div>
      <PageHero
        bgImage={assetPath(fotos.transparencia.hero)}
        bgColor="bg-brand-teal"
        tag={t("heroTag")}
        title={t("heroTitle")}
        highlight={t("heroHighlight")}
        subtitle={t("heroSubtitle")}
      />

      <section
        className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20"
        style={{ "--section-bg-image": `url(${assetPath(fotos.transparencia.section)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative overflow-hidden rounded-[10px]">
              <ImageParallax
                src={assetPath(fotos.transparencia.section)}
                alt=""
                width={1200}
                height={300}
                className="h-48 w-full object-cover"
                intensity={0.1}
              />
              <div className="absolute inset-0 bg-brand-teal/70" />
              <div className="absolute inset-0 flex items-center p-8">
                <p className="max-w-2xl text-lg leading-relaxed text-white">
                  {t("bannerDesc")}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-section-light py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {t("docsTag")}
              </p>
              <h2 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
                {t("docsTitle")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
                {t("docsDesc")}
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {categories.map((doc, i) => {
              const Icon = doc.icon;
              return (
                <AnimatedSection key={doc.cat} direction="up" delay={i * 0.05}>
                  <div className="rounded-[10px] border border-border-default bg-white/80 p-6 shadow-sm sm:p-8">
                    <div className="mb-5 flex items-start gap-4">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] ${doc.iconBg}`}>
                        <Icon size={22} className={doc.iconColor} />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="text-xl font-bold text-text-primary">{doc.title}</h3>
                          <span className="text-xs font-medium text-text-muted">
                            {doc.files.length} {doc.files.length === 1 ? t("documentoCount") : t("documentosCount")}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-text-muted">{doc.desc}</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {doc.files.map((file) => (
                        <li key={file.path}>
                          <Link
                            href={assetPath(file.path)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-4 rounded-[10px] border border-border-default bg-white px-4 py-3 transition-all hover:border-brand-teal hover:shadow-md"
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <FileText size={18} className="shrink-0 text-brand-purple" />
                              <span className="truncate text-sm font-medium text-text-primary transition-colors group-hover:text-brand-purple">
                                {file.name}
                              </span>
                            </span>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple transition-colors group-hover:bg-brand-purple group-hover:text-white">
                              <Download size={16} />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
