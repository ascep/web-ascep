import { getRequestConfig } from "next-intl/server";
import es from "../../messages/es.json";

function deepMerge<T>(base: any, override: any): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(base || {})) {
    if (
      override &&
      typeof override[key] === "object" &&
      override[key] !== null &&
      !Array.isArray(override[key]) &&
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      out[key] = deepMerge(value, override[key]);
    } else {
      out[key] = override && override[key] !== undefined ? override[key] : value;
    }
  }
  for (const [key, value] of Object.entries(override || {})) {
    if (!(key in out)) out[key] = value;
  }
  return out as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const resolved = locale || "es";

  let messages: Record<string, unknown> = es as unknown as Record<string, unknown>;
  if (resolved !== "es") {
    try {
      const localized = (await import(`../../messages/${resolved}.json`)).default;
      messages = deepMerge<Record<string, unknown>>(es, localized);
    } catch {
      messages = es as unknown as Record<string, unknown>;
    }
  }

  return {
    locale: resolved,
    messages,
  };
});
