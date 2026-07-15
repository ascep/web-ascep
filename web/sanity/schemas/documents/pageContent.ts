import { defineField, defineType } from "sanity";

const PAGE_ROUTES = [
  { title: "Inicio (Home)", value: "home" },
  { title: "Quienes Somos", value: "quienes-somos" },
  { title: "Como Lo Hacemos", value: "como-lo-hacemos" },
  { title: "Impacto", value: "impacto" },
  { title: "Transparencia", value: "transparencia" },
  { title: "Ley de Egreso", value: "ley-egreso" },
  { title: "Contacto", value: "contacto" },
  { title: "Donar", value: "donar" },
  { title: "Participa", value: "participa" },
  { title: "Aliados", value: "aliados" },
  { title: "Como Ayudar", value: "como-ayudar" },
  { title: "Como Ayudar - Plan Padrino", value: "plan-padrino" },
  { title: "Como Ayudar - Voluntariado", value: "voluntariado" },
  { title: "Como Ayudar - Enredate", value: "enredate" },
  { title: "Programas (listado)", value: "programas" },
  { title: "Casas del Saber (listado)", value: "casas-del-saber" },
  { title: "Casas - Modalidades", value: "casas-del-saber-modalidades" },
  { title: "Casas - Lineas", value: "casas-del-saber-lineas" },
  { title: "Casas - Ruta de Egreso", value: "casas-del-saber-ruta-egreso" },
  { title: "Casas - Areas", value: "casas-del-saber-areas" },
  { title: "Noticias (listado)", value: "noticias" },
] as const;

export default defineType({
  name: "pageContent",
  title: "Pagina (SEO + Hero)",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Pagina",
      type: "string",
      options: {
        list: PAGE_ROUTES.map((p) => ({ title: p.title, value: p.value })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Seccion Hero",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Etiqueta", type: "localizedString", description: "Etiqueta pequena sobre el titulo, ej: 'Programas', 'Actualidad'" }),
        defineField({ name: "title", title: "Titulo", type: "localizedString" }),
        defineField({ name: "highlight", title: "Palabra destacada", type: "localizedString", description: "Palabra que recibe color de marca en el titulo" }),
        defineField({ name: "subtitle", title: "Subtitulo", type: "localizedText" }),
        defineField({ name: "bgImage", title: "Imagen de fondo", type: "imageWithAlt" }),
        defineField({ name: "bgColor", title: "Color de fondo (override)", type: "string", description: "Hex sin #. Si se omite, usa el color por defecto." }),
      ],
    }),
  ],
  preview: {
    select: { page: "page" },
    prepare({ page }) {
      const route = PAGE_ROUTES.find((r) => r.value === page);
      return { title: route?.title || page };
    },
  },
});
