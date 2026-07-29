import { defineField, defineType } from "sanity";

export default defineType({
  name: "fotoOverrides",
  title: "Overrides de fotos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      description: "Identificador interno (ej: 'Overrides default')",
    }),
    defineField({
      name: "overrides",
      title: "Overrides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "targetPath", type: "string", title: "Ruta original" },
            { name: "newPath", type: "string", title: "Nueva ruta" },
          ],
          preview: {
            select: { targetPath: "targetPath", newPath: "newPath" },
            prepare: ({ targetPath, newPath }) => ({
              title: targetPath,
              subtitle: `→ ${newPath}`,
            }),
          },
        },
      ],
      description: "Mapeo de rutas de imagenes: ruta original → nueva ruta",
    }),
  ],
  preview: {
    select: { overrides: "overrides" },
    prepare: ({ overrides }) => ({
      title: "Overrides de fotos",
      subtitle: `${overrides?.length || 0} override(s)`,
    }),
  },
});
