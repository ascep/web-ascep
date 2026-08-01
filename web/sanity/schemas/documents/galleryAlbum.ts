import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryAlbum",
  title: "Album de galeria",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre del album",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.es", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripcion",
      type: "localizedText",
    }),
    defineField({
      name: "images",
      title: "Imagenes",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Encuentros", value: "encuentros" },
          { title: "Eventos", value: "eventos" },
          { title: "Equipo", value: "equipo" },
          { title: "Programas", value: "programas" },
          { title: "Hero / Portada", value: "hero" },
          { title: "Galeria general", value: "general" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
    defineField({
      name: "coverImage",
      title: "Imagen de portada del album",
      type: "imageWithAlt",
      description: "Miniatura que representa el album en listados",
    }),
  ],
  orderings: [
    { name: "orderAsc", title: "Orden", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage", images: "images" },
    prepare({ title, subtitle, media, images }) {
      return {
        title: title?.es || "...",
        subtitle: `${subtitle || ""} - ${images?.length || 0} imagenes`,
        media,
      };
    },
  },
});
