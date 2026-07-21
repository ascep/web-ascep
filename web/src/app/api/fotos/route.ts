import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type FlatEntry = {
  key: string;
  path: string;
  section: string;
};

function checkAuth(request: Request): boolean {
  const pw = request.headers.get("x-zprime-pw") || "";
  const expected = process.env.ZPRIME_PASSWORD;
  if (!expected) return false;
  return pw === expected;
}

function flatten(obj: Record<string, unknown>, prefix = ""): FlatEntry[] {
  const result: FlatEntry[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string" && v.startsWith("/images/")) {
      const section = fullKey.split(".")[0];
      result.push({ key: fullKey, path: v, section });
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        const arrKey = `${fullKey}[${i}]`;
        if (typeof item === "string" && item.startsWith("/images/")) {
          const section = fullKey.split(".")[0];
          result.push({ key: arrKey, path: item, section });
        } else if (typeof item === "object" && item !== null) {
          for (const [ik, iv] of Object.entries(item as Record<string, unknown>)) {
            const entryKey = `${arrKey}.${ik}`;
            if (typeof iv === "string" && iv.startsWith("/images/")) {
              const section = fullKey.split(".")[0];
              result.push({ key: entryKey, path: iv, section });
            }
          }
        }
      });
    } else if (typeof v === "object" && v !== null) {
      result.push(...flatten(v as Record<string, unknown>, fullKey));
    }
  }
  return result;
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const fotosPath = path.join(process.cwd(), "src", "data", "fotos.ts");
    const content = await fs.readFile(fotosPath, "utf-8");

    const match = content.match(/export const fotos = ({[\s\S]*}) as const;/);
    if (!match) {
      return NextResponse.json({ error: "Could not parse fotos.ts" }, { status: 500 });
    }

    let code = match[1];
    // Strip block comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, "");
    // Strip line comments
    code = code.replace(/\/\/.*$/gm, "");

    const fotosObj = new Function(`return ${code}`)() as Record<string, unknown>;
    const entries = flatten(fotosObj);

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

    const fotosPath = path.join(process.cwd(), "src", "data", "fotos.ts");
    const content = await fs.readFile(fotosPath, "utf-8");

    const escapedOldPath = targetPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(["'])${escapedOldPath}\\1`);

    if (!regex.test(content)) {
      return NextResponse.json({ error: `Path not found in fotos.ts: ${targetPath}` }, { status: 404 });
    }

    const updated = content.replace(regex, `"${newRelativePath}"`);
    await fs.writeFile(fotosPath, updated, "utf-8");

    return NextResponse.json({ success: true, oldPath: targetPath, newPath: newRelativePath });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
