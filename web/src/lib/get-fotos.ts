import { readFileSync, statSync } from "fs";
import { join } from "path";
import { fotos as defaultFotos } from "@/data/fotos";

export type Fotos = typeof defaultFotos;

let _cache: Fotos | null = null;
let _cacheMtime = 0;

export function getFotos(): Fotos {
  try {
    const p = join(process.cwd(), "src", "data", "fotos.json");
    const stat = statSync(p);
    if (_cache && stat.mtimeMs === _cacheMtime) return _cache;
    const raw = readFileSync(p, "utf-8");
    _cache = JSON.parse(raw) as Fotos;
    _cacheMtime = stat.mtimeMs;
    return _cache;
  } catch {
    return defaultFotos;
  }
}
