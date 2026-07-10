"use client";

import Link from "next/link";
import Icon from "@/shared/Icon";
import type { IconName } from "@/lib/content";
import {
  useContent,
  requestStatusColors,
  requestStatusLabels,
} from "@/lib/admin/store";

const cards: { href: string; label: string; icon: IconName; key: "news" | "kpis" | "projects" | "requests" }[] = [
  { href: "/admin/news", label: "Новости", icon: "doc", key: "news" },
  { href: "/admin/kpis", label: "Цифры", icon: "bar-chart", key: "kpis" },
  { href: "/admin/projects", label: "Проекты", icon: "folder", key: "projects" },
  { href: "/admin/requests", label: "Заявки", icon: "chat", key: "requests" },
];

export default function AdminDashboard() {
  const { news, kpis, projects, requests } = useContent();
  const counts = { news: news.length, kpis: kpis.length, projects: projects.length, requests: requests.length };
  const recent = requests.slice(0, 5);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">Обзор</h1>
        <p className="mt-1 text-[14px] text-ink-soft">
          Управление контентом сайта. Изменения сразу применяются на публичной части.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="card group p-5 transition-shadow hover:shadow-card"
          >
            <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon name={c.icon} className="h-5 w-5" strokeWidth={1.9} />
            </span>
            <div className="text-3xl font-extrabold tracking-tight text-ink">
              {counts[c.key]}
            </div>
            <div className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-ink-soft">
              {c.label}
              <Icon
                name="arrow-right"
                className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                strokeWidth={2}
              />
            </div>
          </Link>
        ))}
      </div>

      <section className="card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-extrabold text-ink">Последние заявки</h2>
          <Link href="/admin/requests" className="text-[13px] font-semibold text-primary">
            Все заявки →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-ink-faint">Заявок пока нет</p>
        ) : (
          <ul className="divide-y divide-line">
            {recent.map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-3">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: requestStatusColors[r.status] }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-ink">
                    {r.message}
                  </div>
                  <div className="text-[11px] text-ink-faint">
                    {r.id} · {r.address || "без адреса"}
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold"
                  style={{
                    color: requestStatusColors[r.status],
                    backgroundColor: `${requestStatusColors[r.status]}1A`,
                  }}
                >
                  {requestStatusLabels[r.status].ru}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
