export const CATEGORY_COLORS: Record<string, string> = {
  programas: "#007374",
  incidencia: "#C45118",
  eventos: "#44BCC5",
  ley: "#4A154B",
};

export function categoryColor(category?: string | null): string {
  if (category && CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  return "#019E9F";
}
