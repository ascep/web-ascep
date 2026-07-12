import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

export default function LocaleNotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <Image
        src={assetPath("/logos/10 logo ascep horizontal azul.png")}
        alt="ASCEP"
        width={180}
        height={60}
        className="mb-8 h-14 w-auto opacity-50"
      />
      <div className="mb-4 text-7xl font-bold text-brand-blue/20">404</div>
      <h1 className="mb-3 text-2xl font-bold text-text-primary">
        Página no encontrada
      </h1>
      <p className="mb-8 max-w-md text-text-secondary">
        La página que buscas no existe o ha sido movida. Puedes volver al inicio
        o explorar nuestros programas.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-[10px] bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Ir al inicio
        </Link>
        <Link
          href="/programas"
          className="rounded-[10px] border border-border-default px-6 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
        >
          Ver programas
        </Link>
      </div>
    </div>
  );
}
