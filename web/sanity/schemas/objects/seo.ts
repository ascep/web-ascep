import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titulo SEO",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripcion SEO",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ogImage",
      title: "Imagen Open Graph",
      type: "imageWithAlt",
      description: "Recomendado: 1200x630px",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title?.es || "SEO" };
    },
  },
});
