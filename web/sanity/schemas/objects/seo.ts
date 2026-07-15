import { defineField, defineType } from "sanity";

const supportedLanguages = [
  { id: "es", title: "Espanol", isDefault: true },
  { id: "en", title: "English" },
  { id: "pt", title: "Portugues" },
];

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
    prepare({ title }: any) {
      return { title: title?.es || "SEO" };
    },
  },
});
