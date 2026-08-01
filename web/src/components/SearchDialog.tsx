"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Fuse from "fuse.js";

interface SearchItem {
  title: string;
  description: string;
  href: string;
}

const pages: SearchItem[] = [
  { title: "Inicio", description: "Pagina principal de ASCEP", href: "/" },
  { title: "Quienes Somos", description: "Conoce nuestra historia y mision", href: "/quienes-somos" },
  { title: "Como lo Hacemos", description: "Nuestra metodologia de trabajo", href: "/como-lo-hacemos" },
  { title: "Impacto", description: "Resultados y estadisticas", href: "/impacto" },
  { title: "Programas", description: "Descripcion general de programas", href: "/programas" },
  { title: "Programa Avanza Joven", description: "Formacion y desarrollo juvenil", href: "/programas/avanza-joven" },
  { title: "Programa Empleo", description: "Oportunidades laborales", href: "/programas/empleo" },
  { title: "Programa Incidencia", description: "Accion politica y transformacion", href: "/programas/incidencia" },
  { title: "Programa Mi Cuerpo", description: "Salud y bienestar", href: "/programas/mi-cuerpo" },
  { title: "Marco Politico", description: "Nuestra posicion politica", href: "/marco-politico" },
  { title: "Casas del Saber", description: "Nuestros espacios de encuentro", href: "/casas-del-saber" },
  { title: "Areas de Formacion", description: "Areas de las Casas del Saber", href: "/casas-del-saber/areas" },
  { title: "Lineas de Accion", description: "Lineas de las Casas del Saber", href: "/casas-del-saber/lineas" },
  { title: "Modalidades", description: "Modalidades de las Casas del Saber", href: "/casas-del-saber/modalidades" },
  { title: "Ruta de Egreso", description: "Camino hacia la autonomia", href: "/casas-del-saber/ruta-egreso" },
  { title: "Noticias", description: "Ultimas novedades de ASCEP", href: "/noticias" },
  { title: "Como Ayudar", description: "Formas de apoyar nuestra causa", href: "/como-ayudar" },
  { title: "Donacion Monetaria", description: "Aporta economicamente", href: "/donar" },
  { title: "Plan Padrino", description: "Apadrina a un joven", href: "/como-ayudar/plan-padrino" },
  { title: "Voluntariado", description: "Dona tu tiempo y talento", href: "/como-ayudar/voluntariado" },
  { title: "Enredate con ASCEP", description: "Conectate con nuestra comunidad", href: "/como-ayudar/enredate-con-ascep" },
  { title: "Participa", description: "Involucrate con ASCEP", href: "/participa" },
  { title: "Contacto", description: "Ponte en contacto con nosotros", href: "/contacto" },
  { title: "Transparencia", description: "Informacion financiera y rendicion de cuentas", href: "/transparencia" },
  { title: "Ley de Egreso", description: "Conoce la Ley 2479 de 2025", href: "/ley-de-egreso" },
  { title: "Donar", description: "Realiza tu donacion", href: "/donar" },
  { title: "Aliados", description: "Nuestros aliados estrategicos", href: "/aliados" },
];

const fuse = new Fuse(pages, {
  keys: [
    { name: "title", weight: 2 },
    { name: "description", weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
});

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const locale = pathname.split("/")[1] || "es";
  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : pages.slice(0, 5);

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [open]);

  const navigate = useCallback((href: string) => {
    router.push(`/${locale}${href}`);
    onClose();
  }, [router, locale, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigate(results[selectedIndex].href);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl rounded-[10px] border border-border-subtle bg-bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
          <Search size={18} className="text-[var(--color-text-tertiary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar paginas..."
            className="w-full bg-transparent text-base text-text-primary outline-none placeholder:text-[var(--color-text-tertiary)]"
          />
          <kbd className="hidden shrink-0 rounded-[6px] border border-border-subtle bg-bg-elevated px-2 py-0.5 text-[11px] text-[var(--color-text-tertiary)] sm:inline-block">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">
              No se encontraron resultados
            </p>
          ) : (
            results.map((item, index) => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex w-full items-start gap-3 rounded-[8px] px-3 py-2.5 text-left transition-colors ${
                  index === selectedIndex ? "bg-brand-teal/10" : "hover:bg-bg-elevated"
                }`}
              >
                <ArrowUpDown size={16} className="mt-0.5 shrink-0 text-[var(--color-text-tertiary)]" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
