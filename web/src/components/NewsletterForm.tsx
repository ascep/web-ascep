"use client";

import { useState, FormEvent } from "react";
import { Mail, Check } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Te has suscrito correctamente");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Ocurrio un error. Intenta de nuevo.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexion. Intenta de nuevo.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        <Check size={16} />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Correo electrónico
        </label>
        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electronico"
          aria-label="Correo electrónico"
          required
          className="w-full rounded-[10px] border border-white/20 bg-white/10 px-9 py-2.5 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-white/40"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-[10px] bg-white px-4 py-2.5 text-sm font-semibold text-[#005C5D] transition-colors hover:bg-white/90 disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Suscribirse"}
      </button>
      {status === "error" && (
        <p className="mt-1 text-xs text-red-400">{message}</p>
      )}
    </form>
  );
}
