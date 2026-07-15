import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configuracion del sitio",
  type: "document",
  fields: [
    // --- Identity ---
    defineField({
      name: "siteTitle",
      title: "Titulo del sitio",
      type: "localizedString",
      description: "Nombre que aparece en la pestana del navegador",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Descripcion del sitio",
      type: "localizedText",
      description: "Descripcion global usada en meta tags",
      validation: (rule) => rule.required(),
    }),

    // --- Logos ---
    defineField({
      name: "logo",
      title: "Logo principal",
      type: "imageWithAlt",
      description: "Logo horizontal azul, usado en el header",
    }),
    defineField({
      name: "logoWhite",
      title: "Logo blanco",
      type: "imageWithAlt",
      description: "Logo horizontal blanco, usado en el footer",
    }),
    defineField({
      name: "logoFavicon",
      title: "Favicon / Apple Touch Icon",
      type: "imageWithAlt",
      description: "Icono cuadrado para favoritos y dispositivos Apple",
    }),
    defineField({
      name: "ogImage",
      title: "Imagen por defecto para Open Graph",
      type: "imageWithAlt",
      description: "1200x630px. Usada cuando la pagina no tiene imagen propia.",
    }),

    // --- Contact & Social ---
    defineField({
      name: "socialLinks",
      title: "Redes sociales",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "whatsappNumber",
      title: "Numero de WhatsApp",
      type: "string",
      description: "Formato internacional sin +, ej: 573025550107",
    }),
    defineField({
      name: "contactEmail",
      title: "Correo de contacto",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Telefono de contacto",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Direccion",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Direccion", type: "string" }),
        defineField({ name: "city", title: "Ciudad", type: "string" }),
        defineField({ name: "country", title: "Pais", type: "string" }),
      ],
    }),

    // --- Organization Structured Data ---
    defineField({
      name: "organization",
      title: "Datos de la organizacion",
      type: "object",
      description: "Usado en JSON-LD schema",
      fields: [
        defineField({ name: "name", title: "Nombre oficial", type: "string" }),
        defineField({ name: "alternateName", title: "Nombre alternativo", type: "string" }),
        defineField({ name: "url", title: "Sitio web", type: "url" }),
        defineField({ name: "description", title: "Descripcion", type: "text" }),
      ],
    }),

    // --- Payment ---
    defineField({
      name: "donatarioUrl",
      title: "URL de Donatario",
      type: "url",
      description: "Link de donacion en Donatario (PSE, Nequi, etc.)",
    }),

    // --- Theme ---
    defineField({
      name: "themeColor",
      title: "Color principal del tema",
      type: "string",
      description: "Hex sin #, ej: 019E9F",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configuracion del sitio" };
    },
  },
});
