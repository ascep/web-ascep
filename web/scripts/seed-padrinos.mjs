import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, "..", ".env.local");
const envRaw = fs.readFileSync(envPath, "utf-8");
const tokenMatch = envRaw.match(/SANITY_API_TOKEN=(\S+)/);
if (!tokenMatch) {
  console.error("ERROR: SANITY_API_TOKEN not found in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: "7vvy9nrc",
  dataset: "production",
  token: tokenMatch[1],
  apiVersion: "2025-03-01",
  useCdn: false,
});

const imgDir = path.join(__dirname, "..", "public", "images");

async function uploadImage(relPath, alt = "") {
  const fullPath = path.join(imgDir, ...relPath.split("/"));
  if (!fs.existsSync(fullPath)) {
    console.log(`  SKIP (no existe): ${relPath}`);
    return null;
  }
  const buffer = fs.readFileSync(fullPath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(relPath),
  });
  console.log(`  Imagen subida: ${relPath} -> ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt };
}

async function createOrUpdate(type, queryField, queryValue, doc) {
  const q = `*[_type == "${type}" && ${queryField} == $val][0]`;
  const existing = await client.fetch(q, { val: queryValue });
  if (existing) {
    await client.patch(existing._id).set(doc).commit();
    console.log(`  Actualizado: ${type} "${queryValue}" (${existing._id})`);
    return existing._id;
  } else {
    const result = await client.create({ _type: type, ...doc });
    console.log(`  Creado: ${type} "${queryValue}" (${result._id})`);
    return result._id;
  }
}

async function main() {
  console.log("\n========================================");
  console.log("  CREANDO PERFIL: Yaritza Valegas");
  console.log("========================================\n");

  // 1. Subir imagenes placeholder
  console.log("--- Subiendo imagenes ---\n");

  const profilePhoto = await uploadImage(
    "encuentro-2025/GIS06446.webp",
    "Foto de perfil de Yaritza Valegas"
  );

  const coverPhoto = await uploadImage(
    "encuentro-2025/GIS06450.webp",
    "Foto de portada de Yaritza Valegas"
  );

  const postImg1 = await uploadImage(
    "encuentro-2025/GIS06447.webp",
    "Yaritza en taller de manicure"
  );

  const postImg2 = await uploadImage(
    "encuentro-2025/GIS06448.webp",
    "Proyecto de manicure de Yaritza"
  );

  const galleryImg1 = await uploadImage(
    "encuentro-2025/GIS06445.webp",
    "Trabajo de manicure"
  );

  const galleryImg2 = await uploadImage(
    "encuentro-2025/GIS06449.webp",
    "Yaritza en formacion"
  );

  // 2. Crear/actualizar el perfil
  console.log("\n--- Creando perfil ---\n");

  const profileId = await createOrUpdate(
    "padrinoProfile",
    "slug.current",
    "yaritza-valegas",
    {
      name: {
        es: "Yaritza Valegas",
        en: "Yaritza Valegas",
        pt: "Yaritza Valegas",
      },
      slug: { _type: "slug", current: "yaritza-valegas" },
      age: 19,
      city: {
        es: "Cali",
        en: "Cali",
        pt: "Cali",
      },
      photo: profilePhoto,
      coverPhoto: coverPhoto,
      shortBio: {
        es: "Futura manicurista profesional. Sonadora, creativa y apasionada por el arte de las uñas.",
        en: "Future professional manicurist. A dreamer, creative and passionate about nail art.",
        pt: "Futura manicicure profissional. Sonhadora, criativa e apaixonada pela arte das unhas.",
      },
      fullBio: {
        es: [
          {
            _type: "block",
            _key: "bio1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "span1",
                text: "Yaritza tiene 19 años y vive en Cali. Desde pequeña siempre le ha gustado el arte y la creatividad. Cuando descubrió el mundo de la manicure, supo que eso era lo suyo. Actualmente está cursando su formación técnica en estética y uñas en ASCEP.",
              },
            ],
          },
          {
            _type: "block",
            _key: "bio2",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "span2",
                text: "Su sueño es abrir su propio estudio de manicure y nail art, un espacio donde pueda generar sus propios ingresos y ayudar a otras jóvenes a encontrar una salida laboral digna. Necesita apoyo con el material básico para iniciar su camino profesional.",
              },
            ],
          },
        ],
        en: [
          {
            _type: "block",
            _key: "bio1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "span1",
                text: "Yaritza is 19 years old and lives in Cali. Since she was little she has always liked art and creativity. When she discovered the world of manicure, she knew that was her thing. She is currently pursuing her technical training in aesthetics and nails at ASCEP.",
              },
            ],
          },
        ],
        pt: [
          {
            _type: "block",
            _key: "bio1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "span1",
                text: "Yaritza tem 19 anos e mora em Cali. Desde pequena sempre gostou de arte e criatividade. Quando descobriu o mundo da manicure, soube que era isso. Atualmente esta cursando sua formacao tecnica em estetica e unhas na ASCEP.",
              },
            ],
          },
        ],
      },
      impactPercentage: 45,
      storiesCount: 8,
      yearsInProgram: 1,
      needs: [
        {
          _key: "need1",
          title: {
            es: "Kit de material de manicure",
            en: "Manicure material kit",
            pt: "Kit de material de manicure",
          },
          description: {
            es: "Herramientas basicas: limas, cortaúñas, base, esmaltes, secador UV y mesa de trabajo.",
            en: "Basic tools: files, clippers, base, polishes, UV dryer and work table.",
            pt: "Ferramentas basicas: lixas, cortador de cuticulas, base, esmaltes, secadora UV e mesa de trabalho.",
          },
          priority: "high",
          progress: 35,
          targetAmount: "$1.0M",
          currentAmount: "$350K",
        },
        {
          _key: "need2",
          title: {
            es: "Kit de Autonomía",
            en: "Independence Kit",
            pt: "Kit de Autonomia",
          },
          description: {
            es: "Materiales para su proyecto de nail art y emprendimiento local.",
            en: "Materials for her nail art project and local entrepreneurship.",
            pt: "Materiais para seu projeto de nail art e empreendedorismo local.",
          },
          priority: "achieved",
          progress: 100,
          targetAmount: "",
          currentAmount: "",
        },
      ],
      impactMessage: {
        es: "Con tus aportes, Yaritza ha mantenido su formación y ya está en la mitad de su camino para completar su kit de material profesional.",
        en: "With your contributions, Yaritza has maintained her training and is already halfway to completing her professional material kit.",
        pt: "Com suas contribuicoes, Yaritza manteve sua formacao e ja esta no meio do caminho para completar seu kit de material profissional.",
      },
      impactStatLabel: {
        es: "Crecimiento en habilidades",
        en: "Skills growth",
        pt: "Crescimento em habilidades",
      },
      impactStatValue: "+18%",
      impactStatDescription: {
        es: "Crecimiento en habilidades de nail art",
        en: "Growth in nail art skills",
        pt: "Crescimento em habilidades de nail art",
      },
      progressPosts: [
        {
          _key: "post1",
          date: "2026-06-15T10:00:00Z",
          author: {
            es: "Profesora Diana",
            en: "Teacher Diana",
            pt: "Professora Diana",
          },
          authorRole: {
            es: "Tutora ASCEP",
            en: "ASCEP Tutor",
            pt: "Tutora ASCEP",
          },
          title: {
            es: "Yaritza completó su primer set de uñas profesionales",
            en: "Yaritza completed her first professional nail set",
            pt: "Yaritza completou seu primeiro conjunto de unhas profissional",
          },
          description: {
            es: [
              {
                _type: "block",
                _key: "d1",
                style: "normal",
                children: [
                  {
                    _type: "span",
                    _key: "s1",
                    text: "Yaritza terminó hoy su primer set completo de uñas acrílicas para una clienta real. ¡Su dedicación es increíble! Cada día进步 más.",
                  },
                ],
              },
            ],
          },
          type: "story",
          media: postImg1 ? [
            {
              _key: "m1",
              mediaType: "image",
              image: postImg1,
            },
          ] : [],
          tags: ["Manicure", "Progreso", "ASCEP"],
        },
        {
          _key: "post2",
          date: "2026-05-20T10:00:00Z",
          author: {
            es: "Profesora Diana",
            en: "Teacher Diana",
            pt: "Professora Diana",
          },
          authorRole: {
            es: "Tutora ASCEP",
            en: "ASCEP Tutor",
            pt: "Tutora ASCEP",
          },
          title: {
            es: "¡Hito académico: Curso de nail art aprobado!",
            en: "Academic milestone: Nail art course approved!",
            pt: "Marco academico: Curso de nail art aprovado!",
          },
          description: {
            es: [
              {
                _type: "block",
                _key: "d2",
                style: "normal",
                children: [
                  {
                    _type: "span",
                    _key: "s2",
                    text: "Yaritza aprobó con nota 4.8 el módulo de nail art y diseño de uñas. Esto es el primer paso para especializarse en el área que más le apasiona.",
                  },
                ],
              },
            ],
          },
          type: "milestone",
          media: postImg2 ? [
            {
              _key: "m2",
              mediaType: "image",
              image: postImg2,
            },
          ] : [],
          tags: ["NailArt", "Hito", "OrgulloASCEP"],
        },
        {
          _key: "post3",
          date: "2026-04-10T10:00:00Z",
          author: {
            es: "Yaritza Valegas",
            en: "Yaritza Valegas",
            pt: "Yaritza Valegas",
          },
          authorRole: {
            es: "Beneficiaria",
            en: "Beneficiary",
            pt: "Beneficiaria",
          },
          title: {
            es: "Mi primer día en el programa de formación",
            en: "My first day in the training program",
            pt: "Meu primeiro dia no programa de formacao",
          },
          description: {
            es: [
              {
                _type: "block",
                _key: "d3",
                style: "normal",
                children: [
                  {
                    _type: "span",
                    _key: "s3",
                    text: "Hoy fue mi primer día aprendiendo sobre técnicas de manicure. Estoy muy emocionada por este nuevo camino. Gracias ASCEP por esta oportunidad.",
                  },
                ],
              },
            ],
          },
          type: "update",
          media: [],
          tags: ["Inicio", "Emocion", "GraciasASCEP"],
        },
      ],
      galleryPhotos: galleryImg1 && galleryImg2 ? [galleryImg1, galleryImg2] : [],
      order: 1,
      active: true,
    }
  );

  console.log("\n========================================");
  console.log("  PERFIL CREADO EXITOSAMENTE!");
  console.log(`  ID: ${profileId}`);
  console.log("  Slug: yaritza-valegas");
  console.log("  URL: /es/como-ayudar/plan-padrino/yaritza-valegas");
  console.log("========================================\n");
  console.log("  Para agregar mas perfiles:");
  console.log("  1. Ve a /studio en el sitio");
  console.log("  2. Entra con la contrasena del studio");
  console.log("  3. Click en 'Perfil Plan Padrino'");
  console.log("  4. Click en '+ Create new'");
  console.log("  5. Llena los campos y sube fotos");
  console.log("  6. Click en Publish");
  console.log("========================================\n");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
