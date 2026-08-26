import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import TransparenciaSlider from "@/components/TransparenciaSlider";
import TransparenciaGrid from "@/components/TransparenciaGrid";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getDocuments } from "@/lib/sanity/fetch";
import { fileUrl, imageUrl } from "@/lib/sanity/image";
import { TRANSPARENCIA_CATEGORIES, DEFAULT_DOC_CATEGORY } from "@/lib/transparencia-meta";
import type { TransparenciaDoc } from "@/types/transparencia";

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

type FallbackFile = { name: string; path: string; updatedAt?: string; priority?: number; previewIndex?: number };

const fallbackDocuments: Record<string, FallbackFile[]> = {
  financieros: [
    { name: "Estados Financieros 2025", path: "/documents/3.Estados-Financieros-2025_ASCEP.pdf", updatedAt: "2026-07-01", priority: 10, previewIndex: 0 },
    { name: "Estados Financieros 2024", path: "/documents/3.Estados-Financieros-2024_ASCEP_firmados.pdf", updatedAt: "2025-03-01", previewIndex: 1 },
    { name: "Estados Financieros 2023", path: "/documents/3.Estados_Financieros_2023_ASCEP.pdf", updatedAt: "2024-03-01", previewIndex: 2 },
    { name: "Estados Financieros 2022", path: "/documents/3.Estados-Financieros-2022_ASCEP.pdf", updatedAt: "2026-01-10", priority: 8, previewIndex: 3 },
  ],
  informes: [
    { name: "Informe de Gestion 2025", path: "/documents/2.Informe-de-Gestion-2025_ASCEP.pdf", updatedAt: "2026-04-01", priority: 9, previewIndex: 4 },
    { name: "Informe de Gestion 2024", path: "/documents/2.Informe-de-Gestion-2024-ASCEP_Maicol-Londono.pdf", updatedAt: "2025-02-01", previewIndex: 5 },
    { name: "Informe de Gestion 2023", path: "/documents/2.Informe_de_Gestion_2023.pdf", updatedAt: "2024-02-01", previewIndex: 6 },
  ],
  registros: [
    { name: "Registro Web 2025", path: "/documents/1.Registro_WEB_2025.pdf", updatedAt: "2025-06-01", previewIndex: 7 },
    { name: "Registro Web 2024", path: "/documents/1.Registro_Web_2024.pdf", updatedAt: "2024-06-01", previewIndex: 8 },
  ],
  legales: [
    { name: "RUT ASCEP", path: "/documents/4.RUT_ASCEP.pdf", previewIndex: 9 },
    { name: "Declaracion de Renta 2023", path: "/documents/5.Declaracion_Renta_2023.pdf", previewIndex: 10 },
    { name: "Certificado Requisitos", path: "/documents/6.Certificado_requisitos.pdf", previewIndex: 11 },
    { name: "Certificado Cargos Directivos", path: "/documents/7.Certificado_cargos_directivos-y-gerenciales.pdf", previewIndex: 12 },
    { name: "Certificado Antecedentes Judiciales", path: "/documents/8.Certificado_antecedentes_judiciales.pdf", previewIndex: 13 },
    { name: "Formato 2530-2531", path: "/documents/9.Formato_2530_2531.pdf", previewIndex: 14 },
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

  const categoryLabels: Record<string, string> = {
    financieros: t("catFinancieros"),
    informes: t("catInformes"),
    registros: t("catRegistros"),
    legales: t("catLegales"),
  };

  const cmsDocs = await getDocuments();
  const filtered = cmsDocs.filter((d) =>
    (TRANSPARENCIA_CATEGORIES as readonly string[]).includes(d.category || DEFAULT_DOC_CATEGORY),
  );

  const curated = TRANSPARENCIA_CATEGORIES.flatMap((cat) =>
    (fallbackDocuments[cat] || []).map((f) => ({
      id: `${cat}-${f.name}`,
      category: cat,
      title: f.name,
      path: assetPath(f.path),
      preview: f.previewIndex !== undefined ? assetPath(fotos.transparencia.pdfPreviews[f.previewIndex] || "") : undefined,
      updatedAt: f.updatedAt,
      priority: f.priority,
    })),
  );

  const docs: TransparenciaDoc[] = [];
  const seen = new Set<string>();
  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const EXCLUDED_TITLES = new Set([normalize("Informe Integrado ASCEP 2018")]);
  for (const d of [...curated, ...filtered.map((c) => ({
    id: c._id,
    category: c.category || DEFAULT_DOC_CATEGORY,
    title: c.title?.[locale as "es" | "en" | "pt"] || c.title?.es || "Documento",
    path: assetPath(c.externalUrl || fileUrl(c.file) || "#"),
    preview: imageUrl(c.previewImage, 600, 800) || undefined,
    updatedAt: c._updatedAt,
  }))]) {
    const key = normalize(d.title);
    if (EXCLUDED_TITLES.has(key)) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    docs.push(d);
  }

  const recent = [...docs]
    .sort(
      (a, b) =>
        (b.priority || 0) - (a.priority || 0) ||
        new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime(),
    )
    .slice(0, 6);

  return (
    <div>
      <section
        className="section-dark section-bg-image bg-atmospheric-purple relative overflow-hidden py-14 sm:py-16"
        style={{ "--section-bg-image": `url(${assetPath(fotos.transparencia.section)})` } as CSSProperties}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TransparenciaSlider
            docs={recent}
            recentTag={t("recentTag")}
            heroTag={t("heroTag")}
            heroTitle={t("heroTitle")}
            heroHighlight={t("heroHighlight")}
            heroSubtitle={t("heroSubtitle")}
            openDoc={t("downloadDoc")}
            updatedLabel={t("updatedLabel")}
            prevLabel={t("sliderPrev")}
            nextLabel={t("sliderNext")}
            dotsLabel={t("sliderDots")}
          />
        </div>
      </section>

      <section className="bg-section-light py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          <TransparenciaGrid
            docs={docs}
            categories={categoryLabels}
            todosLabel={t("todos")}
            openDoc={t("openDoc")}
            emptyLabel={t("emptyDocs")}
          />
        </div>
      </section>
    </div>
  );
}
