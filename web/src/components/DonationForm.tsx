'use client';

import { useState, useEffect } from "react";
import { Coffee, Sunrise, Heart, Star, Rocket, CreditCard, Landmark, Loader, type LucideIcon } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface TierOption {
  cop: number;
  usd: number;
  label: string;
  icon?: string;
}

const DONATARIO_URL = "https://donatario.com/recaudo/8cec07d1-f20c-4e30-adb1-5f4eedd9de2a";

const defaultTierOptions: TierOption[] = [
  { cop: 5000, usd: 1, label: "Café ASCEP", icon: "Coffee" },
  { cop: 20000, usd: 5, label: "Amanecer con esperanza", icon: "Sunrise" },
  { cop: 50000, usd: 12, label: "Estrella guía", icon: "Heart" },
  { cop: 100000, usd: 25, label: "Escudo de oportunidades", icon: "Star" },
  { cop: 200000, usd: 50, label: "Futuro brillante", icon: "Rocket" },
];

const iconMap: Record<string, LucideIcon> = {
  Coffee,
  Sunrise,
  Heart,
  Star,
  Rocket,
};

export default function DonationForm({ tiers = defaultTierOptions }: { tiers?: TierOption[] }) {
  const t = useTranslations("donationForm");
  const locale = useLocale();
  const [currency, setCurrency] = useState<"COP" | "USD">("COP");
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const method = params.get("method");
      if (method === "mp" || method === "stripe") {
        setSelectedTier(50000);
        setCustom("");
        setCurrency(method === "stripe" ? "USD" : "COP");
      }
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  const symbol = "$";

  const getAmount = (): number | "" => {
    const tier = tiers.find((item) => item.cop === selectedTier);
    if (tier) return currency === "COP" ? tier.cop : tier.usd;
    if (custom) {
      const parsed = parseInt(custom.replace(/[^0-9]/g, ""));
      return parsed || "";
    }
    return "";
  };

  const handleTierClick = (cop: number) => {
    setSelectedTier(cop);
    setCustom("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustom(e.target.value);
    setSelectedTier(null);
  };

  const handleSubmit = async (gateway: "mercadopago" | "stripe") => {
    const amount = getAmount();
    if (!amount || amount < (currency === "COP" ? 2000 : 1)) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/checkout/${gateway}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          name,
          email,
          message,
          locale,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Show detailed error message if available
        const errorMsg = data.error || t("errorPago");
        console.error("Payment error details:", data.details);
        alert(errorMsg);
      }
    } catch {
      alert(t("errorConexion"));
    } finally {
      setLoading(false);
    }
  };

  const amount = getAmount();

  return (
    <div className="mx-auto max-w-lg">
      {/* Currency toggle */}
      <div className="mb-8 flex justify-center rounded-[10px] bg-brand-purple/10 p-1">
        <button
          onClick={() => { setCurrency("COP"); setSelectedTier(null); setCustom(""); }}
          className={`flex-1 rounded-[8px] py-2 text-sm font-semibold transition-all ${currency === "COP" ? "bg-brand-purple text-white shadow-sm" : "text-text-primary"}`}
        >
          COP
        </button>
        <button
          onClick={() => { setCurrency("USD"); setSelectedTier(null); setCustom(""); }}
          className={`flex-1 rounded-[8px] py-2 text-sm font-semibold transition-all ${currency === "USD" ? "bg-brand-purple text-white shadow-sm" : "text-text-primary"}`}
        >
          USD
        </button>
      </div>

      {/* Creative tiers */}
      <div className="mb-6 grid gap-3">
        {tiers.map((tier) => {
          const val = currency === "COP" ? tier.cop : tier.usd;
          const active = selectedTier === tier.cop;
          const Icon = iconMap[tier.icon || "Heart"] || Heart;
          return (
            <button
              key={`${tier.cop}-${tier.label}`}
              onClick={() => handleTierClick(tier.cop)}
              className={`flex items-center gap-4 rounded-[10px] border-2 p-4 text-left transition-all ${
                active
                  ? "border-brand-purple bg-brand-purple text-white"
                  : "border-brand-purple/20 text-text-primary hover:border-brand-purple/50"
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] ${active ? "bg-white/20" : "bg-brand-purple/10"}`}>
                <Icon size={18} className={active ? "text-white" : "text-brand-purple"} />
              </div>
              <div className="flex-1">
                <div className={`text-sm font-bold ${active ? "text-white" : "text-text-primary"}`}>{tier.label}</div>
                <div className={`text-xs ${active ? "text-white/70" : "text-text-muted"}`}>{symbol}{val.toLocaleString()} {currency}</div>
              </div>
              <div className={`h-5 w-5 rounded-full border-2 ${active ? "border-white bg-white" : "border-brand-purple/30"}`}>
                {active && <div className="m-0.5 h-3.5 w-3.5 rounded-full bg-brand-purple" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom amount */}
      <div className="mb-6">
        <label className="mb-2 block text-xs font-medium text-text-muted uppercase tracking-wider">
          {t("customAmount")}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">{symbol}</span>
          <input
            type="text"
            inputMode="numeric"
            value={custom}
            onChange={handleCustomChange}
            placeholder={currency === "COP" ? "50.000" : "30"}
            className="w-full rounded-[10px] border border-border-default bg-bg-surface py-3 pl-8 pr-4 text-lg font-bold text-text-primary transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-muted">{currency}</span>
        </div>
      </div>

      {/* Donor info */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("namePlaceholder")}
          className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("messagePlaceholder")}
          rows={3}
          className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
        />
      </div>

      {/* Submit buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleSubmit("mercadopago")}
          disabled={loading || !amount}
          className="flex items-center justify-center gap-2 rounded-[10px] bg-brand-purple py-3 text-sm font-bold text-white transition-all hover:bg-brand-purple-dark disabled:opacity-50"
        >
          {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Landmark size={18} />}
          {loading ? t("processing") : amount ? t("donarConMercadoPago", { amount: `${symbol}${amount.toLocaleString()}` }) : t("donarMercadoPago")}
        </button>
        <button
          onClick={() => handleSubmit("stripe")}
          disabled={loading || !amount}
          className="flex items-center justify-center gap-2 rounded-[10px] border-2 border-brand-purple py-3 text-sm font-bold text-brand-purple transition-all hover:bg-brand-purple hover:text-white disabled:opacity-50"
        >
          {loading ? <Loader className="h-4 w-4 animate-spin" /> : <CreditCard size={18} />}
          {loading ? t("processing") : amount ? t("pagarConTarjeta", { amount: `${symbol}${amount.toLocaleString()}` }) : t("pagarTarjeta")}
        </button>
        <a
          href={DONATARIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-center text-xs text-text-muted underline underline-offset-2 hover:text-brand-purple"
        >
          {t("donatario")}
        </a>
      </div>
    </div>
  );
}
