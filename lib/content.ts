// Контент главной страницы Smart Aqmola (вёрстка по макету).

export type IconName =
  | "search"
  | "robot"
  | "chevron-down"
  | "plus-circle"
  | "map"
  | "folder"
  | "bank"
  | "leaf"
  | "road"
  | "video"
  | "antenna"
  | "building"
  | "chat"
  | "camera-shield"
  | "house"
  | "wifi"
  | "clock"
  | "check-circle"
  | "bar-chart"
  | "shield"
  | "users"
  | "cube"
  | "info"
  | "refresh"
  | "question"
  | "doc"
  | "telegram"
  | "book"
  | "arrow-up-right"
  | "arrow-right";

export const nav: { label: string; href: string }[] = [
  { label: "Для жителей", href: "/residents" },
  { label: "Цифровой регион", href: "/digital" },
  { label: "Панель региона", href: "/dashboard" },
  { label: "Проекты", href: "/projects" },
  { label: "Для госорганов", href: "/government" },
  { label: "О Smart Aqmola", href: "/about" },
];

export const heroButtons: {
  label: string;
  icon: IconName;
  sub?: string;
  primary?: boolean;
}[] = [
  { label: "Сообщить о проблеме", sub: "iKomek 109", icon: "plus-circle", primary: true },
  { label: "Открыть карту региона", icon: "map" },
  { label: "Посмотреть проекты", icon: "folder" },
  { label: "Для госорганов", icon: "bank" },
];

// Плавающие бейджи на карте: позиция в % внутри контейнера карты
export const mapBadges: {
  icon: IconName;
  color: string;
  top: string;
  left: string;
  delay: string;
}[] = [
  { icon: "leaf", color: "#2FAE77", top: "24%", left: "34%", delay: "0s" },
  { icon: "road", color: "#F5943B", top: "18%", left: "62%", delay: "0.6s" },
  { icon: "video", color: "#2563EB", top: "42%", left: "22%", delay: "1.2s" },
  { icon: "antenna", color: "#8B5CF6", top: "52%", left: "64%", delay: "0.9s" },
  { icon: "building", color: "#3B82F6", top: "66%", left: "42%", delay: "0.3s" },
];

export const dataLayers: {
  icon: IconName;
  color: string;
  label: string;
  value: string;
}[] = [
  { icon: "chat", color: "#EF5B45", label: "Обращения жителей", value: "1 248" },
  { icon: "camera-shield", color: "#2563EB", label: "Камеры / безопасность", value: "842" },
  { icon: "road", color: "#F5943B", label: "Дороги и инфраструктура", value: "320" },
  { icon: "house", color: "#3B82F6", label: "ЖКХ и благоустройство", value: "512" },
  { icon: "leaf", color: "#2FAE77", label: "Сельское хозяйство", value: "186" },
  { icon: "wifi", color: "#8B5CF6", label: "Связь и интернет", value: "148" },
];

export const kpis: {
  icon: IconName;
  color: string;
  label: string;
  value: string;
  sub: string;
  delta: string;
  deltaTone: "up" | "down";
}[] = [
  { icon: "chat", color: "#2563EB", label: "Обращений в iKomek 109", value: "24 531", sub: "за 30 дней", delta: "+12%", deltaTone: "up" },
  { icon: "clock", color: "#2563EB", label: "Среднее время обработки", value: "1,8 дня", sub: "цель: до 3 дней", delta: "−18%", deltaTone: "up" },
  { icon: "check-circle", color: "#2563EB", label: "Решено обращений", value: "21 842", sub: "за 30 дней", delta: "+15%", deltaTone: "up" },
  { icon: "bar-chart", color: "#F5943B", label: "Цифровых проектов", value: "28", sub: "активных проектов", delta: "+3", deltaTone: "up" },
  { icon: "leaf", color: "#2FAE77", label: "Агро-показатели", value: "85%", sub: "посевная завершена", delta: "", deltaTone: "up" },
  { icon: "shield", color: "#2563EB", label: "Камеры / безопасность", value: "1 246", sub: "камер онлайн", delta: "+7%", deltaTone: "up" },
];

export const navCards: {
  icon: IconName;
  title: string;
  text: string;
  slug: string;
}[] = [
  { icon: "users", title: "Для жителей", slug: "residents", text: "Обращения, статус заявок, карта проблем, инструкции и частые вопросы." },
  { icon: "cube", title: "Цифровой регион", slug: "digital", text: "ИИ-аналитика, данные, мониторинг, карты, интеграции и цифровые сервисы." },
  { icon: "bar-chart", title: "Панель региона", slug: "dashboard", text: "Актуальные показатели и аналитика по ключевым направлениям области." },
  { icon: "folder", title: "Проекты", slug: "projects", text: "Цифровые проекты региона, ход реализации и текущий статус." },
  { icon: "bank", title: "Для госорганов", slug: "government", text: "Интеграции, регламенты, API, требования к данным и поддержка." },
  { icon: "info", title: "О Smart Aqmola", slug: "about", text: "О центре, миссия, структура, документы, вакансии и контакты." },
];

export const news: { date: string; title: string; tone: string }[] = [
  { date: "20 мая 2024", title: "Smart Aqmola признан лучшим ИИ-проектом на республиканском конкурсе", tone: "#C9A227" },
  { date: "15 мая 2024", title: "Запущена карта проблем жителей Акмолинской области", tone: "#1F2A44" },
  { date: "10 мая 2024", title: "Новый ИИ-модуль выявляет риски в режиме реального времени", tone: "#0E7C8B" },
];

export const services: { icon: IconName; label: string }[] = [
  { icon: "refresh", label: "Проверить статус обращения" },
  { icon: "map", label: "Карта проблем" },
  { icon: "question", label: "Частые вопросы" },
  { icon: "doc", label: "Инструкции по обращениям" },
  { icon: "telegram", label: "Telegram бот Smart Aqmola" },
  { icon: "book", label: "База знаний для жителей" },
];
