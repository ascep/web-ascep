'use client';

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Landmark, ExternalLink } from "lucide-react";

const DONATARIO_URL = "https://donatario.com/recaudo/8cec07d1-f20c-4e30-adb1-5f4eedd9de2a";

export default function DonationSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("donationForm");
  const locale = useLocale();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-[80] rounded-t-2xl bg-bg-base p-6 pb-8 md:hidden"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-primary">
                {t("eligeDonacion")}
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-[10px] p-2 min-h-[44px] min-w-[44px]"
                aria-label="Cerrar"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-3">
              <Link
                href={`/${locale}/donar?method=mp`}
                onClick={onClose}
                className="flex items-center gap-4 rounded-[10px] border border-brand-blue/20 bg-brand-blue/5 p-4 transition-colors hover:bg-brand-blue/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-blue text-white">
                  <Landmark size={22} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-text-primary">
                    Mercado Pago
                  </div>
                  <div className="text-xs text-text-muted">
                    PSE, Nequi, Daviplata o tarjeta nacional e internacional
                  </div>
                </div>
                <ExternalLink size={18} className="text-text-muted" />
              </Link>

              <a
                href={DONATARIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-4 rounded-[10px] border border-brand-orange/20 bg-brand-orange/5 p-4 transition-colors hover:bg-brand-orange/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-brand-orange text-white">
                  <ExternalLink size={22} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-text-primary">
                    Donatario
                  </div>
                  <div className="text-xs text-text-muted">
                    PSE, Nequi, Efectivo, Consignaci\u00f3n
                  </div>
                </div>
                <ExternalLink size={18} className="text-text-muted" />
              </a>
            </div>

            <p className="mt-6 text-center text-xs text-text-muted">
              {t("donatario")}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
