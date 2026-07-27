import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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

function flatten(obj: Record<string, unknown>, prefix = "", allPaths: string[] = []): FlatEntry[] {
  const result: FlatEntry[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string" && v.startsWith("/images/")) {
      allPaths.push(v);
      const section = fullKey.split(".")[0];
      result.push({ key: fullKey, path: v, section, usedCount: 0 });
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        const arrKey = `${fullKey}[${i}]`;
        if (typeof item === "string" && item.startsWith("/images/")) {
          allPaths.push(item);
          const section = fullKey.split(".")[0];
          result.push({ key: arrKey, path: item, section, usedCount: 0 });
        } else if (typeof item === "object" && item !== null) {
          for (const [ik, iv] of Object.entries(item as Record<string, unknown>)) {
            const entryKey = `${arrKey}.${ik}`;
            if (typeof iv === "string" && iv.startsWith("/images/")) {
              allPaths.push(iv);
              const section = fullKey.split(".")[0];
              result.push({ key: entryKey, path: iv, section, usedCount: 0 });
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

function setNestedValue(obj: Record<string, unknown>, keyPath: string, value: unknown) {
  const parts = keyPath.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    current = current[parts[i]] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
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

    return NextResponse.json({ entries });
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
    const filename = `${path.basename(targetPath).replace(/\.[^.]+$/, "")}${ext}`;
    const publicDir = path.join(process.cwd(), "public");
    const subdir = path.dirname(targetPath).replace("/images/", "");
    const saveDir = path.join(publicDir, "images", subdir);
    await fs.mkdir(saveDir, { recursive: true });
    const savePath = path.join(saveDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(savePath, buffer);

    const newRelativePath = `/images/${subdir ? subdir + "/" : ""}${filename}`;

    const fotosJsonPath = path.join(process.cwd(), "src", "data", "fotos.json");
    const content = await fs.readFile(fotosJsonPath, "utf-8");
    const fotosObj = JSON.parse(content) as Record<string, unknown>;

    const escapedOldPath = targetPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(["'])${escapedOldPath}\\1`, "g");
    const matches = content.match(regex);

    if (!matches || matches.length === 0) {
      return NextResponse.json({ error: `Path not found in fotos.json: ${targetPath}` }, { status: 404 });
    }

    const replacementCount = matches.length;
    const updated = content.replace(regex, `"${newRelativePath}"`);
    await fs.writeFile(fotosJsonPath, updated, "utf-8");

    return NextResponse.json({
      success: true,
      oldPath: targetPath,
      newPath: newRelativePath,
      replacedCount: replacementCount,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
