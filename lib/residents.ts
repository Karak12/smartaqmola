import type { IconName } from "./content";

export type ResidentTab = {
  id: string;
  label: string;
  title: string;
  page: string;
  color: string;
  tabBg: string;
  tabText: string;
  subtitle: string;
  items: { icon: IconName; text: string }[];
};

export const residentsHero = {
  badge: "Для жителей",
};

export const residentTabs: ResidentTab[] = [
  {
    id: "services",
    label: "Сервисы",
    title: "Сервисы",
    page: "01",
    color: "#2563EB",
    tabBg: "#2563EB",
    tabText: "#FFFFFF",
    subtitle: "Все цифровые услуги для жителей Акмолинской области — в одном месте.",
    items: [
      { icon: "plus-circle", text: "Подать обращение через iKomek 109" },
      { icon: "refresh", text: "Проверить статус заявки онлайн" },
      { icon: "map", text: "Карта проблем и благоустройства" },
      { icon: "telegram", text: "Telegram-бот для быстрых обращений" },
    ],
  },
  {
    id: "appeal",
    label: "Обращение",
    title: "Обращение",
    page: "02",
    color: "#8B5CF6",
    tabBg: "#8B5CF6",
    tabText: "#FFFFFF",
    subtitle: "Четыре простых шага — от описания проблемы до готового ответа.",
    items: [
      { icon: "chat", text: "Опишите проблему и выберите категорию" },
      { icon: "doc", text: "Приложите фото и детали" },
      { icon: "refresh", text: "Отслеживайте статус в реальном времени" },
      { icon: "check-circle", text: "Получите ответ на телефон и в бот" },
    ],
  },
  {
    id: "support",
    label: "Поддержка",
    title: "Поддержка",
    page: "03",
    color: "#38A2C9",
    tabBg: "#38A2C9",
    tabText: "#FFFFFF",
    subtitle: "Единый контакт-центр работает круглосуточно — мы всегда на связи.",
    items: [
      { icon: "chat", text: "iKomek 109 — горячая линия" },
      { icon: "clock", text: "Приём заявок 24/7 без выходных" },
      { icon: "map", text: "г. Кокшетау, ул. Ч. Валиханова" },
      { icon: "question", text: "База знаний и частые вопросы" },
    ],
  },
];

export const residentsStats = [
  { value: "24 531", label: "обращений за 30 дней" },
  { value: "1,8 дня", label: "среднее время ответа" },
  { value: "89%", label: "решено вовремя" },
  { value: "24/7", label: "приём заявок" },
];

export const residentsFeatures = [
  {
    icon: "chat" as IconName,
    title: "Онлайн-обращения",
    text: "Жалобы и предложения через сайт, приложение и iKomek 109.",
    color: "#2563EB",
  },
  {
    icon: "refresh" as IconName,
    title: "Статус заявки",
    text: "Отслеживание хода рассмотрения обращения в реальном времени.",
    color: "#8B5CF6",
  },
  {
    icon: "map" as IconName,
    title: "Карта проблем",
    text: "Отметки жителей на карте: ЖКХ, дороги, освещение, благоустройство.",
    color: "#F5943B",
  },
  {
    icon: "doc" as IconName,
    title: "Инструкции",
    text: "Пошаговые гайды по популярным услугам и обращениям.",
    color: "#2FAE77",
  },
  {
    icon: "question" as IconName,
    title: "Частые вопросы",
    text: "Ответы на типовые вопросы жителей области.",
    color: "#EF5B45",
  },
  {
    icon: "telegram" as IconName,
    title: "Telegram-бот",
    text: "Быстрые обращения и уведомления в мессенджере.",
    color: "#38A2C9",
  },
];

export const residentsCta = [
  { label: "Подать обращение", icon: "plus-circle" as IconName, primary: true },
  { label: "Проверить статус", icon: "refresh" as IconName },
];
