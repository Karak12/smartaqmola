"use client";

// Клиентское хранилище контента (без бэкенда). Данные лежат в localStorage,
// сайд читает их через useContent(), а админка правит через CRUD-методы.
// При первом запуске сидируется из статических данных в lib/*.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { LS } from "@/lib/i18n";
import type { IconName } from "@/lib/content";
import { kpis as seedKpis, news as seedNews } from "@/lib/content";
import { projects as seedProjects, type Project } from "@/lib/projects";

// ── Типы сущностей ──────────────────────────────────────────────────────────

export type NewsItem = { id: string; date: LS; title: LS; tone: string };

export type KpiItem = {
  id: string;
  icon: IconName;
  color: string;
  label: LS;
  value: LS;
  sub: LS;
  delta: string;
  deltaTone: "up" | "down";
};

export type ProjectItem = Project & { id: string };

export type RequestStatus = "new" | "in_progress" | "done" | "rejected";

export type RequestItem = {
  id: string; // номер заявки, напр. SA-123456
  category: string; // id категории из aiCategories либо ""
  message: string;
  address: string;
  createdAt: string; // ISO
  status: RequestStatus;
};

export type ContentState = {
  news: NewsItem[];
  kpis: KpiItem[];
  projects: ProjectItem[];
  requests: RequestItem[];
};

// ── Справочники для форм админки ─────────────────────────────────────────────

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

// ── Утилиты ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "sa:content:v1";

function uid(prefix: string): string {
  const rnd =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${rnd}`;
}

export function newTicketId(): string {
  return `SA-${Math.floor(100000 + Math.random() * 900000)}`;
}

function toLS(v: LS | string): LS {
  return typeof v === "string" ? { ru: v, kk: v } : { ...v };
}

// Начальное состояние из статических данных lib/*.
function seed(): ContentState {
  return {
    news: seedNews.map((n, i) => ({ id: `news-${i}`, ...n })),
    kpis: seedKpis.map((k, i) => ({
      id: `kpi-${i}`,
      icon: k.icon,
      color: k.color,
      label: k.label,
      value: toLS(k.value),
      sub: k.sub,
      delta: k.delta,
      deltaTone: k.deltaTone,
    })),
    projects: seedProjects.map((p, i) => ({ id: `project-${i}`, ...p })),
    requests: [
      {
        id: "SA-284107",
        category: "roads",
        message:
          "Большая яма на пересечении улиц Абая и Ауэзова, мешает проезду.",
        address: "г. Кокшетау, ул. Абая, 42",
        createdAt: "2026-07-08T09:14:00.000Z",
        status: "in_progress",
      },
      {
        id: "SA-284051",
        category: "light",
        message: "Не работает уличное освещение вдоль всего квартала.",
        address: "г. Степногорск, 4 мкр.",
        createdAt: "2026-07-07T18:42:00.000Z",
        status: "new",
      },
      {
        id: "SA-283920",
        category: "jkh",
        message: "Нет горячей воды в подъезде уже третий день.",
        address: "г. Кокшетау, ул. Ауэзова, 10, подъезд 2",
        createdAt: "2026-07-05T11:05:00.000Z",
        status: "done",
      },
    ],
  };
}

function load(): ContentState {
  if (typeof window === "undefined") return seed();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw) as Partial<ContentState>;
    const base = seed();
    return {
      news: parsed.news ?? base.news,
      kpis: parsed.kpis ?? base.kpis,
      projects: parsed.projects ?? base.projects,
      requests: parsed.requests ?? base.requests,
    };
  } catch {
    return seed();
  }
}

// ── Контекст ─────────────────────────────────────────────────────────────────

type Ctx = {
  ready: boolean; // true после гидратации из localStorage
  news: NewsItem[];
  kpis: KpiItem[];
  projects: ProjectItem[];
  requests: RequestItem[];

  addNews: (item: Omit<NewsItem, "id">) => void;
  updateNews: (id: string, patch: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;

  addKpi: (item: Omit<KpiItem, "id">) => void;
  updateKpi: (id: string, patch: Partial<KpiItem>) => void;
  deleteKpi: (id: string) => void;

  addProject: (item: Omit<ProjectItem, "id">) => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  addRequest: (item: Omit<RequestItem, "id" | "createdAt" | "status">) => string;
  updateRequest: (id: string, patch: Partial<RequestItem>) => void;
  deleteRequest: (id: string) => void;

  resetAll: () => void;
};

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ContentState>(seed);
  const [ready, setReady] = useState(false);

  // Гидратация из localStorage после маунта (SSR отдаёт сид).
  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);

  // Сохраняем при каждом изменении (после гидратации).
  const skip = useRef(true);
  useEffect(() => {
    if (!ready) return;
    if (skip.current) {
      skip.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* переполнение / приватный режим — игнорируем */
    }
  }, [state, ready]);

  const api = useMemo<Ctx>(() => {
    const listSetter =
      <K extends "news" | "kpis" | "projects" | "requests">(key: K) =>
      (fn: (prev: ContentState[K]) => ContentState[K]) =>
        setState((s) => ({ ...s, [key]: fn(s[key]) }));

    const setNews = listSetter("news");
    const setKpis = listSetter("kpis");
    const setProjects = listSetter("projects");
    const setRequests = listSetter("requests");

    return {
      ready,
      news: state.news,
      kpis: state.kpis,
      projects: state.projects,
      requests: state.requests,

      addNews: (item) => setNews((p) => [{ id: uid("news"), ...item }, ...p]),
      updateNews: (id, patch) =>
        setNews((p) => p.map((n) => (n.id === id ? { ...n, ...patch } : n))),
      deleteNews: (id) => setNews((p) => p.filter((n) => n.id !== id)),

      addKpi: (item) => setKpis((p) => [...p, { id: uid("kpi"), ...item }]),
      updateKpi: (id, patch) =>
        setKpis((p) => p.map((k) => (k.id === id ? { ...k, ...patch } : k))),
      deleteKpi: (id) => setKpis((p) => p.filter((k) => k.id !== id)),

      addProject: (item) =>
        setProjects((p) => [...p, { id: uid("project"), ...item }]),
      updateProject: (id, patch) =>
        setProjects((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x))),
      deleteProject: (id) => setProjects((p) => p.filter((x) => x.id !== id)),

      addRequest: (item) => {
        const id = newTicketId();
        setRequests((p) => [
          {
            id,
            createdAt: new Date().toISOString(),
            status: "new" as RequestStatus,
            ...item,
          },
          ...p,
        ]);
        return id;
      },
      updateRequest: (id, patch) =>
        setRequests((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r))),
      deleteRequest: (id) => setRequests((p) => p.filter((r) => r.id !== id)),

      resetAll: () => setState(seed()),
    };
  }, [state, ready]);

  return (
    <ContentContext.Provider value={api}>{children}</ContentContext.Provider>
  );
}

export function useContent(): Ctx {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within <ContentProvider>");
  }
  return ctx;
}

// Пустые заготовки для форм создания новых сущностей.
export const emptyLS: LS = { ru: "", kk: "" };

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
