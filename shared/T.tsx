"use client";

import { useLang } from "@/lib/i18n-context";
import type { LS } from "@/lib/i18n";

// Инлайновый локализованный текст для использования внутри серверных
// компонентов: <T ru="Главная" kk="Басты бет" /> или <T s={data.title} />.
export default function T({
  ru,
  kk,
  s,
}: {
  ru?: string;
  kk?: string;
  s?: LS | string;
}) {
  const { lang, t } = useLang();
  if (s !== undefined) return <>{t(s)}</>;
  return <>{lang === "kk" ? kk ?? ru ?? "" : ru ?? ""}</>;
}
