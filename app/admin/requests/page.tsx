"use client";

import { useMemo, useState } from "react";
import Icon from "@/shared/Icon";
import { aiCategories } from "@/lib/ai-report";
import {
  useContent,
  requestStatusColors,
  requestStatusLabels,
  type RequestStatus,
} from "@/lib/admin/store";
import { EmptyState, IconBtn } from "../(components)/ui";

const STATUSES: RequestStatus[] = ["new", "in_progress", "done", "rejected"];

function catInfo(id: string) {
  return aiCategories.find((c) => c.id === id);
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function RequestsAdmin() {
  const { requests, updateRequest, deleteRequest } = useContent();
  const [filter, setFilter] = useState<RequestStatus | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: requests.length };
    for (const s of STATUSES) c[s] = requests.filter((r) => r.status === s).length;
    return c;
  }, [requests]);

  const list = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">Заявки</h1>
        <p className="mt-1 text-[14px] text-ink-soft">
          Обращения жителей из формы «Сообщить AI». Меняйте статус по мере обработки.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              filter === s
                ? "border-primary bg-primary-soft text-primary"
                : "border-line bg-white text-ink-soft hover:text-ink"
            }`}
          >
            {s === "all" ? "Все" : requestStatusLabels[s].ru}
            <span className="text-[11px] font-bold text-ink-faint">{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState text="Заявок в этой категории нет." />
      ) : (
        <ul className="space-y-3">
          {list.map((r) => {
            const cat = catInfo(r.category);
            return (
              <li key={r.id} className="card p-4">
                <div className="flex items-start gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{
                      backgroundColor: `${cat?.color ?? "#98A1B5"}1A`,
                      color: cat?.color ?? "#98A1B5",
                    }}
                  >
                    <Icon name={cat?.icon ?? "chat"} className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-mono text-[12px] font-bold text-primary">{r.ticket}</span>
                      {cat && (
                        <span className="text-[12px] font-semibold text-ink-soft">
                          {cat.label.ru}
                        </span>
                      )}
                      <span className="text-[11px] text-ink-faint">· {fmtDate(r.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-[14px] text-ink">{r.message}</p>
                    {r.address && (
                      <div className="mt-1 flex items-center gap-1 text-[12px] text-ink-faint">
                        <Icon name="map" className="h-3.5 w-3.5" />
                        {r.address}
                      </div>
                    )}
                  </div>
                  <IconBtn
                    kind="delete"
                    onClick={() => confirm(`Удалить заявку ${r.ticket}?`) && deleteRequest(r.id)}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
                  {STATUSES.map((s) => {
                    const active = r.status === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => updateRequest(r.id, { status: s })}
                        className="rounded-full px-3 py-1 text-[12px] font-bold transition-colors"
                        style={
                          active
                            ? { backgroundColor: requestStatusColors[s], color: "#fff" }
                            : {
                                backgroundColor: `${requestStatusColors[s]}14`,
                                color: requestStatusColors[s],
                              }
                        }
                      >
                        {requestStatusLabels[s].ru}
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
