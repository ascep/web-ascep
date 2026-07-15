import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqSection",
  title: "Seccion FAQ",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Pagina",
      type: "string",
      options: {
        list: [
          { title: "Donar", value: "donar" },
          { title: "General", value: "general" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Preguntas frecuentes",
      type: "array",
      of: [{ type: "faqItem" }],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { page: "page", items: "items" },
    prepare({ page, items }) {
      return { title: `FAQ - ${page}`, subtitle: `${items?.length || 0} preguntas` };
    },
  },
});
