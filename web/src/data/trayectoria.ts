import type { RouteItem } from "@/components/TimelineRoute";

const trayectoriaImages: Record<string, string> = {
  "2013": "/images/eventos/2024/20241112_092855.webp",
  "2017": "/images/eventos/encuentro-2025/GIS06447.webp",
  "2019": "/images/eventos/2024/20241112_092951.webp",
  "2021": "/images/eventos/2024/20241112_095957.webp",
  "2022": "/images/eventos/encuentro-2025/GIS06450.webp",
  "2023": "/images/eventos/2024/20241112_100147.webp",
  "2024": "/images/eventos/2024/20241112_102515.webp",
  "2025": "/images/eventos/2024/20241112_111016.webp",
};

export function trayectoriaImageFor(year: string): string {
  return trayectoriaImages[year] || "";
}

export function buildTrayectoria(raw: RouteItem[], assetPath: (src: string) => string): RouteItem[] {
  return raw.map((m) => ({
    ...m,
    image: assetPath(trayectoriaImages[m.year] || ""),
  }));
}
