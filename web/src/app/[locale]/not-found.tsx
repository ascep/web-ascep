import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { assetPath } from "@/lib/asset-path";

export default async function LocaleNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ley-teal/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-ley-orange/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-ley-purple/10 blur-3xl" />
      </div>

      <div className="relative">
        <Image
          src={assetPath("/logos/10 logo ascep horizontal azul.png")}
          alt="ASCEP"
          width={180}
          height={60}
          className="mx-auto mb-8 h-12 w-auto opacity-40"
        />

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary">
          Error 404
        </p>
        <div className="text-8xl leading-none font-black text-brand-primary/15 sm:text-[9rem]">
          404
        </div>

        <h1 className="mt-4 text-2xl font-bold text-text-primary sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-text-secondary">{t("subtitle")}</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">{t("hint")}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}`}
            className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-dark"
          >
            {t("backHome")}
          </Link>
          <Link
            href={`/${locale}/programas`}
            className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-border-default px-6 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
          >
            {t("seePrograms")}
          </Link>
        </div>
      </div>
    </div>
  );
}
