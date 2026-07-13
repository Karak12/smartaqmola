"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/shared/Icon";
import type { IconName } from "@/lib/content";
import { useContent } from "@/lib/admin/store";
import { api, getAuthToken } from "@/lib/api";
import AdminLogin from "./(components)/AdminLogin";

const items: { href: string; label: string; icon: IconName; badge?: "news" | "kpis" | "projects" | "requests" | "procurement" }[] = [
  { href: "/admin", label: "Обзор", icon: "bar-chart" },
  { href: "/admin/news", label: "Новости", icon: "doc", badge: "news" },
  { href: "/admin/kpis", label: "Цифры", icon: "bar-chart", badge: "kpis" },
  { href: "/admin/projects", label: "Проекты", icon: "folder", badge: "projects" },
  { href: "/admin/procurement", label: "Закупки", icon: "bank", badge: "procurement" },
  { href: "/admin/requests", label: "Заявки", icon: "chat", badge: "requests" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { news, kpis, projects, requests, procurement, ready, online, refresh } = useContent();
  const counts = {
    news: news.length,
    kpis: kpis.length,
    projects: projects.length,
    requests: requests.length,
    procurement: procurement.length,
  };
  const newReqs = requests.filter((r) => r.status === "new").length;

  // Гейт авторизации: null = проверяем, false = логин, true = внутрь.
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    setAuthed(!!getAuthToken());
  }, []);

  const onRefresh = () => {
    void refresh();
  };

  const onLogout = () => {
    api.auth.logout();
    setAuthed(false);
    void refresh(); // сбросить заявки (станут недоступны без токена)
  };

  if (authed === null) return <div className="min-h-screen bg-page" />;
  if (!authed) {
    return (
      <AdminLogin
        onSuccess={() => {
          setAuthed(true);
          void refresh(); // подгрузить заявки уже с токеном
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto flex max-w-content gap-6 px-4 py-6 lg:px-6">
        {/* Sidebar */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-60 shrink-0 flex-col rounded-2xl2 border border-line bg-white p-4 lg:flex">
          <Link href="/admin" className="mb-6 flex items-center gap-2.5 px-1">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-deep text-white shadow-btn">
              <Icon name="cube" className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="text-[14px] font-extrabold text-ink">Smart Aqmola</div>
            </div>
          </Link>

          <nav className="flex flex-col gap-1">
            {items.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const count = item.badge ? counts[item.badge] : undefined;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors ${
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-ink-soft hover:bg-page hover:text-ink"
                  }`}
                >
                  <Icon name={item.icon} className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge === "requests" && newReqs > 0 ? (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose px-1.5 text-[10px] font-bold text-white">
                      {newReqs}
                    </span>
                  ) : count !== undefined ? (
                    <span className="text-[11px] font-bold text-ink-faint">{count}</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-1 border-t border-line pt-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-page hover:text-ink"
            >
              <Icon name="arrow-up-right" className="h-[18px] w-[18px]" strokeWidth={1.9} />
              Открыть сайт
            </Link>
            <button
              type="button"
              onClick={onRefresh}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-page hover:text-ink"
            >
              <Icon name="refresh" className="h-[18px] w-[18px]" strokeWidth={1.9} />
              Обновить из БД
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-rose/10 hover:text-rose"
            >
              <Icon name="arrow-up-right" className="h-[18px] w-[18px] rotate-180" strokeWidth={1.9} />
              Выйти
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          {/* Mobile top nav */}
          <div className="mb-4 flex items-center gap-2 overflow-x-auto rounded-2xl2 border border-line bg-white p-2 lg:hidden">
            {items.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-semibold ${
                    active ? "bg-primary-soft text-primary" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {!ready ? (
            <div className="py-20 text-center text-[14px] text-ink-faint">Загрузка…</div>
          ) : (
            <>
              {!online && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-orange/30 bg-orange/10 px-4 py-3 text-[13px] font-semibold text-orange">
                  <Icon name="info" className="h-4 w-4 shrink-0" />
                  Бэкенд недоступен — показаны демо-данные, изменения не сохранятся.
                  Запустите API: <code className="font-mono">cd backend && npm run start:dev</code>
                </div>
              )}
              {children}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
