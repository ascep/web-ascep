import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoEntry",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripcion",
      type: "localizedText",
    }),
    defineField({
      name: "source",
      title: "Fuente del video",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Archivo local (MP4)", value: "file" },
        ],
      },
      initialValue: "youtube",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "URL de YouTube",
      type: "url",
      hidden: ({ parent }) => parent?.source !== "youtube",
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as { source?: string })?.source === "youtube" && !value) {
            return "Requerido para videos de YouTube";
          }
          return true;
        }),
    }),
    defineField({
      name: "videoFile",
      title: "Archivo de video (MP4)",
      type: "file",
      options: { accept: "video/mp4" },
      hidden: ({ parent }) => parent?.source !== "file",
    }),
    defineField({
      name: "thumbnail",
      title: "Miniatura",
      type: "imageWithAlt",
      description: "Imagen de portada del video",
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Hero (fondo de pagina)", value: "hero" },
          { title: "Avanza Joven", value: "avanza-joven" },
          { title: "Testimonios", value: "testimonios" },
          { title: "Eventos", value: "eventos" },
          { title: "Enredate", value: "enredate" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
  ],
  orderings: [
    { name: "categoryOrder", title: "Categoria + Orden", by: [
      { field: "category", direction: "asc" },
      { field: "order", direction: "asc" },
    ]},
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "thumbnail" },
    prepare({ title, subtitle, media }) {
      return { title: title?.es || "...", subtitle, media };
    },
  },
});
