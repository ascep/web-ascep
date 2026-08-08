import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import DossierHero from "@/components/DossierHero";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import CtaBanner from "@/components/CtaBanner";
import ProgramGallerySection from "@/components/ProgramGallerySection";
import ProgramVideosSection from "@/components/ProgramVideosSection";
import { BookOpen, Users, DollarSign, Heart, Target, Star, BookMarked, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { getProgramBySlug, getVideos, localize, sanityImage } from "@/lib/sanity/fetch";

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

async function getAvanzaGallery(): Promise<string[]> {
  try {
    const dir = join(process.cwd(), "public", "images", "avanza-joven");
    const files = await readdir(dir, { withFileTypes: true });
    const entries = await Promise.all(
      files
        .filter((f) => f.isFile() && f.name.endsWith(".webp"))
        .map(async (f) => {
          try {
            const s = await stat(join(dir, f.name));
            return s.size > 0 ? f.name : null;
          } catch {
            return null;
          }
        }),
    );
    return entries
      .filter((n): n is string => n !== null)
      .sort()
      .map((f) => assetPath(`/images/avanza-joven/${f}`));
  } catch {
    return [];
  }
}

export default async function AvanzaJovenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programas" });
  const cms = await getProgramBySlug("avanza-joven");

  const videos = await getVideos(locale);

  const avanzaGallery = await getAvanzaGallery();
  const avanzaPhotos = avanzaGallery.length >= 4
    ? avanzaGallery.slice(0, 4)
    : fotos.home.gallery.slice(0, 4).map((img) => img.src);

  const videoTabs = [
    { id: "avanza-joven", label: t("videoTabAvanza") },
    { id: "testimonios", label: t("videoTabTestimonios") },
    { id: "eventos", label: t("videoTabEventos") },
  ];

  const objetivos: { title: string; desc: string }[] = cms?.objectives && cms.objectives.length > 0
    ? cms.objectives.map((o) => ({
        title: localize(o.title, locale) || "",
        desc: localize(o.description, locale) || "",
      }))
    : fallbackObjetivos;

  const modules: { code: string; title: string; desc: string; icon: LucideIcon }[] = cms?.modules && cms.modules.length > 0
    ? cms.modules.map((m) => ({
        code: m.code || "",
        title: localize(m.title, locale) || "",
        desc: localize(m.description, locale) || "",
        icon: (m.icon && iconMap[m.icon]) || Heart,
      }))
    : fallbackModules;

  const heroImage = sanityImage(cms?.heroImage) || assetPath(fotos.programas.cards.avanzaJoven.image);
  const logoImage = assetPath(fotos.home.programs.avanzaJoven.logo);

  return (
    <>
      <DossierHero
        images={[heroImage, ...avanzaPhotos.slice(0, 2)]}
        tag={t("pillPrograma")}
        title={t("avanzaHeroTitle")}
        highlight={t("avanzaHeroHighlight")}
        subtitle={t("avanzaHeroSubtitle")}
        accent="cyan"
        primaryCta={{ label: t("avanzaHeroCta"), href: "#modulos" }}
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Image
              src={logoImage}
              alt="ASCEP"
              width={112}
              height={112}
              className="h-16 w-16 rounded-2xl bg-white/15 object-contain p-2"
            />
            <div>
              <p className="text-xl font-extrabold">ASCEP</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ley-cyan">
                {t("avanzaTitle")}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-purple-100">{t("avanzaDesc")}</p>
          <Link
            href={`/${locale}/como-ayudar`}
            className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-ley-yellow px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-ley-yellow/90 hover:shadow-lg"
          >
            {t("avanzaCtaBtn")}
          </Link>
        </div>
      </DossierHero>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Informacion" title="Que es" highlight="Avanza Joven?" accent="cyan" />
          <AnimatedSection delay={0.1}>
            <div className="mx-auto max-w-3xl space-y-6 text-center text-base text-[var(--color-text-secondary)]">
              <p>
                Avanza Joven, una iniciativa disenada especialmente para brindar apoyo y herramientas a adolescentes que viven institucionalizados. Este programa esta enfocado en potenciar el desarrollo de habilidades para la vida, permitiendoles enfrentar los desafios y alcanzar su maximo potencial mientras transitan por esta etapa crucial y se preparan para asumir su vida fuera de la institucionalidad.
              </p>
              <p>
                Sabemos que vivir en un entorno institucional puede presentar desafios unicos y que enfrentarlos puede resultar abrumador. Sin embargo, creemos firmemente en el poder del crecimiento personal y en la capacidad de cada individuo para superar las dificultades. A traves de Avanza Joven, queremos ser un apoyo significativo en ese camino hacia la autonomia y la independencia, de manera progresiva.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {avanzaPhotos.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={src}
                    alt="Avanza Joven"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Objetivo" title="Objetivo" highlight="General" accent="white" dark />
          <AnimatedSection direction="up">
            <div className="mx-auto max-w-4xl rounded-3xl glass-card p-6 transition-all hover:bg-white/15">
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
                <div className="glass-card rounded-3xl p-6 text-center transition-all hover:bg-white/15">
                  <p className="text-3xl font-extrabold text-ley-cyan">{stat.value}</p>
                  <p className="mt-2 text-sm text-white/60">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Objetivos" title="Objetivos" highlight="Especificos" accent="cyan" />
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {objetivos.map((obj, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 rounded-3xl border border-border-default bg-bg-card p-6 transition-all hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ley-cyan/10 text-lg font-bold text-ley-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold text-text-primary">{obj.title}</h3>
                    <p className="mt-1 text-sm text-text-secondary">{obj.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="modulos" className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-20 sm:py-24" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Modulos" title="Modulos" highlight="del Programa" accent="white" dark />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <AnimatedSection key={mod.title} direction="up" delay={i * 0.06}>
                  <div className="glass-card rounded-3xl p-6 text-center transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-ley-cyan/10">
                      <Icon size={22} className="text-ley-cyan" />
                    </div>
                    <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-white/80">
                      {mod.code}
                    </span>
                    <h3 className="mb-1 font-bold text-white">{mod.title}</h3>
                    <p className="text-sm text-white/60">{mod.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={t("resultadosTitle2")}
            title="Resultados"
            highlight="Esperados"
            accent="cyan"
            desc="Lo que buscamos lograr con cada joven que participa en Avanza Joven."
          />
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((ri, i) => (
              <AnimatedSection key={ri} direction="up" delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-3xl border border-border-default bg-bg-card p-6 text-center transition-all hover:shadow-md">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ley-cyan/10">
                    <BookMarked size={22} className="text-ley-cyan" />
                  </div>
                  <p className="text-sm text-text-secondary">{t(`avanzaResult${ri}`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ProgramGallerySection
        images={avanzaGallery.length > 0 ? avanzaGallery : fotos.home.gallery.map((img) => img.src)}
        overlayLabel="Avanza Joven"
        magazines={[]}
        locale={locale}
      />

      <ProgramVideosSection
        videos={videos}
        tabs={videoTabs}
        bgImage={assetPath(fotos.programas.cards.avanzaJoven.image)}
        locale={locale}
      />

      <CtaBanner
        title={t("avanzaCtaTitle")}
        description={t("avanzaCtaDesc")}
        href="/como-ayudar"
        buttonLabel={t("avanzaCtaBtn")}
      />
    </>
  );
}



