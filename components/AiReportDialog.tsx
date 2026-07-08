"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Icon from "./Icon";
import {
  aiCategories,
  aiHints,
  aiQuickPrompts,
  type AiCategory,
} from "@/lib/ai-report";
import { easeOut, springSnappy, staggerContainer, staggerItem } from "@/lib/motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AiReportDialog({ open, onClose }: Props) {
  const [category, setCategory] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [ticketId, setTicketId] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const reset = () => {
    setCategory(null);
    setMessage("");
    setAddress("");
    setStatus("idle");
    setTicketId("");
  };

  useEffect(() => {
    if (!open) {
      reset();
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => textareaRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "sending") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose, status]);

  const submit = async () => {
    if (!message.trim() || status === "sending") return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setTicketId(`SA-${Math.floor(100000 + Math.random() * 900000)}`);
    setStatus("done");
  };

  const canSubmit = message.trim().length >= 10 && status === "idle";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] h-screen flex items-start justify-center bg-ink/40 px-4 pt-16 backdrop-blur-sm sm:items-center sm:pt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && status !== "sending") onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-report-title"
            className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl2 border border-line bg-card shadow-[0_24px_80px_-20px_rgba(24,34,56,0.35)]"
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: easeOut }}
          >
            {/* Header */}
            <div className="relative overflow-hidden border-b border-line px-5 py-4 sm:px-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-deep text-white shadow-btn">
                    <Icon name="robot" className="h-6 w-6" />
                  </span>
                  <div>
                    <h2
                      id="ai-report-title"
                      className="text-[17px] font-extrabold tracking-tight text-ink"
                    >
                      Сообщить AI
                    </h2>
                    <p className="mt-0.5 text-[13px] text-ink-soft">
                      ИИ-помощник классифицирует обращение и направит в нужное ведомство
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={status === "sending"}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-faint transition-colors hover:bg-page hover:text-ink disabled:opacity-40"
                  aria-label="Закрыть"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {status === "done" ? (
                <SuccessView key="done" ticketId={ticketId} onClose={onClose} />
              ) : (
                <motion.div
                  key="form"
                  className="flex flex-1 flex-col overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-5 px-5 py-5 sm:px-6">
                    {/* Categories */}
                    <div>
                      <label className="section-label mb-2.5 block">
                        Категория
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {aiCategories.map((c) => (
                          <CategoryChip
                            key={c.id}
                            cat={c}
                            active={category === c.id}
                            onClick={() =>
                              setCategory((prev) => (prev === c.id ? null : c.id))
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="ai-message" className="section-label mb-2.5 block">
                        Описание проблемы
                      </label>
                      <textarea
                        id="ai-message"
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                        placeholder="Опишите проблему — ИИ определит категорию и приоритет…"
                        rows={4}
                        maxLength={500}
                        disabled={status === "sending"}
                        className="w-full resize-none rounded-xl border border-line bg-page/50 px-4 py-3 text-[14px] leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-primary/40 focus:bg-white disabled:opacity-60"
                      />
                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-ink-faint">
                        <span>Минимум 10 символов</span>
                        <span>{message.length} / 500</span>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="ai-address" className="section-label mb-2.5 block">
                        Адрес или ориентир
                      </label>
                      <div className="relative">
                        <Icon
                          name="map"
                          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
                        />
                        <input
                          id="ai-address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="г. Кокшетау, ул. …"
                          disabled={status === "sending"}
                          className="w-full rounded-xl border border-line bg-page/50 py-2.5 pl-10 pr-4 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-primary/40 focus:bg-white disabled:opacity-60"
                        />
                      </div>
                    </div>

                    {/* Quick prompts */}
                    <div>
                      <p className="section-label mb-2.5">Быстрые шаблоны</p>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {aiQuickPrompts.map((p) => (
                          <motion.button
                            key={p}
                            type="button"
                            variants={staggerItem}
                            onClick={() => setMessage(p)}
                            disabled={status === "sending"}
                            className="rounded-full border border-line bg-white px-3 py-1.5 text-left text-[12px] font-medium text-ink-soft transition-colors hover:border-primary/30 hover:bg-primary-soft/40 hover:text-primary disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springSnappy}
                          >
                            {p}
                          </motion.button>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto border-t border-line bg-page/30 px-5 py-4 sm:px-6">
                    <ul className="mb-4 space-y-1.5">
                      {aiHints.map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-[12px] text-ink-faint"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        disabled={status === "sending"}
                        className="btn-white flex-1 disabled:opacity-50"
                      >
                        Отмена
                      </button>
                      <motion.button
                        type="button"
                        onClick={submit}
                        disabled={!canSubmit}
                        className="btn-primary flex-[1.4] disabled:cursor-not-allowed disabled:opacity-50"
                        whileHover={canSubmit ? { scale: 1.02, y: -1 } : {}}
                        whileTap={canSubmit ? { scale: 0.98 } : {}}
                        transition={springSnappy}
                      >
                        {status === "sending" ? (
                          <>
                            <motion.span
                              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            />
                            Отправка…
                          </>
                        ) : (
                          <>
                            Отправить
                            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CategoryChip({
  cat,
  active,
  onClick,
}: {
  cat: AiCategory;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
        active
          ? "border-transparent text-white shadow-btn"
          : "border-line bg-white text-ink-soft hover:border-primary/30 hover:text-ink"
      }`}
      style={active ? { backgroundColor: cat.color } : undefined}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={springSnappy}
    >
      <Icon name={cat.icon} className="h-3.5 w-3.5" strokeWidth={2} />
      {cat.label}
    </motion.button>
  );
}

function SuccessView({
  ticketId,
  onClose,
}: {
  ticketId: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center px-6 py-10 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      <motion.span
        className="grid h-16 w-16 place-items-center rounded-2xl bg-green/10 text-green"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
      >
        <Icon name="check-circle" className="h-8 w-8" />
      </motion.span>
      <h3 className="mt-5 text-xl font-extrabold text-ink">Обращение принято</h3>
      <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-ink-soft">
        ИИ обрабатывает ваше сообщение. Номер заявки и статус придут в течение нескольких минут.
      </p>
      <div className="mt-6 w-full rounded-xl border border-line bg-page/50 px-4 py-3">
        <div className="font-mono text-[11px] tracking-wide text-ink-faint">
          НОМЕР ОБРАЩЕНИЯ
        </div>
        <div className="mt-1 text-2xl font-extrabold tracking-tight text-primary">
          {ticketId}
        </div>
      </div>
      <button type="button" onClick={onClose} className="btn-primary mt-6 w-full">
        Готово
      </button>
    </motion.div>
  );
}
