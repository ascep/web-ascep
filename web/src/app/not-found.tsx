import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

export default function NotFound() {
  return (
    <div className="section-dark bg-atmospheric relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ley-teal/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-ley-orange/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-ley-purple/10 blur-3xl" />
      </div>

      <Image
        src={assetPath("/logos/12 logo ascep blanco sin slogan.png")}
        alt="ASCEP"
        width={180}
        height={60}
        className="relative mb-8 h-14 w-auto"
      />

      <p className="relative mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-yellow">
        Error 404
      </p>
      <div className="relative text-8xl leading-none font-black text-ley-teal sm:text-[9rem]">
        404
      </div>

      <h1 className="relative mt-6 text-2xl font-bold text-white sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="relative mt-3 max-w-md text-text-secondary">
        La página que buscas no existe o fue movida. Puedes volver al inicio o
        explorar nuestros programas.
      </p>

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-dark"
        >
          Volver al inicio
        </Link>
        <Link
          href="/programas"
          className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-border-default px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
        >
          Ver programas
        </Link>
      </div>
    </div>
  );
}
