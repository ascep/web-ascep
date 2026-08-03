/**
 * Central static image mapping for ASCEP website assets.
 *
 * All images live under public/images/ with this structure:
 *
 *   /images/
 *   +-- home/              Hero posters and general images
 *   +-- eventos/
 *   |   +-- 2024/          Eventos de 2024 (fotos con fecha)
 *   |   +-- encuentro-2025/ Encuentro ASCEP 2025
 *   +-- equipo/            Fotos del equipo y profesionales
 *   +-- programas/         Logos e imagenes de programas
 *   +-- aliados/           Logos de aliados
 *   +-- ley-egreso/        Diapositivas de Ley de Egreso
 *   +-- enredate/          Fotos del programa Enredate
 *   +-- casas-del-saber/   Fotos de Casas del Saber
 *
 * When rendering, wrap values with assetPath(...) so production asset
 * remapping still works via src/lib/asset-map.ts.
 */

export const fotos = {
  home: {
    heroPoster: "/images/home/hero-poster.webp",
    heroImage: "/images/eventos/encuentro-2025/GIS06445.webp",
    aboutImage: "/images/equipo/GIS08548.webp",
    retosImage: "/images/eventos/2024/20241112_102357.webp",
    gallery: [
      { src: "/images/eventos/2024/20241112_092951.webp", alt: "Taller con jovenes" },
      { src: "/images/eventos/encuentro-2025/GIS06460.webp", alt: "Jovenes en taller de habilidades" },
      { src: "/images/eventos/2024/20241112_100049.webp", alt: "Actividad grupal" },
      { src: "/images/eventos/encuentro-2025/GIS06450.webp", alt: "Acompanamiento psicosocial" },
      { src: "/images/eventos/2024/20241112_102515.webp", alt: "Sesion de trabajo" },
      { src: "/images/eventos/encuentro-2025/GIS06447.webp", alt: "Jornada educativa" },
      { src: "/images/eventos/encuentro-2025/GIS06449.webp", alt: "Encuentro ASCEP 2025" },
      { src: "/images/eventos/encuentro-2025/GIS06475.webp", alt: "Momentos de integracion" },
    ],
    timeline: [
      { year: "2013", title: "Red Latinoamericana", description: "Aportamos a la creacion de la Red Latinoamericana de Egresados de Proteccion.", image: "/images/eventos/2024/20241112_092855.webp" },
      { year: "2017", title: "Constitucion formal y Premio Civico", description: "Constitucion formal de la organizacion y primer lugar en el Premio Civico a la Innovacion Social, ademas de foros nacionales e internacionales.", image: "/images/eventos/encuentro-2025/GIS06447.webp" },
      { year: "2019", title: "Presencia internacional", description: "Participacion en Panama y en el IV Congreso de la Red Latinoamericana de Egresados de Proteccion en Mexico.", image: "/images/eventos/2024/20241112_092951.webp" },
      { year: "2021", title: "Radicacion del proyecto de ley", description: "2\u00ba Foro sobre Egreso de Proteccion y radicacion del proyecto de ley que anos despues daria origen a la Ley 2479.", image: "/images/eventos/2024/20241112_095957.webp" },
      { year: "2022", title: "3er Foro sobre Egreso", description: "Foro \"El futuro de los hijos del Estado\" y encuentro del Consejo de Lideres del Cuidado en Nairobi.", image: "/images/eventos/encuentro-2025/GIS06450.webp" },
      { year: "2023", title: "Debate del proyecto de ley", description: "Debate en la comision accidental de infancia y adolescencia y campana \"Voces que inspiran\".", image: "/images/eventos/2024/20241112_100147.webp" },
      { year: "2024", title: "Memorando con el ICBF", description: "Memorando de entendimiento con el ICBF para fortalecer capacidades y proyecto de vida de adolescentes y jovenes.", image: "/images/eventos/2024/20241112_102515.webp" },
      { year: "2025", title: "Ley 2479 de 2025", description: "Se sanciona la Ley Hijos del Estado, creando el Programa Nacional de Acompanamiento Integral al Egresado del ICBF.", image: "/images/eventos/2024/20241112_111016.webp" },
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
        image: "/images/programas/LOGO-FOMENTO.png",
        color: "#EC6620",
      },
      miCuerpo: {
        logo: "/images/programas/logo-MCSD.png",
        image: "/images/programas/logo-MCSD.png",
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
    hero: "/images/equipo/GIS08542.webp",
    sectionImage: "/images/equipo/GIS08550.webp",
    historiaImage: "/images/equipo/GIS08542.webp",
    objetivoImage: "/images/eventos/encuentro-2025/GIS06448.webp",
    poblacionImage: "/images/eventos/2024/20241112_102357.webp",
    poblacionParallax: "/images/IMG_0545.webp",
    areasImage: "/images/equipo/GIS08550.webp",
    team: {
      maicol: "/images/equipo/maicol.png",
      kevin: "/images/equipo/phtos-ascep-kevin.png",
      monica: "/images/equipo/phtos-ascep-monica.png",
      jhon: "/images/equipo/phtos-ascep-jhon.png",
      ana: "/images/equipo/phtos-ascep.png",
      mafe: "/images/equipo/eydi.png",
    },
    timeline: [
      { year: "2013", title: "Red Latinoamericana", description: "Aportamos a la creacion de la Red Latinoamericana de Egresados de Proteccion.", image: "/images/eventos/2024/20241112_092855.webp" },
      { year: "2017", title: "Constitucion formal y Premio Civico", description: "Constitucion formal de la organizacion y primer lugar en el Premio Civico a la Innovacion Social, ademas de foros nacionales e internacionales.", image: "/images/eventos/encuentro-2025/GIS06447.webp" },
      { year: "2019", title: "Presencia internacional", description: "Participacion en Panama y en el IV Congreso de la Red Latinoamericana de Egresados de Proteccion en Mexico.", image: "/images/eventos/2024/20241112_092951.webp" },
      { year: "2021", title: "Radicacion del proyecto de ley", description: "2\u00ba Foro sobre Egreso de Proteccion y radicacion del proyecto de ley que anos despues daria origen a la Ley 2479.", image: "/images/eventos/2024/20241112_095957.webp" },
      { year: "2022", title: "3er Foro sobre Egreso", description: "Foro \"El futuro de los hijos del Estado\" y encuentro del Consejo de Lideres del Cuidado en Nairobi.", image: "/images/eventos/encuentro-2025/GIS06450.webp" },
      { year: "2023", title: "Debate del proyecto de ley", description: "Debate en la comision accidental de infancia y adolescencia y campana \"Voces que inspiran\".", image: "/images/eventos/2024/20241112_100147.webp" },
      { year: "2024", title: "Memorando con el ICBF", description: "Memorando de entendimiento con el ICBF para fortalecer capacidades y proyecto de vida de adolescentes y jovenes.", image: "/images/eventos/2024/20241112_102515.webp" },
      { year: "2025", title: "Ley 2479 de 2025", description: "Se sanciona la Ley Hijos del Estado, creando el Programa Nacional de Acompanamiento Integral al Egresado del ICBF.", image: "/images/eventos/2024/20241112_111016.webp" },
    ],
  },
  aliados: {
    hero: "/images/eventos/2024/20241112_092855.webp",
    logos: [
      { src: "/images/aliados/colombia.svg", alt: "Colombia" },
      { src: "/images/aliados/empower-logo-blue.svg", alt: "Empower" },
      { src: "/images/aliados/gapi-icesi-logo.webp", alt: "GAPI Icesi" },
      { src: "/images/aliados/Vaki.png", alt: "Vaki" },
    ],
  },
  programas: {
    hero: "/images/eventos/encuentro-2025/GIS06470.webp",
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
      hero: "/images/eventos/2024/20241112_103351.webp",
    },
  },
  comoLoHacemos: {
    hero: "/images/eventos/encuentro-2025/GIS06448.webp",
    estrategiasImage: "/images/eventos/encuentro-2025/GIS06452.webp",
    lineasImage: "/images/equipo/GIS08531.webp",
    estrategiasGallery: [
      "/images/eventos/encuentro-2025/GIS06453.webp",
      "/images/equipo/GIS08543.webp",
      "/images/equipo/GIS08540.webp",
    ],
  },
  impacto: {
    hero: "/images/eventos/encuentro-2025/GIS06455.webp",
    contextImage: "/images/eventos/encuentro-2025/GIS06455.webp",
    contextParallax: "/images/DSC_0918.webp",
    porQueImage: "/images/eventos/2024/20241112_111009.webp",
    gallery: [
      "/images/eventos/encuentro-2025/GIS06448.webp",
      "/images/eventos/encuentro-2025/GIS06455.webp",
      "/images/eventos/encuentro-2025/GIS06462.webp",
      "/images/eventos/encuentro-2025/GIS06470.webp",
      "/images/equipo/GIS08514.webp",
      "/images/equipo/GIS08522.webp",
      "/images/equipo/GIS08531.webp",
      "/images/equipo/GIS08544.webp",
      "/images/eventos/2024/20241112_095957.webp",
      "/images/eventos/2024/20241112_100147.webp",
      "/images/eventos/2024/20241112_102405.webp",
      "/images/eventos/2024/20241112_115147.webp",
    ],
  },
  header: {
    leyEgresoCard: "/images/eventos/encuentro-2025/GIS06446.webp",
    comoAyudarCard: "/images/eventos/encuentro-2025/GIS06447.webp",
  },
  casasDelSaber: {
    hero: "/images/eventos/encuentro-2025/GIS06475.webp",
    areas: "/images/eventos/encuentro-2025/GIS06448.webp",
    modalidades: "/images/eventos/encuentro-2025/GIS06460.webp",
    rutaEgreso: "/images/eventos/encuentro-2025/GIS06475.webp",
  },
  contacto: {
    hero: "/images/equipo/GIS08546.webp",
    section: "/images/equipo/GIS08545.webp",
  },
  donar: {
    heroPoster: "/images/home/hero-poster.webp",
    gallery: [
      { src: "/images/eventos/encuentro-2025/GIS06460.webp", alt: "Jovenes en taller de habilidades" },
      { src: "/images/eventos/encuentro-2025/GIS06450.webp", alt: "Acompanamiento psicosocial" },
      { src: "/images/eventos/encuentro-2025/GIS06470.webp", alt: "Actividades grupales" },
      { src: "/images/eventos/encuentro-2025/GIS06447.webp", alt: "Jornada educativa" },
      { src: "/images/eventos/encuentro-2025/GIS06475.webp", alt: "Momentos de integracion" },
    ],
    gallerySecond: "/images/eventos/encuentro-2025/GIS06475.webp",
  },
  leyEgreso: {
    hero: "/images/eventos/2024/20241112_111016.webp",
    gallery: [
      "/images/ley-egreso/1.png",
      "/images/ley-egreso/2.png",
      "/images/ley-egreso/3.png",
      "/images/ley-egreso/4.png",
      "/images/ley-egreso/5.png",
      "/images/ley-egreso/7.png",
      "/images/ley-egreso/8.png",
    ],
    context: "/images/eventos/2024/20241112_103406.webp",
  },
  noticias: {
    hero: "/images/eventos/2024/20241112_103725.webp",
  },
  participa: {
    hero: "/images/eventos/2024/20241112_103406.webp",
    section: "/images/equipo/GIS08547.webp",
  },
  transparencia: {
    hero: "/images/eventos/2024/20241112_100147.webp",
    section: "/images/eventos/2024/20241112_103402.webp",
  },
  enredate: {
    gallery: [
      "/images/enredate/GIS04876.webp",
      "/images/enredate/GIS04888.webp",
      "/images/enredate/GIS04950.webp",
    ],
  },
  planPadrino: {
    hero: "/images/eventos/encuentro-2025/GIS06460.webp",
    section: "/images/eventos/encuentro-2025/GIS06450.webp",
  },
  voluntariado: {
    hero: "/images/eventos/2024/20241112_100049.webp",
    section: "/images/eventos/2024/20241112_102515.webp",
  },
  empleo: {
    hero: "/images/eventos/2024/20241112_102515.webp",
  },
} as const;
