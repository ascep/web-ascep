import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getServerClient } from "@/lib/sanity/client";
import { fotoOverridesQuery } from "@/lib/sanity/queries";
import { clearFotosCache } from "@/lib/get-fotos";

type FlatEntry = {
  key: string;
  path: string;
  section: string;
  usedCount: number;
};

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "image/svg+xml"]);
const MAX_SIZE = 10 * 1024 * 1024;

function checkAuth(request: Request): boolean {
  const pw = request.headers.get("x-zprime-pw") || "";
  const expected = process.env.ZPRIME_PASSWORD;
  if (!expected) return false;
  return pw === expected;
}

function isImagePath(val: unknown): boolean {
  if (typeof val !== "string") return false;
  const clean = val.trim();
  return (
    clean.startsWith("/images/") ||
    clean.startsWith("http://") ||
    clean.startsWith("https://") ||
    /\.(webp|png|jpg|jpeg|gif|svg|avif)(\?.*)?$/i.test(clean)
  );
}

function flatten(obj: Record<string, unknown>, prefix = "", allPaths: string[] = []): FlatEntry[] {
  const result: FlatEntry[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (isImagePath(v)) {
      const pathStr = v as string;
      allPaths.push(pathStr);
      const section = fullKey.split(".")[0];
      result.push({ key: fullKey, path: pathStr, section, usedCount: 0 });
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        const arrKey = `${fullKey}[${i}]`;
        if (isImagePath(item)) {
          const pathStr = item as string;
          allPaths.push(pathStr);
          const section = fullKey.split(".")[0];
          result.push({ key: arrKey, path: pathStr, section, usedCount: 0 });
        } else if (typeof item === "object" && item !== null) {
          for (const [ik, iv] of Object.entries(item as Record<string, unknown>)) {
            const entryKey = `${arrKey}.${ik}`;
            if (isImagePath(iv)) {
              const pathStr = iv as string;
              allPaths.push(pathStr);
              const section = fullKey.split(".")[0];
              result.push({ key: entryKey, path: pathStr, section, usedCount: 0 });
            }
          }
        }
      });
    } else if (typeof v === "object" && v !== null) {
      result.push(...flatten(v as Record<string, unknown>, fullKey, allPaths));
    }
  }
  return result;
}

function setNestedValue(obj: Record<string, unknown>, keyPath: string, value: string): boolean {
  try {
    const parts = keyPath.replace(/\[(\d+)\]/g, ".$1").split(".");
    let curr: Record<string, unknown> = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (curr[p] === undefined || curr[p] === null) return false;
      curr = curr[p] as Record<string, unknown>;
    }
    const lastKey = parts[parts.length - 1];
    curr[lastKey] = value;
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const fotosPath = path.join(process.cwd(), "src", "data", "fotos.json");
    const content = await fs.readFile(fotosPath, "utf-8");
    const fotosObj = JSON.parse(content) as Record<string, unknown>;

    const allPaths: string[] = [];
    const entries = flatten(fotosObj, "", allPaths);

    const pathCounts: Record<string, number> = {};
    for (const p of allPaths) {
      pathCounts[p] = (pathCounts[p] || 0) + 1;
    }
    for (const entry of entries) {
      entry.usedCount = pathCounts[entry.path] || 1;
    }

    return NextResponse.json({ entries }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const targetPath = formData.get("path") as string | null;
    const targetKey = formData.get("key") as string | null;

    if (!file || !targetPath) {
      return NextResponse.json({ error: "file and path required" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: `Tipo no permitido: ${file.type}. Use JPG, PNG, WebP, GIF, AVIF o SVG.` }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: `Archivo muy grande: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximo 10MB.` }, { status: 400 });
    }

    const ext = path.extname(file.name) || ".webp";
    let filename = `upload_${Date.now()}${ext}`;
    let subdir = "";

    if (targetPath.startsWith("/images/")) {
      subdir = path.dirname(targetPath).replace(/^\/images\/?/, "");
      const base = path.basename(targetPath).replace(/\.[^.]+$/, "");
      filename = `${base}${ext}`;
    } else {
      if (targetKey) {
        const keyClean = targetKey.replace(/[^a-zA-Z0-9_-]/g, "_");
        filename = `${keyClean}${ext}`;
      }
      subdir = "uploads";
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicDir = path.join(process.cwd(), "public");
    const saveDir = path.join(publicDir, "images", subdir);
    const savePath = path.join(saveDir, filename);

    try {
      await fs.mkdir(saveDir, { recursive: true });
      await fs.writeFile(savePath, buffer);
    } catch {}

    const newRelativePath = `/images/${subdir ? subdir + "/" : ""}${filename}`;
    let newPath = newRelativePath;
    let sanityAssetUrl = "";

    try {
      const client = getServerClient();
      if (client) {
        const asset = await client.assets.upload("image", buffer, {
          filename,
          contentType: file.type,
        });
        sanityAssetUrl = asset.url;

        const existing = await client.fetch<{ _id: string; overrides?: Array<{ targetPath: string; newPath: string }> } | null>(fotoOverridesQuery);
        const newOverride = { targetPath, newPath: sanityAssetUrl };

        if (existing?._id) {
          const existingOverrides = existing.overrides ?? [];
          const idx = existingOverrides.findIndex((o) => o.targetPath === targetPath);
          if (idx >= 0) {
            existingOverrides[idx] = newOverride;
          } else {
            existingOverrides.push(newOverride);
          }
          await client.patch(existing._id).set({ overrides: existingOverrides }).commit();
        } else {
          await client.create({
            _type: "fotoOverrides",
            title: "Overrides de fotos",
            overrides: [newOverride],
          });
        }

        newPath = sanityAssetUrl;
      }
    } catch {}

    const fotosJsonPath = path.join(process.cwd(), "src", "data", "fotos.json");
    let replacedCount = 0;
    try {
      const content = await fs.readFile(fotosJsonPath, "utf-8");
      let updatedContent = content;

      const escapedOldPath = targetPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(["'])${escapedOldPath}\\1`, "g");
      const matches = content.match(regex);
      replacedCount = matches ? matches.length : 0;

      if (replacedCount > 0) {
        updatedContent = updatedContent.replace(regex, `"${newPath}"`);
      }

      if (targetKey) {
        try {
          const fotosObj = JSON.parse(updatedContent) as Record<string, unknown>;
          if (setNestedValue(fotosObj, targetKey, newPath)) {
            updatedContent = JSON.stringify(fotosObj, null, 2);
            if (replacedCount === 0) replacedCount = 1;
          }
        } catch {}
      }

      await fs.writeFile(fotosJsonPath, updatedContent, "utf-8");
    } catch {}

    clearFotosCache();

    return NextResponse.json({
      success: true,
      oldPath: targetPath,
      newPath,
      replacedCount,
      sanityUrl: sanityAssetUrl || undefined,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
