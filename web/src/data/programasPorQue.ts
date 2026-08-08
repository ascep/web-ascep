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
      "Impulsamos politicas publicas y espacios de participacion que garantizan los derechos de los jovenes en transicion hacia la vida adulta.",
    path: "/programas/incidencia",
    image: "/images/programas/incidencia-scaled-1.webp",
    accent: "teal",
  },
  {
    id: "avanza-joven",
    title: "Avanza Joven",
    description:
      "Acompanamos a jovenes egresados del sistema de proteccion con formacion, insercion laboral y bienestar para construir un proyecto de vida propio.",
    path: "/programas/avanza-joven",
    image: "/images/programas/Avanza-1-scaled-1.webp",
    accent: "cyan",
  },
  {
    id: "empleo",
    title: "Empleo",
    description:
      "Fomentamos oportunidades reales de insercion laboral, conectando a los jovenes con empresas aliadas comprometidas con la inclusion.",
    path: "/programas/empleo",
    image: "/images/programas/LOGO-FOMENTO.png",
    accent: "orange",
  },
  {
    id: "mi-cuerpo",
    title: "Mi Cuerpo",
    description:
      "Promovemos el autocuidado y la salud sexual y reproductiva desde un enfoque de derechos, informado y libre de estigmas.",
    path: "/programas/mi-cuerpo",
    image: "/images/programas/logo-MCSD.png",
    accent: "purple",
  },
  {
    id: "casas-del-saber",
    title: "Casas del Saber",
    description:
      "Espacios de acogida y aprendizaje que fortalecen la autonomia progresiva de ninos, ninas y adolescentes en proceso de egreso.",
    path: "/casas-del-saber",
    image:
      "https://cdn.sanity.io/images/7vvy9nrc/production/f827534de1531bddbdf5234db29bc879d5582716-6000x3376.webp",
    accent: "yellow",
  },
];
