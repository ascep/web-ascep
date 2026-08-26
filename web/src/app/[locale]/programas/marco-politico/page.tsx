import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import ProgramVideosSection from "@/components/ProgramVideosSection";
import { Scale, Landmark, ShieldCheck, HeartHandshake, Search, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path"
import { getFotos } from "@/lib/get-fotos";
import { getProgramBySlug, getVideos, localize, sanityImage } from "@/lib/sanity/fetch";
import YoutubeHeroBg from "@/components/YoutubeHeroBg";
import { homeVideos } from "@/data/homeVideos";

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
    icon: HeartHandshake,
  },
  {
    title: "Ley de Infancia y Adolescencia (Ley 1098 de 2006)",
    desc: "Este codigo establece el marco normativo para la proteccion integral de los ninos, ninas y adolescentes en Colombia. ASCEP trabaja en la promocion de su cumplimiento efectivo, especialmente en lo relacionado con el proceso de egreso del sistema de proteccion y la garantia de derechos una vez cumplida la mayoria de edad.",
    icon: Landmark,
  },
  {
    title: "Ley 2479 de 2025 - Ley Hijos del Estado",
    desc: "Esta ley, impulsada por los mismos egresados a traves de ASCEP, crea el Programa Nacional de Acompanamiento Integral para jovenes que egresan del sistema de proteccion del ICBF. Representa un hito en el reconocimiento estatal de la deuda historica con los jovenes que crecieron bajo proteccion del Estado.",
    icon: ShieldCheck,
  },
  {
    title: "Politica Nacional de Primera Infancia, Ninez y Adolescencia",
    desc: "ASCEP participa activamente en los espacios de discusion y formulacion de esta politica, asegurando que las necesidades y derechos de los adolescentes y jovenes en proceso de egreso sean incluidos en los planes de desarrollo nacional y territorial.",
    icon: Scale,
  },
];

const fallbackEnfoques = [
  { title: "Enfoque de Derechos", desc: "Todos los programas y acciones de ASCEP se fundamentan en el reconocimiento de los adolescentes y jovenes como sujetos titulares de derechos, promoviendo su ejercicio pleno y exigibilidad.", icon: Scale },
  { title: "Enfoque Diferencial y Territorial", desc: "Reconocemos las particularidades de los territorios y las poblaciones, adaptando nuestras estrategias a las realidades locales, culturales y etnicas de los jovenes que acompanamos.", icon: Landmark },
  { title: "Enfoque de Genero", desc: "Incorporamos una perspectiva de genero en todas nuestras acciones, reconociendo las desigualdades estructurales y promoviendo la equidad entre hombres y mujeres jovenes.", icon: HeartHandshake },
  { title: "Participacion Protagonica", desc: "Los jovenes no son solo beneficiarios de nuestras acciones, sino protagonistas activos en la construccion de politicas, programas y decisiones que afectan sus vidas.", icon: ShieldCheck },
];

const fallbackIncidencia = [
  "Participacion en mesas tecnicas y espacios de concertacion con el ICBF y otras entidades gubernamentales.",
  "Articulacion con organizaciones de la sociedad civil para la incidencia en politicas publicas de ninez y adolescencia.",
  "Generacion de investigaciones y documentos tecnicos que sustentan las recomendaciones de politica publica.",
  "Formacion de liderazgos juveniles para la incidencia politica y el ejercicio de la ciudadania activa.",
  "Seguimiento y monitoreo a la implementacion de la Ley 2479 de 2025 y otras normas relacionadas.",
];

const incidenciaIcon = (i: number) => [Scale, Landmark, ShieldCheck, HeartHandshake, Search][i % 5] as LucideIcon;

export default async function MarcoPoliticoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });
  const cms = await getProgramBySlug("marco-politico");

  const videos = await getVideos(locale);

  const videoTabs = [
    { id: "testimonios", label: t("videoTabTestimonios") },
    { id: "eventos", label: t("videoTabEventos") },
  ];

  const pilares = cms?.pillars && cms.pillars.length > 0
    ? cms.pillars.map((p) => ({
        title: localize(p.title, locale) || "",
        desc: localize(p.description, locale) || "",
        icon: Scale,
      }))
    : fallbackPilares;

  const enfoques = cms?.crossCutting && cms.crossCutting.length > 0
    ? cms.crossCutting.map((e) => ({
        title: localize(e.title, locale) || "",
        desc: localize(e.description, locale) || "",
        icon: Scale,
      }))
    : fallbackEnfoques;

  const incidencia = cms?.incidenciaItems && cms.incidenciaItems.length > 0
    ? cms.incidenciaItems.map((i) => localize(i, locale) || "")
    : fallbackIncidencia;

  const heroImage = sanityImage(cms?.heroImage) || assetPath(fotos.programas.marcoPolitico.hero);
  const leyGallery = fotos.leyEgreso.gallery.map((src) => assetPath(src));

  return (
    <>
      {/* Hero — visual only */}
      <div className="relative h-[50vh] overflow-hidden bg-ley-purple sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        <YoutubeHeroBg
          videoUrl={homeVideos.programas["marco-politico"].hero || ""}
          fallbackImage={heroImage}
        />
      </div>

      {/* 2. Intro — imagen izquierda + texto derecha */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — imagen */}
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={heroImage}
                  alt="Marco Politico"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-ley-purple backdrop-blur-sm">
                  <Scale size={16} className="text-brand-teal" />
                  Programa
                </div>
              </div>
            </AnimatedSection>

            {/* Derecha — texto */}
            <AnimatedSection direction="right">
              <span className="mb-3 inline-block rounded-full border border-brand-teal/30 bg-brand-teal/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                Marco Politico
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-[2.5rem]">
                Marco <span className="text-brand-teal">Politico</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                Conoce el marco legal y normativo que respalda nuestra labor.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-teal/10">
                  <Scale size={26} className="text-brand-teal" />
                </div>
                <div>
                  <p className="font-extrabold text-[var(--color-text-primary)]">ASCEP</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-teal">Marco Politico</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#pilares"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand-teal px-7 py-3 text-sm font-bold text-white transition-all hover:bg-[#004e4e] hover:shadow-lg"
                >
                  Pilares normativos
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Que es — texto izquierda + imagen derecha */}
      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — texto */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-teal/30 bg-brand-teal/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                Introduccion
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                Marco <span className="text-brand-teal">Politico de ASCEP</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                <p>
                  El Marco Politico de ASCEP define los fundamentos conceptuales, normativos y estrategicos que guian nuestra accion institucional. Como organizacion liderada por egresados del sistema de proteccion estatal, nuestra incidencia se sustenta en un profundo conocimiento de las necesidades y desafios que enfrentan los jovenes en su transicion a la vida independiente.
                </p>
                <p>
                  Nuestro trabajo se enmarca en la Constitucion Politica de Colombia, los tratados internacionales de derechos humanos ratificados por el Estado colombiano, y el Codigo de Infancia y Adolescencia. A partir de este marco juridico, impulsamos transformaciones estructurales que garanticen el bienestar y la autonomia de las nuevas generaciones.
                </p>
              </div>
            </AnimatedSection>

            {/* Derecha — imagen */}
            <AnimatedSection direction="right">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <ImageParallax
                  src={heroImage}
                  alt="Marco Politico de ASCEP"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  intensity={0.15}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="pilares" className="section-dark section-bg-image relative overflow-hidden bg-ley-purple py-16 sm:py-20" style={{ "--section-bg-image": `url(${leyGallery[0] || heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Pilares"
            title="Pilares"
            highlight="Normativos"
            accent="white"
            dark
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {pilares.map((pilar, i) => {
              const Icon = pilar.icon;
              return (
                <AnimatedSection key={pilar.title} direction="up" delay={i * 0.06}>
                  <div className="glass-card flex gap-5 rounded-3xl p-6 transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ley-teal/10">
                      <Icon size={22} className="text-ley-teal" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-bold text-white">{pilar.title}</h3>
                      <p className="text-sm text-white/70">{pilar.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-16 sm:py-20">
        <DecoShapes variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Enfoques"
            title="Enfoques"
            highlight="Transversales"
            accent="teal"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {enfoques.map((enf, i) => {
              const Icon = enf.icon;
              return (
                <AnimatedSection key={enf.title} direction="up" delay={i * 0.06}>
                  <div className="flex gap-5 rounded-3xl border border-ley-teal/20 bg-bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ley-teal/10">
                      <Icon size={22} className="text-ley-teal" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-bold text-text-primary">{enf.title}</h3>
                      <p className="text-sm text-text-secondary">{enf.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-ley-purple py-16 sm:py-20" style={{ "--section-bg-image": `url(${leyGallery[2] || heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Incidencia"
            title="Ejes de"
            highlight="Incidencia"
            accent="white"
            dark
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {incidencia.map((item, i) => {
              const Icon = incidenciaIcon(i);
              return (
                <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                  <div className="flex gap-4 rounded-3xl glass-card p-6 transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ley-teal/10">
                      <Icon size={20} className="text-ley-teal" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">{item}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <ProgramVideosSection
        videos={videos}
        tabs={videoTabs}
        bgImage={heroImage}
        locale={locale}
      />
    </>
  );
}
