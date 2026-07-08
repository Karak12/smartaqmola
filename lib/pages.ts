// Контент внутренних страниц-разделов (единый шаблон, стиль главной).
import type { IconName } from "./content";

export type SectionCta = { label: string; icon: IconName; primary?: boolean };
export type Stat = { value: string; label: string };
export type Feature = { icon: IconName; title: string; text: string };
export type Step = { title: string; text: string };
export type Contact = { icon: IconName; label: string; value: string };

export type PageData = {
  slug: string;
  icon: IconName;
  breadcrumb: string;
  title: string;
  subtitle: string;
  cta: SectionCta[];
  stats: Stat[];
  featuresLabel: string;
  features: Feature[];
  stepsLabel: string;
  steps: Step[];
  aside: {
    title: string;
    text: string;
    contacts: Contact[];
    button: string;
  };
};

export const pages: PageData[] = [
  {
    slug: "dashboard",
    icon: "bar-chart",
    breadcrumb: "Панель региона",
    title: "Панель региона",
    subtitle:
      "Ключевые показатели и аналитика по направлениям Акмолинской области — обращения, безопасность, инфраструктура и агросектор.",
    cta: [
      { label: "Смотреть показатели", icon: "bar-chart", primary: true },
      { label: "Экспорт отчёта", icon: "doc" },
    ],
    stats: [
      { value: "24 531", label: "обращений" },
      { value: "21 842", label: "решено" },
      { value: "28", label: "проектов" },
      { value: "85%", label: "посевная" },
    ],
    featuresLabel: "Показатели по направлениям",
    features: [
      { icon: "chat", title: "Обращения", text: "Динамика и структура обращений жителей." },
      { icon: "camera-shield", title: "Безопасность", text: "Камеры, инциденты и время реагирования." },
      { icon: "road", title: "Инфраструктура", text: "Дороги, освещение и ремонтные работы." },
      { icon: "house", title: "ЖКХ", text: "Аварийность, отопительный сезон, благоустройство." },
      { icon: "leaf", title: "Агросектор", text: "Посевная, уборочная и субсидии." },
      { icon: "folder", title: "Проекты", text: "Ход реализации цифровых проектов." },
    ],
    stepsLabel: "Как читать панель",
    steps: [
      { title: "Выберите направление", text: "Фильтры по сферам и районам области." },
      { title: "Задайте период", text: "Сравнение по дням, месяцам и годам." },
      { title: "Изучите тренды", text: "Рост, снижение и отклонения от целей." },
      { title: "Скачайте отчёт", text: "Выгрузка в PDF/CSV для совещаний." },
    ],
    aside: {
      title: "Аналитический центр",
      text: "Готовим сводки и отчёты для акимата.",
      contacts: [
        { icon: "clock", label: "Обновление", value: "Ежедневно" },
        { icon: "doc", label: "Отчёты", value: "PDF / CSV" },
        { icon: "chat", label: "Запросы", value: "analytics@smartaqmola.kz" },
      ],
      button: "Запросить срез данных",
    },
  },
  {
    slug: "government",
    icon: "bank",
    breadcrumb: "Для госорганов",
    title: "Для госорганов",
    subtitle:
      "Интеграции, регламенты, API и требования к данным для подключения ведомств к цифровой платформе региона.",
    cta: [
      { label: "Запросить интеграцию", icon: "antenna", primary: true },
      { label: "Документация API", icon: "doc" },
    ],
    stats: [
      { value: "42", label: "интеграции" },
      { value: "18", label: "ведомств" },
      { value: "99,9%", label: "SLA доступности" },
      { value: "REST", label: "формат API" },
    ],
    featuresLabel: "Что предоставляем ведомствам",
    features: [
      { icon: "antenna", title: "API и интеграции", text: "REST и потоковые интерфейсы обмена данными." },
      { icon: "doc", title: "Регламенты", text: "Порядок подключения и обмена данными." },
      { icon: "shield", title: "Безопасность", text: "Требования ИБ, аутентификация и аудит." },
      { icon: "bar-chart", title: "Требования к данным", text: "Форматы, качество и справочники." },
      { icon: "refresh", title: "Синхронизация", text: "Регулярный обмен и актуализация данных." },
      { icon: "chat", title: "Поддержка", text: "Техническая поддержка интеграций 24/7." },
    ],
    stepsLabel: "Как подключиться",
    steps: [
      { title: "Заявка", text: "Оформите запрос на интеграцию от ведомства." },
      { title: "Согласование", text: "Определяем состав данных и регламент." },
      { title: "Тестовый контур", text: "Настройка и проверка обмена в песочнице." },
      { title: "Промышленная эксплуатация", text: "Подключение к боевой среде и мониторинг." },
    ],
    aside: {
      title: "Техническая поддержка",
      text: "Сопровождаем интеграции ведомств.",
      contacts: [
        { icon: "doc", label: "Документация", value: "docs.smartaqmola.kz" },
        { icon: "antenna", label: "API", value: "api.smartaqmola.kz" },
        { icon: "chat", label: "Поддержка", value: "support@smartaqmola.kz" },
      ],
      button: "Открыть заявку",
    },
  },
  {
    slug: "about",
    icon: "info",
    breadcrumb: "О Smart Aqmola",
    title: "О Smart Aqmola",
    subtitle:
      "КГУ «Smart Aqmola» при аппарате акима Акмолинской области — центр цифровой трансформации региона.",
    cta: [
      { label: "Документы", icon: "doc", primary: true },
      { label: "Контакты", icon: "chat" },
    ],
    stats: [
      { value: "2018", label: "год основания" },
      { value: "8", label: "направлений" },
      { value: "28", label: "проектов" },
      { value: "50+", label: "специалистов" },
    ],
    featuresLabel: "О центре",
    features: [
      { icon: "info", title: "Миссия", text: "Повышаем качество жизни через цифровизацию региона." },
      { icon: "bank", title: "Учредитель", text: "Аппарат акима Акмолинской области." },
      { icon: "users", title: "Команда", text: "Аналитики, разработчики и продукт-менеджеры." },
      { icon: "folder", title: "Направления", text: "8 сфер: от здравоохранения до безопасности." },
      { icon: "doc", title: "Документы", text: "Уставные документы, отчёты и госпрограммы." },
      { icon: "building", title: "Структура", text: "Управление цифровизации и архивов." },
    ],
    stepsLabel: "Этапы развития",
    steps: [
      { title: "2018 — Старт", text: "Создание центра цифровизации региона." },
      { title: "2020 — Платформа", text: "Запуск единой цифровой платформы." },
      { title: "2022 — ИИ", text: "Внедрение ИИ-аналитики и мониторинга." },
      { title: "2024 — Признание", text: "Лучший ИИ-проект на республиканском конкурсе." },
    ],
    aside: {
      title: "Контакты",
      text: "г. Кокшетау, Акмолинская область.",
      contacts: [
        { icon: "building", label: "Адрес", value: "ул. Ч. Валиханова" },
        { icon: "chat", label: "Почта", value: "info@smartaqmola.kz" },
        { icon: "clock", label: "Часы", value: "Пн–Пт, 9:00–18:30" },
      ],
      button: "Написать нам",
    },
  },
];

export function getPage(slug: string): PageData | undefined {
  return pages.find((p) => p.slug === slug);
}
