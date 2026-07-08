import type { IconName } from "./content";

export type AiCategory = {
  id: string;
  label: string;
  icon: IconName;
  color: string;
};

export const aiCategories: AiCategory[] = [
  { id: "jkh", label: "ЖКХ", icon: "house", color: "#3B82F6" },
  { id: "roads", label: "Дороги", icon: "road", color: "#F5943B" },
  { id: "light", label: "Освещение", icon: "video", color: "#8B5CF6" },
  { id: "landscape", label: "Благоустройство", icon: "leaf", color: "#2FAE77" },
  { id: "safety", label: "Безопасность", icon: "camera-shield", color: "#2563EB" },
  { id: "other", label: "Другое", icon: "chat", color: "#98A1B5" },
];

export const aiQuickPrompts = [
  "Не работает уличное освещение на моей улице",
  "Яма на дороге — нужен ремонт",
  "Нет горячей воды в подъезде",
  "Сломанная лавочка во дворе",
  "Переполненный мусорный контейнер",
];

export const aiHints = [
  "Укажите точный адрес или ориентир",
  "Опишите проблему — ИИ классифицирует обращение",
  "Можно приложить фото после отправки",
];
