"use client";

import { useEffect } from "react";

export default function BotpressChat() {
  useEffect(() => {
    if (document.getElementById("bp-webchat-script")) return;

    const inject = document.createElement("script");
    inject.id = "bp-webchat-script";
    inject.src = "https://cdn.botpress.cloud/webchat/v5.0/inject.js";
    document.head.appendChild(inject);

    const config = document.createElement("script");
    config.src = "https://files.bpcontent.cloud/2026/07/31/03/20260731033313-1HFMUJL8.js";
    config.defer = true;
    document.head.appendChild(config);
  }, []);

  return null;
}
