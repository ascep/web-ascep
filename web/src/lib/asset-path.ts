const VERSION = process.env.NEXT_PUBLIC_ASSET_VERSION || "0";

export function assetPath(localPath: string): string {
  if (/^https?:\/\//i.test(localPath)) return localPath;
  const sep = localPath.includes("?") ? "&" : "?";
  return `${localPath}${sep}v=${VERSION}`;
}
