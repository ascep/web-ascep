import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import { FileText, DollarSign, BarChart3, FileBadge, Scale, FileCheck, Download } from "lucide-react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getDocuments } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";

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

const categoryConfig: Record<string, { icon: React.ElementType; iconBg: string; iconColor: string }> = {
  institucionales: { icon: FileText, iconBg: "bg-brand-purple/10", iconColor: "text-brand-purple" },
  financieros: { icon: DollarSign, iconBg: "bg-brand-orange/10", iconColor: "text-brand-orange" },
  informes: { icon: BarChart3, iconBg: "bg-brand-orange/10", iconColor: "text-brand-orange" },
  registros: { icon: FileBadge, iconBg: "bg-brand-purple/10", iconColor: "text-brand-purple" },
  legales: { icon: Scale, iconBg: "bg-brand-teal/10", iconColor: "text-brand-teal" },
  cartillas: { icon: FileCheck, iconBg: "bg-brand-teal/10", iconColor: "text-brand-teal" },
};

const fallbackDocuments = [
  {
    title: "Nuestro Desafio",
    desc: "Conoce los retos y desafios que enfrentamos como organizacion en la transformacion del sistema de proteccion estatal.",
    files: [{ name: "Presentacion Institucional", path: "/documents/Presentacion.pdf" }],
    icon: FileText,
    iconBg: "bg-brand-purple/10",
    iconColor: "text-brand-purple",
  },
  {
    title: "Documento Base",
    desc: "Marco estrategico de la Asociacion de Egresados del Sistema de Proteccion Estatal.",
    files: [{ name: "Documento Base ASCEP", path: "/documents/DOCUMENTO BASE ASOCIACIÓN.docx.pdf" }],
    icon: FileCheck,
    iconBg: "bg-brand-teal/10",
    iconColor: "text-brand-teal",
  },
  {
    title: "Estados Financieros",
    desc: "Informacion financiera y rendicion de cuentas de la organizacion.",
    files: [
      { name: "Estados Financieros 2023", path: "/documents/3.Estados_Financieros_2023_ASCEP.pdf" },
      { name: "Estados Financieros 2024", path: "/documents/3.Estados-Financieros-2024_ASCEP_firmados.pdf" },
    ],
    icon: DollarSign,
    iconBg: "bg-brand-orange/10",
    iconColor: "text-brand-orange",
  },
  {
    title: "Informes de Gestion",
    desc: "Reportes anuales de actividades y logros alcanzados.",
    files: [
      { name: "Informe de Gestion 2023", path: "/documents/2.Informe_de_Gestion_2023.pdf" },
      { name: "Informe de Gestion 2024", path: "/documents/2.Informe-de-Gestion-2024-ASCEP_Maicol-Londono.pdf" },
    ],
    icon: BarChart3,
    iconBg: "bg-brand-orange/10",
    iconColor: "text-brand-orange",
  },
  {
    title: "Registro y Politicas",
    desc: "Registros oficiales y politicas institucionales de la asociacion.",
    files: [
      { name: "Registro Web 2024", path: "/documents/1.Registro_Web_2024.pdf" },
      { name: "Registro Web 2025", path: "/documents/1.Registro_WEB_2025.pdf" },
    ],
    icon: FileBadge,
    iconBg: "bg-brand-purple/10",
    iconColor: "text-brand-purple",
  },
  {
    title: "Marco Legal",
    desc: "Documentos legales, estatutos y regimen de la organizacion.",
    files: [
      { name: "RUT ASCEP", path: "/documents/4.RUT_ASCEP.pdf" },
      { name: "Declaracion de Renta 2023", path: "/documents/5.Declaracion_Renta_2023.pdf" },
      { name: "Certificado Requisitos", path: "/documents/6.Certificado_requisitos.pdf" },
      { name: "Certificado Cargos Directivos", path: "/documents/7.Certificado_cargos_directivos-y-gerenciales.pdf" },
      { name: "Certificado Antecedentes Judiciales", path: "/documents/8.Certificado_antecedentes_judiciales.pdf" },
      { name: "Formato 2530-2531", path: "/documents/9.Formato_2530_2531.pdf" },
    ],
    icon: Scale,
    iconBg: "bg-brand-teal/10",
    iconColor: "text-brand-teal",
  },
];

export default async function TransparenciaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const fotos = await getFotos();
  const t = await getTranslations({ locale, namespace: "transparencia" });

  const cmsDocs = await getDocuments();
  const documents = cmsDocs.length > 0
    ? (() => {
        const grouped: Record<string, { entries: typeof cmsDocs; config: typeof categoryConfig[keyof typeof categoryConfig] }> = {};
        for (const doc of cmsDocs) {
          const cat = doc.category || "institucionales";
          if (!grouped[cat]) {
            grouped[cat] = { entries: [], config: categoryConfig[cat] || categoryConfig.institucionales };
          }
          grouped[cat].entries.push(doc);
        }
        return Object.entries(grouped).map(([, group]) => {
          const config = group.config;
          return {
            title: group.entries[0].title?.es || "",
            desc: group.entries[0].description?.es || "",
            files: group.entries.map((d) => ({
              name: d.title?.es || "Documento",
              path: d.externalUrl || (d.file?.asset?._ref ? imageUrl(d.file) : "") || "#",
            })),
            icon: config.icon,
            iconBg: config.iconBg,
            iconColor: config.iconColor,
          };
        });
      })()
    : fallbackDocuments;

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

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.transparencia.section)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative mb-12 overflow-hidden rounded-[10px]">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc, i) => {
              const Icon = doc.icon;
              const previewFile = doc.files[0];
              return (
                <AnimatedSection key={doc.title} direction="up" delay={i * 0.06}>
                  <div className="glass-card flex flex-col overflow-hidden rounded-[10px] transition-all hover:bg-white/15">
                    <Link
                      href={assetPath(previewFile.path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block h-[200px] overflow-hidden bg-zinc-100"
                    >
                      <iframe
                        src={assetPath(previewFile.path)}
                        className="h-full w-full transition-transform duration-300 group-hover:scale-[1.02]"
                        title={previewFile.name}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                          <Download size={20} className="text-brand-purple" />
                        </div>
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] ${doc.iconBg}`}>
                          <Icon size={18} className={doc.iconColor} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[var(--color-text-primary)]">{doc.title}</h4>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            {doc.files.length} {doc.files.length === 1 ? "documento" : "documentos"}
                          </p>
                        </div>
                      </div>
                      <p className="mb-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
                        {doc.desc}
                      </p>
                      <ul className="mt-auto space-y-1.5">
                        {doc.files.map((file) => (
                          <li key={file.path}>
                            <Link
                              href={assetPath(file.path)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-2 rounded-[8px] bg-white/10 px-3 py-2 text-xs font-medium text-[var(--color-text-primary)] transition-colors hover:bg-white/20"
                            >
                              <span className="truncate">{file.name}</span>
                              <Download size={14} className="shrink-0 text-brand-secondary" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
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



