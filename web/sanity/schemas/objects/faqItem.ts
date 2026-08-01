import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqItem",
  title: "Pregunta frecuente",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Pregunta",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Respuesta",
      type: "localizedBlockContent",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { question: "question" },
    prepare({ question }) {
      return { title: question?.es || "FAQ" };
    },
  },
});
