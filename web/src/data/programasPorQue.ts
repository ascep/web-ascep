export type ProgramaPorQue = {
  id: string;
  title: string;
  description: string;
  path: string;
  image: string;
  accent: "cyan" | "orange" | "yellow" | "teal" | "purple";
};

export const programasPorQue: ProgramaPorQue[] = [
  {
    id: "incidencia",
    title: "Incidencia",
    description:
      "Trabajamos para que las personas jóvenes egresadas del sistema de protección tengan voz en la construcción de las políticas públicas que afectan su presente y su futuro.",
    path: "/programas/incidencia",
    image: "/images/programas/incidencia-scaled-1.webp",
    accent: "teal",
  },
  {
    id: "avanza-joven",
    title: "Avanza Joven",
    description:
      "Acompañamiento integral y formación para la vida, la educación superior y el emprendimiento de las personas jóvenes egresadas del sistema de cuidados alternativos.",
    path: "/programas/avanza-joven",
    image: "/images/programas/Avanza-1-scaled-1.webp",
    accent: "cyan",
  },
  {
    id: "empleo",
    title: "Empleo",
    description:
      "Preparamos y conectamos a las personas jóvenes con oportunidades laborales dignas que les permitan construir autonomía económica y un proyecto de vida propio.",
    path: "/programas/empleo",
    image: "/images/programas/LOGO-FOMENTO.png",
    accent: "orange",
  },
  {
    id: "mi-cuerpo",
    title: "Mi Cuerpo",
    description:
      "Promovemos el autocuidado, la salud y el reconocimiento del cuerpo como territorio, con enfoque de derechos y desde una perspectiva de género.",
    path: "/programas/mi-cuerpo",
    image: "/images/programas/logo-MCSD.png",
    accent: "purple",
  },
  {
    id: "casas-del-saber",
    title: "Casas del Saber",
    description:
      "Espacios seguros donde las personas jóvenes fortalecen habilidades para la vida y avanzan de manera gradual hacia su autonomía.",
    path: "/casas-del-saber",
    image:
      "https://cdn.sanity.io/images/7vvy9nrc/production/f827534de1531bddbdf5234db29bc879d5582716-6000x3376.webp",
    accent: "yellow",
  },
];
