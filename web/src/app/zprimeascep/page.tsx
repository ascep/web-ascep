"use client";

import { useEffect, useState, useCallback, FormEvent, useRef } from "react";
import Image from "next/image";
import {
  Film,
  Images,
  CloudUpload,
  Search,
  RefreshCw,
  LogOut,
  Pen,
  ExternalLink,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Loader2,
} from "lucide-react";

type FlatEntry = {
  key: string;
  path: string;
  section: string;
  usedCount: number;
};

const PAGE_LABELS: Record<string, string> = {
  home: "Inicio",
  home__heroSlideshow: "Inicio > Hero slideshow",
  home__caminoSection: "Inicio > Camino Section",
  home__trayectoria: "Inicio > Trayectoria",
  home__gallery: "Inicio > Galeria",
  home__aliados: "Inicio > Aliados",
  home__programs: "Inicio > Programas",
  home__heroPoster: "Inicio > Hero",
  home__heroImage: "Inicio > Hero",
  home__aboutImage: "Inicio > About",
  home__retosImage: "Inicio > Retos",
  quienesSomos: "Quienes Somos",
  aliados: "Aliados",
  programas: "Programas",
  programas__cards: "Programas > Cards",
  programas__hero: "Programas > Hero",
  comoLoHacemos: "Como Lo Hacemos",
  impacto: "Impacto",
  impacto__gallery: "Impacto > Galeria",
  header: "Header",
  casasDelSaber: "Casas del Saber",
  casasDelSaber__heroSlideshow: "Casas > Hero slideshow",
  casasDelSaber__galleryPhotos: "Casas > Galeria",
  contacto: "Contacto",
  donar: "Donar",
  donar__gallery: "Donar > Galeria",
  leyEgreso: "Ley de Egreso",
  noticias: "Noticias",
  noticias__diaDelEgresado: "Noticias > Dia del Egresado",
  participa: "Participa",
  transparencia: "Transparencia",
  transparencia__pdfPreviews: "Transparencia > PDF Previews",
  enredate: "Enredate con ASCEP",
  planPadrino: "Plan Padrino",
  voluntariado: "Voluntariado",
  empleo: "Empleo",
};

const SECTION_GROUPS = [
  { label: "Inicio", sections: ["home"] },
  { label: "Quienes Somos", sections: ["quienesSomos"] },
  { label: "Impacto", sections: ["impacto"] },
  { label: "Programas", sections: ["programas"] },
  { label: "Como Lo Hacemos", sections: ["comoLoHacemos"] },
  { label: "Casas del Saber", sections: ["casasDelSaber"] },
  { label: "Donar", sections: ["donar"] },
  { label: "Ley de Egreso", sections: ["leyEgreso"] },
  { label: "Enredate", sections: ["enredate"] },
  { label: "Noticias", sections: ["noticias"] },
  { label: "Transparencia", sections: ["transparencia"] },
  { label: "Otros", sections: ["header", "contacto", "participa", "planPadrino", "voluntariado", "empleo", "aliados"] },
];

function getPageLabel(key: string): string {
  const section = key.split(".")[0];
  const sub = key.split(".")[1]?.split("[")[0];
  if (sub) {
    const composite = `${section}__${sub}`;
    if (PAGE_LABELS[composite]) return PAGE_LABELS[composite];
  }
  return PAGE_LABELS[section] || section;
}

type Toast = { id: number; message: string; type: "success" | "error" | "info" };

export default function FotosDashboard() {
  const [hydrated, setHydrated] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem("zprime_auth") === "1");
    setHydrated(true);
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

  if (!hydrated) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 size={28} className="animate-spin text-teal-500" />
          <span className="text-sm">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-slate-950">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/logos/03%20logo%20ascep%20principal%20horizontal.png"
              alt="ASCEP"
              width={160}
              height={45}
              className="h-10 w-auto"
            />
            <h1 className="text-lg font-bold text-white">Acceso restringido</h1>
          </div>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            placeholder="Contrasena"
            autoFocus
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-teal-500 focus:outline-none"
          />
          {pwError && <p className="text-xs text-red-400">{pwError}</p>}
          <button
            type="submit"
            disabled={pwLoading}
            className="w-full rounded-lg bg-teal-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500 disabled:opacity-50"
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
  const [tab, setTab] = useState<"fotos" | "videos">("fotos");
  const [entries, setEntries] = useState<FlatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);
  const [previewEntry, setPreviewEntry] = useState<FlatEntry | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [actualImgError, setActualImgError] = useState(false);
  const [cacheBusters, setCacheBusters] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const getPw = () => sessionStorage.getItem("zprime_pw") || "";

  const addToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

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

  const filteredEntries = filter || activeSection
    ? entries.filter((e) => {
        const matchesFilter = !filter ||
          e.key.toLowerCase().includes(filter.toLowerCase()) ||
          e.path.toLowerCase().includes(filter.toLowerCase());
        const matchesSection = !activeSection ||
          e.section === activeSection ||
          getPageLabel(e.key).startsWith(activeSection);
        return matchesFilter && matchesSection;
      })
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
        addToast(`${previewEntry.key} actualizada${countMsg}`, "success");
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
        addToast(data.error || "Error al actualizar", "error");
      }
    } catch {
      addToast("Error de red", "error");
    } finally {
      setUploading(null);
    }
  };

  const cancelPreview = () => {
    setPreviewEntry(null);
    setPreviewFile(null);
    setPreviewUrl("");
  };

  const sectionGroups = SECTION_GROUPS.map((g) => ({
    ...g,
    count: g.sections.reduce((sum, s) => sum + (grouped[s]?.length || 0), 0),
  }));

  if (loading) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 size={28} className="animate-spin text-teal-500" />
          <span className="text-sm">Cargando fotos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dark flex h-screen flex-col bg-slate-950 font-sans text-slate-100 overflow-hidden">
      {/* TOPBAR */}
      <header className="h-16 shrink-0 border-b border-slate-800 bg-slate-900/90 px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            {sidebarOpen ? <X size={20} /> : <ChevronRight size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <a href="/" className="shrink-0 hover:opacity-80 transition" title="Ir al sitio web">
              <Image
                src="/logos/03%20logo%20ascep%20principal%20horizontal.png"
                alt="ASCEP"
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </a>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-white">
                Gestor de Assets
              </h1>
              <p className="text-[11px] text-slate-400">
                {entries.length} imagenes en total
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setLoading(true); fetchFotos(); addToast("Recargando...", "info"); }}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">Recargar</span>
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("zprime_auth");
              sessionStorage.removeItem("zprime_pw");
              window.location.reload();
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col justify-between shrink-0 transition-transform duration-200`}
          style={{ top: "64px" }}
        >
          <div className="p-4 space-y-6 overflow-y-auto flex-1">
            <div>
              <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Secciones
              </span>
              <nav className="mt-3 space-y-1">
                <button
                  onClick={() => { setActiveSection(null); setTab("fotos"); setSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                    !activeSection && tab === "fotos"
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/30"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Images size={14} />
                    <span>Todas las fotos</span>
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    !activeSection && tab === "fotos" ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                  }`}>
                    {entries.length}
                  </span>
                </button>
                {sectionGroups.map((g) => (
                  <button
                    key={g.label}
                    onClick={() => { setActiveSection(g.sections[0]); setTab("fotos"); setSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                      activeSection === g.sections[0] && tab === "fotos"
                        ? "bg-teal-600 text-white shadow-md shadow-teal-600/30"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <FolderOpen size={14} />
                      <span>{g.label}</span>
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      activeSection === g.sections[0] && tab === "fotos"
                        ? "bg-white/20 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {g.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Herramientas
              </span>
              <nav className="mt-3 space-y-1">
                <button
                  onClick={() => { setTab("videos"); setActiveSection(null); setSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                    tab === "videos"
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/30"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Film size={14} />
                    <span>Videos</span>
                  </span>
                </button>
              </nav>
            </div>
          </div>

          {/* Footer info */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">Total fotos</span>
              <span className="text-slate-200 font-semibold">{entries.length}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((entries.length / 200) * 100, 100)}%` }}
              />
            </div>
          </div>
        </aside>

        {/* OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* SECTION HEADER */}
          <div className="p-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 bg-slate-900/30">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {activeSection
                    ? SECTION_GROUPS.find((g) => g.sections[0] === activeSection)?.label || activeSection
                    : "Todas las fotos"}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  {(filteredEntries || entries).length} imagenes
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {activeSection
                  ? `Fotos de la seccion ${SECTION_GROUPS.find((g) => g.sections[0] === activeSection)?.label || activeSection}`
                  : "Todas las imagenes del sitio web"}
              </p>
            </div>
          </div>

          {/* SEARCH + FILTERS */}
          <div className="p-4 border-b border-slate-800/60 flex flex-wrap items-center gap-3 bg-slate-900/20">
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Buscar por nombre o ruta..."
                className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-teal-500 focus:outline-none"
              />
            </div>
            {activeSection && (
              <button
                onClick={() => setActiveSection(null)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 transition"
              >
                <X size={12} />
                Limpiar filtro
              </button>
            )}
          </div>

          {/* CARDS GRID */}
          <div className="flex-1 overflow-y-auto p-6">
            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            {(filteredEntries || entries).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <Images size={40} className="mb-3 text-slate-600" />
                <p className="text-sm">No se encontraron fotos</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {(filteredEntries || entries).map((entry, i) => (
                  <PhotoCard
                    key={`${entry.key}-${i}`}
                    entry={entry}
                    cacheBuster={cacheBusters[entry.key]}
                    isUploading={uploading === entry.key}
                    onPreview={openPreview}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* EDIT MODAL */}
      {previewEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Pen size={16} className="text-teal-400" />
                Cambiar foto
              </h3>
              <button onClick={cancelPreview} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Key + page label */}
              <div>
                <p className="text-sm font-medium text-white" title={previewEntry.key}>
                  {previewEntry.key}
                </p>
                <p className="text-xs text-teal-400 mt-0.5">
                  Se usa en: {getPageLabel(previewEntry.key)}
                </p>
              </div>

              {/* Side-by-side preview */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Actual</p>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                    {actualImgError ? (
                      <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
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
                  <p className="mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Nueva</p>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                    {previewUrl && (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${previewUrl})` }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* File info */}
              {previewFile && (
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-400 space-y-1">
                  <p><span className="text-slate-300 font-medium">Archivo:</span> {previewFile.name}</p>
                  <p><span className="text-slate-300 font-medium">Tamano:</span> {(previewFile.size / 1024).toFixed(0)} KB</p>
                  <p><span className="text-slate-300 font-medium">Tipo:</span> {previewFile.type}</p>
                  {previewEntry.usedCount > 1 && (
                    <p className="mt-2 text-amber-400 font-medium flex items-center gap-1.5">
                      <AlertTriangle size={13} />
                      Esta imagen se usa en {previewEntry.usedCount} lugares. Todas se actualizaran.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
              <button
                onClick={cancelPreview}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmUpload}
                disabled={uploading !== null}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold shadow transition disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  "Confirmar cambio"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST CONTAINER */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto rounded-xl border border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-xl px-4 py-3 text-xs flex items-center gap-3 text-slate-200 animate-toast-in"
          >
            {t.type === "success" && <CheckCircle size={16} className="text-emerald-400 shrink-0" />}
            {t.type === "error" && <AlertTriangle size={16} className="text-red-400 shrink-0" />}
            {t.type === "info" && <Info size={16} className="text-teal-400 shrink-0" />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* VIDEOS TAB (rendered in main content area when active) */}
      {tab === "videos" && (
        <div className="fixed inset-0 z-40 flex flex-col bg-slate-950" style={{ top: "64px" }}>
          <div className="p-4 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/30">
            <h2 className="text-lg font-bold text-white">Videos</h2>
            <button
              onClick={() => setTab("fotos")}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 transition"
            >
              <Images size={14} />
              Volver a Fotos
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <VideosTab addToast={addToast} />
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
  const pageLabel = getPageLabel(entry.key);

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col border border-slate-800/80 hover:border-slate-700 transition group shadow-lg">
      {/* Image preview */}
      <div className="relative h-44 bg-slate-950 overflow-hidden flex items-center justify-center">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
            No encontrada
          </div>
        ) : (
          <Image
            src={imgSrc}
            alt={entry.key}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        {/* Tag overlay */}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-2.5 py-1 rounded-md text-[10px] font-semibold text-teal-300">
          {pageLabel.split(" > ").pop() || pageLabel}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
          <button
            onClick={() => onPreview(entry)}
            disabled={isUploading}
            className="bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow transition disabled:opacity-50 flex items-center gap-1.5"
          >
            <Pen size={12} />
            {isUploading ? "Subiendo..." : "Editar / Cambiar"}
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between">
            <h4 className="font-bold text-sm text-white truncate pr-2" title={entry.key}>
              {entry.key}
            </h4>
            {!imgError ? (
              <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1" title={entry.path}>
            <span className="text-slate-300">Archivo:</span> {entry.path.split("/").pop()}
          </p>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1" title={pageLabel}>
            <span className="text-slate-400">Se usa en:</span> {pageLabel}
          </p>
          {entry.usedCount > 1 && (
            <p className="mt-1 text-xs text-amber-400 font-medium">
              x{entry.usedCount} usos
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <button
            onClick={() => onPreview(entry)}
            disabled={isUploading}
            className="text-teal-400 hover:text-teal-300 font-medium hover:underline transition disabled:opacity-50"
          >
            {isUploading ? "Subiendo..." : "Reemplazar rapida"}
          </button>
          <a
            href={entry.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition"
            title="Ver imagen en nueva pestana"
          >
            <ExternalLink size={12} />
            Ver
          </a>
        </div>
      </div>
    </div>
  );
}

function VideosTab({ addToast }: { addToast: (msg: string, type: "success" | "error" | "info") => void }) {
  const [ytId, setYtId] = useState("");
  const [ytData, setYtData] = useState<{ title: string; thumbnail: string } | null>(null);
  const [ytLoading, setYtLoading] = useState(false);
  const [ytError, setYtError] = useState("");

  const VIDEOS = [
    { label: "Hero Home", id: "", type: "mp4" as const, src: "/videos/FONDO-WEB-16-9.mp4" },
    { label: "Transformando", id: "", type: "youtube" as const },
    { label: "Premio Civico", id: "SvwlWUQO3yM", type: "youtube" as const },
    { label: "Testimonio Leonardo (Reel)", id: "wD7Tx9iJqDE", type: "youtube" as const },
    { label: "Testimonio Leonardo (Doc)", id: "wGcr261Q7wo", type: "youtube" as const },
    { label: "Testimonio Leyder", id: "cfYjqJZtf5Y", type: "youtube" as const },
    { label: "Testimonio Yaritza", id: "eGrF8K_juYg", type: "youtube" as const },
    { label: "Avanza Joven Hero", id: "4K3QHcW8jww", type: "youtube" as const },
    { label: "Casas del Saber Testimonio", id: "aHlzgnP6jSs", type: "youtube" as const },
    { label: "Enredate Mini-Doc 1", id: "ysvZ56TLL2w", type: "youtube" as const },
    { label: "Enredate Mini-Doc 2", id: "cfYjqJZtf5Y", type: "youtube" as const },
    { label: "Enredate Mini-Doc 3", id: "eGrF8K_juYg", type: "youtube" as const },
  ];

  const lookupYt = async () => {
    if (!ytId.trim()) return;
    setYtLoading(true);
    setYtError("");
    setYtData(null);
    try {
      const res = await fetch(`/api/youtube/videos?ids=${ytId.trim()}`);
      const data = await res.json();
      if (data.items?.[0]) {
        setYtData({
          title: data.items[0].snippet?.title || "",
          thumbnail: data.items[0].snippet?.thumbnails?.medium?.url || "",
        });
      } else {
        setYtError("Video no encontrado");
      }
    } catch {
      setYtError("Error de red");
    } finally {
      setYtLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-400">
        Los videos se gestionan en{" "}
        <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-slate-300 border border-slate-700">
          src/data/homeVideos.ts
        </code>
        . Este panel es solo de referencia.
      </p>

      {/* YouTube Lookup */}
      <div className="glass-card rounded-2xl border border-slate-800 p-5">
        <p className="mb-3 text-sm font-semibold text-white flex items-center gap-2">
          <Film size={16} className="text-red-400" />
          Buscar video de YouTube
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={ytId}
            onChange={(e) => setYtId(e.target.value)}
            placeholder="YouTube ID o URL"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-teal-500 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && lookupYt()}
          />
          <button
            onClick={lookupYt}
            disabled={ytLoading}
            className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500 disabled:opacity-50"
          >
            {ytLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>
        {ytError && <p className="mt-2 text-xs text-red-400">{ytError}</p>}
        {ytData && (
          <div className="mt-4 flex gap-4">
            {ytData.thumbnail && (
              <img src={ytData.thumbnail} alt="" className="h-24 w-40 rounded-xl object-cover border border-slate-700" />
            )}
            <div>
              <p className="text-sm font-semibold text-white">{ytData.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{ytId}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ytId);
                  addToast("ID copiado al portapapeles", "success");
                }}
                className="mt-2 text-xs text-teal-400 hover:text-teal-300 font-medium"
              >
                Copiar ID
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video list */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <div key={i} className="glass-card flex items-center gap-3 rounded-xl border border-slate-800 p-3">
            {v.type === "mp4" ? (
              <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-400 border border-slate-700">
                MP4
              </div>
            ) : v.id ? (
              <img
                src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                alt={v.label}
                className="h-16 w-28 shrink-0 rounded-lg object-cover border border-slate-700"
              />
            ) : (
              <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-400 border border-slate-700">
                Sin video
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{v.label}</p>
              <p className="truncate text-xs text-slate-400">{v.id || v.src || "placeholder"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
