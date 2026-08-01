import { defineField, defineType } from "sanity";

const mediaTypes = [
  { title: "Imagen", value: "image" },
  { title: "Video", value: "video" },
];

export default defineType({
  name: "padrinoProfile",
  title: "Perfil Plan Padrino",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.es", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "age",
      title: "Edad",
      type: "number",
    }),
    defineField({
      name: "city",
      title: "Ciudad",
      type: "localizedString",
    }),
    defineField({
      name: "photo",
      title: "Foto de perfil",
      type: "imageWithAlt",
      description: "Foto circular del joven (min 400x400)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverPhoto",
      title: "Foto de portada",
      type: "imageWithAlt",
      description: "Imagen panoramica para el header del perfil (min 1200x400)",
    }),
    defineField({
      name: "shortBio",
      title: "Biografia corta",
      type: "localizedString",
      description: "1-2 oraciones para la tarjeta de perfil",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullBio",
      title: "Biografia completa",
      type: "localizedBlockContent",
      description: "Descripcion detallada del joven para la pagina de perfil",
    }),
    defineField({
      name: "impactPercentage",
      title: "Porcentaje de impacto",
      type: "number",
      description: "Numero del 0 al 100 para la barra de impacto",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "storiesCount",
      title: "Historias compartidas",
      type: "number",
    }),
    defineField({
      name: "yearsInProgram",
      title: "Anos en el programa",
      type: "number",
    }),
    defineField({
      name: "needs",
      title: "Necesidades actuales",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titulo",
              type: "localizedString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Descripcion",
              type: "localizedString",
            }),
            defineField({
              name: "priority",
              title: "Prioridad",
              type: "string",
              options: {
                list: [
                  { title: "Alta", value: "high" },
                  { title: "Media", value: "medium" },
                  { title: "Baja", value: "low" },
                  { title: "Logrado", value: "achieved" },
                ],
              },
              initialValue: "medium",
            }),
            defineField({
              name: "progress",
              title: "Progreso (%)",
              type: "number",
              validation: (rule) => rule.min(0).max(100),
              initialValue: 0,
            }),
            defineField({
              name: "targetAmount",
              title: "Meta ($)",
              type: "string",
            }),
            defineField({
              name: "currentAmount",
              title: "Actual ($)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title.es", subtitle: "priority" },
            prepare({ title, subtitle }) {
              return { title: title || "...", subtitle };
            },
          },
        },
      ],
    }),
    defineField({
      name: "impactMessage",
      title: "Mensaje de impacto",
      type: "object",
      fields: [
        defineField({
          name: "es",
          title: "Espanol",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "en",
          title: "English",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "pt",
          title: "Portugues",
          type: "text",
          rows: 3,
        }),
      ],
      description: "Mensaje que aparece en la tarjeta de impacto mensual",
    }),
    defineField({
      name: "impactStatLabel",
      title: "Etiqueta de estadistica de impacto",
      type: "localizedString",
    }),
    defineField({
      name: "impactStatValue",
      title: "Valor de estadistica de impacto",
      type: "string",
      description: "Ej: '+12%' o '4.5/5.0'",
    }),
    defineField({
      name: "impactStatDescription",
      title: "Descripcion de estadistica de impacto",
      type: "localizedString",
    }),
    defineField({
      name: "progressPosts",
      title: "Publicaciones de progreso",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "date",
              title: "Fecha",
              type: "datetime",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "author",
              title: "Autor del post",
              type: "localizedString",
            }),
            defineField({
              name: "authorRole",
              title: "Rol del autor",
              type: "localizedString",
            }),
            defineField({
              name: "title",
              title: "Titulo",
              type: "localizedString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Descripcion",
              type: "localizedBlockContent",
            }),
            defineField({
              name: "type",
              title: "Tipo de publicacion",
              type: "string",
              options: {
                list: [
                  { title: "Historia / Video", value: "story" },
                  { title: "Hito academico", value: "milestone" },
                  { title: "Actualizacion", value: "update" },
                ],
              },
              initialValue: "story",
            }),
            defineField({
              name: "media",
              title: "Multimedia",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "mediaType",
                      title: "Tipo",
                      type: "string",
                      options: { list: mediaTypes },
                      initialValue: "image",
                    }),
                    defineField({
                      name: "image",
                      title: "Imagen",
                      type: "imageWithAlt",
                      hidden: ({ parent }) => parent?.mediaType === "video",
                    }),
                    defineField({
                      name: "videoUrl",
                      title: "URL del video (YouTube)",
                      type: "url",
                      hidden: ({ parent }) => parent?.mediaType === "image",
                    }),
                    defineField({
                      name: "thumbnail",
                      title: "Miniatura del video",
                      type: "imageWithAlt",
                      hidden: ({ parent }) => parent?.mediaType === "image",
                    }),
                  ],
                  preview: {
                    select: { mediaType: "mediaType", image: "image" },
                    prepare({ mediaType, image }) {
                      return {
                        title: mediaType === "video" ? "Video" : "Imagen",
                        media: image,
                      };
                    },
                  },
                },
              ],
            }),
            defineField({
              name: "tags",
              title: "Etiquetas",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ],
          preview: {
            select: { title: "title.es", subtitle: "date" },
            prepare({ title, subtitle }) {
              return {
                title: title || "...",
                subtitle: subtitle ? new Date(subtitle).toLocaleDateString("es") : "",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "galleryPhotos",
      title: "Galeria de fotos (Bento Grid)",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      description: "Fotos que aparecen en la cuadricula bento del perfil (max 5-6)",
      validation: (rule) => rule.max(6),
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
    select: { title: "name", subtitle: "shortBio", media: "photo" },
    prepare({ title, subtitle, media }) {
      return {
        title: title?.es || "...",
        subtitle: subtitle?.es || "",
        media,
      };
    },
  },
});
