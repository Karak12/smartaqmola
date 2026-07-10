import type { IconName } from "./content";
import type { LS } from "./i18n";

export type AiCategory = {
  id: string;
  label: LS;
  icon: IconName;
  color: string;
};

export const aiCategories: AiCategory[] = [
  { id: "jkh", label: { ru: "ЖКХ", kk: "ТКШ" }, icon: "house", color: "#3B82F6" },
  { id: "roads", label: { ru: "Дороги", kk: "Жолдар" }, icon: "road", color: "#F5943B" },
  { id: "light", label: { ru: "Освещение", kk: "Жарықтандыру" }, icon: "video", color: "#8B5CF6" },
  { id: "landscape", label: { ru: "Благоустройство", kk: "Абаттандыру" }, icon: "leaf", color: "#2FAE77" },
  { id: "safety", label: { ru: "Безопасность", kk: "Қауіпсіздік" }, icon: "camera-shield", color: "#2563EB" },
  { id: "other", label: { ru: "Другое", kk: "Басқа" }, icon: "chat", color: "#98A1B5" },
];

export const aiQuickPrompts: LS[] = [
  { ru: "Не работает уличное освещение на моей улице", kk: "Менің көшемде көше жарығы жұмыс істемейді" },
  { ru: "Яма на дороге — нужен ремонт", kk: "Жолда шұңқыр бар — жөндеу қажет" },
  { ru: "Нет горячей воды в подъезде", kk: "Кіреберісте ыстық су жоқ" },
  { ru: "Сломанная лавочка во дворе", kk: "Аулада сынған орындық" },
  { ru: "Переполненный мусорный контейнер", kk: "Толып кеткен қоқыс контейнері" },
];

export const aiHints: LS[] = [
  { ru: "Укажите точный адрес или ориентир", kk: "Нақты мекенжайды немесе бағдарды көрсетіңіз" },
  { ru: "Опишите проблему — ИИ классифицирует обращение", kk: "Мәселені сипаттаңыз — ЖИ өтінішті жіктейді" },
  { ru: "Можно приложить фото после отправки", kk: "Жібергеннен кейін фото тіркеуге болады" },
];
