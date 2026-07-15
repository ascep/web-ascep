import { defineField, defineType } from "sanity";

export default defineType({
  name: "noticia",
  title: "Noticia",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.es", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extracto",
      type: "localizedText",
    }),
    defineField({
      name: "coverImage",
      title: "Imagen de portada",
      type: "imageWithAlt",
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Programas", value: "programas" },
          { title: "Incidencia", value: "incidencia" },
          { title: "Eventos", value: "eventos" },
          { title: "Ley de Egreso", value: "ley" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "localizedString",
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicacion",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "localizedBlockContent",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "category",
    },
    prepare({ title, media, subtitle }: any) {
      return { title: title?.es || "...", media, subtitle };
    },
  },
});
