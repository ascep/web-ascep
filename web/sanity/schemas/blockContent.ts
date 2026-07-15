import { defineType, defineField } from "sanity";

export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              { name: "href", title: "URL", type: "url" },
            ],
          },
        ],
      },
    },
    {
      type: "image",
      options: { hotspot: true },
    },
  ],
});
