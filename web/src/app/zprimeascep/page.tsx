"use client";

import { useEffect, useState, useCallback, FormEvent } from "react";

type FlatEntry = {
  key: string;
  path: string;
  section: string;
};

const sectionLabels: Record<string, string> = {
  home: "Home",
  quienesSomos: "Quiénes Somos",
  aliados: "Aliados",
  programas: "Programas",
  comoLoHacemos: "Cómo lo Hacemos",
  impacto: "Impacto",
  header: "Header",
  casasDelSaber: "Casas del Saber",
  contacto: "Contacto",
  donar: "Donar",
  leyEgreso: "Ley de Egreso",
  noticias: "Noticias",
  participa: "Participa",
  transparencia: "Transparencia",
  enredate: "Enrédate con ASCEP",
  planPadrino: "Plan Padrino",
  voluntariado: "Voluntariado",
  empleo: "Empleo",
};

export default function FotosDashboard() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("zprime_auth") === "1") setAuthed(true);
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setPwLoading(true);
    setPwError("");
    try {
      const res = await fetch("/api/fotos", {
        method: "GET",
        headers: { "x-zprime-pw": pwInput },
      });
      if (res.status === 200) {
        sessionStorage.setItem("zprime_auth", "1");
        sessionStorage.setItem("zprime_pw", pwInput);
        setAuthed(true);
      } else {
        setPwError("Clave incorrecta");
      }
    } catch {
      setPwError("Error de red");
    } finally {
      setPwLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4 rounded-xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-xl font-bold">Acceso restringido</h1>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            placeholder="Contraseña"
            autoFocus
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
          {pwError && <p className="text-xs text-red-600">{pwError}</p>}
          <button
            type="submit"
            disabled={pwLoading}
            className="w-full rounded-lg bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {pwLoading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return <DashboardInner />;
}

function DashboardInner() {
  const [entries, setEntries] = useState<FlatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [dimensions, setDimensions] = useState<Record<string, string>>({});

  const getPw = () => sessionStorage.getItem("zprime_pw") || "";

  const fetchFotos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/fotos", {
        headers: { "x-zprime-pw": getPw() },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("zprime_auth");
        sessionStorage.removeItem("zprime_pw");
        window.location.reload();
        return;
      }
      const data = await res.json();
      if (data.entries) setEntries(data.entries);
      else setError(data.error || "Error");
    } catch {
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFotos();
  }, [fetchFotos]);

  const grouped = entries.reduce<Record<string, FlatEntry[]>>((acc, e) => {
    (acc[e.section] ??= []).push(e);
    return acc;
  }, {});

  const handleChange = async (entry: FlatEntry) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setUploading(entry.key);
      setSuccessMsg("");
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("path", entry.path);
        const res = await fetch("/api/fotos", {
          method: "POST",
          headers: { "x-zprime-pw": getPw() },
          body: fd,
        });
        if (res.status === 401) {
          sessionStorage.removeItem("zprime_auth");
          sessionStorage.removeItem("zprime_pw");
          window.location.reload();
          return;
        }
        const data = await res.json();
        if (data.success) {
          setSuccessMsg(`Actualizada: ${entry.key} → ${data.newPath}`);
          fetchFotos();
        } else {
          setError(data.error || "Error al actualizar");
        }
      } catch {
        setError("Error de red");
      } finally {
        setUploading(null);
      }
    };
    input.click();
  };

  const handleImgLoad = (key: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setDimensions((prev) => ({ ...prev, [key]: `${img.naturalWidth}×${img.naturalHeight}` }));
  };

  if (loading) return <div className="p-8 text-center text-lg">Cargando fotos...</div>;

  const sectionOrder = Object.keys(sectionLabels).filter((s) => grouped[s]);
  const otherSections = Object.keys(grouped).filter((s) => !sectionLabels[s]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestor de Fotos</h1>
          <p className="mt-1 text-gray-500">{entries.length} imágenes en total</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              sessionStorage.removeItem("zprime_auth");
              sessionStorage.removeItem("zprime_pw");
              window.location.reload();
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
          >
            Salir
          </button>
          <button
            onClick={fetchFotos}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
          >
            Recargar
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {[...sectionOrder, ...otherSections].map((section) => (
        <div key={section} className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {sectionLabels[section] || section}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {grouped[section].map((entry, i) => (
              <div
                key={`${entry.key}-${i}`}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.path}
                    alt={entry.key}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                    onLoad={(e) => handleImgLoad(entry.key, e)}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23999' font-size='12'%3Eerror%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="p-3">
                  <p className="truncate text-xs font-medium text-gray-700" title={entry.key}>
                    {entry.key}
                  </p>
                  <p className="truncate text-xs text-gray-400" title={entry.path}>
                    {entry.path.split("/").pop()}
                  </p>
                  {dimensions[entry.key] && (
                    <p className="text-xs text-gray-400">{dimensions[entry.key]}</p>
                  )}
                  <button
                    onClick={() => handleChange(entry)}
                    disabled={uploading === entry.key}
                    className="mt-2 w-full rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
                  >
                    {uploading === entry.key ? "Subiendo..." : "Cambiar foto"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
