// Данные страницы «Цифровой регион» — схема потока данных.
import type { IconName } from "./content";

export const digitalHero = {
  title: "Цифровой регион",
  subtitle:
    "Единая платформа управления Акмолинской областью: данные ведомств, датчиков и обращений проходят путь от сбора до управленческих решений.",
  cta: [
    { label: "Открыть дашборд", icon: "bar-chart" as IconName, primary: true },
    { label: "Карта данных", icon: "map" as IconName },
  ],
};

export type Stage = {
  step: string;
  icon: IconName;
  color: string;
  title: string;
  text: string;
  items: string[];
};

export const pipeline: Stage[] = [
  {
    step: "01",
    icon: "antenna",
    color: "#2563EB",
    title: "Сбор данных",
    text: "Единый поток из всех источников региона.",
    items: ["Ведомственные системы", "IoT-датчики и камеры", "Обращения жителей", "Открытые данные"],
  },
  {
    step: "02",
    icon: "robot",
    color: "#8B5CF6",
    title: "ИИ-обработка",
    text: "Очистка, нормализация и анализ моделями.",
    items: ["Нормализация данных", "ML-модели", "Выявление аномалий", "Прогнозы и риски"],
  },
  {
    step: "03",
    icon: "bar-chart",
    color: "#38A2C9",
    title: "Визуализация",
    text: "Понятные дашборды и карты для управленцев.",
    items: ["Дашборды в реальном времени", "Карты слоёв", "Отчёты PDF / CSV", "Уведомления"],
  },
  {
    step: "04",
    icon: "check-circle",
    color: "#2FAE77",
    title: "Решения",
    text: "Поручения, контроль исполнения и эффект.",
    items: ["Поручения", "Мониторинг исполнения", "Обратная связь", "Оценка эффекта"],
  },
];

export const digitalStats = [
  { value: "6", label: "слоёв данных" },
  { value: "1 246", label: "камер онлайн" },
  { value: "98,7%", label: "доступность систем" },
  { value: "42", label: "интеграции" },
];
