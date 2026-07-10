// Ядро локализации: типы и чистый резолвер (без React, безопасно на сервере).

export type Lang = "ru" | "kk";

export const LANGS: Lang[] = ["ru", "kk"];
export const DEFAULT_LANG: Lang = "ru";

// Локализованная строка: пара «русский / казахский».
export type LS = { ru: string; kk: string };

// Возвращает строку для выбранного языка. Принимает и обычную строку
// (одинаковую для всех языков — например, число «28»), и пару LS.
export function tr(value: LS | string | undefined | null, lang: Lang): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.ru;
}

export const langLabels: Record<Lang, string> = {
  ru: "RU",
  kk: "KZ",
};

export const langNames: Record<Lang, string> = {
  ru: "Русский",
  kk: "Қазақша",
};
