# T1_HealthSprint

Веб-приложение для загрузки и анализа sprint-данных из CSV с хранением в Supabase.

Проект состоит из двух основных частей:
- `web-ui` — frontend на Next.js (авторизация, загрузка CSV, дашборд).
- `api` — backend на FastAPI (обработка CSV/ZIP, удаление дубликатов, интеграция с Supabase Storage).

## Возможности

- Регистрация и вход через Supabase Auth:
- Email/Password
- Magic Link
- OAuth (GitHub)
- Загрузка CSV-файлов в бакет `sprint-data` в Supabase.
- Управление папками с загрузками (выбор, переименование, удаление).
- Визуализация метрик спринта (графики и таблица по исполнителям).
- Обработка ZIP-архивов с CSV на backend с очисткой от дубликатов.

## Стек

- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui, Recharts.
- Backend: FastAPI, Pandas, NumPy, Uvicorn.
- Хранилище и авторизация: Supabase.

## Структура репозитория

```text
T1_HealthSprint/
├─ api/                 # FastAPI API
│  └─ app/main.py       # Основные эндпоинты
├─ web-ui/              # Next.js frontend
├─ src/                 # Legacy-прототип API/аналитики
├─ TestData/            # Пример входных CSV
├─ Database/Agile.db    # Локальная БД (исследовательские сценарии)
└─ работа.ipynb         # Исследовательский ноутбук
```

## Быстрый старт

### 1) Backend (FastAPI)

```powershell
cd api
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Создайте файл `api/.env`:

```env
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE=<your-service-role-key>
```

Запуск:

```powershell
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

API будет доступно на `http://127.0.0.1:8000`.

### 2) Frontend (Next.js)

```powershell
cd web-ui
npm install
```

Создайте `web-ui/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Запуск:

```powershell
npm run dev
```

Frontend будет доступен на `http://localhost:3000`.

## API эндпоинты

- `POST /process-zip-file/`
- Принимает `multipart/form-data` с полем `file` (`.zip`).
- Распаковывает CSV, удаляет полные дубликаты строк, возвращает обработанный ZIP.
- `POST /process-zip-supabase/?folder_path=<path>&bucket_name=<bucket>`
- Читает CSV-файлы из папки Supabase Storage, обрабатывает и загружает результат обратно в `processed/...`.
- Возвращает список URL обработанных файлов.
- `GET /sprint-data`
- Возвращает демо-метрики спринта в JSON.

## Формат данных

- Входные CSV ожидаются с разделителем `;`.
- При чтении используется `skiprows=1` (первая строка пропускается).
- После обработки файлы сохраняются с разделителем `,`.
- Удаляются только полные дубликаты строк (`drop_duplicates`).

## Важные замечания

- Для работы frontend необходим бакет Supabase `sprint-data`.
- В текущем состоянии фронтенд импортирует `@/lib/supabase`, `@/lib/utils` и `@/lib/data/sprint-stats.json`.
- Если этих файлов нет в рабочей копии, их нужно добавить вручную (часто `lib/` исключается из git правилами).
- Папка `src/` — ранний прототип и может отличаться от актуальной логики в `api/app/main.py`.

## Лицензия

MIT ([LICENSE](LICENSE))
