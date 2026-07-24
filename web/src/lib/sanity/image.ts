export function imageUrl(source: any, width = 600, height = 338): string | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId || !source?.asset?._ref) return null;

  const ref = source.asset._ref;
  const parts = ref.split("-");
  const format = parts[parts.length - 1];
  const id = parts.slice(1, parts.length - 1).join("-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}.${format}?w=${width}&h=${height}&fit=crop&auto=format`;
}
