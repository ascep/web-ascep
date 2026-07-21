/**
 * Central static image mapping for ASCEP website assets.
 *
 * Use this file when a page or component needs a public image path.
 * This is commentable and safer than a plain JSON file.
 *
 * When rendering, wrap values with `assetPath(...)` so production asset
 * remapping still works via `src/lib/asset-map.ts`.
 */

export const fotos = {
  home: {
    heroPoster: "/images/_MG_1563.webp",
    heroImage: "/images/encuentro-2025/GIS06445.webp",
    aboutImage: "/images/equipo-shoot/GIS08548.webp",
    retosImage: "/images/eventos/20241112_102357.webp",
    gallery: [
      { src: "/images/eventos/20241112_092951.webp", alt: "Taller con jovenes" },
      { src: "/images/eventos/20241112_100049.webp", alt: "Actividad grupal" },
      { src: "/images/eventos/20241112_102515.webp", alt: "Sesion de trabajo" },
      { src: "/images/encuentro-2025/GIS06449.webp", alt: "Encuentro ASCEP 2025" },
    ],
    timeline: [
      { year: "2019", title: "Nacimiento de ASCEP", description: "Un grupo de egresados del sistema de proteccion estatal se organiza para construir un proyecto colectivo que transforme la forma en que el Estado aborda el egreso.", image: "/images/eventos/20241112_092855.webp" },
      { year: "2020", title: "Primeras alianzas", description: "Establecemos vinculos con actores politicos y organizaciones internacionales como UNICEF, OIM y USAID para impulsar la agenda del egreso.", image: "/images/eventos/20241112_092951.webp" },
      { year: "2021", title: "Premio Civico", description: "Ganamos el primer lugar del Premio Civico por nuestro trabajo en liderazgo juvenil y procesos formativos con egresados del sistema de proteccion.", image: "/images/eventos/20241112_095957.webp" },
      { year: "2023", title: "Proyecto de Ley", description: "Impulsamos el proyecto de Ley de Egreso, construido colectivamente con egresados de todo el pais y respaldado por la senadora Lorena Rios.", image: "/images/eventos/20241112_100147.webp" },
      { year: "2025", title: "Ley 2479 de 2025", description: "Se sanciona la Ley Hijos del Estado, creando el Programa Nacional de Acompanamiento Integral al Egresado del ICBF.", image: "/images/eventos/20241112_111016.webp" },
    ],
    programs: {
      incidencia: {
        logo: "/images/programas/LOGO-PROGRAMA-DE-INCIDENCIA.png",
        image: "/images/programas/incidencia-scaled-1.webp",
        color: "#019E9F",
      },
      avanzaJoven: {
        logo: "/images/programas/LOGO-AVANZA-JOVEN.png",
        image: "/images/programas/Avanza-1-scaled-1.webp",
        color: "#44BCC5",
      },
      fomento: {
        logo: "/images/programas/LOGO-FOMENTO1.png",
        image: "/images/eventos/GIS08397.webp",
        color: "#EC6620",
      },
      miCuerpo: {
        logo: "/images/programas/logo-MCSD.png",
        image: "/images/eventos/20241112_111009.webp",
        color: "#EC6620",
      },
    },
    aliados: [
      { src: "/images/aliados/colombia.svg", alt: "Colombia" },
      { src: "/images/aliados/empower-logo-blue.svg", alt: "Empower" },
      { src: "/images/aliados/gapi-icesi-logo.webp", alt: "GAPI Icesi" },
      { src: "/images/aliados/Vaki.png", alt: "Vaki" },
    ],
  },
  quienesSomos: {
    hero: "/images/equipo-shoot/GIS08542.webp",
    sectionImage: "/images/equipo-shoot/GIS08550.webp",
    historiaImage: "/images/equipo-shoot/GIS08542.webp",
    objetivoImage: "/images/encuentro-2025/GIS06448.webp",
    poblacionImage: "/images/eventos/20241112_102357.webp",
    poblacionParallax: "/images/IMG_0545.webp",
    areasImage: "/images/equipo-shoot/GIS08550.webp",
    team: {
      maicol: "/images/equipo/maicol.png",
      kevin: "/images/equipo/phtos-ascep-kevin.jpg",
      monica: "/images/equipo/phtos-ascep-monica.png",
      jhon: "/images/equipo/phtos-ascep-jhon.png",
      ana: "/images/equipo/phtos-ascep.png",
    },
    timeline: [
      { year: "2019", title: "Nacimiento de ASCEP", description: "Un grupo de egresados del sistema de proteccion estatal se organiza para construir un proyecto colectivo que transforme la forma en que el Estado aborda el egreso.", image: "/images/eventos/20241112_092855.webp" },
      { year: "2020", title: "Primeras alianzas", description: "Establecemos vinculos con actores politicos y organizaciones internacionales como UNICEF, OIM y USAID para impulsar la agenda del egreso.", image: "/images/eventos/20241112_092951.webp" },
      { year: "2021", title: "Premio Civico", description: "Ganamos el primer lugar del Premio Civico por nuestro trabajo en liderazgo juvenil y procesos formativos con egresados del sistema de proteccion.", image: "/images/eventos/20241112_095957.webp" },
      { year: "2023", title: "Proyecto de Ley", description: "Impulsamos el proyecto de Ley de Egreso, construido colectivamente con egresados de todo el pais y respaldado por la senadora Lorena Rios.", image: "/images/eventos/20241112_100147.webp" },
      { year: "2025", title: "Ley 2479 de 2025", description: "Se sanciona la Ley Hijos del Estado, creando el Programa Nacional de Acompanamiento Integral al Egresado del ICBF.", image: "/images/eventos/20241112_111016.webp" },
    ],
  },
  aliados: {
    hero: "/images/eventos/20241112_092855.webp",
    logos: [
      { src: "/images/aliados/colombia.svg", alt: "Colombia" },
      { src: "/images/aliados/empower-logo-blue.svg", alt: "Empower" },
      { src: "/images/aliados/gapi-icesi-logo.webp", alt: "GAPI Icesi" },
      { src: "/images/aliados/Vaki.png", alt: "Vaki" },
    ],
  },
  programas: {
    hero: "/images/encuentro-2025/GIS06470.webp",
    cards: {
      incidencia: {
        title: "Incidencia y Participacion",
        desc: "Desarrollamos acciones que involucran a actores clave y tomadores de decisiones en la transformacion de los cuidados alternativos.",
        slug: "incidencia",
        image: "/images/programas/incidencia-scaled-1.webp",
        label: "Liderazgo",
      },
      avanzaJoven: {
        title: "Avanza Joven",
        desc: "Programa disenado para brindar apoyo y herramientas a adolescentes que viven institucionalizados, potenciando habilidades para la vida.",
        slug: "avanza-joven",
        image: "/images/programas/Avanza-1-scaled-1.webp",
        label: "Formacion",
      },
      fomento: {
        title: "Fomento para el Empleo y Emprendimiento",
        desc: "Modelo piloto para promover capacidades laborales y fortalecer la empleabilidad de jovenes en proceso de egreso del sistema de proteccion.",
        slug: "empleo",
        image: "/images/programas/LOGO-FOMENTO.png",
        label: "Insercion",
      },
      miCuerpo: {
        title: "Mi Cuerpo, Mi Sexualidad, Mi Decision",
        desc: "Programa para proveer condiciones que permitan el ejercicio libre, autonomo e informado de la sexualidad.",
        slug: "mi-cuerpo",
        image: "/images/programas/logo-MCSD.png",
        label: "Bienestar",
      },
    },
    marcoPolitico: {
      hero: "/images/eventos/20241112_103351.webp",
    },
  },
  comoLoHacemos: {
    hero: "/images/encuentro-2025/GIS06448.webp",
    estrategiasImage: "/images/encuentro-2025/GIS06452.webp",
    lineasImage: "/images/equipo-shoot/GIS08531.webp",
    estrategiasGallery: [
      "/images/encuentro-2025/GIS06453.webp",
      "/images/equipo-shoot/GIS08543.webp",
      "/images/equipo-shoot/GIS08540.webp",
    ],
  },
  impacto: {
    hero: "/images/encuentro-2025/GIS06455.webp",
    contextImage: "/images/encuentro-2025/GIS06455.webp",
    contextParallax: "/images/DSC_0918.webp",
    porQueImage: "/images/eventos/20241112_111009.webp",
    gallery: [
      "/images/encuentro-2025/GIS06448.webp",
      "/images/encuentro-2025/GIS06455.webp",
      "/images/encuentro-2025/GIS06462.webp",
      "/images/encuentro-2025/GIS06470.webp",
      "/images/equipo-shoot/GIS08514.webp",
      "/images/equipo-shoot/GIS08522.webp",
      "/images/equipo-shoot/GIS08531.webp",
      "/images/equipo-shoot/GIS08544.webp",
      "/images/eventos/20241112_095957.webp",
      "/images/eventos/20241112_100147.webp",
      "/images/eventos/20241112_102405.webp",
      "/images/eventos/20241112_115147.webp",
    ],
  },
  header: {
    leyEgresoCard: "/images/encuentro-2025/GIS06446.webp",
    comoAyudarCard: "/images/encuentro-2025/GIS06447.webp",
  },
  casasDelSaber: {
    hero: "/images/encuentro-2025/GIS06475.webp",
    areas: "/images/encuentro-2025/GIS06448.webp",
    modalidades: "/images/encuentro-2025/GIS06460.webp",
    rutaEgreso: "/images/encuentro-2025/GIS06475.webp",
  },
  contacto: {
    hero: "/images/equipo-shoot/GIS08546.webp",
    section: "/images/equipo-shoot/GIS08545.webp",
  },
  donar: {
    heroPoster: "/images/hero-poster.webp",
    gallery: [
      { src: "/images/encuentro-2025/GIS06460.webp", alt: "Jovenes en taller de habilidades" },
      { src: "/images/encuentro-2025/GIS06450.webp", alt: "Acompanamiento psicosocial" },
      { src: "/images/encuentro-2025/GIS06470.webp", alt: "Actividades grupales" },
      { src: "/images/encuentro-2025/GIS06447.webp", alt: "Jornada educativa" },
      { src: "/images/encuentro-2025/GIS06475.webp", alt: "Momentos de integracion" },
    ],
    gallerySecond: "/images/encuentro-2025/GIS06475.webp",
  },
  leyEgreso: {
    hero: "/images/eventos/20241112_111016.webp",
    gallery: [
      "/images/ley-egreso/1.png",
      "/images/ley-egreso/2.png",
      "/images/ley-egreso/3.png",
      "/images/ley-egreso/4.png",
      "/images/ley-egreso/5.png",
      "/images/ley-egreso/7.png",
      "/images/ley-egreso/8.png",
    ],
    context: "/images/eventos/20241112_103406.webp",
  },
  noticias: {
    hero: "/images/eventos/20241112_103725.webp",
  },
  participa: {
    hero: "/images/eventos/20241112_103406.webp",
    section: "/images/equipo-shoot/GIS08547.webp",
  },
  transparencia: {
    hero: "/images/eventos/20241112_100147.webp",
    section: "/images/eventos/20241112_103402.webp",
  },
  enredate: {
    gallery: [
      "/images/enredate/GIS04876.webp",
      "/images/enredate/GIS04888.webp",
      "/images/enredate/GIS04950.webp",
    ],
  },
  planPadrino: {
    hero: "/images/encuentro-2025/GIS06460.webp",
    section: "/images/encuentro-2025/GIS06450.webp",
  },
  voluntariado: {
    hero: "/images/eventos/20241112_100049.webp",
    section: "/images/eventos/20241112_102515.webp",
  },
  empleo: {
    hero: "/images/eventos/20241112_102515.webp",
  },
} as const;
