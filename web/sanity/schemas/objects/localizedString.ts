import { defineField, defineType } from "sanity";

const supportedLanguages = [
  { id: "es", title: "Espanol", isDefault: true },
  { id: "en", title: "English" },
  { id: "pt", title: "Portugues" },
];

export default defineType({
  name: "localizedString",
  title: "Texto localizado",
  type: "object",
  fields: supportedLanguages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "string",
      validation: (rule) =>
        lang.isDefault ? rule.required() : rule,
    })
  ),
  preview: {
    prepare() {
      return { title: "Texto localizado" };
    },
  },
});
