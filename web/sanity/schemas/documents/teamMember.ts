import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Miembro del equipo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Cargo / Rol",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Menor = primero",
    }),
    defineField({
      name: "active",
      title: "Activo",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { name: "orderAsc", title: "Orden", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
    prepare({ title, subtitle, media }) {
      return { title: title?.es || "...", subtitle: subtitle?.es || "", media };
    },
  },
});
