# Smart Aqmola — Backend (NestJS + Prisma + MinIO)

REST API для платформы Smart Aqmola: контент (новости, показатели, проекты,
закупки), обращения жителей и файловое хранилище на MinIO.

## Стек
- **NestJS 10** — HTTP API
- **Prisma 5 + PostgreSQL** — база данных
- **MinIO** — объектное хранилище файлов (S3-совместимое)

## Быстрый старт

```bash
cd backend
cp .env.example .env

# 1. Поднять Postgres + MinIO
docker compose up -d

# 2. Установить зависимости
npm install

# 3. Применить схему к БД и сгенерировать Prisma Client
npm run prisma:migrate      # создаст миграцию и таблицы
# (или npx prisma db push — без миграций)

# 4. Заполнить демо-данными
npm run db:seed

# 5. Запустить API в режиме разработки
npm run start:dev
```

API поднимется на `http://localhost:4000/api`.
Веб-консоль MinIO — `http://localhost:9001` (minioadmin / minioadmin).

## Эндпоинты

Мутации (POST/PATCH/DELETE) контента и файлов, а также просмотр/изменение
заявок требуют заголовок `Authorization: Bearer <token>`. Публичны: все `GET`
контента, `POST /api/requests` (форма жителей) и `GET /api/files/raw`.

| Метод  | Путь                    | Назначение                          |
|--------|-------------------------|-------------------------------------|
| POST   | `/api/auth/login`       | Логин админа → JWT                   |
| GET    | `/api/auth/me`          | Текущий пользователь (нужен токен)   |
| GET    | `/api/health`           | Проверка живости                    |
| GET    | `/api/news`             | Список новостей                     |
| POST   | `/api/news`             | Создать новость                     |
| PATCH  | `/api/news/:id`         | Изменить новость                    |
| DELETE | `/api/news/:id`         | Удалить новость                     |
| GET    | `/api/requests`         | Заявки (фильтр `?status=new`)       |
| POST   | `/api/requests`         | Создать заявку (форма «Сообщить AI»)|
| PATCH  | `/api/requests/:id`     | Сменить статус / поля               |
| DELETE | `/api/requests/:id`     | Удалить заявку                      |
| POST   | `/api/files`            | Загрузить файл (multipart, `file`)  |
| GET    | `/api/files`            | Список загруженных файлов           |
| GET    | `/api/files/raw?key=`   | Публичная ссылка на объект (redirect)|
| GET    | `/api/files/:id/url`    | Временная ссылка на скачивание      |
| DELETE | `/api/files/:id`        | Удалить файл                        |

Двуязычные поля передаются как объект `{ "ru": "...", "kk": "..." }` — та же
форма, что уже использует фронтенд.

## Дальше в планах
- Ресурсы `kpis`, `projects`, `procurement` (схема уже готова, паттерн — как в `news`)
- Аутентификация админки (JWT / guard)
- Прикрепление `Asset` к проектам и документам закупок
