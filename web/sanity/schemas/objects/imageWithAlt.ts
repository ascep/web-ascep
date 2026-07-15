import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageWithAlt",
  title: "Imagen con alternativo",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
