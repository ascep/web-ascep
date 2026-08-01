import { defineField, defineType } from "sanity";

export default defineType({
  name: "programa",
  title: "Programa",
  type: "document",
  fields: [
    // --- Basic Info ---
    defineField({
      name: "title",
      title: "Titulo",
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
      name: "shortDescription",
      title: "Descripcion corta",
      type: "localizedText",
      description: "Usada en cards y listados de programas",
    }),
    defineField({
      name: "heroImage",
      title: "Imagen hero",
      type: "imageWithAlt",
      description: "Imagen de fondo del hero de la pagina del programa",
    }),
    defineField({
      name: "programLogo",
      title: "Logo del programa",
      type: "imageWithAlt",
      description: "Logo especifico del programa (ej: LOGO-FOMENTO.png)",
    }),
    defineField({
      name: "brandColor",
      title: "Color de marca",
      type: "string",
      description: "Color hex sin #, ej: EC6620",
    }),

    // --- Page Content ---
    defineField({
      name: "introText",
      title: "Texto introductorio",
      type: "localizedBlockContent",
      description: "Contenido principal de la pagina del programa",
    }),
    defineField({
      name: "objectives",
      title: "Objetivos especificos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "localizedString" }),
            defineField({ name: "description", title: "Descripcion", type: "localizedText" }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title?.es || "Objetivo" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "components",
      title: "Componentes / Ejes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "localizedString" }),
            defineField({ name: "description", title: "Descripcion", type: "localizedText" }),
            defineField({ name: "icon", title: "Icono (Lucide)", type: "string", description: "Nombre del icono Lucide, ej: Users, Heart, Target" }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title?.es || "Componente" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "results",
      title: "Resultados esperados",
      type: "array",
      of: [{ type: "localizedString" }],
    }),

    // --- Program-Specific Sections ---
    defineField({
      name: "modules",
      title: "Modulos del programa",
      description: "Usado para Avanza Joven",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "code", title: "Codigo", type: "string", description: "Ej: 1, 2, 3" }),
            defineField({ name: "title", title: "Titulo", type: "localizedString" }),
            defineField({ name: "description", title: "Descripcion", type: "localizedText" }),
            defineField({ name: "icon", title: "Icono (Lucide)", type: "string" }),
          ],
          preview: {
            select: { title: "title", subtitle: "code" },
            prepare({ title, subtitle }) {
              return { title: `${subtitle || ""} - ${title?.es || "Modulo"}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "actionLines",
      title: "Lineas de accion",
      description: "Usado para Incidencia",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "localizedString" }),
            defineField({ name: "description", title: "Descripcion", type: "localizedText" }),
            defineField({ name: "icon", title: "Icono (Lucide)", type: "string" }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title?.es || "Linea de accion" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "pillars",
      title: "Pilares",
      description: "Usado para Marco Politico",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "localizedString" }),
            defineField({ name: "description", title: "Descripcion", type: "localizedText" }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title?.es || "Pilar" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "crossCutting",
      title: "Enfoques transversales",
      description: "Usado para Marco Politico",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "localizedString" }),
            defineField({ name: "description", title: "Descripcion", type: "localizedText" }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title?.es || "Enfoque" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "incidenciaItems",
      title: "Items de incidencia",
      description: "Usado para Marco Politico (items de incidencia)",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "secondaryObjectives",
      title: "Objetivos secundarios",
      description: "Usado para Mi Cuerpo",
      type: "array",
      of: [{ type: "localizedString" }],
    }),

    // --- Gallery ---
    defineField({
      name: "gallery",
      title: "Galeria de imagenes",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),

    // --- Ordering & SEO ---
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    { name: "orderAsc", title: "Orden", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "heroImage" },
    prepare({ title, media }) {
      return { title: title?.es || "...", media };
    },
  },
});
