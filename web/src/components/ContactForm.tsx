'use client';

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations("contacto");
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [nombre, setNombre] = useState(() => searchParams.get("nombre") ?? "");
  const [asunto, setAsunto] = useState(() => searchParams.get("asunto") ?? "");
  const [mensaje, setMensaje] = useState(() => searchParams.get("mensaje") ?? "");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("asunto") as HTMLInputElement).value,
      message: (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-text-secondary">
          {t("formName")}
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-2 text-sm transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-secondary">
          {t("formEmail")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-2 text-sm transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
        />
      </div>
      <div>
        <label htmlFor="asunto" className="mb-1 block text-sm font-medium text-text-secondary">
          {t("formAsunto")}
        </label>
        <input
          type="text"
          id="asunto"
          name="asunto"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-2 text-sm transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="mb-1 block text-sm font-medium text-text-secondary">
          {t("formMensaje")}
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-2 text-sm transition-all focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-[10px] bg-brand-purple px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-purple-dark hover:shadow-lg disabled:opacity-50"
      >
        {loading ? <Loader size={16} className="animate-spin" /> : null}
        {status === "success" ? <CheckCircle size={16} /> : status === "error" ? <AlertCircle size={16} /> : null}
        {loading ? "Enviando..." : status === "success" ? t("formSuccess") || "Mensaje enviado" : status === "error" ? t("formError") || "Error al enviar" : t("formSubmit")}
      </button>
    </form>
  );
}
