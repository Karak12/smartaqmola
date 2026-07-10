"use client";

import Icon from "@/shared/Icon";
import { useLang } from "@/lib/i18n-context";
import { useContent } from "@/lib/admin/store";

// Строка новостей под ключевыми показателями. Без бегущей анимации и blur —
// статичный ряд, чтобы ничего не крутилось постоянно и не грузило GPU.
export default function NewsTicker() {
  const { t } = useLang();
  const { news } = useContent();
  return (
    <section className="container-content pt-8">
      <div className="flex items-center gap-3 rounded-2xl2 border border-line bg-white py-3 pl-4 pr-4 shadow-soft">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {t({ ru: "Новости", kk: "Жаңалықтар" })}
        </span>
        <div className="flex flex-1 gap-6 overflow-x-auto scrollbar-none">
          {news.map((n) => (
            <a
              key={n.id}
              href="#"
              className="flex shrink-0 items-center gap-2.5 text-[13px] text-ink-soft transition-colors hover:text-primary"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: n.tone }}
              />
              <span className="font-semibold text-ink">{t(n.title)}</span>
              <span className="text-ink-faint">· {t(n.date)}</span>
              <Icon name="arrow-up-right" className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
