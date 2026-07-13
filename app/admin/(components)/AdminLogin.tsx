"use client";

import { useState } from "react";
import Icon from "@/shared/Icon";
import { api } from "@/lib/api";
import { Field, TextInput } from "./ui";

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await api.auth.login(username.trim(), password);
      onSuccess();
    } catch {
      setError("Неверный логин или пароль");
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-page px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl2 border border-line bg-white p-6 shadow-card sm:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-deep text-white shadow-btn">
            <Icon name="cube" className="h-6 w-6" />
          </span>
          <div className="leading-tight">
            <div className="text-[16px] font-extrabold text-ink">Smart Aqmola</div>
            <div className="text-[12px] text-ink-faint">Вход в админ-панель</div>
          </div>
        </div>

        <div className="space-y-4">
          <Field label="Логин">
            <TextInput value={username} onChange={setUsername} placeholder="admin" />
          </Field>
          <Field label="Пароль">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-primary/50"
            />
          </Field>

          {error && (
            <div className="rounded-xl bg-rose/10 px-3.5 py-2.5 text-[13px] font-semibold text-rose">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy || !username || !password}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Вход…" : "Войти"}
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  );
}
