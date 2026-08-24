export type HomeTestimonialVideo = {
  youtubeId: string;
  author: string;
  role: string;
};

export type PageVideos = {
  hero?: string;
  heroSecondary?: string;
  heroTertiary?: string;
  testimonials?: string[];
  support?: string[];
};

export type HomeVideos = {
  hero: string;
  transformando: string;
  premioCivico?: string;
  premioCivicoFormativo?: string;
  pages: {
    quienesSomos: PageVideos;
    comoLoHacemos: PageVideos;
    impacto: PageVideos;
    comoAyudar: PageVideos;
    participa: PageVideos;
    donar: PageVideos;
    "enredate-con-ascep": PageVideos;
    voluntariado: PageVideos;
    "plan-padrino": PageVideos;
    "casas-del-saber": PageVideos;
  };
  programas: Record<string, PageVideos>;
  testimonios: HomeTestimonialVideo[];
  playlists: Record<string, string>;
};

function isYouTubeId(s: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(s) || s.includes("youtube.com") || s.includes("youtu.be");
}

export function resolveHeroVideo(video: string | undefined): { type: "youtube" | "mp4" | "none"; src: string } {
  if (!video || !video.trim()) return { type: "none", src: "" };
  const v = video.trim();
  if (isYouTubeId(v)) {
    const id = v.includes("youtube.com") || v.includes("youtu.be")
      ? v.split(/(\/|v=|\?)/).filter(Boolean).pop() || v
      : v;
    return { type: "youtube", src: id };
  }
  return { type: "mp4", src: v };
}

export function extractYouTubeId(url: string): string | undefined {
  if (!url || !url.trim()) return undefined;
  const v = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
  const match = v.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match?.[1] || undefined;
}

export function getPageVideo(pageVideos: PageVideos | undefined, slot: "hero" | "heroSecondary" | "heroTertiary" = "hero"): string | undefined {
  return pageVideos?.[slot] || undefined;
}

export function getProgramVideo(programId: string, slot: "hero" | "heroSecondary" | "heroTertiary" = "hero"): string | undefined {
  return homeVideos.programas[programId]?.[slot] || undefined;
}

export function getPlaylist(programId: string): string | undefined {
  return homeVideos.playlists[programId] || undefined;
}

export const homeVideos: HomeVideos = {
  hero: "/videos/FONDO-WEB-16-9.mp4",
  transformando: "",

  // --- Premio Civico (Quienes Somos) ---
  premioCivico: "SvwlWUQO3yM",
  premioCivicoFormativo: "PstRQax33K4",

  pages: {
    // --- Heroes de pagina (MP4 local o YouTube) ---
    quienesSomos: { hero: "" },
    comoLoHacemos: { hero: "" },
    impacto: { hero: "" },
    comoAyudar: { hero: "" },
    participa: { hero: "" },
    donar: { hero: "" },
    "enredate-con-ascep": { hero: "" },
    voluntariado: { hero: "" },
    "plan-padrino": { hero: "" },
    "casas-del-saber": { hero: "" },
  },

  programas: {
    // --- Avanza Joven ---
    "avanza-joven": {
      hero: "https://youtu.be/4K3QHcW8jww",
      heroSecondary: "https://youtu.be/Zbzn0EXA7IU",
      testimonials: [
        "https://youtu.be/PX0xwkp-zHQ",    // TESTIMONIO VILLA ESPERANZA
        "https://youtu.be/NRs7sUm6P-o",     // reel
        "https://youtu.be/VDK3H5OjUQQ",     // JHON EDWARD ANGULO
      ],
      support: [
        "https://youtu.be/Y1yuBPP6ba8",     // tomas de apoyo
        "https://youtu.be/oqponuHvbGA",
        "https://youtu.be/X1D-oYKLD8U",
        "https://youtu.be/Rd9kDEjTz10",
        "https://youtu.be/_xAeRibS1X4",
        "https://youtu.be/MOH329VxZ3A",
        "https://youtu.be/XvrSyHbxAd4",
        "https://youtu.be/X4pX6JV7u5Y",
      ],
    },

    // --- Empleo ---
    empleo: { hero: "" },

    // --- Incidencia ---
    incidencia: {
      hero: "",
      support: [
        "https://youtube.com/shorts/2ba8gzqQp6s",  // encuentro de egresados
      ],
    },

    // --- Mi Cuerpo ---
    "mi-cuerpo": { hero: "" },

    // --- Marco Politico ---
    "marco-politico": { hero: "" },

    // --- Casas del Saber ---
    "casas-del-saber": {
      hero: "",
      testimonials: [
        "https://youtu.be/aHlzgnP6jSs",     // Yaritza
      ],
    },
  },

  testimonios: [
    { youtubeId: "wD7Tx9iJqDE", author: "Leonardo", role: "Reel" },
    { youtubeId: "wGcr261Q7wo", author: "Leonardo Figueroa", role: "Microdocumental" },
    { youtubeId: "cfYjqJZtf5Y", author: "Leyder", role: "Historia de vida" },
    { youtubeId: "eGrF8K_juYg", author: "Yaritza Sinisterra", role: "Testimonio" },
  ],

  playlists: {
    "avanza-joven": "",
    empleo: "",
    incidencia: "",
    "mi-cuerpo": "",
    "marco-politico": "",
    "casas-del-saber": "",

    // --- EnredATe microdocumentales ---
    "enredate-mini-doc-1": "ysvZ56TLL2w",   // LEYDER 1 HISTORIA
    "enredate-mini-doc-2": "cfYjqJZtf5Y",   // LEYDER 2 SUEÑO
    "enredate-mini-doc-3": "eGrF8K_juYg",   // YARITZA SINISTERRA
  },
};
