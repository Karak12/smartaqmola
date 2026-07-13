// Клиент REST API бэкенда (NestJS). База берётся из NEXT_PUBLIC_API_URL.
import type { LS } from "./i18n";
import type { IconName } from "./content";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

// ── Токен админки ────────────────────────────────────────────────────────────
const TOKEN_KEY = "sa:admin:token";
let authToken: string | null =
  typeof window !== "undefined" ? window.localStorage.getItem(TOKEN_KEY) : null;

export function getAuthToken(): string | null {
  return authToken;
}

export function setAuthToken(token: string | null): void {
  authToken = token;
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

// Стабильная публичная ссылка на объект в MinIO по ключу (через бэкенд).
export function fileUrl(key?: string | null): string | null {
  if (!key) return null;
  return `${API_BASE}/files/raw?key=${encodeURIComponent(key)}`;
}

// ── Типы сущностей (форма совпадает с ответами бэкенда) ─────────────────────
export type NewsItem = { id: string; date: LS; title: LS; tone: string; order?: number };

export type KpiItem = {
  id: string;
  icon: IconName;
  color: string;
  label: LS;
  value: LS;
  sub: LS;
  delta: string;
  deltaTone: "up" | "down";
  order?: number;
};

export type ProjectItem = {
  id: string;
  name: LS;
  tagline: LS;
  description: LS;
  icon: IconName;
  color: string;
  status: LS;
  year: string;
  area: LS;
  tags: LS[];
  coverKey?: string | null;
  order?: number;
};

export type RequestStatus = "new" | "in_progress" | "done" | "rejected";

export type RequestItem = {
  id: string;
  ticket: string;
  category: string;
  message: string;
  address: string;
  status: RequestStatus;
  createdAt: string;
};

export type ProcurementItem = {
  id: string;
  groupKey: string;
  label: LS;
  meta?: LS | null;
  badge?: LS | null;
  fileKey?: string | null;
  order?: number;
};

export type UploadedAsset = {
  id: string;
  key: string;
  bucket: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
};

// ── Низкоуровневый fetch ────────────────────────────────────────────────────
async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string>),
  };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    ...init,
    headers,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${path}: ${body || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// Фабрика стандартного CRUD-ресурса.
function crud<T, C>(resource: string) {
  return {
    list: () => http<T[]>(`/${resource}`),
    create: (data: C) =>
      http<T>(`/${resource}`, { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<C>) =>
      http<T>(`/${resource}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    remove: (id: string) =>
      http<{ ok: boolean }>(`/${resource}/${id}`, { method: "DELETE" }),
  };
}

export const api = {
  auth: {
    login: async (username: string, password: string) => {
      const data = await http<{ token: string; username: string }>(
        "/auth/login",
        { method: "POST", body: JSON.stringify({ username, password }) },
      );
      setAuthToken(data.token);
      return data;
    },
    me: () => http<{ username: string }>("/auth/me"),
    logout: () => setAuthToken(null),
  },

  news: crud<NewsItem, Omit<NewsItem, "id">>("news"),
  kpis: crud<KpiItem, Omit<KpiItem, "id">>("kpis"),
  projects: crud<ProjectItem, Omit<ProjectItem, "id">>("projects"),
  procurement: crud<ProcurementItem, Omit<ProcurementItem, "id">>("procurement"),

  requests: {
    list: (status?: RequestStatus) =>
      http<RequestItem[]>(`/requests${status ? `?status=${status}` : ""}`),
    create: (data: { category?: string; message: string; address?: string }) =>
      http<RequestItem>("/requests", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (
      id: string,
      data: Partial<Pick<RequestItem, "status" | "category" | "message" | "address">>,
    ) =>
      http<RequestItem>(`/requests/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    remove: (id: string) =>
      http<{ ok: boolean }>(`/requests/${id}`, { method: "DELETE" }),
  },

  // Загрузка файла в MinIO через бэкенд (требует токен).
  uploadFile: async (file: File): Promise<UploadedAsset> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API_BASE}/files`, {
      method: "POST",
      body: fd,
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
    });
    if (!res.ok) throw new Error(`Upload ${res.status}`);
    return (await res.json()) as UploadedAsset;
  },
};
