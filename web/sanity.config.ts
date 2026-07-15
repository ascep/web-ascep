import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { sanityConfig } from "./sanity/config";

export default defineConfig({
  ...sanityConfig,
  basePath: "/studio",
  title: "ASCEP CMS",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
