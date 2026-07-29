import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getProgramBySlug, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("programasMarcoPolitico.title"),
    description: t("programasMarcoPolitico.description"),
    openGraph: {
      description: t("programasMarcoPolitico.description"),
    },
  };
}

const fallbackPilares = [
  {
    title: "Derechos Humanos de la Ninez y Adolescencia",
    desc: "Colombia ha suscrito tratados internacionales como la Convencion sobre los Derechos del Nino, que establecen el interes superior del nino, el derecho a ser oido y el derecho a una familia. ASCEP aboga por la implementacion efectiva de estos principios en todas las politicas publicas dirigidas a la ninez y adolescencia.",
  },
  {
    title: "Ley de Infancia y Adolescencia (Ley 1098 de 2006)",
    desc: "Este codigo establece el marco normativo para la proteccion integral de los ninos, ninas y adolescentes en Colombia. ASCEP trabaja en la promocion de su cumplimiento efectivo, especialmente en lo relacionado con el proceso de egreso del sistema de proteccion y la garantia de derechos una vez cumplida la mayoria de edad.",
  },
  {
    title: "Ley 2479 de 2025 - Ley Hijos del Estado",
    desc: "Esta ley, impulsada por los mismos egresados a traves de ASCEP, crea el Programa Nacional de Acompanamiento Integral para jovenes que egresan del sistema de proteccion del ICBF. Representa un hito en el reconocimiento estatal de la deuda historica con los jovenes que crecieron bajo proteccion del Estado.",
  },
  {
    title: "Politica Nacional de Primera Infancia, Ninez y Adolescencia",
    desc: "ASCEP participa activamente en los espacios de discusion y formulacion de esta politica, asegurando que las necesidades y derechos de los adolescentes y jovenes en proceso de egreso sean incluidos en los planes de desarrollo nacional y territorial.",
  },
];

const fallbackEnfoques = [
  { title: "Enfoque de Derechos", desc: "Todos los programas y acciones de ASCEP se fundamentan en el reconocimiento de los adolescentes y jovenes como sujetos titulares de derechos, promoviendo su ejercicio pleno y exigibilidad." },
  { title: "Enfoque Diferencial y Territorial", desc: "Reconocemos las particularidades de los territorios y las poblaciones, adaptando nuestras estrategias a las realidades locales, culturales y etnicas de los jovenes que acompanamos." },
  { title: "Enfoque de Genero", desc: "Incorporamos una perspectiva de genero en todas nuestras acciones, reconociendo las desigualdades estructurales y promoviendo la equidad entre hombres y mujeres jovenes." },
  { title: "Participacion Protagonica", desc: "Los jovenes no son solo beneficiarios de nuestras acciones, sino protagonistas activos en la construccion de politicas, programas y decisiones que afectan sus vidas." },
];

const fallbackIncidencia = [
  "Participacion en mesas tecnicas y espacios de concertacion con el ICBF y otras entidades gubernamentales.",
  "Articulacion con organizaciones de la sociedad civil para la incidencia en politicas publicas de ninez y adolescencia.",
  "Generacion de investigaciones y documentos tecnicos que sustentan las recomendaciones de politica publica.",
  "Formacion de liderazgos juveniles para la incidencia politica y el ejercicio de la ciudadania activa.",
  "Seguimiento y monitoreo a la implementacion de la Ley 2479 de 2025 y otras normas relacionadas.",
];

export default async function MarcoPoliticoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const cms = await getProgramBySlug("marco-politico");

  const pilares = cms?.pillars && cms.pillars.length > 0
    ? cms.pillars.map((p: any) => ({
        title: localize(p.title, locale) || "",
        desc: localize(p.description, locale) || "",
      }))
    : fallbackPilares;

  const enfoques = cms?.crossCutting && cms.crossCutting.length > 0
    ? cms.crossCutting.map((e: any) => ({
        title: localize(e.title, locale) || "",
        desc: localize(e.description, locale) || "",
      }))
    : fallbackEnfoques;

  const incidencia = cms?.incidenciaItems && cms.incidenciaItems.length > 0
    ? cms.incidenciaItems.map((i: any) => localize(i, locale) || "")
    : fallbackIncidencia;

  return (
    <>
      <PageHero
        bgImage={sanityImage(cms?.heroImage) || assetPath(fotos.programas.marcoPolitico.hero)}
        tag="Marco Politico"
        title="Marco"
        highlight="Politico"
        subtitle="Conoce el marco legal y normativo que respalda nuestra labor."
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Introduccion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              <span className="text-brand-purple">Marco Politico</span> de ASCEP
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up">
            <div className="mx-auto max-w-4xl space-y-6 text-base text-[var(--color-text-secondary)]">
              <p>
                El Marco Politico de ASCEP define los fundamentos conceptuales, normativos y estrategicos que guian nuestra accion institucional. Como organizacion liderada por egresados del sistema de proteccion estatal, nuestra incidencia se sustenta en un profundo conocimiento de las necesidades y desafios que enfrentan los jovenes en su transicion a la vida independiente.
              </p>
              <p>
                Nuestro trabajo se enmarca en la Constitucion Politica de Colombia, los tratados internacionales de derechos humanos ratificados por el Estado colombiano, y el Codigo de Infancia y Adolescencia. A partir de este marco juridico, impulsamos transformaciones estructurales que garanticen el bienestar y la autonomia de las nuevas generaciones.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.marcoPolitico.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Pilares
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Pilares <span className="text-white/80">Normativos</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {pilares.map((pilar, i) => (
              <AnimatedSection key={pilar.title} direction="up" delay={i * 0.06}>
                <div className="glass-card rounded-[10px] p-6 transition-all hover:bg-white/15">
                  <h3 className="mb-2 font-bold text-white">{pilar.title}</h3>
                  <p className="text-sm text-white/70">{pilar.desc}</p>
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
              Enfoques
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Enfoques <span className="text-brand-purple">Transversales</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {enfoques.map((enf, i) => (
              <AnimatedSection key={enf.title} direction="up" delay={i * 0.06}>
                <div className="rounded-[10px] border border-brand-purple/20 bg-bg-card p-6 transition-all hover:shadow-md">
                  <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{enf.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{enf.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.marcoPolitico.hero)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Incidencia
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ejes de <span className="text-white/80">Incidencia</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {incidencia.map((item, i) => (
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
      </section>
    </>
  );
}



