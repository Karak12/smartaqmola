"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_LANG, tr, type Lang, type LS } from "./i18n";

const STORAGE_KEY = "sa-lang";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Резолвер: t(строка | {ru,kk}) → строка текущего языка. */
  t: (v: LS | string | undefined | null) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Восстанавливаем выбор языка из localStorage после монтирования.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "ru" || saved === "kk") setLangState(saved);
    } catch {
      /* localStorage недоступен — остаёмся на языке по умолчанию */
    }
  }, []);

  // Синхронизируем атрибут <html lang> с текущим языком.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* игнорируем ошибки записи */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "ru" ? "kk" : "ru");
  }, [lang, setLang]);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, toggle, t: (v) => tr(v, lang) }),
    [lang, setLang, toggle]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    // Фолбэк на случай использования вне провайдера (напр. в изоляции).
    return {
      lang: DEFAULT_LANG,
      setLang: () => {},
      toggle: () => {},
      t: (v) => tr(v, DEFAULT_LANG),
    };
  }
  return ctx;
}
