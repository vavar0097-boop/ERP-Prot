# Deployment Guide

## Netlify Frontend

Konfigurasi project Netlify:

- Base directory: `apps/web`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable:

```bash
VITE_API_URL=https://nama-backend.up.railway.app
```

Jika base directory tidak diatur, publish directory bisa memakai `apps/web/dist`.

Frontend butuh `VITE_API_URL` karena aplikasi React berjalan di browser dan harus tahu alamat backend API. Prefix `VITE_` wajib agar environment variable tersedia saat build Vite.

Untuk upload manual ZIP ke Netlify, build static juga membaca `config.js` runtime:

```js
window.__ERP_BESI_CONFIG__ = {
  API_URL: "https://nama-backend.up.railway.app",
};
```

File ini ada di hasil build sebagai `config.js`. Ganti placeholder `API_URL` dengan URL backend Railway sebelum upload ZIP, atau setelah extract lalu zip ulang.

Netlify butuh redirect SPA agar refresh di route seperti `/health` tidak 404:

```txt
/* /index.html 200
```

File ini sudah tersedia di `apps/web/public/_redirects`, dan fallback yang sama juga ada di `apps/web/netlify.toml`.

## Railway PostgreSQL

Gunakan Railway PostgreSQL sebagai database utama.

Railway project ID:

```txt
ed55a568-bc73-440d-984e-c1d058631e4e
```

Railway backend service name:

```txt
@erp-besi/api
```

1. Tambahkan service PostgreSQL di project Railway.
2. Copy `DATABASE_URL` dari Railway PostgreSQL.
3. Pasang `DATABASE_URL` ke service backend Railway.
4. Deploy backend dari repo ini.

Project ini sudah memiliki Prisma migration di:

```txt
apps/api/prisma/migrations/0001_init_erp_besi/migration.sql
```

Saat backend Railway start, command `npm run railway:start` akan menjalankan `prisma migrate deploy` dan membentuk tabel ERP di PostgreSQL Railway.

## Railway Backend

Konfigurasi service Railway jika memakai `railway.json` di root repo:

- Root directory: root repo
- Build command: `npm run railway:build`
- Start command: `npm run railway:start`
- Environment variables:

```bash
DATABASE_URL=postgresql://...railway-postgres-url...
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://nama-frontend.netlify.app
```

Untuk project ini, frontend production:

```bash
FRONTEND_URL=https://erp-besi.netlify.app
```

Jika memakai Railway PostgreSQL di project yang sama, isi `DATABASE_URL` di service `@erp-besi/api` dengan reference variable dari service database, contohnya:

```bash
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

Nama `Postgres` harus mengikuti nama service database di Railway. Cara aman: buka service `@erp-besi/api` -> Variables -> New Variable -> pilih reference dari service PostgreSQL -> `DATABASE_URL`.

`npm run railway:start` akan menjalankan `prisma migrate deploy` lebih dulu, lalu start Express API dari `apps/api/dist`.

Jika Railway service diset dengan root directory `apps/api`, gunakan:

```bash
Build command: npm run build
Start command: npm run prisma:migrate && npm run start
```

Backend butuh `FRONTEND_URL` untuk konfigurasi CORS production. Tanpa ini, browser akan memblokir request dari domain Netlify ke backend Railway.

Jika deploy lewat Railway CLI, login dulu lalu link ke project:

```bash
curl -fsSL https://railway.com/install.sh | sh
export PATH="$HOME/.railway/bin:$PATH"
railway login
railway link --project ed55a568-bc73-440d-984e-c1d058631e4e --environment production --service "@erp-besi/api"
railway up
```

Project ID ini bukan URL backend; untuk Netlify tetap gunakan public domain service Railway, misalnya `https://nama-backend.up.railway.app`.

Jika ingin menjalankan migration manual di Railway shell atau lokal dengan `DATABASE_URL` production:

```bash
npx prisma migrate deploy
npx prisma generate
```

Untuk setup lokal, gunakan:

```bash
npm run prisma:migrate:dev --workspace=@erp-besi/api
npm run prisma:seed --workspace=@erp-besi/api
```
