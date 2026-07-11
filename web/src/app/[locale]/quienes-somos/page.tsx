import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Timeline from "@/components/Timeline";
import AnimatedSection from "@/components/AnimatedSection";
import { Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Quienes Somos - ASCEP",
};

const team = [
  { name: "Maicol Londoño", role: "Director", src: "/images/equipo/maicol.png" },
  { name: "Kevin Ortega", role: "Coordinador", src: "/images/equipo/phtos-ascep-kevin.png" },
  { name: "Monica", role: "Equipo Psicosocial", src: "/images/equipo/phtos-ascep-monica.png" },
  { name: "Jhon Eduard Angulo", role: "Equipo de Formacion", src: "/images/equipo/phtos-ascep-jhon.png" },
  { name: "Ana", role: "Equipo ASCEP", src: "/images/equipo/phtos-ascep.png" },
];

const milestones = [
  { year: "2019", title: "Nacimiento de ASCEP", description: "Un grupo de egresados del sistema de proteccion estatal se organiza para construir un proyecto colectivo que transforme la forma en que el Estado aborda el egreso.", image: "/images/eventos/20241112_092855.jpg" },
  { year: "2020", title: "Primeras alianzas", description: "Establecemos vinculos con actores politicos y organizaciones internacionales como UNICEF, OIM y USAID para impulsar la agenda del egreso.", image: "/images/eventos/20241112_092951.jpg" },
  { year: "2021", title: "Premio Civico", description: "Ganamos el primer lugar del Premio Civico por nuestro trabajo en liderazgo juvenil y procesos formativos con egresados del sistema de proteccion.", image: "/images/eventos/20241112_095957.jpg" },
  { year: "2023", title: "Proyecto de Ley", description: "Impulsamos el proyecto de Ley de Egreso, construido colectivamente con egresados de todo el pais y respaldado por la senadora Lorena Rios.", image: "/images/eventos/20241112_100147.jpg" },
  { year: "2025", title: "Ley 2479 de 2025", description: "Se sanciona la Ley Hijos del Estado, creando el Programa Nacional de Acompanamiento Integral al Egresado del ICBF.", image: "/images/eventos/20241112_111016.jpg" },
];

const dimensions = [
  { title: "Autoaceptacion", desc: "Valoracion positiva de si mismo y de la propia historia." },
  { title: "Relaciones Positivas", desc: "Capacidad de establecer y mantener relaciones sociales de calidad y confianza." },
  { title: "Dominio del Entorno", desc: "Percepcion de control del medio y habilidad para crear entornos favorables." },
  { title: "Autonomia", desc: "Capacidad de sostener la propia individualidad y autodeterminacion personal." },
  { title: "Proposito en la Vida", desc: "Capacidad de tener metas claras y definir objetivos vitales." },
  { title: "Crecimiento Personal", desc: "Desarrollo de las potencialidades individuales para crecer como persona." },
  { title: "enredete con ascep", desc: "Desarrollo de las potencialidades individuales para crecer como persona." },
];

const fullText = [
  "Somos un grupo de personas egresadas del Sistema de Proteccion Estatal de Colombia que, a partir de nuestra propia experiencia, nos hemos unido para contribuir a la transformacion y mejora de la forma en que el Estado, a traves de sus operadores, aborda el cuidado, la proteccion y restablecimiento de derechos de ninos, ninas, adolescentes y jovenes en el pais.",
  "Reconocemos y agradecemos el apoyo que el Estado ha brindado a nuestras vidas, garantizando que pudieramos crecer alejados de los diferentes factores que nos llevaron a ingresar al sistema de proteccion. Sin embargo, consideramos que hay aspectos de como el Estado proporciona esta proteccion y cuidado que deben ser evaluados de manera objetiva y corregidos de manera eficiente, especialmente en lo que respecta a la preparacion para la vida autonoma e independiente y el acompanamiento una vez cesa el apoyo Estatal.",
  "Creemos firmemente que el egreso del sistema de proteccion no debe ser un evento solitario ni abrupto. Cada joven merece una transicion gradual y acompanada hacia la vida adulta, con acceso a educacion, vivienda, salud mental y oportunidades laborales que le permitan construir su proyecto de vida con dignidad.",
  "Desde nuestra fundacion en 2019, hemos trabajado incansablemente para visibilizar las realidades de los egresados, incidir en politicas publicas que garanticen sus derechos y crear programas que fortalezcan las habilidades para la vida de quienes estan proximos a egresar o ya han egresado del sistema.",
  "Hoy somos una organizacion reconocida a nivel nacional e internacional, con alianzas estrategicas que nos permiten amplificar nuestra voz y extender nuestro impacto. Pero sobre todo, somos una comunidad de jovenes que se niega a ser invisible, que alza la voz para decir: existimos, resistimos y construimos un futuro mejor para las proximas generaciones.",
];

export default async function QuienesSomosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div>
      <PageHero
        bgImage="/images/equipo-shoot/GIS08542.JPG"
        title="Quienes"
        highlight="Somos"
        subtitle="Somos un grupo de personas egresadas del Sistema de Proteccion Estatal de Colombia que, a partir de nuestra propia experiencia, nos hemos unido para contribuir a la transformacion y mejora de la forma en que el Estado aborda el cuidado y proteccion de ninos, ninas, adolescentes y jovenes en el pais."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimatedSection direction="left" className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-[10px] bg-brand-purple/10" />
              <Image
                src="/images/equipo-shoot/GIS08550.JPG"
                alt="Equipo ASCEP"
                width={600}
                height={400}
                className="relative w-full rounded-[10px] object-cover shadow-lg"
                style={{ aspectRatio: "3/2" }}
              />
            </AnimatedSection>
            <div>
              <AnimatedSection direction="right">
                <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                  NUESTRA HISTORIA
                </span>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)]">
                  Nuestra <span className="text-brand-purple">Historia</span>
                </h2>
              </AnimatedSection>
              {fullText.map((paragraph, i) => (
                <AnimatedSection key={i} direction="up" delay={0.15 * i}>
                  <p className="mb-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    {paragraph}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-12 text-center">
            <AnimatedSection direction="up">
              <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
                MISION, VISION Y PROPOSITO
              </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                Nuestro <span className="text-brand-purple">Proposito</span>
              </h2>
            </AnimatedSection>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <AnimatedSection direction="up" className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-teal/10">
                <Target size={22} className="text-brand-teal" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">
                Nuestra Mision
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Buscamos que cada joven desarrolle las competencias y habilidades
                esenciales para integrarse plenamente en la sociedad y construir un
                proyecto de vida autonomo, responsable y con conciencia social,
                fortaleciendo las politicas publicas para la proteccion de la ninez
                y la juventud en Colombia.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1} className="rounded-[10px] border border-brand-purple/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-purple/10">
                <Eye size={22} className="text-brand-purple" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">
                Nuestra Vision
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Ser una organizacion lider en la transformacion del sistema de
                proteccion estatal en Colombia y Latinoamerica, donde cada joven
                egresado cuente con las herramientas, el apoyo y las oportunidades
                necesarias para construir una vida autonoma, digna y plena.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2} className="rounded-[10px] border border-brand-orange/20 bg-bg-card p-8 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-orange/10">
                <Heart size={22} className="text-brand-orange" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]">
                Nuestro Proposito
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Trabajar incansablemente para que ningun joven egresado del sistema
                de proteccion enfrente solo su transicion a la vida adulta,
                garantizando que cada uno cuente con las herramientas, el
                acompanamiento y las oportunidades necesarias para construir un
                proyecto de vida autonomo, digno y pleno.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="mb-20">
          <AnimatedSection direction="up" className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              TRAYECTORIA
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Nuestra <span className="text-brand-purple">Trayectoria</span>
            </h2>
          </AnimatedSection>
          <Timeline items={milestones} />
        </section>

        <section className="mb-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <AnimatedSection direction="left">
                <span className="mb-3 inline-block rounded-[10px] bg-brand-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                  EQUIPO
                </span>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.1}>
                <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                  Nuestro <span className="text-brand-purple">Equipo</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="left" delay={0.2}>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                  Somos un grupo de personas egresadas del Sistema de Proteccion
                  Estatal que, desde nuestra propia experiencia, trabajamos para
                  transformar la forma en que el Estado aborda el cuidado de la
                  ninez y la juventud en Colombia.
                </p>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {team.slice(0, 4).map((member, i) => (
                  <AnimatedSection key={member.name} direction="up" delay={i * 0.08}>
                    <div className="flex items-center gap-4 rounded-[10px] bg-white p-4 shadow-sm transition-all hover:shadow-md">
                      <div className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[10px] sm:h-[130px] sm:w-[130px]">
                        <Image
                          src={member.src}
                          alt={member.name}
                          width={130}
                          height={130}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold text-brand-purple">
                          {member.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-text-muted">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              {team.length > 4 && (
                <AnimatedSection direction="up" delay={0.4} className="mt-4 flex justify-center sm:justify-start">
                  <div className="flex w-full items-center gap-4 rounded-[10px] bg-white p-4 shadow-sm transition-all hover:shadow-md sm:w-[calc(50%-0.5rem)]">
                    <div className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[10px] sm:h-[130px] sm:w-[130px]">
                      <Image
                        src={team[4].src}
                        alt={team[4].name}
                        width={130}
                        height={130}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-lg font-bold text-brand-purple">
                        {team[4].name}
                      </h4>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {team[4].role}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <AnimatedSection direction="up" className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              ENFOQUE
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Enfoque <span className="text-brand-purple">Metodologico</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <p className="mb-8 text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Nuestro modelo esta enfocado al fortalecimiento del ser, como base
              para que los jovenes que egresan del sistema de proteccion puedan
              gestionar su proyecto de vida. Trabajamos transversalmente las seis
              dimensiones del bienestar psicologico de Carol Ryff:
            </p>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dimensions.map((item, i) => (
              <AnimatedSection key={item.title} direction="up" delay={i * 0.05}>
                <div className="rounded-[10px] border border-brand-teal/20 bg-bg-card p-6 transition-all hover:shadow-md">
                  <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <AnimatedSection direction="up">
          <section className="rounded-[10px] bg-brand-purple p-10 text-center shadow-sm transition-all hover:shadow-md">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Unete a nuestra causa
            </h2>
            <p className="mb-6 text-lg text-white/80">
              Si compartes nuestra vision, te invitamos a sumarte como aliado,
              voluntario o donante.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center rounded-[10px] bg-white px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-white/90 hover:shadow-lg"
              >
                Contactanos
              </Link>
              <Link
                href={`/${locale}/donar`}
                className="inline-flex items-center rounded-[10px] border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-brand-purple"
              >
                Donar
              </Link>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
