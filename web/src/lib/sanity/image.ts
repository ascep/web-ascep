export function imageUrl(source: any, width = 600, height = 338): string | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId || !source?.asset?._ref) return null;

  const ref = source.asset._ref;
  const [, id, format] = ref.split("-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${width}x${height}.${format}`;
}
