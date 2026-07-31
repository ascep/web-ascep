import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import ProgramGallerySection from "@/components/ProgramGallerySection";
import ProgramVideosSection from "@/components/ProgramVideosSection";
import { ArrowUpRight, Home, Search, Users, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getProgramBySlug, getDocumentsByCategory, getVideos, localize, sanityImage } from "@/lib/sanity/fetch";
import { fileUrl } from "@/lib/sanity/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("incidencia.title"),
    description: t("incidencia.description"),
    openGraph: {
      description: t("incidencia.description"),
    },
  };
}

const iconMap: Record<string, LucideIcon> = {
  ArrowUpRight, Home, Search, Users,
};

const fallbackObjetivos = [
  {
    title: "Ampliar y mejorar las alternativas de cuidado familiar y comunitario",
    desc: "Extender y diversificar la cobertura de opciones de cuidado, evaluando la efectividad de los programas existentes y, si es necesario, reformandolos o creando nuevos para prevenir el ingreso de miles de NNAJ al proceso administrativo de restablecimiento de derechos.",
  },
  {
    title: "Fomentar la participacion protagonica de los adolescentes jovenes en la toma de decisiones",
    desc: "Participacion activa de los jovenes en su vida cotidiana dentro de los dispositivos de cuidado, asi como en el diseno e implementacion de politicas publicas que los afectan, permitiendoles ejercer su ciudadania y contribuir a la transformacion de sus realidades y la construccion de su proyecto de vida.",
  },
  {
    title: "Generar y difundir informacion sobre el proceso de egreso de proteccion",
    desc: "Hacer publica la informacion relacionada con las trayectorias de vida de los jovenes tras su egreso, con el fin de facilitar la toma de decisiones basadas en evidencia, fortaleciendo el conocimiento y las capacidades de las autoridades y operadores de programas.",
  },
  {
    title: "Fortalecer la colaboracion interinstitucional",
    desc: "Consolidar espacios de trabajo conjunto entre el ICBF, operadores, jovenes, y diversos actores sociales, incluyendo el sector privado, investigadores, y organizaciones de la sociedad civil, para mejorar los sistemas de cuidado y apoyar a los activistas y organizaciones juveniles que trabajan en su transformacion.",
  },
  {
    title: "Planificar el egreso como un proceso integral",
    desc: "Tratar el egreso de NNAJ como un proceso planificado dentro de un plan de restitucion de derechos que involucre tanto al joven como a su entorno familiar y comunitario, ampliando la vision mas alla de la empleabilidad y la educacion, e incluyendo iniciativas que potencien la autonomia y los derechos de los jovenes.",
  },
];

const fallbackLineas = [
  { title: "Autonomia Progresiva", desc: "Trabajamos en el desarrollo e implementacion de programas y recursos que empoderen a las personas con experiencia en el cuidado y a los jovenes sin cuidado parental, brindandoles herramientas para alcanzar su independencia personal, economica y social.", icon: ArrowUpRight },
  { title: "Cuidados Alternativos, Desinstitucionalizacion y Prevencion a la Separacion Familiar", desc: "Abogamos por la implementacion y fortalecimiento de politicas que fomenten el cuidado basado en la familia como la principal alternativa para los ninos sin cuidado parental en Colombia, como recurso para evitar la desinstitucionalizacion.", icon: Home },
  { title: "Investigacion y Diseno de Politicas Publicas", desc: "Realizamos investigaciones para comprender mejor las necesidades y desafios de las personas con experiencia en el cuidado y los ninos sin cuidado parental en Colombia, para el diseno de politicas publicas mas efectivas y orientadas a garantizar los derechos de los jovenes en transicion y egresados de proteccion.", icon: Search },
  { title: "Participacion Intersectorial", desc: "Facilitar espacios de dialogo y colaboracion entre diferentes sectores y actores relevantes, como organizaciones de la sociedad civil, instituciones gubernamentales, academicos y jovenes, con el fin de promover la participacion activa y la construccion conjunta de soluciones.", icon: Users },
];

const fallbackResultados = [
  "Politicas publicas que transformen los cuidados alternativos y la atencion a ninos, ninas, adolescentes y jovenes en transicion.",
  "Jovenes lideres que transformen y ejerzan su ciudadania, fortaleciendo el proyecto de vida de sus pares.",
  "Instalacion y funcionamiento de una mesa intersectorial para la autonomia progresiva, que permita la colaboracion y coordinacion entre diferentes actores y sectores involucrados.",
];

export default async function IncidenciaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });
  const cms = await getProgramBySlug("incidencia");

  const [revistas, videos] = await Promise.all([
    getDocumentsByCategory("revistas"),
    getVideos(locale),
  ]);

  const revistasList = revistas.length > 0
    ? revistas.map((r) => ({
        title: localize(r.title, locale) || "Revista",
        href: r.externalUrl || fileUrl(r.file) || "#",
      }))
    : [];

  const galeriaImages = fotos.impacto.gallery.slice(0, 8).map((src) => assetPath(src));

  const videoTabs = [
    { id: "testimonios", label: t("videoTabTestimonios") },
    { id: "eventos", label: t("videoTabEventos") },
  ];

  const objetivos = cms?.objectives && cms.objectives.length > 0
    ? cms.objectives.map((o: any) => ({
        title: localize(o.title, locale) || "",
        desc: localize(o.description, locale) || "",
      }))
    : fallbackObjetivos;

  const lineas = cms?.actionLines && cms.actionLines.length > 0
    ? cms.actionLines.map((l: any) => ({
        title: localize(l.title, locale) || "",
        desc: localize(l.description, locale) || "",
        icon: (l.icon && iconMap[l.icon]) || ArrowUpRight,
      }))
    : fallbackLineas;

  const resultados = cms?.results && cms.results.length > 0
    ? cms.results.map((r: any) => localize(r, locale) || "")
    : fallbackResultados;

  return (
    <>
      <PageHero
        bgImage={sanityImage(cms?.heroImage) || assetPath(fotos.programas.cards.incidencia.image)}
        tag="Programa"
        title="Incidencia y Participacion"
        subtitle="Fortalecemos la participacion ciudadana y la incidencia politica de los jovenes egresados."
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Informacion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Que es <span className="text-brand-purple">Incidencia y Participacion</span>?
            </h2>
          </AnimatedSection>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <AnimatedSection direction="left">
              <div className="relative h-72 overflow-hidden rounded-[10px] md:h-96">
                <ImageParallax src={sanityImage(cms?.heroImage) || assetPath(fotos.programas.cards.incidencia.image)} alt="Incidencia y Participacion" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" intensity={0.2} />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-6 text-base text-[var(--color-text-secondary)]">
                <p>
                  El Programa de Incidencia y Participacion tiene como objetivo desarrollar acciones que involucren a los actores clave y tomadores de decisiones en la construccion de estrategias que contribuyan a la transformacion de los cuidados alternativos, la no separacion familiar y la autonomia progresiva. Ademas, se debe realizar investigaciones que proporcione insumos para garantizar acciones claras sobre los tres ejes mencionados anteriormente.
                </p>
                <p>
                  Como entidad de egresados, nos enfrentamos a desafios significativos en el fortalecimiento de los procesos de acompanamiento durante la transicion a la vida autonoma, la seleccion de equipos interdisciplinarios vinculados a los procesos de proteccion y el fortalecimiento de los cuidados alternativos en Colombia. Es precisamente por esta razon que, desde el ano 2019, hemos venido proponiendo el diseno y la promocion de un proyecto de ley que establezca un programa integral de acompanamiento para pre-egresados y garantice unos estandares minimos para aquellos que han egresado.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.cards.incidencia.image)})` } as CSSProperties}>
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
          <div className="mx-auto grid max-w-4xl gap-4">
            {objetivos.map((obj, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 rounded-[10px] glass-card p-6 transition-all hover:bg-white/15">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-lg font-bold text-white/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h5 className="font-bold text-white">{obj.title}</h5>
                    <p className="mt-1 text-sm text-white/70">{obj.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Lineas
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Lineas de <span className="text-brand-purple">Accion</span>
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              El programa se estructura en torno a las siguientes lineas de accion
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {lineas.map((linea, i) => {
              const Icon = linea.icon;
              return (
                <AnimatedSection key={linea.title} direction="up" delay={i * 0.06}>
                  <div className="rounded-[10px] border border-brand-purple/20 bg-bg-card p-6 text-center transition-all hover:shadow-md">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                      <Icon size={22} className="text-brand-purple" />
                    </div>
                    <h4 className="mb-1 font-bold text-[var(--color-text-primary)]">{linea.title}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{linea.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.cards.incidencia.image)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Resultados
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Resultados <span className="text-white/80">Esperados</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-3">
            {resultados.map((r, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                  <p className="text-white/70">{r}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ProgramGallerySection
        images={galeriaImages}
        overlayLabel="Incidencia y Participacion"
        magazines={revistasList}
        locale={locale}
      />

      <ProgramVideosSection
        videos={videos}
        tabs={videoTabs}
        bgImage={assetPath(fotos.programas.cards.incidencia.image)}
        locale={locale}
      />
    </>
  );
}



