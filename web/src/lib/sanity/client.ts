import { createClient } from "next-sanity";

let _client: import("next-sanity").SanityClient | null = null;
let _serverClient: import("next-sanity").SanityClient | null = null;

function getConfig() {
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2025-03-01" as const,
    useCdn: true,
  };
}

export function getClient() {
  if (!_client) {
    const config = getConfig();
    if (!config.projectId) return null;
    _client = createClient(config);
  }
  return _client;
}

export function getServerClient() {
  if (!_serverClient) {
    const config = getConfig();
    if (!config.projectId) return null;
    _serverClient = createClient({
      ...config,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });
  }
  return _serverClient;
}
