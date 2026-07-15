import { defineField, defineType } from "sanity";

export default defineType({
  name: "documentEntry",
  title: "Documento",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre del documento",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Institucionales", value: "institucionales" },
          { title: "Financieros", value: "financieros" },
          { title: "Informes de gestion", value: "informes" },
          { title: "Registros", value: "registros" },
          { title: "Legales", value: "legales" },
          { title: "Cartillas", value: "cartillas" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripcion corta",
      type: "localizedString",
    }),
    defineField({
      name: "file",
      title: "Archivo PDF",
      type: "file",
      options: { accept: ".pdf" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "externalUrl",
      title: "URL externa (alternativa al archivo)",
      type: "url",
      description: "Usar si el documento esta hospedado externamente (Google Drive, etc.)",
    }),
    defineField({
      name: "order",
      title: "Orden dentro de la categoria",
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
    select: { title: "title", subtitle: "category" },
    prepare({ title, subtitle }: any) {
      return { title: title?.es || "...", subtitle };
    },
  },
});
