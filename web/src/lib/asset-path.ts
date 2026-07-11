import assetMap from "./asset-map";

export function assetPath(localPath: string): string {
  return (assetMap as Record<string, string>)[localPath] ?? localPath;
}
