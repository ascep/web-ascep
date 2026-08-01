"use client";

import { useState, FormEvent } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "@/../sanity.config";
import { Lock, LogIn } from "lucide-react";

export default function StudioAuthGate() {
  const [authed, setAuthed] = useState<boolean | null>(() => {
    if (typeof document === "undefined") return null;
    const hasSession = document.cookie
      .split("; ")
      .find((row) => row.startsWith("studio_session="));
    return !!hasSession;
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthed(true);
      } else {
        setError("Password incorrecto");
      }
    } catch {
      setError("Error de conexion");
    } finally {
      setLoading(false);
    }
  };

  if (authed === null) {
    return null;
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <div className="w-full max-w-sm rounded-[10px] border border-neutral-800 bg-neutral-900 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800">
            <Lock size={20} className="text-neutral-400" />
          </div>
          <h1 className="mb-1 text-lg font-semibold text-white">Studio Protegido</h1>
          <p className="mb-6 text-sm text-neutral-400">Ingresa el password para acceder al CMS</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full rounded-[8px] border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-neutral-500"
            />
            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white/90 disabled:opacity-50"
            >
              <LogIn size={16} />
              {loading ? "Verificando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
