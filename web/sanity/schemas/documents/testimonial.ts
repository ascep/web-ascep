import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonio",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Cita",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor del testimonio",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rol / Vinculo",
      type: "localizedString",
      description: "Ej: Egresado, Voluntario, Padrino",
    }),
    defineField({
      name: "avatar",
      title: "Foto del autor",
      type: "imageWithAlt",
    }),
    defineField({
      name: "section",
      title: "Seccion donde aparece",
      type: "string",
      options: {
        list: [
          { title: "Homepage", value: "home" },
          { title: "Enredate con ASCEP", value: "enredate" },
          { title: "Donar", value: "donar" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
  ],
  orderings: [
    { name: "sectionOrder", title: "Seccion + Orden", by: [
      { field: "section", direction: "asc" },
      { field: "order", direction: "asc" },
    ]},
  ],
  preview: {
    select: { title: "author", subtitle: "quote", media: "avatar" },
    prepare({ title, subtitle, media }) {
      return { title: title?.es || "...", subtitle: subtitle?.es?.slice(0, 60) || "", media };
    },
  },
});
