"use client";

import { useEffect, useState, useCallback, FormEvent } from "react";
import Image from "next/image";

type FlatEntry = {
  key: string;
  path: string;
  section: string;
  usedCount: number;
};

const sectionLabels: Record<string, string> = {
  home: "Home",
  quienesSomos: "Quienes Somos",
  aliados: "Aliados",
  programas: "Programas",
  comoLoHacemos: "Como lo Hacemos",
  impacto: "Impacto",
  header: "Header",
  casasDelSaber: "Casas del Saber",
  contacto: "Contacto",
  donar: "Donar",
  leyEgreso: "Ley de Egreso",
  noticias: "Noticias",
  participa: "Participa",
  transparencia: "Transparencia",
  enredate: "Enredate con ASCEP",
  planPadrino: "Plan Padrino",
  voluntariado: "Voluntariado",
  empleo: "Empleo",
};

export default function FotosDashboard() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("zprime_auth") === "1";
  });
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

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
            placeholder="Contrasena"
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
  const [previewEntry, setPreviewEntry] = useState<FlatEntry | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [actualImgError, setActualImgError] = useState(false);
  const [cacheBusters, setCacheBusters] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState("");

  const getPw = () => sessionStorage.getItem("zprime_pw") || "";

  const fetchFotos = useCallback(async () => {
    try {
      const res = await fetch(`/api/fotos?t=${Date.now()}`, {
        headers: { "x-zprime-pw": getPw(), "Cache-Control": "no-cache" },
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
    const t = window.setTimeout(() => {
      void fetchFotos();
    }, 0);
    return () => window.clearTimeout(t);
  }, [fetchFotos]);

  const grouped = entries.reduce<Record<string, FlatEntry[]>>((acc, e) => {
    (acc[e.section] ??= []).push(e);
    return acc;
  }, {});

  const filteredEntries = filter
    ? entries.filter(
      (e) =>
        e.key.toLowerCase().includes(filter.toLowerCase()) ||
        e.path.toLowerCase().includes(filter.toLowerCase())
    )
    : null;

  const openPreview = (entry: FlatEntry) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      setPreviewEntry(entry);
      setPreviewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setActualImgError(false);
    };
    input.click();
  };

  const confirmUpload = async () => {
    if (!previewEntry || !previewFile) return;
    setUploading(previewEntry.key);
    setSuccessMsg("");
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", previewFile);
      fd.append("path", previewEntry.path);
      fd.append("key", previewEntry.key);
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
        const countMsg = data.replacedCount > 1
          ? ` (${data.replacedCount} ocurrencias actualizadas)`
          : "";
        setSuccessMsg(`OK: ${previewEntry.key} -> ${data.newPath}${countMsg}`);
        setCacheBusters((prev) => ({
          ...prev,
          [previewEntry.key]: Date.now(),
        }));
        setPreviewEntry(null);
        setPreviewFile(null);
        setPreviewUrl("");
        setLoading(true);
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

  const cancelPreview = () => {
    setPreviewEntry(null);
    setPreviewFile(null);
    setPreviewUrl("");
  };

  if (loading) return <div className="p-8 text-center text-lg">Cargando fotos...</div>;

  const sectionOrder = Object.keys(sectionLabels).filter((s) => grouped[s]);
  const otherSections = Object.keys(grouped).filter((s) => !sectionLabels[s]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestor de Fotos</h1>
          <p className="mt-1 text-gray-500">{entries.length} imagenes en total</p>
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
            onClick={() => {
              setLoading(true);
              fetchFotos();
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
          >
            Recargar
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar por nombre o ruta..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
        />
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

      {filteredEntries ? (
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Resultados ({filteredEntries.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredEntries.map((entry, i) => (
              <PhotoCard
                key={`${entry.key}-${i}`}
                entry={entry}
                cacheBuster={cacheBusters[entry.key]}
                isUploading={uploading === entry.key}
                onPreview={openPreview}
              />
            ))}
          </div>
        </div>
      ) : (
        [...sectionOrder, ...otherSections].map((section) => (
          <div key={section} className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              {sectionLabels[section] || section}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {grouped[section].map((entry, i) => (
                <PhotoCard
                  key={`${entry.key}-${i}`}
                  entry={entry}
                  cacheBuster={cacheBusters[entry.key]}
                  isUploading={uploading === entry.key}
                  onPreview={openPreview}
                />
              ))}
            </div>
          </div>
        ))
      )}

      {previewEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-1 text-lg font-bold">Cambiar foto</h3>
            <p className="mb-4 text-sm text-gray-500" title={previewEntry.key}>
              {previewEntry.key}
            </p>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-xs font-medium text-gray-400 uppercase">Actual</p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  {actualImgError ? (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No encontrada
                    </div>
                  ) : (
                    <Image
                      src={previewEntry.path}
                      alt="Actual"
                      fill
                      sizes="(max-width: 640px) 45vw, 230px"
                      className="object-cover"
                      onError={() => setActualImgError(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-gray-400 uppercase">Nueva</p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  {previewUrl && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${previewUrl})` }}
                    />
                  )}
                </div>
              </div>
            </div>

            {previewFile && (
              <div className="mb-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                <p><span className="font-medium">Archivo:</span> {previewFile.name}</p>
                <p><span className="font-medium">Tamano:</span> {(previewFile.size / 1024).toFixed(0)} KB</p>
                <p><span className="font-medium">Tipo:</span> {previewFile.type}</p>
                {previewEntry.usedCount > 1 && (
                  <p className="mt-1 text-amber-600 font-medium">
                    Esta imagen se usa en {previewEntry.usedCount} lugares. Todas las ocurrencias se actualizaran.
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={cancelPreview}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={confirmUpload}
                disabled={uploading !== null}
                className="flex-1 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
              >
                {uploading ? "Subiendo..." : "Confirmar cambio"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PhotoCard({
  entry,
  cacheBuster,
  isUploading,
  onPreview,
}: {
  entry: FlatEntry;
  cacheBuster?: number;
  isUploading: boolean;
  onPreview: (entry: FlatEntry) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = cacheBuster ? `${entry.path}?t=${cacheBuster}` : entry.path;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            No encontrada
          </div>
        ) : (
          <Image
            src={imgSrc}
            alt={entry.key}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="p-3">
        <p className="truncate text-xs font-medium text-gray-700" title={entry.key}>
          {entry.key}
        </p>
        <p className="truncate text-xs text-gray-400" title={entry.path}>
          {entry.path.split("/").pop()}
        </p>
        {entry.usedCount > 1 && (
          <p className="mt-0.5 text-xs text-amber-500">
            x{entry.usedCount} usos
          </p>
        )}
        <div className="mt-2 flex gap-1">
          <button
            onClick={() => onPreview(entry)}
            disabled={isUploading}
            className="flex-1 rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {isUploading ? "Subiendo..." : "Cambiar"}
          </button>
          <a
            href={entry.path}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs text-gray-600 transition hover:bg-gray-100"
            title="Ver imagen en nueva pestana"
          >
            Ver
          </a>
        </div>
      </div>
    </div>
  );
}
