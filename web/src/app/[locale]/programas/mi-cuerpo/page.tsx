import { getTranslations } from "next-intl/server";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import PageCTA from "@/components/PageCTA";
import AnimatedSection from "@/components/AnimatedSection";
import ProgramGallerySection from "@/components/ProgramGallerySection";
import ProgramVideosSection from "@/components/ProgramVideosSection";
import { Heart, MapPin, Scale, Shield, AlertTriangle, Handshake, Users, Star, Brain, CheckCircle, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getProgramBySlug, getVideos, localize, sanityImage } from "@/lib/sanity/fetch";
import { imageUrl } from "@/lib/sanity/image";
import YoutubeHeroBg from "@/components/YoutubeHeroBg";
import { homeVideos } from "@/data/homeVideos";

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

export default async function MiCuerpoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });
  const cms = await getProgramBySlug("mi-cuerpo");

  const [videos] = await Promise.all([
    getVideos(locale),
  ]);

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
      {/* Hero — visual only */}
      <div className="relative h-[50vh] overflow-hidden bg-ley-purple sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        <YoutubeHeroBg
          videoUrl={homeVideos.programas["mi-cuerpo"].hero || ""}
          fallbackImage={heroImage}
        />
      </div>

      {/* Hero text — imagen izquierda + texto derecha */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — logo */}
            <AnimatedSection direction="left">
              <Image
                src={logoImage}
                alt="Mi Cuerpo, Mi Sexualidad, Mi Decision"
                width={1516}
                height={606}
                className="w-full object-contain"
              />
            </AnimatedSection>

            {/* Derecha — texto */}
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-full border border-[#9333ea]/30 bg-[#9333ea]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9333ea]">
                Programa
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
                Mi Cuerpo, Mi Sexualidad, <span className="text-[#9333ea]">Mi Vida</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                Promovemos el ejercicio pleno de los derechos sexuales y reproductivos.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#9333ea]/10">
                  <Heart size={26} className="text-[#9333ea]" />
                </div>
                <div>
                  <p className="font-extrabold text-[var(--color-text-primary)]">ASCEP</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9333ea]">Programa</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#objetivos"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#9333ea] px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#7e22ce] hover:shadow-lg"
                >
                  Conocer el programa
                </a>
                <a
                  href="#componentes"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#9333ea]/30 px-7 py-3 text-sm font-bold text-[#9333ea] transition-all hover:border-[#9333ea]/60 hover:bg-[#9333ea]/5"
                >
                  Componentes del programa
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Que es — texto izquierda + logo derecha */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-[#9333ea]/30 bg-[#9333ea]/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9333ea]">
                Informacion
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                Que es <span className="text-[#9333ea]">Mi Cuerpo, Mi Sexualidad, Mi Decision?</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                <p>
                  El programa esta disenado para proveer a los adolescentes y jovenes que viven bajo proteccion del Estado las condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad y el desarrollo en comunidad desde el punto de vista social, economico, cultural y politico.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <Image
                src={logoImage}
                alt="Mi Cuerpo, Mi Sexualidad, Mi Decision"
                width={1516}
                height={606}
                className="w-full object-contain"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Objetivo General */}
      <section id="objetivos" className="section-dark relative overflow-hidden bg-purple-bg py-24 sm:py-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Objetivo
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl">
                Objetivo <span className="text-ley-fuchsia">General</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Prevenir, promover, generar y desarrollar acciones que permitan las condiciones para el ejercicio pleno y autonomo de los derechos sexuales y reproductivos de los ninos, ninas, adolescentes y jovenes que viven bajo proteccion del Estado con enfoque de genero diferencial, contribuyendo a la preparacion para la vida adulta independiente.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <Image
                src={heroImage}
                alt="Objetivo General"
                width={6000}
                height={3376}
                className="w-full object-cover"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Objetivos Especificos */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Objetivos"
            title="Objetivos"
            highlight="Especificos"
            accent="purple"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
            {objetivosSecundarios.map((item, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 rounded-3xl border border-border-default bg-bg-card p-6">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-[#9333ea]" />
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{item}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="componentes" className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Componentes"
            title="Componentes del"
            highlight="Programa"
            accent="purple"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((comp, i) => {
              const Icon = comp.icon;
              const accent = compAccents[i % compAccents.length];
              return (
                <AnimatedSection key={comp.title} direction="up" delay={i * 0.06}>
                  <div className="rounded-3xl border border-ley-fuchsia/20 bg-bg-card p-6 text-center">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${accent.bg}`}>
                      <Icon size={22} className={accent.icon} />
                    </div>
                    <h3 className="mb-1 font-bold text-text-primary">{comp.title}</h3>
                    <p className="text-sm text-text-muted">{comp.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-dark relative overflow-hidden bg-purple-bg py-24 sm:py-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("resultadosTitle2")}
            title="Resultados"
            highlight="Esperados"
            accent="white"
            dark
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((ri, i) => (
              <AnimatedSection key={ri} direction="up" delay={i * 0.08}>
                <div className="glass-card flex h-full flex-col items-center rounded-3xl p-6 text-center">
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
        magazines={[]}
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
