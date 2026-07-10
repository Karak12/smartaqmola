"use client";

// Переиспользуемые примитивы форм для админки.
import { useEffect } from "react";
import Icon from "@/shared/Icon";
import type { LS } from "@/lib/i18n";
import type { IconName } from "@/lib/content";
import { iconNames, colorPalette } from "@/lib/admin/store";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-primary/50";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold text-ink-soft">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-ink-faint">{hint}</p>}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputCls}
    />
  );
}

// Пара полей RU / KK для двуязычного значения LS.
export function LSInput({
  label,
  value,
  onChange,
  textarea,
  placeholder,
}: {
  label: string;
  value: LS;
  onChange: (v: LS) => void;
  textarea?: boolean;
  placeholder?: { ru?: string; kk?: string };
}) {
  const cell = (lang: "ru" | "kk") => {
    const common = {
      value: value[lang],
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => onChange({ ...value, [lang]: e.target.value }),
      placeholder: placeholder?.[lang] ?? (lang === "ru" ? "Русский" : "Қазақша"),
    };
    return (
      <div className="relative">
        <span className="pointer-events-none absolute right-2.5 top-2.5 rounded bg-page px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink-faint">
          {lang}
        </span>
        {textarea ? (
          <textarea rows={3} {...common} className={`${inputCls} resize-y pr-11`} />
        ) : (
          <input type="text" {...common} className={`${inputCls} pr-11`} />
        )}
      </div>
    );
  };
  return (
    <Field label={label}>
      <div className="grid gap-2 sm:grid-cols-2">
        {cell("ru")}
        {cell("kk")}
      </div>
    </Field>
  );
}

export function IconPicker({
  value,
  onChange,
}: {
  value: IconName;
  onChange: (v: IconName) => void;
}) {
  return (
    <Field label="Иконка">
      <div className="grid max-h-44 grid-cols-8 gap-1.5 overflow-y-auto rounded-xl border border-line bg-page/40 p-2 sm:grid-cols-10">
        {iconNames.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            title={name}
            className={`grid aspect-square place-items-center rounded-lg border transition-colors ${
              value === name
                ? "border-primary bg-primary text-white"
                : "border-transparent bg-white text-ink-soft hover:border-primary/40 hover:text-primary"
            }`}
          >
            <Icon name={name} className="h-4 w-4" strokeWidth={1.8} />
          </button>
        ))}
      </div>
    </Field>
  );
}

export function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label="Цвет">
      <div className="flex flex-wrap items-center gap-2">
        {colorPalette.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            title={c}
            className={`h-8 w-8 rounded-lg ring-2 ring-offset-2 transition-all ${
              value.toLowerCase() === c.toLowerCase()
                ? "ring-ink/40"
                : "ring-transparent"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
        <label className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
          />
          <span className="font-mono text-[12px] text-ink-soft">{value}</span>
        </label>
      </div>
    </Field>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-ink/40 px-4 py-8"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl rounded-2xl2 border border-line bg-card shadow-[0_24px_80px_-20px_rgba(24,34,56,0.35)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-[16px] font-extrabold text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-faint transition-colors hover:bg-page hover:text-ink"
            aria-label="Закрыть"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 px-5 py-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-line bg-page/30 px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function Btn({
  children,
  onClick,
  variant = "white",
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "white" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls =
    variant === "primary"
      ? "btn-primary"
      : variant === "danger"
        ? "inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose/10 px-4 py-2.5 text-[13px] font-bold text-rose transition-colors hover:bg-rose/20"
        : "btn-white";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${cls} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}

// Кнопки-действия в строках списков (у набора иконок нет карандаша/корзины —
// поэтому здесь инлайновые SVG).
export function IconBtn({
  kind,
  onClick,
}: {
  kind: "edit" | "delete";
  onClick: () => void;
}) {
  const danger = kind === "delete";
  return (
    <button
      type="button"
      title={danger ? "Удалить" : "Изменить"}
      onClick={onClick}
      className={`grid h-9 w-9 place-items-center rounded-lg border border-line bg-white transition-colors ${
        danger
          ? "text-ink-soft hover:border-rose/40 hover:bg-rose/10 hover:text-rose"
          : "text-ink-soft hover:border-primary/40 hover:text-primary"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        {danger ? (
          <>
            <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
          </>
        ) : (
          <>
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </>
        )}
      </svg>
    </button>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl2 border border-dashed border-line py-14 text-center text-[14px] text-ink-faint">
      {text}
    </div>
  );
}
