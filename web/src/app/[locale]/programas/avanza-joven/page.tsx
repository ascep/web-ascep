import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import ImageParallax from "@/components/ImageParallax";
import CtaBanner from "@/components/CtaBanner";
import { BookOpen, Users, DollarSign, Heart, Target, Star, BookMarked, FileText, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { getProgramBySlug, localize, sanityImage } from "@/lib/sanity/fetch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("avanzaJoven.title"),
    description: t("avanzaJoven.description"),
    openGraph: {
      description: t("avanzaJoven.description"),
    },
  };
}

const iconMap: Record<string, LucideIcon> = {
  BookOpen, Users, DollarSign, Heart, Target, Star,
};

const fallbackObjetivos = [
  {
    title: "Fortalecer las habilidades comunicativas de los jovenes participantes",
    desc: "Desarrollar la escucha activa, la empatia, la expresion oral y escrita, la capacidad de argumentacion y persuasion, y la resolucion de conflictos, para que los jovenes puedan comunicarse de manera efectiva en diferentes contextos y relaciones interpersonales, mejorando sus habilidades sociales, profesionales y personales, y contribuyendo a su desarrollo integral.",
  },
  {
    title: "Proporcionar a los jovenes el conocimiento y comprension de sus derechos y deberes como ciudadanos",
    desc: "Brindar formacion en derechos y deberes civiles, politicos, sociales, culturales y economicos, la Constitucion y las rutas de atencion, facilitando el acceso a informacion actualizada sobre instituciones y normativas vigentes, la orientacion en la utilizacion de recursos y servicios publicos y privados, y el fomento de actitudes de participacion y compromiso ciudadano.",
  },
  {
    title: "Proporcionar a los jovenes participantes la educacion financiera necesaria para la gestion de sus finanzas personales",
    desc: "Desarrollar habilidades y conocimientos en la gestion de finanzas personales, incluyendo la comprension de conceptos financieros basicos, la elaboracion de presupuestos y la planificacion de gastos, el acceso a opciones de ahorro y credito responsable, la prevencion del endeudamiento y el conocimiento de los derechos y responsabilidades financieras.",
  },
  {
    title: "Brindar a los jovenes informacion basada en la ciencia sobre autocuidado, desarrollo fisico, salud mental y emocional",
    desc: "Proporcionar habitos y alimentacion saludables, mediante lecturas, ejercicios, actividades y practicas concretas, para contribuir en su desarrollo equilibrado e integral, incluyendo el autoconocimiento y el manejo de emociones.",
  },
  {
    title: "Proporcionar a los adolescentes herramientas para identificar sus metas y construir su proyecto de vida",
    desc: "Ayudar a los jovenes a diferenciar entre suenos, metas y objetivos realistas y realizables, a traves de actividades formativas y orientacion personalizada, con el fin de fortalecer su capacidad de planificacion y construccion de un proyecto de vida solido.",
  },
  {
    title: "Desarrollar habilidades de liderazgo en los jovenes",
    desc: "Brindar herramientas para que los jovenes puedan influir de manera positiva en su entorno, promover el cambio social y contribuir al bienestar de sus comunidades, al tiempo que fortalecen su propio sentido de pertenencia, a traves de actividades interactivas, talleres y oportunidades practicas.",
  },
];

const fallbackModules = [
  { code: "Modulo 1", title: "En voz alta", desc: "Comunicacion asertiva.", icon: BookOpen },
  { code: "Modulo 2", title: "Ciudadanos Triple A", desc: "Derechos y deberes ciudadanos, conocimiento de la ciudad, servicios y oportunidades.", icon: Users },
  { code: "Modulo 3", title: "Finanza Joven", desc: "Educacion financiera basica: presupuesto personal.", icon: DollarSign },
  { code: "Modulo 4", title: "Vital Joven", desc: "Capacitacion en autocuidado, nutricion y buenas practicas para el desarrollo fisico, emocional y mental. Autoconocimiento y manejo de emociones.", icon: Heart },
  { code: "Modulo 5", title: "Jovenes Aptos", desc: "Proyecto de vida.", icon: Target },
  { code: "Modulo 6", title: "Jovenes Agentes de Cambio", desc: "Liderazgo y participacion comunitaria.", icon: Star },
];

export default async function AvanzaJovenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });
  const cms = await getProgramBySlug("avanza-joven");

  const objetivos: { title: string; desc: string }[] = cms?.objectives && cms.objectives.length > 0
    ? cms.objectives.map((o: any) => ({
        title: localize(o.title, locale) || "",
        desc: localize(o.description, locale) || "",
      }))
    : fallbackObjetivos;

  const modules: { code: string; title: string; desc: string; icon: LucideIcon }[] = cms?.modules && cms.modules.length > 0
    ? cms.modules.map((m: any) => ({
        code: m.code || "",
        title: localize(m.title, locale) || "",
        desc: localize(m.description, locale) || "",
        icon: (m.icon && iconMap[m.icon]) || Heart,
      }))
    : fallbackModules;

  return (
    <>
      <PageHero
        bgImage={sanityImage(cms?.heroImage) || assetPath(fotos.programas.cards.avanzaJoven.image)}
        tag="Programa"
        title="Avanza"
        highlight="Joven"
        subtitle="Un programa integral para jovenes en proceso de egreso del sistema de proteccion."
      />

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Informacion
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Que es <span className="text-brand-purple">Avanza Joven</span>?
            </h2>
          </AnimatedSection>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <AnimatedSection direction="left">
              <div className="relative h-72 overflow-hidden rounded-[10px] md:h-96">
                <ImageParallax src={sanityImage(cms?.heroImage) || assetPath(fotos.programas.cards.avanzaJoven.image)} alt="Avanza Joven" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" intensity={0.2} />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-6 text-base text-[var(--color-text-secondary)]">
                <p>
                  Avanza Joven, una iniciativa disenada especialmente para brindar apoyo y herramientas a adolescentes que viven institucionalizados. Este programa esta enfocado en potenciar el desarrollo de habilidades para la vida, permitiendoles enfrentar los desafios y alcanzar su maximo potencial mientras transitan por esta etapa crucial y se preparan para asumir su vida fuera de la institucionalidad.
                </p>
                <p>
                  Sabemos que vivir en un entorno institucional puede presentar desafios unicos y que enfrentarlos puede resultar abrumador. Sin embargo, creemos firmemente en el poder del crecimiento personal y en la capacidad de cada individuo para superar las dificultades. A traves de Avanza Joven, queremos ser un apoyo significativo en ese camino hacia la autonomia y la independencia, de manera progresiva.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.cards.avanzaJoven.image)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Objetivo
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Objetivo <span className="text-white/80">General</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up">
            <div className="mx-auto max-w-4xl rounded-[10px] glass-card p-6 transition-all hover:bg-white/15">
              <p className="text-lg leading-relaxed text-white/70">
                Fomentar y desarrollar las habilidades, competencias y recursos necesarios en jovenes que se acercan al limite de edad y deben egresar del sistema de proteccion, para que puedan ejercer su transicion hacia la vida independiente y autonoma, de manera responsable y progresiva.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { value: "6", label: "Modulos formativos para la vida" },
              { value: "13.000+", label: "Jovenes egresados del sistema en Colombia" },
              { value: "2019", label: "Impulsando esta iniciativa" },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} direction="up" delay={i * 0.1}>
                <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                  <p className="text-3xl font-extrabold text-brand-secondary">{stat.value}</p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
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
              {t("resultadosTitle2")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Resultados <span className="text-brand-purple">Esperados</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              Lo que buscamos lograr con cada joven que participa en Avanza Joven.
            </p>
          </AnimatedSection>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((ri, i) => (
              <AnimatedSection key={ri} direction="up" delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-[10px] border border-brand-purple/20 bg-bg-card p-6 text-center transition-all hover:shadow-md">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple/10">
                    <BookMarked size={22} className="text-brand-purple" />
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">{t(`avanzaResult${ri}`)}</p>
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
              Objetivos
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Objetivos <span className="text-brand-purple">Especificos</span>
            </h2>
          </AnimatedSection>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {objetivos.map((obj, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 rounded-[10px] border border-brand-purple/20 bg-bg-card p-6 transition-all hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-purple/10 text-lg font-bold text-brand-purple">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h5 className="font-bold text-[var(--color-text-primary)]">{obj.title}</h5>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{obj.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20" style={{ "--section-bg-image": `url(${assetPath(fotos.programas.cards.avanzaJoven.image)})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Modulos
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              <span className="text-white/80">Modulos</span> del Programa
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <AnimatedSection key={mod.title} direction="up" delay={i * 0.06}>
                  <div className="glass-card rounded-[10px] p-6 text-center transition-all hover:bg-white/15">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                      <Icon size={22} className="text-brand-secondary" />
                    </div>
                    <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-white/80">
                      {mod.code}
                    </span>
                    <h4 className="mb-1 font-bold text-white">{mod.title}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{mod.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20">
        <DecoShapes variant="orange" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              Galeria
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              El programa <span className="text-brand-purple">en accion</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
              Momentos reales de los talleres y encuentros con jovenes en transito y egresados del sistema de proteccion.
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fotos.home.gallery.slice(0, 8).map((img, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className={`group relative overflow-hidden rounded-[10px] ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
                  <ImageParallax
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    intensity={0.1}
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="p-4 text-sm font-semibold text-white">{img.alt}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-14 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Recursos
            </span>
            <h3 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
              Cartillas y <span className="text-brand-orange">materiales</span>
            </h3>
            <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Cartilla Proyecto Formativo LET",
                  desc: "Linea de Egreso Transitorio: guia de formacion para jovenes en transicion a la vida independiente.",
                  href: assetPath("/documents/Cartilla-Proyecto-Formativo-LET-ve-sep-20-2018.pdf"),
                },
                {
                  title: "Sistematizacion PFLET 3.0",
                  desc: "Aprendizajes y experiencias del Proyecto Formativo de Linea de Egreso Transitorio.",
                  href: assetPath("/documents/SISTEMATIZACION-PFLET-3.0.pdf"),
                },
              ].map((doc, i) => (
                <AnimatedSection key={doc.title} direction="up" delay={i * 0.1}>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col items-start gap-3 rounded-[10px] border border-brand-purple/20 bg-bg-card p-6 text-left transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-orange/10">
                      <FileText size={24} className="text-brand-orange" />
                    </div>
                    <h4 className="font-bold text-[var(--color-text-primary)]">{doc.title}</h4>
                    <p className="text-sm text-[var(--color-text-secondary)]">{doc.desc}</p>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner
        title={t("avanzaCtaTitle")}
        description={t("avanzaCtaDesc")}
        href="/como-ayudar"
        buttonLabel={t("avanzaCtaBtn")}
      />
    </>
  );
}



