import { getRequestConfig } from "next-intl/server";
import es from "../../messages/es.json";

type JsonObject = Record<string, unknown>;

function deepMerge<T>(base: JsonObject | undefined, override: JsonObject | undefined): T {
  const out: JsonObject = {};

  for (const [key, value] of Object.entries(base ?? {})) {
    const overrideValue = override?.[key];
    const isPlainObject =
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value);
    const isOverridePlainObject =
      typeof overrideValue === "object" &&
      overrideValue !== null &&
      !Array.isArray(overrideValue);

    if (isPlainObject && isOverridePlainObject) {
      out[key] = deepMerge<Record<string, unknown>>(
        value as JsonObject,
        overrideValue as JsonObject,
      );
    } else {
      out[key] = overrideValue !== undefined ? overrideValue : value;
    }
  }

  for (const [key, value] of Object.entries(override ?? {})) {
    if (!(key in out)) out[key] = value;
  }

  return out as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const resolved = locale && ["es", "en", "pt"].includes(locale) ? locale : "es";

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
