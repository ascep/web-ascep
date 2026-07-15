import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLink",
  title: "Enlace social",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "YouTube", value: "youtube" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "TikTok", value: "tiktok" },
          { title: "Twitter/X", value: "twitter" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { platform: "platform", url: "url" },
    prepare({ platform, url }) {
      return { title: platform, subtitle: url };
    },
  },
});
