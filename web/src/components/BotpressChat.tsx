"use client";

import { useEffect } from "react";

const BOTPRESS_INJECT_URL = "https://cdn.botpress.cloud/webchat/v5.0/inject.js";
const BOTPRESS_CONFIG_URL = "https://files.bpcontent.cloud/2026/07/31/03/20260731033313-1HFMUJL8.js";

export default function BotpressChat() {
  useEffect(() => {
    if (document.getElementById("bp-webchat-script")) return;

    const inject = document.createElement("script");
    inject.id = "bp-webchat-script";
    inject.src = BOTPRESS_INJECT_URL;
    document.head.appendChild(inject);

    let attempts = 0;
    const loadConfig = () => {
      if (document.getElementById("bp-webchat-config")) return;

      const bp = (window as unknown as { botpress?: { init?: unknown } }).botpress;
      if (bp && typeof bp.init === "function") {
        const config = document.createElement("script");
        config.id = "bp-webchat-config";
        config.src = BOTPRESS_CONFIG_URL;
        document.head.appendChild(config);
        return;
      }

      attempts += 1;
      if (attempts < 100) {
        setTimeout(loadConfig, 200);
      }
    };

    loadConfig();
  }, []);

  return null;
}
