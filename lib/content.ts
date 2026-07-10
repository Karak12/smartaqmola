// Контент главной страницы Smart Aqmola (вёрстка по макету).
import type { LS } from "./i18n";

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

export const nav: { label: LS; href: string }[] = [
  { label: { ru: "Для жителей", kk: "Тұрғындарға" }, href: "/residents" },
  { label: { ru: "Цифровой регион", kk: "Цифрлық өңір" }, href: "/digital" },
  { label: { ru: "Панель региона", kk: "Өңір панелі" }, href: "/dashboard" },
  { label: { ru: "Проекты", kk: "Жобалар" }, href: "/projects" },
  { label: { ru: "Закупки", kk: "Сатып алулар" }, href: "/procurement" },
  { label: { ru: "О нас", kk: "Біз туралы" }, href: "/about" },
];

export const heroButtons: {
  label: LS;
  icon: IconName;
  sub?: string;
  primary?: boolean;
}[] = [
  { label: { ru: "Сообщить о проблеме", kk: "Мәселе туралы хабарлау" }, sub: "iKomek 109", icon: "plus-circle", primary: true },
  { label: { ru: "Открыть карту региона", kk: "Өңір картасын ашу" }, icon: "map" },
  { label: { ru: "Посмотреть проекты", kk: "Жобаларды қарау" }, icon: "folder" },
  { label: { ru: "Закупки", kk: "Сатып алулар" }, icon: "doc" },
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
  label: LS;
  value: string;
}[] = [
  { icon: "chat", color: "#EF5B45", label: { ru: "Обращения жителей", kk: "Тұрғындар өтініштері" }, value: "1 248" },
  { icon: "camera-shield", color: "#2563EB", label: { ru: "Камеры / безопасность", kk: "Камералар / қауіпсіздік" }, value: "842" },
  { icon: "road", color: "#F5943B", label: { ru: "Дороги и инфраструктура", kk: "Жолдар мен инфрақұрылым" }, value: "320" },
  { icon: "house", color: "#3B82F6", label: { ru: "ЖКХ и благоустройство", kk: "ТКШ және абаттандыру" }, value: "512" },
  { icon: "leaf", color: "#2FAE77", label: { ru: "Сельское хозяйство", kk: "Ауыл шаруашылығы" }, value: "186" },
  { icon: "wifi", color: "#8B5CF6", label: { ru: "Связь и интернет", kk: "Байланыс және интернет" }, value: "148" },
];

export const kpis: {
  icon: IconName;
  color: string;
  label: LS;
  value: LS | string;
  sub: LS;
  delta: string;
  deltaTone: "up" | "down";
}[] = [
  { icon: "chat", color: "#2563EB", label: { ru: "Обращений в iKomek 109", kk: "iKomek 109 өтініштері" }, value: "24 531", sub: { ru: "за 30 дней", kk: "30 күнде" }, delta: "+12%", deltaTone: "up" },
  { icon: "clock", color: "#2563EB", label: { ru: "Среднее время обработки", kk: "Орташа өңдеу уақыты" }, value: { ru: "1,8 дня", kk: "1,8 күн" }, sub: { ru: "цель: до 3 дней", kk: "мақсат: 3 күнге дейін" }, delta: "−18%", deltaTone: "up" },
  { icon: "check-circle", color: "#2563EB", label: { ru: "Решено обращений", kk: "Шешілген өтініштер" }, value: "21 842", sub: { ru: "за 30 дней", kk: "30 күнде" }, delta: "+15%", deltaTone: "up" },
  { icon: "bar-chart", color: "#F5943B", label: { ru: "Цифровых проектов", kk: "Цифрлық жобалар" }, value: "28", sub: { ru: "активных проектов", kk: "белсенді жоба" }, delta: "+3", deltaTone: "up" },
  { icon: "leaf", color: "#2FAE77", label: { ru: "Агро-показатели", kk: "Агро көрсеткіштер" }, value: "85%", sub: { ru: "посевная завершена", kk: "егіс аяқталды" }, delta: "", deltaTone: "up" },
  { icon: "shield", color: "#2563EB", label: { ru: "Камеры / безопасность", kk: "Камералар / қауіпсіздік" }, value: "1 246", sub: { ru: "камер онлайн", kk: "камера онлайн" }, delta: "+7%", deltaTone: "up" },
];

export const navCards: {
  icon: IconName;
  title: LS;
  text: LS;
  slug: string;
}[] = [
  { icon: "users", title: { ru: "Для жителей", kk: "Тұрғындарға" }, slug: "residents", text: { ru: "Обращения, статус заявок, карта проблем, инструкции и частые вопросы.", kk: "Өтініштер, өтінім мәртебесі, мәселелер картасы, нұсқаулықтар және жиі қойылатын сұрақтар." } },
  { icon: "cube", title: { ru: "Цифровой регион", kk: "Цифрлық өңір" }, slug: "digital", text: { ru: "ИИ-аналитика, данные, мониторинг, карты, интеграции и цифровые сервисы.", kk: "ЖИ-аналитика, деректер, мониторинг, карталар, интеграциялар және цифрлық сервистер." } },
  { icon: "bar-chart", title: { ru: "Панель региона", kk: "Өңір панелі" }, slug: "dashboard", text: { ru: "Актуальные показатели и аналитика по ключевым направлениям области.", kk: "Облыстың негізгі бағыттары бойынша өзекті көрсеткіштер мен аналитика." } },
  { icon: "folder", title: { ru: "Проекты", kk: "Жобалар" }, slug: "projects", text: { ru: "Цифровые проекты региона, ход реализации и текущий статус.", kk: "Өңірдің цифрлық жобалары, іске асыру барысы және ағымдағы мәртебесі." } },
  { icon: "doc", title: { ru: "Закупки", kk: "Сатып алулар" }, slug: "procurement", text: { ru: "Планы госзакупок, объявления об аукционах и открытых конкурсах.", kk: "Мемлекеттік сатып алулар жоспарлары, аукциондар мен ашық конкурстар туралы хабарландырулар." } },
  { icon: "info", title: { ru: "О нас", kk: "Біз туралы" }, slug: "about", text: { ru: "О центре, миссия, структура, документы, вакансии и контакты.", kk: "Орталық туралы, миссия, құрылым, құжаттар, бос орындар және байланыстар." } },
];

export const news: { date: LS; title: LS; tone: string }[] = [
  { date: { ru: "20 мая 2024", kk: "2024 ж. 20 мамыр" }, title: { ru: "Smart Aqmola признан лучшим ИИ-проектом на республиканском конкурсе", kk: "Smart Aqmola республикалық конкурста үздік ЖИ-жоба деп танылды" }, tone: "#C9A227" },
  { date: { ru: "15 мая 2024", kk: "2024 ж. 15 мамыр" }, title: { ru: "Запущена карта проблем жителей Акмолинской области", kk: "Ақмола облысы тұрғындарының мәселелер картасы іске қосылды" }, tone: "#1F2A44" },
  { date: { ru: "10 мая 2024", kk: "2024 ж. 10 мамыр" }, title: { ru: "Новый ИИ-модуль выявляет риски в режиме реального времени", kk: "Жаңа ЖИ-модуль тәуекелдерді нақты уақытта анықтайды" }, tone: "#0E7C8B" },
];

export const services: { icon: IconName; label: LS }[] = [
  { icon: "refresh", label: { ru: "Проверить статус обращения", kk: "Өтініш мәртебесін тексеру" } },
  { icon: "map", label: { ru: "Карта проблем", kk: "Мәселелер картасы" } },
  { icon: "question", label: { ru: "Частые вопросы", kk: "Жиі қойылатын сұрақтар" } },
  { icon: "doc", label: { ru: "Инструкции по обращениям", kk: "Өтініштер бойынша нұсқаулық" } },
  { icon: "telegram", label: { ru: "Telegram бот Smart Aqmola", kk: "Smart Aqmola Telegram-боты" } },
  { icon: "book", label: { ru: "База знаний для жителей", kk: "Тұрғындарға арналған білім қоры" } },
];
