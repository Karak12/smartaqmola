import { PrismaClient, RequestStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Новости
  await prisma.news.deleteMany();
  await prisma.news.createMany({
    data: [
      {
        order: 0,
        tone: '#C9A227',
        date: { ru: '20 мая 2024', kk: '2024 ж. 20 мамыр' },
        title: {
          ru: 'Smart Aqmola признан лучшим ИИ-проектом на республиканском конкурсе',
          kk: 'Smart Aqmola республикалық конкурста үздік ЖИ-жоба деп танылды',
        },
      },
      {
        order: 1,
        tone: '#1F2A44',
        date: { ru: '15 мая 2024', kk: '2024 ж. 15 мамыр' },
        title: {
          ru: 'Запущена карта проблем жителей Акмолинской области',
          kk: 'Ақмола облысы тұрғындарының мәселелер картасы іске қосылды',
        },
      },
      {
        order: 2,
        tone: '#0E7C8B',
        date: { ru: '10 мая 2024', kk: '2024 ж. 10 мамыр' },
        title: {
          ru: 'Новый ИИ-модуль выявляет риски в режиме реального времени',
          kk: 'Жаңа ЖИ-модуль тәуекелдерді нақты уақытта анықтайды',
        },
      },
    ],
  });

  // Показатели
  await prisma.kpi.deleteMany();
  await prisma.kpi.createMany({
    data: [
      {
        order: 0,
        icon: 'chat',
        color: '#2563EB',
        label: { ru: 'Обращений в iKomek 109', kk: 'iKomek 109 өтініштері' },
        value: { ru: '24 531', kk: '24 531' },
        sub: { ru: 'за 30 дней', kk: '30 күнде' },
        delta: '+12%',
        deltaTone: 'up',
      },
      {
        order: 1,
        icon: 'check-circle',
        color: '#2563EB',
        label: { ru: 'Решено обращений', kk: 'Шешілген өтініштер' },
        value: { ru: '21 842', kk: '21 842' },
        sub: { ru: 'за 30 дней', kk: '30 күнде' },
        delta: '+15%',
        deltaTone: 'up',
      },
    ],
  });

  // Обращения жителей
  await prisma.request.deleteMany();
  await prisma.request.createMany({
    data: [
      {
        ticket: 'SA-284107',
        category: 'roads',
        message: 'Большая яма на пересечении улиц Абая и Ауэзова, мешает проезду.',
        address: 'г. Кокшетау, ул. Абая, 42',
        status: RequestStatus.in_progress,
      },
      {
        ticket: 'SA-284051',
        category: 'light',
        message: 'Не работает уличное освещение вдоль всего квартала.',
        address: 'г. Степногорск, 4 мкр.',
        status: RequestStatus.new,
      },
      {
        ticket: 'SA-283920',
        category: 'jkh',
        message: 'Нет горячей воды в подъезде уже третий день.',
        address: 'г. Кокшетау, ул. Ауэзова, 10, подъезд 2',
        status: RequestStatus.done,
      },
    ],
  });

  // Проекты
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        order: 0,
        icon: 'map',
        color: '#2563EB',
        name: { ru: 'Карта проблем', kk: 'Мәселелер картасы' },
        tagline: { ru: 'Обратная связь', kk: 'Кері байланыс' },
        description: {
          ru: 'Единая интерактивная карта обращений и инцидентов Акмолинской области.',
          kk: 'Ақмола облысының өтініштері мен оқиғаларының бірыңғай интерактивті картасы.',
        },
        status: { ru: 'Работает', kk: 'Жұмыс істейді' },
        year: '2023',
        area: { ru: '17 районов', kk: '17 аудан' },
        tags: [
          { ru: 'Карты', kk: 'Карталар' },
          { ru: 'Обращения', kk: 'Өтініштер' },
        ],
      },
      {
        order: 1,
        icon: 'robot',
        color: '#8B5CF6',
        name: { ru: 'ИИ-мониторинг', kk: 'ЖИ-мониторинг' },
        tagline: { ru: 'Аналитика рисков', kk: 'Тәуекел аналитикасы' },
        description: {
          ru: 'Модели машинного обучения выявляют аномалии и потенциальные риски раньше инцидентов.',
          kk: 'Машиналық оқыту модельдері ауытқулар мен тәуекелдерді оқиғаға дейін анықтайды.',
        },
        status: { ru: 'Развитие', kk: 'Дамуда' },
        year: '2024',
        area: { ru: 'вся область', kk: 'бүкіл облыс' },
        tags: [
          { ru: 'ИИ', kk: 'ЖИ' },
          { ru: 'Мониторинг', kk: 'Мониторинг' },
        ],
      },
      {
        order: 2,
        icon: 'camera-shield',
        color: '#38A2C9',
        name: { ru: 'Безопасный город', kk: 'Қауіпсіз қала' },
        tagline: { ru: 'Видеоаналитика', kk: 'Бейнеаналитика' },
        description: {
          ru: 'Сеть камер и центр реагирования: распознавание событий и оперативное оповещение служб.',
          kk: 'Камералар желісі мен ден қою орталығы: оқиғаларды тану және қызметтерді жедел хабардар ету.',
        },
        status: { ru: 'Работает', kk: 'Жұмыс істейді' },
        year: '2022',
        area: { ru: '9 городов', kk: '9 қала' },
        tags: [
          { ru: 'Видео', kk: 'Бейне' },
          { ru: 'Безопасность', kk: 'Қауіпсіздік' },
        ],
      },
    ],
  });

  // Документы закупок
  await prisma.procurementDoc.deleteMany();
  await prisma.procurementDoc.createMany({
    data: [2025, 2024, 2023].map((year, i) => ({
      order: i,
      groupKey: 'plan',
      label: {
        ru: `План государственных закупок на ${year} год`,
        kk: `${year} жылға арналған мемлекеттік сатып алулар жоспары`,
      },
    })),
  });

  console.log('Seed завершён.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
