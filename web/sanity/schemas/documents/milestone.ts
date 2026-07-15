import { defineField, defineType } from "sanity";

export default defineType({
  name: "milestone",
  title: "Hito / Linea de tiempo",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Ano",
      type: "string",
      validation: (rule) => rule.required(),
    }),
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "imageWithAlt",
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Menor = primero en la linea de tiempo",
    }),
  ],
  orderings: [
    { name: "orderAsc", title: "Orden", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "image" },
    prepare({ title, subtitle, media }: any) {
      return { title: title?.es || "...", subtitle, media };
    },
  },
});
