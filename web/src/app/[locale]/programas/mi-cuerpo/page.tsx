import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import CtaBanner from "@/components/CtaBanner";
import ProgramVideosSection from "@/components/ProgramVideosSection";
import { Heart, MapPin, Scale, Shield, AlertTriangle, Handshake, Users, Star, Brain, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getProgramBySlug, getVideos, localize, sanityImage } from "@/lib/sanity/fetch";

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

export default async function MiCuerpoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });
  const cms = await getProgramBySlug("mi-cuerpo");

  const videos = await getVideos(locale);

  const videoTabs = [
    { id: "testimonios", label: t("videoTabTestimonios") },
    { id: "eventos", label: t("videoTabEventos") },
  ];

  const components = cms?.components && cms.components.length > 0
    ? cms.components.map((c: any) => ({
        title: localize(c.title, locale) || "",
        desc: localize(c.description, locale) || "",
        icon: (c.icon && iconMap[c.icon]) || Heart,
      }))
    : fallbackComponents;

  const objetivosSecundarios = cms?.secondaryObjectives && cms.secondaryObjectives.length > 0
    ? cms.secondaryObjectives.map((o: any) => localize(o, locale) || "")
    : fallbackSecundarios;

  return (
    <>
      <PageHero
        bgImage={sanityImage(cms?.heroImage) || assetPath(fotos.home.gallery[0].src)}
        tag="Programa"
        title="Mi Cuerpo, Mi Sexualidad, Mi Vida"
        subtitle="Promovemos el ejercicio pleno de los derechos sexuales y reproductivos."
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Informacion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Que es <span className="text-brand-purple">Mi Cuerpo, Mi Sexualidad, Mi Decision</span>?
            </h2>
          </AnimatedSection>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <AnimatedSection direction="left">
              <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-[10px] bg-brand-purple/5 md:h-96">
                <ImageParallax src={sanityImage(cms?.programLogo) || assetPath(fotos.programas.cards.miCuerpo.image)} alt="Mi Cuerpo, Mi Sexualidad, Mi Decision" width={240} height={150} className="h-auto max-h-48 w-auto max-w-[80%] object-contain" intensity={0.2} />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-6 text-base text-[var(--color-text-secondary)]">
                <p>
                  El programa esta disenado para proveer a los adolescentes y jovenes que viven bajo proteccion del Estado las condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad y el desarrollo en comunidad desde el punto de vista social, economico, cultural y politico.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.cards.miCuerpo.image)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Objetivos
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Objetivos <span className="text-white/80">Especificos</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="rounded-[10px] glass-card p-6 transition-all hover:bg-white/15">
                <p className="text-lg leading-relaxed text-white/70">
                  Prevenir, promover, generar y desarrollar acciones que permitan las condiciones para el ejercicio pleno y autonomo de los derechos sexuales y reproductivos de los ninos, ninas, adolescentes y jovenes que viven bajo proteccion del Estado con enfoque de genero diferencial, contribuyendo a la preparacion para la vida adulta independiente.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {objetivosSecundarios.map((item, i) => (
                  <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                    <div className="flex gap-4 rounded-[10px] glass-card p-6 transition-all hover:bg-white/15">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-lg font-bold text-white/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
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

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Componentes
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Componentes del <span className="text-brand-purple">Programa</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((comp, i) => {
              const Icon = comp.icon;
              return (
                <AnimatedSection key={comp.title} direction="up" delay={i * 0.06}>
                  <div className="rounded-[10px] border border-brand-purple/20 bg-bg-card p-6 text-center transition-all hover:shadow-md">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                      <Icon size={22} className="text-brand-purple" />
                    </div>
                    <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{comp.title}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{comp.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.cards.miCuerpo.image)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("resultadosTitle2")}
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Resultados <span className="text-white/80">Esperados</span>
            </h2>
          </AnimatedSection>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((ri, i) => (
              <AnimatedSection key={ri} direction="up" delay={i * 0.08}>
                <div className="glass-card flex h-full flex-col items-center rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <Star size={22} className="text-brand-secondary" />
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">{t(`miCuerpoResult${ri}`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ProgramVideosSection
        videos={videos}
        tabs={videoTabs}
        bgImage={assetPath(fotos.programas.cards.miCuerpo.image)}
        locale={locale}
      />

      <CtaBanner
        title={t("miCuerpoCtaTitle")}
        description={t("miCuerpoCtaDesc")}
        href="/como-ayudar"
        buttonLabel={t("miCuerpoCtaBtn")}
      />
    </>
  );
}



