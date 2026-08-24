import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection from "@/components/AnimatedSection";
import DecoShapes from "@/components/DecoShapes";
import CursorGlow from "@/components/CursorGlow";
import CtaBanner from "@/components/CtaBanner";
import ProgramGallerySection from "@/components/ProgramGallerySection";
import ProgramVideosSection from "@/components/ProgramVideosSection";
import VideoFacade from "@/components/VideoFacade";
import { BookOpen, Users, DollarSign, Heart, Target, Star, BookMarked, CheckCircle, type LucideIcon } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { getProgramBySlug, getVideos, localize, sanityImage } from "@/lib/sanity/fetch";
import YoutubeHeroBg from "@/components/YoutubeHeroBg";
import { homeVideos, extractYouTubeId } from "@/data/homeVideos";

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
    desc: "Desarrollar la escucha activa, la empatia, la expresion oral y escrita, la capacidad de argumentacion y persuasion, y la resolucion de conflictos.",
  },
  {
    title: "Proporcionar conocimiento y comprension de sus derechos y deberes como ciudadanos",
    desc: "Brindar formacion en derechos y deberes civiles, politicos, sociales, culturales y economicos, la Constitucion y las rutas de atencion.",
  },
  {
    title: "Proporcionar educacion financiera para la gestion de sus finanzas personales",
    desc: "Desarrollar habilidades y conocimientos en la gestion de finanzas personales, incluyendo presupuestos y planificacion de gastos.",
  },
  {
    title: "Brindar informacion sobre autocuidado, desarrollo fisico, salud mental y emocional",
    desc: "Proporcionar habitos y alimentacion saludables, mediante lecturas, ejercicios, actividades y practicas concretas.",
  },
  {
    title: "Proporcionar herramientas para identificar metas y construir su proyecto de vida",
    desc: "Ayudar a los jovenes a diferenciar entre suenos, metas y objetivos realistas y realizables.",
  },
  {
    title: "Desarrollar habilidades de liderazgo en los jovenes",
    desc: "Brindar herramientas para que los jovenes puedan influir de manera positiva en su entorno y promover el cambio social.",
  },
];

const fallbackModules = [
  { code: "Modulo 1", title: "En voz alta", desc: "Comunicacion asertiva: escucha activa, empatia, expresion oral y escrita, argumentacion y resolucion de conflictos.", icon: BookOpen },
  { code: "Modulo 2", title: "Ciudadanos Triple A", desc: "Derechos y deberes ciudadanos, conocimiento de la ciudad, servicios y oportunidades publicas.", icon: Users },
  { code: "Modulo 3", title: "Finanza Joven", desc: "Educacion financiera basica: presupuesto personal, ahorro, credito responsable y prevencion del endeudamiento.", icon: DollarSign },
  { code: "Modulo 4", title: "Vital Joven", desc: "Autocuidado, nutricion, desarrollo fisico, emocional y mental. Autoconocimiento y manejo de emociones.", icon: Heart },
  { code: "Modulo 5", title: "Jovenes Aptos", desc: "Proyecto de vida: diferenciar suenos, metas y objetivos realistas. Planificacion personal y profesional.", icon: Target },
  { code: "Modulo 6", title: "Jovenes Agentes de Cambio", desc: "Liderazgo y participacion comunitaria. Influencia positiva en el entorno y cambio social.", icon: Star },
];

const fallbackProcess = [
  { step: "01", title: "Inscripcion", desc: "Los jovenes interesados se inscriben en el programa a traves de las ICBF o directamente con ASCEP." },
  { step: "02", title: "Encuentro inicial", desc: "Sesion de bienvenida donde los jovenes conocen el programa, el equipo y a sus companeros." },
  { step: "03", title: "Formacion", desc: "Desarrollo de los 6 modulos formativos en sesiones semanales de 2-3 horas." },
  { step: "04", title: "Acompañamiento", desc: "Seguimiento individualizado durante y despues del programa para garantizar la transicion exitosa." },
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

  const cmsVideos = await getVideos(locale);

  const avanzaJovenVideos = homeVideos.programas["avanza-joven"];
  const homeVideoEntries: typeof cmsVideos = [
    ...(avanzaJovenVideos?.testimonials || []).map((id, i) => ({
      _id: `home-testimonial-${i}`,
      title: "",
      description: "",
      source: "youtube" as const,
      youtubeId: extractYouTubeId(id) || id,
      videoUrl: null,
      thumbnail: null,
      category: "testimonios",
      order: i,
    })),
    ...(avanzaJovenVideos?.support || []).map((id, i) => ({
      _id: `home-support-${i}`,
      title: "",
      description: "",
      source: "youtube" as const,
      youtubeId: extractYouTubeId(id) || id,
      videoUrl: null,
      thumbnail: null,
      category: "avanza-joven",
      order: i + 100,
    })),
  ];
  const videos = [...cmsVideos, ...homeVideoEntries];

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
      {/* 1. Hero — cinematic video bg with glass panel + wave mask */}
      <section className="relative flex h-[50vh] items-end justify-start overflow-hidden bg-ley-purple sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
        {/* Video background */}
        <div className="absolute inset-0">
          <YoutubeHeroBg
            videoUrl="https://youtu.be/oqponuHvbGA"
            fallbackImage={heroImage}
          />
          {/* Vignette overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(10,16,32,0.05) 0%, rgba(10,16,32,0.35) 65%, rgba(10,16,32,0.8) 100%)",
            }}
          />
          {/* Bottom blend */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to top, rgba(10,16,32,0.7) 0%, rgba(10,16,32,0.2) 40%, transparent 100%)",
            }}
          />
        </div>

        {/* Glass panel with text */}
        <div className="relative z-20 w-full max-w-2xl px-6 pb-16 md:px-16">
          <div
            className="rounded-2xl p-5 shadow-2xl sm:p-6"
            style={{
              background: "rgba(10,16,32,0.45)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80">
              {t("pillPrograma")}
            </span>
            <h1 className="mt-3 text-2xl font-extrabold leading-[1.1] text-white sm:text-3xl lg:text-4xl">
              {t("avanzaHeroTitle")} <span className="text-ley-cyan">{t("avanzaHeroHighlight")}</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              {t("avanzaHeroSubtitle")}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#modulos"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ley-cyan px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-ley-purple transition-all hover:bg-ley-cyan/90 hover:shadow-lg"
              >
                {t("avanzaHeroCta")}
              </a>
              <Link
                href={`/${locale}/como-ayudar`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white/90 transition-all hover:border-white/50 hover:bg-white/5"
              >
                {t("avanzaCtaBtn")}
              </Link>
            </div>
          </div>
        </div>

        {/* SVG wave mask at bottom */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 w-full leading-none"
          style={{ filter: "drop-shadow(0px -8px 12px rgba(10,16,32,0.4))" }}
        >
          <svg
            className="block h-[50px] w-full sm:h-[70px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C200,80 450,10 700,70 C950,130 1100,20 1200,50 L1200,120 L0,120 Z"
              fill="var(--color-surface, #fff)"
            />
          </svg>
        </div>
      </section>

      {/* 2. Que es — texto izquierda + video/foto derecha */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — texto */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                Informacion
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                Que es <span className="text-brand-primary">Avanza Joven?</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                <p>
                  Avanza Joven, una iniciativa disenada especialmente para brindar apoyo y herramientas a adolescentes que viven institucionalizados. Este programa esta enfocado en potenciar el desarrollo de habilidades para la vida, permitiendoles enfrentar los desafios y alcanzar su maximo potencial.
                </p>
                <p>
                  Sabemos que vivir en un entorno institucional puede presentar desafios unicos. Sin embargo, creemos firmemente en el poder del crecimiento personal y en la capacidad de cada individuo para superar las dificultades. A traves de Avanza Joven, queremos ser un apoyo significativo en ese camino hacia la autonomia.
                </p>
              </div>
              {/* Galeria mini */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {avanzaPhotos.slice(0, 4).map((src, i) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl transition-transform hover:scale-[1.03]">
                    <Image
                      src={src}
                      alt={`Avanza Joven - Foto ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Derecha — video grande */}
            <AnimatedSection direction="right">
              <div className="relative overflow-hidden rounded-3xl">
                <VideoFacade
                  youtubeId="oqponuHvbGA"
                  title="Que es Avanza Joven"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. Proceso — video izquierda + pasos derecha */}
      <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Izquierda — video */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                Proceso
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                Como <span className="text-brand-primary">Funciona</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                El camino que recorre cada joven durante el programa, desde la inscripcion hasta la transicion a la vida independiente.
              </p>
              <div className="relative mt-8 overflow-hidden rounded-3xl">
                <VideoFacade
                  youtubeId="oqponuHvbGA"
                  title="Proceso Avanza Joven"
                />
              </div>
            </AnimatedSection>

            {/* Derecha — pasos */}
            <AnimatedSection direction="right">
              <div className="space-y-6">
                {fallbackProcess.map((step, i) => (
                  <div key={step.step} className="flex gap-5 rounded-3xl border border-border-default bg-bg-card p-6 transition-all hover:shadow-lg">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-lg font-extrabold text-brand-primary">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 5. Objetivo General — texto izquierda + stats/derecha */}
      <section className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Izquierda — texto */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Objetivo
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl">
                Objetivo <span className="text-ley-cyan">General</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Fomentar y desarrollar las habilidades, competencias y recursos necesarios en jovenes que se acercan al limite de edad y deben egresar del sistema de proteccion, para que puedan ejercer su transicion hacia la vida independiente y autonoma, de manera responsable y progresiva.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Image
                  src={logoImage}
                  alt="ASCEP"
                  width={64}
                  height={64}
                  className="h-12 w-12 rounded-2xl object-contain"
                />
                <div>
                  <p className="font-extrabold text-white">ASCEP</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ley-cyan">{t("avanzaTitle")}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Derecha — stats */}
            <AnimatedSection direction="right">
              <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { value: "6", label: "Modulos formativos para la vida", icon: BookOpen },
                  { value: "13.000+", label: "Jovenes egresados del sistema en Colombia", icon: Users },
                  { value: "2019", label: "Impulsando esta iniciativa", icon: Target },
                ].map((stat, i) => (
                  <div key={stat.label} className="glass-card flex items-center gap-5 rounded-3xl p-6 transition-all hover:bg-white/15">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ley-cyan/10">
                      <stat.icon size={24} className="text-ley-cyan" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-ley-cyan">{stat.value}</p>
                      <p className="text-sm text-white/60">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 6. Objetivos Especificos — grid 2 cols con iconos */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Objetivos" title="Objetivos" highlight="Especificos" accent="cyan" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
            {objetivos.map((obj, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 rounded-3xl border border-border-default bg-bg-card p-6 transition-all hover:shadow-lg">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-brand-primary" />
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)]">{obj.title}</h3>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{obj.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Modulos — dark grid */}
      <section id="modulos" className="section-dark section-bg-image relative overflow-hidden bg-purple-bg py-24 sm:py-32" style={{ "--section-bg-image": `url(${heroImage})` } as CSSProperties}>
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="mixed" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Modulos" title="Modulos" highlight="del Programa" accent="white" dark />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <AnimatedSection key={mod.title} direction="up" delay={i * 0.06}>
                  <div className="glass-card rounded-3xl p-6 transition-all hover:-translate-y-1 hover:bg-white/15">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ley-cyan/10">
                        <Icon size={22} className="text-ley-cyan" />
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-white/80">
                        {mod.code}
                      </span>
                    </div>
                    <h3 className="mb-2 font-bold text-white">{mod.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{mod.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Resultados — texto izquierda + cards derecha */}
      <section className="relative overflow-hidden bg-section-light py-24 sm:py-32">
        <DecoShapes variant="teal" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Izquierda — texto */}
            <AnimatedSection direction="left">
              <span className="mb-3 inline-block rounded-full border border-brand-primary/30 bg-brand-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {t("resultadosTitle2")}
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                Resultados <span className="text-brand-primary">Esperados</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                Lo que buscamos lograr con cada joven que participa en Avanza Joven. Estos son los impactos medibles que buscamos en la vida de los participantes.
              </p>
              <div className="relative mt-8 overflow-hidden rounded-3xl">
                <VideoFacade
                  youtubeId="Y1yuBPP6ba8"
                  title="Resultados Avanza Joven"
                />
              </div>
            </AnimatedSection>

            {/* Derecha — cards de resultados */}
            <AnimatedSection direction="right">
              <div className="space-y-5">
                {[1, 2, 3].map((ri, i) => (
                  <div key={ri} className="flex gap-4 rounded-3xl border border-border-default bg-bg-card p-6 transition-all hover:shadow-lg">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ley-cyan/10">
                      <BookMarked size={22} className="text-ley-cyan" />
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{t(`avanzaResult${ri}`)}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 9. Galeria de fotos */}
      <ProgramGallerySection
        images={avanzaGallery.length > 0 ? avanzaGallery : fotos.home.gallery.map((img) => img.src)}
        overlayLabel="Avanza Joven"
        magazines={[]}
        locale={locale}
      />

      {/* 10. Videos */}
      <ProgramVideosSection
        videos={videos}
        tabs={videoTabs}
        bgImage={assetPath(fotos.programas.cards.avanzaJoven.image)}
        locale={locale}
      />

      {/* 11. CTA */}
      <CtaBanner
        title={t("avanzaCtaTitle")}
        description={t("avanzaCtaDesc")}
        href="/como-ayudar"
        buttonLabel={t("avanzaCtaBtn")}
      />
    </>
  );
}
