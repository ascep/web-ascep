import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const assetsUrl = process.env.ASSETS_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.private.blob.vercel-storage.com",
      },
    ],
  },
  async rewrites() {
    if (!assetsUrl) return [];
    return [
      { source: "/images/:path*", destination: `${assetsUrl}/images/:path*` },
      { source: "/documents/:path*", destination: `${assetsUrl}/documents/:path*` },
      { source: "/videos/:path*", destination: `${assetsUrl}/videos/:path*` },
    ];
  },
};

export default withNextIntl(nextConfig);
