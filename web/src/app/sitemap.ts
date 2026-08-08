import type { MetadataRoute } from "next";

const locales = ["es", "en", "pt"] as const;

const routes = [
  "",
  "aliados",
  "casas-del-saber",
  "casas-del-saber/areas",
  "casas-del-saber/lineas",
  "casas-del-saber/modalidades",
  "casas-del-saber/ruta-egreso",
  "como-ayudar",
  "como-ayudar/enredate-con-ascep",
  "como-ayudar/plan-padrino",
  "como-ayudar/voluntariado",
  "como-lo-hacemos",
  "contacto",
  "donar",
  "impacto",
  "noticias",
  "noticias/casas-del-saber",
  "noticias/dia-del-egresado",
  "noticias/ley-hijos-del-estado",
  "participa",
  "programas",
  "programas/avanza-joven",
  "programas/empleo",
  "programas/incidencia",
  "programas/marco-politico",
  "programas/mi-cuerpo",
  "quienes-somos",
  "transparencia",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const path = route ? `/${locale}/${route}` : `/${locale}`;
      entries.push({
        url: `https://ascep.org${path}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `https://ascep.org/${l}${route ? `/${route}` : ""}`]),
          ),
        },
      });
    }
  }

  return entries;
}
