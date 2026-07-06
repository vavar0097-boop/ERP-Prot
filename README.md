# ERP Besi

Starter monorepo untuk ERP mini distributor besi B2B/B2C.

## Stack

- Frontend: React, Vite, TypeScript
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Deploy frontend: Netlify
- Deploy backend: Railway
- PostgreSQL: Railway PostgreSQL

## Struktur Folder

```txt
erp-besi/
  apps/
    api/      Express TypeScript API
    web/      React Vite TypeScript app
  packages/
    shared/   shared constants/types
  docs/
    API.md
    DEPLOYMENT.md
    ERD.md
```

## Install

```bash
npm install
```

Salin environment example:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Isi `apps/api/.env` dengan `DATABASE_URL` PostgreSQL lokal atau Railway PostgreSQL.

## Setup Database

Generate Prisma Client:

```bash
npm run prisma:generate --workspace=@erp-besi/api
```

Jalankan migration development:

```bash
npm run prisma:migrate:dev --workspace=@erp-besi/api
```

Seed data awal:

```bash
npm run prisma:seed --workspace=@erp-besi/api
```

Prisma Studio:

```bash
npm run prisma:studio --workspace=@erp-besi/api
```

## Run Local

Backend:

```bash
npm run dev --workspace=@erp-besi/api
```

Backend berjalan di `http://localhost:3000`.

Frontend:

```bash
npm run dev --workspace=@erp-besi/web
```

Frontend berjalan di `http://localhost:5173`.

## Akses Login Awal

```txt
Email: admin@erpbesi.local
Password: Admin12345
```

Untuk production, set di Railway backend:

```bash
ADMIN_EMAIL=admin@domain-kamu.com
ADMIN_PASSWORD=password-kuat
AUTH_SECRET=random-secret-minimum-16-character
```

Run semua workspace dari root:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Endpoint Awal

- `GET /health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products`
- `GET /api/suppliers`
- `POST /api/suppliers`
- `GET /api/customers`
- `POST /api/customers`
- `GET /api/stocks`
- `GET /api/stocks/movements`
- `GET /api/purchase-orders`
- `POST /api/purchase-orders`
- `GET /api/sales-orders`
- `POST /api/sales-orders`
- `GET /api/invoices`
- `GET /api/delivery-orders`

Detail request body ada di [docs/API.md](docs/API.md).

## Deployment

Panduan lengkap ada di [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Ringkas:

- Netlify frontend: base directory `apps/web`, build command `npm run build`, publish `dist`.
- Railway PostgreSQL: Prisma migration ada di `apps/api/prisma/migrations`.
- Railway backend: build command `npm run railway:build`, start command `npm run railway:start`.
- PostgreSQL: pasang connection string production ke `DATABASE_URL` di Railway backend.
