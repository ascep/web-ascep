import { readFileSync, statSync, existsSync } from "fs";
import { join } from "path";
import { fotos as defaultFotos } from "@/data/fotos";
import { get } from "@vercel/blob";

export type Fotos = typeof defaultFotos;

const BLOB_KEY = "fotos-data.json";
let _cache: Fotos | null = null;
let _cacheTime = 0;
const CACHE_TTL = 5000;

async function loadFromBlob(): Promise<Fotos | null> {
  try {
    const result = await get(BLOB_KEY, { access: "public" });
    if (!result?.blob) return null;
    const res = await fetch(result.blob.url);
    if (!res.ok) return null;
    return (await res.json()) as Fotos;
  } catch {
    return null;
  }
}

function loadFromDisk(): Fotos | null {
  try {
    const p = join(process.cwd(), "src", "data", "fotos.json");
    if (!existsSync(p)) return null;
    const stat = statSync(p);
    if (_cache && stat.mtimeMs === _cacheTime) return _cache;
    const raw = readFileSync(p, "utf-8");
    _cache = JSON.parse(raw) as Fotos;
    _cacheTime = stat.mtimeMs;
    return _cache;
  } catch {
    return null;
  }
}

export async function getFotos(): Promise<Fotos> {
  const now = Date.now();
  if (_cache && now - _cacheTime < CACHE_TTL) return _cache;

  const blobData = await loadFromBlob();
  if (blobData) {
    _cache = blobData;
    _cacheTime = now;
    return blobData;
  }

  const diskData = loadFromDisk();
  if (diskData) return diskData;

  return defaultFotos;
}
