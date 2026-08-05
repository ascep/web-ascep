import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
import PageCTA from "@/components/PageCTA";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import ProgramGallerySection from "@/components/ProgramGallerySection";
import ProgramVideosSection from "@/components/ProgramVideosSection";
import { Heart, MapPin, Scale, Shield, AlertTriangle, Handshake, Users, Star, Brain, CheckCircle, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { existsSync } from "fs";
import { join } from "path";
import { getProgramBySlug, getDocumentsByCategory, getVideos, localize, sanityImage } from "@/lib/sanity/fetch";
import { fileUrl, imageUrl } from "@/lib/sanity/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("miCuerpo.title"),
    description: t("miCuerpo.description"),
    openGraph: {
      description: t("miCuerpo.description"),
    },
  };
}

const iconMap: Record<string, LucideIcon> = {
  Heart, MapPin, Scale, Shield, AlertTriangle, Handshake, Users, Star, Brain,
};

const compAccents = [
  { icon: "text-ley-fuchsia", bg: "bg-ley-fuchsia/10" },
  { icon: "text-ley-teal", bg: "bg-ley-teal/10" },
  { icon: "text-ley-cyan", bg: "bg-ley-cyan/10" },
  { icon: "text-ley-orange", bg: "bg-ley-orange/10" },
];

const fallbackComponents = [
  { title: "Derechos sexuales y reproductivos", desc: "Promocion de los derechos sexuales y reproductivos.", icon: Heart },
  { title: "Ruta de atencion integral", desc: "Ruta de atencion integral en Salud Sexual y Reproductiva.", icon: MapPin },
  { title: "Enfoque y equidad de genero", desc: "Enfoque y equidad de genero.", icon: Scale },
  { title: "Violencias basadas en genero", desc: "Abordaje de las violencias basadas en genero y violencias sexuales.", icon: Shield },
  { title: "Prevencion de ITS/VIH/SIDA", desc: "Prevencion de ITS/VIH/SIDA.", icon: AlertTriangle },
  { title: "Consentimiento y relaciones saludables", desc: "Educacion en Consentimiento y Relaciones Saludables.", icon: Handshake },
  { title: "Diversidad sexual y afectiva", desc: "Educacion sobre Diversidad Sexual y Afectiva.", icon: Users },
  { title: "Autonomia y toma de decisiones", desc: "Promocion de la Autonomia y Toma de Decisiones.", icon: Star },
  { title: "Salud mental", desc: "Acceso a Servicios de Salud Mental.", icon: Brain },
];

const fallbackSecundarios = [
  "Desarrollar procesos formativos en los centros de proteccion.",
  "Capacitar al personal para que pueda desarrollar estrategias de Promocion de los DRSyR en los centros.",
  "Integrar los grupos de trabajo a otros grupos, colectivos y redes externas a ICBF y los centros de proteccion.",
];

const localRevistas = [
  "Ana P", "Ana Sofia", "Claudia Celina", "Dayana", "Eliana", "Gisell",
  "Ingrid T", "Karen J", "Kata", "Laura", "Mabel", "Maria Camila",
  "Mercy", "Milena", "Nicol", "Sahary", "Saray", "Sofia",
  "Tati", "Tina", "Yeri", "Yerli",
]
  .filter((name) => existsSync(join(process.cwd(), "public", "documents", "avenza joven pdf", "revistas", `${name}.pdf`)))
  .map((name) => ({
    title: `Revista ${name}`,
    href: assetPath(`/documents/avenza joven pdf/revistas/${name}.pdf`),
  }));

export default async function MiCuerpoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });
  const cms = await getProgramBySlug("mi-cuerpo");

  const [revistas, informes, videos] = await Promise.all([
    getDocumentsByCategory("revistas"),
    getDocumentsByCategory("informes"),
    getVideos(locale),
  ]);

  const informeIntegrado = informes.find((r) =>
    /informe integrado/i.test(localize(r.title, locale) || localize(r.title, "es") || ""),
  );
  const informeItem = informeIntegrado
    ? [{
        title: localize(informeIntegrado.title, locale) || "Informe Integrado ASCEP 2018",
        href: informeIntegrado.externalUrl || fileUrl(informeIntegrado.file) || "#",
        cover: imageUrl(informeIntegrado.previewImage, 240, 320) || undefined,
      }]
    : [];

  const revistasList = [
    ...informeItem,
    ...(revistas.length > 0
      ? revistas.map((r) => ({
          title: localize(r.title, locale) || "Revista",
          href: r.externalUrl || fileUrl(r.file) || "#",
          cover: imageUrl(r.previewImage, 240, 320) || undefined,
        }))
      : localRevistas),
  ];

  const videoTabs = [
    { id: "testimonios", label: t("videoTabTestimonios") },
    { id: "eventos", label: t("videoTabEventos") },
  ];

  const components = cms?.components && cms.components.length > 0
    ? cms.components.map((c) => ({
        title: localize(c.title, locale) || "",
        desc: localize(c.description, locale) || "",
        icon: (c.icon && iconMap[c.icon]) || Heart,
      }))
    : fallbackComponents;

  const objetivosSecundarios = cms?.secondaryObjectives && cms.secondaryObjectives.length > 0
    ? cms.secondaryObjectives.map((o) => localize(o, locale) || "")
    : fallbackSecundarios;

  const heroImage = sanityImage(cms?.heroImage) || assetPath(fotos.home.gallery[0].src);
  const logoImage = sanityImage(cms?.programLogo) || assetPath(fotos.programas.cards.miCuerpo.image);

  return (
    <>
      <DossierHero
        bgImage={heroImage}
        tag="Programa"
        title="Mi Cuerpo, Mi Sexualidad,"
        highlight="Mi Vida"
        subtitle="Promovemos el ejercicio pleno de los derechos sexuales y reproductivos."
        accent="purple"
        primaryCta={{ label: "Conocer el programa", href: "#objetivos" }}
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Heart size={28} className="text-ley-fuchsia" />
            </div>
            <div>
              <p className="text-xl font-extrabold">ASCEP</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-fuchsia">
                Programa
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-purple-100">
            Promovemos el ejercicio pleno de los derechos sexuales y reproductivos.
          </p>
          <a
            href="#componentes"
            className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
          >
            Componentes del programa
          </a>
        </div>
      </DossierHero>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Informacion"
            title="Que es"
            highlight="Mi Cuerpo, Mi Sexualidad, Mi Decision?"
            accent="purple"
          />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-ley-fuchsia/5 md:h-96">
                <ImageParallax src={logoImage} alt="Mi Cuerpo, Mi Sexualidad, Mi Decision" width={240} height={150} className="h-auto max-h-48 w-auto max-w-[80%] object-contain" intensity={0.2} />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-6 text-base text-text-secondary">
                <p>
                  El programa esta disenado para proveer a los adolescentes y jovenes que viven bajo proteccion del Estado las condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad y el desarrollo en comunidad desde el punto de vista social, economico, cultural y politico.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="objetivos" className="section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${logoImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Objetivos"
            title="Objetivos"
            highlight="Especificos"
            accent="white"
            dark
          />
          <AnimatedSection direction="up">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="rounded-3xl glass-card p-6 transition-all hover:bg-white/15">
                <p className="text-lg leading-relaxed text-white/70">
                  Prevenir, promover, generar y desarrollar acciones que permitan las condiciones para el ejercicio pleno y autonomo de los derechos sexuales y reproductivos de los ninos, ninas, adolescentes y jovenes que viven bajo proteccion del Estado con enfoque de genero diferencial, contribuyendo a la preparacion para la vida adulta independiente.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {objetivosSecundarios.map((item, i) => (
                  <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                    <div className="flex gap-4 rounded-3xl glass-card p-6 transition-all hover:bg-white/15">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ley-fuchsia/10">
                        <CheckCircle size={20} className="text-ley-fuchsia" />
                      </div>
                      <div>
                        <p className="text-sm text-white/70">{item}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="componentes" className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Componentes"
            title="Componentes del"
            highlight="Programa"
            accent="purple"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((comp, i) => {
              const Icon = comp.icon;
              const accent = compAccents[i % compAccents.length];
              return (
                <AnimatedSection key={comp.title} direction="up" delay={i * 0.06}>
                  <div className="rounded-3xl border border-ley-fuchsia/20 bg-bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${accent.bg}`}>
                      <Icon size={22} className={accent.icon} />
                    </div>
                    <h4 className="mb-1 font-bold text-text-primary">{comp.title}</h4>
                    <p className="text-sm text-text-muted">{comp.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${logoImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("resultadosTitle2")}
            title="Resultados"
            highlight="Esperados"
            accent="white"
            dark
          />
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((ri, i) => (
              <AnimatedSection key={ri} direction="up" delay={i * 0.08}>
                <div className="glass-card flex h-full flex-col items-center rounded-3xl p-6 text-center transition-all hover:-translate-y-1 hover:bg-white/15">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ley-fuchsia/10">
                    <Star size={22} className="text-ley-fuchsia" />
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">{t(`miCuerpoResult${ri}`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ProgramGallerySection
        images={fotos.impacto.gallery.slice(0, 8)}
        overlayLabel="Mi Cuerpo, Mi Sexualidad, Mi Decision"
        magazines={revistasList}
        locale={locale}
      />

      <ProgramVideosSection
        videos={videos}
        tabs={videoTabs}
        bgImage={logoImage}
        locale={locale}
      />

      <PageCTA
        title={t("miCuerpoCtaTitle")}
        desc={t("miCuerpoCtaDesc")}
        icon={Heart}
        primary={{ label: t("miCuerpoCtaBtn"), href: `/${locale}/como-ayudar` }}
      />
    </>
  );
}
