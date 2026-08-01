import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Aliado / Socio",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
      description: "Formato SVG o PNG con fondo transparente preferido",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "website",
      title: "Sitio web",
      type: "url",
    }),
    defineField({
      name: "sector",
      title: "Sector",
      type: "string",
      options: {
        list: [
          { title: "Gobierno", value: "gobierno" },
          { title: "Educacion", value: "educacion" },
          { title: "Empresa privada", value: "empresa" },
          { title: "ONG", value: "ong" },
          { title: "Multilateral", value: "multilateral" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      type: "boolean",
      initialValue: false,
      description: "Mostrar en la seccion principal de aliados",
    }),
  ],
  orderings: [
    { name: "orderAsc", title: "Orden", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "sector", media: "logo" },
    prepare({ title, subtitle, media }) {
      return { title: title?.es || "...", subtitle, media };
    },
  },
});
