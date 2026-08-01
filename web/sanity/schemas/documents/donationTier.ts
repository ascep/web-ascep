import { defineField, defineType } from "sanity";

export default defineType({
  name: "donationTier",
  title: "Nivel de donacion",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Etiqueta",
      type: "localizedString",
      description: "Nombre del nivel, ej: 'Amigo ASCEP'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripcion",
      type: "localizedText",
      description: "Descripcion corta de lo que incluye",
    }),
    defineField({
      name: "monthlyCop",
      title: "Monto mensual COP",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "monthlyUsd",
      title: "Monto mensual USD",
      type: "number",
    }),
    defineField({
      name: "icon",
      title: "Icono (Lucide)",
      type: "string",
      description: "Nombre del icono Lucide, ej: Coffee, Heart, Star",
    }),
    defineField({
      name: "color",
      title: "Color de acento",
      type: "string",
      description: "Hex sin #",
    }),
    defineField({
      name: "badge",
      title: "Badge / Etiqueta especial",
      type: "string",
      description: "Ej: 'Recomendado' - se muestra sobre la card",
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
    select: { title: "label", subtitle: "monthlyCop" },
    prepare({ title, subtitle }) {
      return { title: title?.es || "...", subtitle: subtitle ? `$${subtitle.toLocaleString()} COP/mes` : "" };
    },
  },
});
