"use client";

import { motion } from "motion/react";
import { useLang } from "@/lib/i18n-context";
import { LANGS, langLabels, langNames } from "@/lib/i18n";

// Переключатель языка RU / KZ (сегментированный контрол с анимированной таблеткой).
export default function LangSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`relative inline-flex items-center rounded-lg border border-line bg-white p-0.5 ${className}`}
      role="group"
      aria-label="Язык / Тіл"
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            aria-label={langNames[l]}
            title={langNames[l]}
            className={`relative z-10 rounded-[7px] px-2.5 py-1 text-[12px] font-bold transition-colors ${
              active ? "text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-[7px] bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {langLabels[l]}
          </button>
        );
      })}
    </div>
  );
}
