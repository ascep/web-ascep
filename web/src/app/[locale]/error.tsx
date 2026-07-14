'use client';

import { useEffect } from "react";
import Link from "next/link";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-7xl font-bold text-brand-orange/20">500</div>
      <h1 className="mb-3 text-2xl font-bold text-text-primary">
        Algo salió mal
      </h1>
      <p className="mb-8 max-w-md text-text-secondary">
        Ha ocurrido un error inesperado. Por favor intenta de nuevo o vuelve
        al inicio.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded-[10px] bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="rounded-[10px] border border-border-default px-6 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
