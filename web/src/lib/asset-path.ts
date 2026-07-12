import assetMap from "./asset-map";

export function assetPath(localPath: string): string {
  if (process.env.NODE_ENV === "development") return localPath;
  return (assetMap as Record<string, string>)[localPath] ?? localPath;
}
