import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { fotos as defaultFotos } from "@/data/fotos";
import { getFotoOverrides, type FotoOverride } from "@/lib/sanity/fetch";

export type Fotos = typeof defaultFotos;

let _cache: Fotos | null = null;
let _cacheTime = 0;
const CACHE_TTL = 5000;

function applyOverrides(base: Fotos, overrides: FotoOverride[]): Fotos {
  if (overrides.length === 0) return base;
  let json = JSON.stringify(base);
  for (const { targetPath, newPath } of overrides) {
    const escaped = targetPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    json = json.replace(new RegExp(escaped, "g"), newPath);
  }
  return JSON.parse(json) as Fotos;
}

function loadFromDisk(): Fotos | null {
  try {
    const p = join(process.cwd(), "src", "data", "fotos.json");
    if (!existsSync(p)) return null;
    const raw = readFileSync(p, "utf-8");
    return JSON.parse(raw) as Fotos;
  } catch {
    return null;
  }
}

export async function getFotos(): Promise<Fotos> {
  const now = Date.now();
  if (_cache && now - _cacheTime < CACHE_TTL) return _cache;

  const base = loadFromDisk() ?? defaultFotos;

  try {
    const overrides = await getFotoOverrides();
    if (overrides.length > 0) {
      const merged = applyOverrides(base, overrides);
      _cache = merged;
      _cacheTime = now;
      return merged;
    }
  } catch {}

  _cache = base;
  _cacheTime = now;
  return base;
}
