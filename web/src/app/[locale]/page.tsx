import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import HomeHero from "@/components/HomeHero";
import HomeStats from "@/components/HomeStats";
import HomeTestimonials from "@/components/HomeTestimonials";
import HomeCTA from "@/components/HomeCTA";
import Timeline from "@/components/Timeline";
import ModeloGrid from "@/components/ModeloGrid";
import ProgramStack from "@/components/ProgramStack";
import LogoLoop from "@/components/LogoLoop";

const gallery = [
  { src: "/images/eventos/20241112_092951.jpg", alt: "Taller con jovenes" },
  { src: "/images/eventos/20241112_100049.jpg", alt: "Actividad grupal" },
  { src: "/images/eventos/20241112_102515.jpg", alt: "Sesion de trabajo" },
  { src: "/images/encuentro-2025/GIS06449.JPG", alt: "Encuentro ASCEP 2025" },
];

const milestones = [
  { year: "2019", title: "Nacimiento de ASCEP", description: "Un grupo de egresados del sistema de proteccion estatal se organiza para construir un proyecto colectivo que transforme la forma en que el Estado aborda el egreso.", image: "/images/eventos/20241112_092855.jpg" },
  { year: "2020", title: "Primeras alianzas", description: "Establecemos vinculos con actores politicos y organizaciones internacionales como UNICEF, OIM y USAID para impulsar la agenda del egreso.", image: "/images/eventos/20241112_092951.jpg" },
  { year: "2021", title: "Premio Civico", description: "Ganamos el primer lugar del Premio Civico por nuestro trabajo en liderazgo juvenil y procesos formativos con egresados del sistema de proteccion.", image: "/images/eventos/20241112_095957.jpg" },
  { year: "2023", title: "Proyecto de Ley", description: "Impulsamos el proyecto de Ley de Egreso, construido colectivamente con egresados de todo el pais y respaldado por la senadora Lorena Rios.", image: "/images/eventos/20241112_100147.jpg" },
  { year: "2025", title: "Ley 2479 de 2025", description: "Se sanciona la Ley Hijos del Estado, creando el Programa Nacional de Acompanamiento Integral al Egresado del ICBF.", image: "/images/eventos/20241112_111016.jpg" },
];

const programs = [
  {
    title: "Incidencia y Participacion",
    slug: "incidencia",
    desc: "Desarrollamos acciones que involucran a actores clave y tomadores de decisiones en la transformacion de los cuidados alternativos.",
    logo: "/images/programas/LOGO-PROGRAMA-DE-INCIDENCIA.png",
    image: "/images/programas/incidencia-scaled-1.jpg",
    color: "#019E9F",
  },
  {
    title: "Avanza Joven",
    slug: "avanza-joven",
    desc: "Programa disenado para brindar apoyo y herramientas a adolescentes que viven institucionalizados, potenciando habilidades para la vida.",
    logo: "/images/programas/LOGO-AVANZA-JOVEN.png",
    image: "/images/programas/Avanza-1-scaled-1.jpg",
    color: "#44BCC5",
  },
  {
    title: "Fomento para el Empleo",
    slug: "empleo",
    desc: "Modelo piloto para promover capacidades laborales y fortalecer la empleabilidad de jovenes en proceso de egreso del sistema de proteccion.",
    logo: "/images/programas/LOGO-FOMENTO1.png",
    image: "/images/eventos/GIS08397.jpg",
    color: "#EC6620",
  },
  {
    title: "Mi Cuerpo, Mi Sexualidad",
    slug: "mi-cuerpo",
    desc: "Programa para proveer condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad.",
    logo: "/images/programas/logo-MCSD.png",
    image: "/images/eventos/20241112_111009.jpg",
    color: "#EC6620",
  },
];

const aliados = [
  { src: "/images/aliados/colombia.svg", alt: "Colombia" },
  { src: "/images/aliados/empower-logo-blue.svg", alt: "Empower" },
  { src: "/images/aliados/gapi-icesi-logo.jpg", alt: "GAPI Icesi" },
  { src: "/images/aliados/Vaki.png", alt: "Vaki" },
];

const stats = [
  { value: "71148", label: "NNA protegidos por el ICBF", icon: "Users", color: "#019E9F" },
  { value: "13000+", label: "Jovenes egresados", icon: "GraduationCap", color: "#44BCC5" },
  { value: "5+", label: "Programas activos", icon: "Layers", color: "#EC6620" },
  { value: "2019", label: "Inicio de operaciones", icon: "Calendar", color: "#EC6620" },
];

const testimonialsData = [
  { textKey: "testimonial1Text", authorKey: "testimonial1Author", roleKey: "testimonial1Role" },
  { textKey: "testimonial2Text", authorKey: "testimonial2Author", roleKey: "testimonial2Role" },
  { textKey: "testimonial3Text", authorKey: "testimonial3Author", roleKey: "testimonial3Role" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const h = await getTranslations({ locale, namespace: "home" });

  const testimonials = testimonialsData.map((t) => ({
    text: h(t.textKey),
    author: h(t.authorKey),
    role: h(t.roleKey),
  }));

  return (
    <div>
      <HomeHero
        tag={h("heroTag")}
        title={h("heroTitle")}
        subtitle={h("heroSubtitle")}
        cta={
          <Link
            href={`/${locale}/programas`}
            className="inline-flex items-center rounded-[10px] bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-orange-dark hover:shadow-lg hover:shadow-brand-orange/30"
          >
            Conoce nuestros programas
          </Link>
        }
        secondary={
          <Link
            href={`/${locale}/quienes-somos`}
            className="inline-flex items-center rounded-[10px] border-2 border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
          >
            Conocenos
          </Link>
        }
      />

      <section className="relative overflow-hidden bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-[10px] bg-brand-purple/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                {h("aboutTag")}
              </span>
              <h2 className="mb-4 text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl">
                {h("aboutTitle")}
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {h("aboutDesc")}
              </p>
              <ul className="mb-8 space-y-3">
                {["aboutItem1", "aboutItem2", "aboutItem3"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple/10">
                      <span className="h-2 w-2 rounded-full bg-brand-purple" />
                    </span>
                    <span className="text-sm text-[var(--color-text-secondary)]">{h(item)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/quienes-somos`}
                className="inline-flex items-center rounded-[10px] bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple-dark hover:shadow-lg"
              >
                {h("aboutCta")}
              </Link>
            </div>
            <div className="relative pb-4 pr-4">
              <div className="relative inline-block w-full">
                <div className="absolute -left-4 -top-4 h-full w-full rounded-[10px] bg-brand-purple/10" />
                <Image
                  src="/images/equipo-shoot/GIS08548.JPG"
                  alt="Equipo ASCEP"
                  width={600}
                  height={400}
                  className="relative z-10 w-full rounded-[10px] shadow-xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 z-20 flex h-28 w-28 flex-col items-center justify-center rounded-[10px] bg-brand-orange text-white shadow-lg">
                <span className="text-2xl font-extrabold">2019</span>
                <span className="text-[10px] font-semibold uppercase leading-tight tracking-wider">Trabajando</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-orange/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-[10px] bg-brand-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Los retos
              </span>
              <h2 className="mb-4 text-2xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-3xl">
                Retos que enfrentamos
              </h2>
              <p className="mb-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                Los adolescentes y jovenes en proceso de egreso del sistema de proteccion estatal enfrentan retos significativos, como la definicion de su situacion juridica, la vulneracion de derechos o el impacto del desplazamiento forzado. Estos jovenes requieren apoyo integral para construir su proyecto de vida, acceder a oportunidades educativas y laborales, y lograr su plena integracion social.
              </p>
              <p className="text-base font-semibold text-[var(--color-text-primary)]">
                Generamos capacidades y habilidades en los pre-egresados y egresados del sistema de proteccion.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/eventos/20241112_102357.jpg"
                alt="Jovenes en taller"
                width={600}
                height={400}
                className="w-full rounded-[10px] object-cover shadow-xl"
                style={{ aspectRatio: "3/2" }}
              />
            </div>
          </div>
        </div>
      </section>

      <HomeStats
        tag={h("statsTag")}
        title={h("statsTitle")}
        description={h("statsDesc")}
        stats={stats}
        cta={
          <Link
            href={`/${locale}/impacto`}
            className="inline-flex items-center rounded-[10px] bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple-dark hover:shadow-lg"
          >
            Ver mas impacto
          </Link>
        }
      />

      <section className="relative overflow-hidden bg-brand-orange/5 py-20">
        <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
            Historia y logros
          </span>
          <h2 className="mb-12 text-center text-3xl font-bold text-[var(--color-text-primary)]">
            Nuestra Trayectoria
          </h2>
          <Timeline items={milestones} />
        </AnimatedSection>
      </section>

      <ModeloGrid locale={locale} />

      <ProgramStack programs={programs} locale={locale} />

      <HomeTestimonials
        tag={h("testimonialsTag")}
        title={h("testimonialsTitle")}
        testimonials={testimonials}
      />

      <section className="relative overflow-hidden bg-brand-purple/5 py-24">
        <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-purple">
            Galeria de momentos
          </span>
          <h2 className="mb-12 text-center text-3xl font-bold text-[var(--color-text-primary)]">
            Nuestra labor en imagenes
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <AnimatedSection delay={0.05} className="sm:col-span-2 sm:row-span-2">
              <div className="group relative overflow-hidden rounded-[10px] h-full">
                <Image
                  src={gallery[0].src}
                  alt={gallery[0].alt}
                  width={900}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: "300px" }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </AnimatedSection>
            {gallery.slice(1).map((img, i) => (
              <AnimatedSection key={img.src} delay={0.1 + i * 0.08}>
                <div className="group relative overflow-hidden rounded-[10px]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={333}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-44"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="relative overflow-hidden bg-brand-teal/5 py-20">
        <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
            Quienes nos acompanan
          </span>
          <h2 className="mb-10 text-center text-3xl font-bold text-[var(--color-text-primary)]">
            Aliados estrategicos
          </h2>
          <LogoLoop logos={aliados} />
        </AnimatedSection>
      </section>

      <HomeCTA
        tag={h("ctaTag")}
        title={h("ctaTitle")}
        description={h("ctaDesc")}
        phone={h("ctaPhone")}
        email={h("ctaEmail")}
        location={h("ctaLocation")}
        formTitle={h("ctaFormTitle")}
        formNamePlaceholder={h("ctaFormName")}
        formEmailPlaceholder={h("ctaFormEmail")}
        formMessagePlaceholder={h("ctaFormMsg")}
        formSubmit={h("ctaFormSubmit")}
      />
    </div>
  );
}
