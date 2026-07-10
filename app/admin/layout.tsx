"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/shared/Icon";
import type { IconName } from "@/lib/content";
import { useContent } from "@/lib/admin/store";

const items: { href: string; label: string; icon: IconName; badge?: "news" | "kpis" | "projects" | "requests" }[] = [
  { href: "/admin", label: "Обзор", icon: "bar-chart" },
  { href: "/admin/news", label: "Новости", icon: "doc", badge: "news" },
  { href: "/admin/kpis", label: "Цифры", icon: "bar-chart", badge: "kpis" },
  { href: "/admin/projects", label: "Проекты", icon: "folder", badge: "projects" },
  { href: "/admin/requests", label: "Заявки", icon: "chat", badge: "requests" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { news, kpis, projects, requests, ready, resetAll } = useContent();
  const counts = { news: news.length, kpis: kpis.length, projects: projects.length, requests: requests.length };
  const newReqs = requests.filter((r) => r.status === "new").length;

  const onReset = () => {
    if (confirm("Сбросить весь контент к исходным данным? Все изменения будут потеряны.")) {
      resetAll();
    }
  };

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
              onClick={onReset}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-rose/10 hover:text-rose"
            >
              <Icon name="refresh" className="h-[18px] w-[18px]" strokeWidth={1.9} />
              Сбросить контент
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
            children
          )}
        </main>
      </div>
    </div>
  );
}
