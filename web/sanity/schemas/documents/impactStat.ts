import { defineField, defineType } from "sanity";

export default defineType({
  name: "impactStat",
  title: "Estadistica de impacto",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Etiqueta",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Valor final",
      type: "number",
      description: "Numero que se muestra al final de la animacion (ej: 71148)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "suffix",
      title: "Sufijo",
      type: "string",
      description: "Texto despues del numero (ej: +, %, K)",
    }),
    defineField({
      name: "prefix",
      title: "Prefijo",
      type: "string",
      description: "Texto antes del numero (ej: $)",
    }),
    defineField({
      name: "icon",
      title: "Icono (Lucide)",
      type: "string",
      description: "Nombre del icono Lucide, ej: Users, GraduationCap",
    }),
    defineField({
      name: "color",
      title: "Color de acento",
      type: "string",
      description: "Hex sin #, ej: 019E9F",
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
  ],
  orderings: [
    { name: "orderAsc", title: "Orden", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "label", subtitle: "value", suffix: "suffix" },
    prepare({ title, subtitle, suffix }) {
      return { title: title?.es || "...", subtitle: `${subtitle || 0}${suffix || ""}` };
    },
  },
});
