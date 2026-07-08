"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Icon from "./Icon";
import { searchAll, type SearchItem } from "@/lib/search";
import { easeOut, springSnappy, staggerContainer, staggerItem } from "@/lib/motion";

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = searchAll(query);

  // Сброс активного элемента при изменении запроса
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Автофокус, блокировка прокрутки и закрытие по Esc
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  const go = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    router.push(item.href);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="grid h-10 w-10 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-white hover:text-ink"
        aria-label="Поиск"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={springSnappy}
      >
        <Icon name="search" className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex justify-center h-screen bg-page/60 px-4 pt-24 backdrop-blur-bg sm:pt-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              className="w-full max-w-xl"
            initial={{ opacity: 0, y: -16, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, scale: 0.97, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: easeOut }}
            >
              {/* Поле ввода */}
              <div className="flex items-center gap-3 rounded-2xl2 border border-line bg-card px-4 py-3.5 shadow-card">
                <Icon name="search" className="h-5 w-5 shrink-0 text-ink-faint" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Поиск по разделам, проектам и новостям…"
                  className="flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
                  aria-label="Поисковый запрос"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-lg border border-line px-2 py-1 text-[11px] font-semibold text-ink-faint transition-colors hover:text-ink"
                >
                  ESC
                </button>
              </div>

              {/* Результаты */}
              {query.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="mt-3 overflow-hidden rounded-2xl2 border border-line bg-card shadow-card"
                >
                  {results.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-4 py-8 text-center text-[13px] text-ink-soft"
                    >
                      Ничего не найдено по «{query.trim()}»
                    </motion.div>
                  ) : (
                    <motion.ul
                      className="max-h-[52vh] overflow-y-auto p-2"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {results.map((r, i) => (
                        <motion.li
                          key={`${r.category}-${r.href}-${r.title}`}
                          variants={staggerItem}
                        >
                          <motion.button
                            type="button"
                            onMouseEnter={() => setActive(i)}
                            onClick={() => go(r)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                              i === active ? "bg-primary-soft" : "hover:bg-page"
                            }`}
                            whileHover={{ x: 4 }}
                            transition={springSnappy}
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                              <Icon name={r.icon} className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[14px] font-semibold text-ink">
                                {r.title}
                              </span>
                              <span className="block truncate text-[12px] text-ink-soft">
                                {r.subtitle}
                              </span>
                            </span>
                            <span className="shrink-0 rounded-full bg-page px-2 py-0.5 text-[10px] font-semibold text-ink-faint">
                              {r.category}
                            </span>
                          </motion.button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </motion.div>
              )}

              {!query.trim() && (
                <div className="mt-3 px-1 text-center text-[12px] text-ink-faint">
                  Начните вводить запрос — например, «карта», «ИИ» или «ЖКХ»
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
