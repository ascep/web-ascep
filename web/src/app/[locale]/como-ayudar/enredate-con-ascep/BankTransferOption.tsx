'use client';

import { useTranslations } from "next-intl";
import { Landmark, Copy, Check } from "lucide-react";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

interface BankInfo {
  bankName: string;
  accountNumber: string;
  accountType: string;
  recipientName?: string;
}

export default function BankTransferOption() {
  const t = useTranslations("bankTransfer");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankInfo: BankInfo = {
    bankName: "Banco Itaú",
    accountNumber: "302-35831-6",
    accountType: "Ahorros",
    recipientName: "ASCEP",
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {t("subtitle")}
        </p>
      </div>

      {/* Bank Transfer Option */}
      <div className="rounded-[12px] border-2 border-brand-purple/20 bg-brand-purple/5 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-text-primary">
            {t("bankTransfer")}
          </h3>
        </div>

        {/* Bank Info Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Bank Name */}
          <div className="flex items-center justify-between rounded-[8px] bg-white p-3">
            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                {t("bankName")}
              </p>
              <p className="mt-1 text-base font-bold text-text-primary">
                {bankInfo.bankName}
              </p>
            </div>
            <button
              onClick={() => handleCopy(bankInfo.bankName, "bank")}
              className="rounded-[6px] bg-brand-purple/10 p-2 transition-all hover:bg-brand-purple/20"
            >
              {copiedField === "bank" ? (
                <Check className="h-4 w-4 text-brand-purple" />
              ) : (
                <Copy className="h-4 w-4 text-brand-purple" />
              )}
            </button>
          </div>

          {/* Account Number */}
          <div className="flex items-center justify-between rounded-[8px] bg-white p-3">
            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                {t("accountNumber")}
              </p>
              <p className="mt-1 text-base font-bold font-mono text-text-primary">
                {bankInfo.accountNumber}
              </p>
            </div>
            <button
              onClick={() => handleCopy(bankInfo.accountNumber, "account")}
              className="rounded-[6px] bg-brand-purple/10 p-2 transition-all hover:bg-brand-purple/20"
            >
              {copiedField === "account" ? (
                <Check className="h-4 w-4 text-brand-purple" />
              ) : (
                <Copy className="h-4 w-4 text-brand-purple" />
              )}
            </button>
          </div>

          {/* Account Type */}
          <div className="flex items-center justify-between rounded-[8px] bg-white p-3">
            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                {t("accountType")}
              </p>
              <p className="mt-1 text-base font-bold text-text-primary">
                {bankInfo.accountType}
              </p>
            </div>
            <button
              onClick={() => handleCopy(bankInfo.accountType, "type")}
              className="rounded-[6px] bg-brand-purple/10 p-2 transition-all hover:bg-brand-purple/20"
            >
              {copiedField === "type" ? (
                <Check className="h-4 w-4 text-brand-purple" />
              ) : (
                <Copy className="h-4 w-4 text-brand-purple" />
              )}
            </button>
          </div>

          {/* Recipient Name */}
          {bankInfo.recipientName && (
            <div className="flex items-center justify-between rounded-[8px] bg-white p-3">
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                  {t("recipientName")}
                </p>
                <p className="mt-1 text-base font-bold text-text-primary">
                  {bankInfo.recipientName}
                </p>
              </div>
              <button
                onClick={() => handleCopy(bankInfo.recipientName || "", "recipient")}
                className="rounded-[6px] bg-brand-purple/10 p-2 transition-all hover:bg-brand-purple/20"
              >
                {copiedField === "recipient" ? (
                  <Check className="h-4 w-4 text-brand-purple" />
                ) : (
                  <Copy className="h-4 w-4 text-brand-purple" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-5 space-y-2 rounded-[8px] bg-white p-4 text-sm text-text-secondary">
          <h4 className="font-semibold text-text-primary">
            {t("transferInstructions")}
          </h4>
          <p>{t("instruction1")}</p>
          <p>{t("instruction2")}</p>
          <p>{t("instruction3")}</p>
        </div>

        {/* Important Note */}
        <div className="mt-4 rounded-[8px] bg-white p-4">
          <p className="text-xs font-semibold text-text-primary">
            {t("importantNote")}
          </p>
        </div>

        {/* Contact */}
        <div className="mt-4">
          <p className="text-xs text-text-secondary">
            {t("questions")}{" "}
            <a
              href="mailto:direccion@ascep.org"
              className="font-semibold text-brand-purple hover:underline"
            >
              direccion@ascep.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
