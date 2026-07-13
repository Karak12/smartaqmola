"use client";

// Клиентское хранилище контента поверх REST API бэкенда.
// Публичный сайт и админка читают/пишут через useContent(). Если бэкенд
// недоступен, показываем сид-данные (fallback), чтобы витрина не падала.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { LS } from "@/lib/i18n";
import type { IconName } from "@/lib/content";
import { kpis as seedKpis, news as seedNews } from "@/lib/content";
import { projects as seedProjects } from "@/lib/projects";
import { procurementGroups } from "@/lib/procurement";
import {
  api,
  type NewsItem,
  type KpiItem,
  type ProjectItem,
  type RequestItem,
  type RequestStatus,
  type ProcurementItem,
} from "@/lib/api";

// Реэкспорт типов — чтобы старые импорты из "@/lib/admin/store" продолжали работать.
export type { NewsItem, KpiItem, ProjectItem, RequestItem, RequestStatus, ProcurementItem };

// ── Справочники для форм ─────────────────────────────────────────────────────
export const iconNames: IconName[] = [
  "search", "robot", "chevron-down", "plus-circle", "map", "folder", "bank",
  "leaf", "road", "video", "antenna", "building", "chat", "camera-shield",
  "house", "wifi", "clock", "check-circle", "bar-chart", "shield", "users",
  "cube", "info", "refresh", "question", "doc", "telegram", "book",
  "arrow-up-right", "arrow-right",
];

export const colorPalette: string[] = [
  "#2563EB", "#3B82F6", "#38A2C9", "#2FAE77", "#F5943B", "#EF5B45",
  "#8B5CF6", "#C9A227", "#1F2A44", "#0E7C8B",
];

export const requestStatusLabels: Record<RequestStatus, LS> = {
  new: { ru: "Новая", kk: "Жаңа" },
  in_progress: { ru: "В работе", kk: "Жұмыста" },
  done: { ru: "Решена", kk: "Шешілді" },
  rejected: { ru: "Отклонена", kk: "Қабылданбады" },
};

export const requestStatusColors: Record<RequestStatus, string> = {
  new: "#2563EB",
  in_progress: "#F5943B",
  done: "#2FAE77",
  rejected: "#EF5B45",
};

export const emptyLS: LS = { ru: "", kk: "" };

// ── Сид-данные (fallback, когда API недоступен) ──────────────────────────────
function toLS(v: LS | string): LS {
  return typeof v === "string" ? { ru: v, kk: v } : { ...v };
}

function fallback() {
  return {
    news: seedNews.map((n, i) => ({ id: `seed-news-${i}`, ...n })) as NewsItem[],
    kpis: seedKpis.map((k, i) => ({
      id: `seed-kpi-${i}`,
      icon: k.icon,
      color: k.color,
      label: k.label,
      value: toLS(k.value),
      sub: k.sub,
      delta: k.delta,
      deltaTone: k.deltaTone,
    })) as KpiItem[],
    projects: seedProjects.map((p, i) => ({ id: `seed-project-${i}`, ...p })) as ProjectItem[],
    requests: [] as RequestItem[],
    procurement: procurementGroups.flatMap((g, gi) =>
      g.items.map((it, i) => ({
        id: `seed-proc-${gi}-${i}`,
        groupKey: g.key,
        label: it.label,
        meta: it.meta ?? null,
        badge: it.badge ?? null,
      })),
    ) as ProcurementItem[],
  };
}

type State = {
  news: NewsItem[];
  kpis: KpiItem[];
  projects: ProjectItem[];
  requests: RequestItem[];
  procurement: ProcurementItem[];
};

// ── Контекст ─────────────────────────────────────────────────────────────────
type Ctx = State & {
  ready: boolean;
  online: boolean;
  refresh: () => Promise<void>;

  addNews: (item: Omit<NewsItem, "id">) => Promise<void>;
  updateNews: (id: string, patch: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;

  addKpi: (item: Omit<KpiItem, "id">) => Promise<void>;
  updateKpi: (id: string, patch: Partial<KpiItem>) => Promise<void>;
  deleteKpi: (id: string) => Promise<void>;

  addProject: (item: Omit<ProjectItem, "id">) => Promise<void>;
  updateProject: (id: string, patch: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  addProcurement: (item: Omit<ProcurementItem, "id">) => Promise<void>;
  updateProcurement: (id: string, patch: Partial<ProcurementItem>) => Promise<void>;
  deleteProcurement: (id: string) => Promise<void>;

  addRequest: (item: { category?: string; message: string; address?: string }) => Promise<string>;
  updateRequest: (id: string, patch: Partial<RequestItem>) => Promise<void>;
  deleteRequest: (id: string) => Promise<void>;
};

const ContentContext = createContext<Ctx | null>(null);

const empty: State = { news: [], kpis: [], projects: [], requests: [], procurement: [] };

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(empty);
  const [ready, setReady] = useState(false);
  const [online, setOnline] = useState(false);

  const refresh = useCallback(async () => {
    try {
      // Публичные коллекции определяют доступность бэкенда.
      const [news, kpis, projects, procurement] = await Promise.all([
        api.news.list(),
        api.kpis.list(),
        api.projects.list(),
        api.procurement.list(),
      ]);
      // Заявки требуют авторизации — грузим best-effort (на публичном сайте 401 → []).
      let requests: RequestItem[] = [];
      try {
        requests = await api.requests.list();
      } catch {
        requests = [];
      }
      setState({ news, kpis, projects, requests, procurement });
      setOnline(true);
    } catch (err) {
      // Бэкенд недоступен — показываем сид-данные, помечаем offline.
      console.warn("API недоступен, использую сид-данные:", (err as Error).message);
      setState(fallback());
      setOnline(false);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Хелпер: выполнить мутацию и обновить срез состояния; ошибку показать alert.
  const mutate = useCallback(
    async <K extends keyof State>(
      key: K,
      run: () => Promise<State[K]>,
    ): Promise<void> => {
      try {
        const next = await run();
        setState((s) => ({ ...s, [key]: next }));
      } catch (err) {
        alert(`Ошибка сохранения: ${(err as Error).message}`);
      }
    },
    [],
  );

  const api_ = useMemo<Ctx>(() => {
    return {
      ...state,
      ready,
      online,
      refresh,

      addNews: (item) =>
        mutate("news", async () => [await api.news.create(item), ...state.news]),
      updateNews: (id, patch) =>
        mutate("news", async () => {
          const upd = await api.news.update(id, patch);
          return state.news.map((n) => (n.id === id ? upd : n));
        }),
      deleteNews: (id) =>
        mutate("news", async () => {
          await api.news.remove(id);
          return state.news.filter((n) => n.id !== id);
        }),

      addKpi: (item) =>
        mutate("kpis", async () => [...state.kpis, await api.kpis.create(item)]),
      updateKpi: (id, patch) =>
        mutate("kpis", async () => {
          const upd = await api.kpis.update(id, patch);
          return state.kpis.map((k) => (k.id === id ? upd : k));
        }),
      deleteKpi: (id) =>
        mutate("kpis", async () => {
          await api.kpis.remove(id);
          return state.kpis.filter((k) => k.id !== id);
        }),

      addProject: (item) =>
        mutate("projects", async () => [...state.projects, await api.projects.create(item)]),
      updateProject: (id, patch) =>
        mutate("projects", async () => {
          const upd = await api.projects.update(id, patch);
          return state.projects.map((p) => (p.id === id ? upd : p));
        }),
      deleteProject: (id) =>
        mutate("projects", async () => {
          await api.projects.remove(id);
          return state.projects.filter((p) => p.id !== id);
        }),

      addProcurement: (item) =>
        mutate("procurement", async () => [...state.procurement, await api.procurement.create(item)]),
      updateProcurement: (id, patch) =>
        mutate("procurement", async () => {
          const upd = await api.procurement.update(id, patch);
          return state.procurement.map((d) => (d.id === id ? upd : d));
        }),
      deleteProcurement: (id) =>
        mutate("procurement", async () => {
          await api.procurement.remove(id);
          return state.procurement.filter((d) => d.id !== id);
        }),

      addRequest: async (item) => {
        const created = await api.requests.create(item);
        setState((s) => ({ ...s, requests: [created, ...s.requests] }));
        return created.ticket;
      },
      updateRequest: (id, patch) =>
        mutate("requests", async () => {
          const upd = await api.requests.update(id, patch);
          return state.requests.map((r) => (r.id === id ? upd : r));
        }),
      deleteRequest: (id) =>
        mutate("requests", async () => {
          await api.requests.remove(id);
          return state.requests.filter((r) => r.id !== id);
        }),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, ready, online, refresh, mutate]);

  return <ContentContext.Provider value={api_}>{children}</ContentContext.Provider>;
}

export function useContent(): Ctx {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within <ContentProvider>");
  return ctx;
}

// ── Пустые заготовки для форм создания ───────────────────────────────────────
export function blankNews(): Omit<NewsItem, "id"> {
  return { date: { ...emptyLS }, title: { ...emptyLS }, tone: colorPalette[0] };
}

export function blankKpi(): Omit<KpiItem, "id"> {
  return {
    icon: "bar-chart",
    color: colorPalette[0],
    label: { ...emptyLS },
    value: { ...emptyLS },
    sub: { ...emptyLS },
    delta: "",
    deltaTone: "up",
  };
}

export function blankProject(): Omit<ProjectItem, "id"> {
  return {
    name: { ...emptyLS },
    tagline: { ...emptyLS },
    description: { ...emptyLS },
    icon: "folder",
    color: colorPalette[0],
    status: { ru: "Пилот", kk: "Пилот" },
    year: String(new Date().getFullYear()),
    area: { ...emptyLS },
    tags: [],
  };
}

export function blankProcurement(groupKey = "plan"): Omit<ProcurementItem, "id"> {
  return { groupKey, label: { ...emptyLS }, meta: null, badge: null };
}
