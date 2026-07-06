# API Documentation

Base URL local backend: `http://localhost:3000`

Semua response menggunakan format konsisten:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

Untuk error:

```json
{
  "success": false,
  "message": "...",
  "errors": {}
}
```

## Endpoints Awal

| Method | Path | Keterangan |
| --- | --- | --- |
| GET | `/health` | Cek status API |
| POST | `/api/auth/login` | Login admin |
| GET | `/api/auth/me` | Cek user dari token |
| GET | `/api/products` | List produk besi |
| POST | `/api/products` | Buat produk besi |
| GET | `/api/suppliers` | List supplier |
| POST | `/api/suppliers` | Buat supplier |
| GET | `/api/customers` | List customer |
| POST | `/api/customers` | Buat customer |
| GET | `/api/stocks` | List stok per produk dan lokasi |
| GET | `/api/stocks/movements` | List riwayat movement stok |
| GET | `/api/purchase-orders` | List purchase order |
| POST | `/api/purchase-orders` | Buat purchase order |
| POST | `/api/purchase-orders/:id/receive` | Goods receipt dan tambah stok |
| GET | `/api/sales-orders` | List sales order |
| POST | `/api/sales-orders` | Placeholder create SO |
| GET | `/api/invoices` | List invoice |
| GET | `/api/delivery-orders` | List delivery order |

## GET /health

Response:

```json
{
  "success": true,
  "message": "API is healthy",
  "data": {
    "service": "erp-besi-api",
    "status": "ok"
  }
}
```

## POST /api/auth/login

Request body:

```json
{
  "email": "admin@erpbesi.local",
  "password": "Admin12345"
}
```

Response berisi `token` untuk akses aplikasi frontend.

## POST /api/products

Request body:

```json
{
  "sku": "WF-100-50-5-7-12M",
  "name": "Besi WF 100x50x5x7 12M",
  "type": "BESI_PROFIL",
  "shapeProfile": "WF",
  "sizeText": "100x50x5x7",
  "lengthMm": 12000,
  "weightKgPerPiece": 112.8,
  "unit": "BATANG",
  "minimumStock": 10,
  "isActive": true
}
```

`unit` valid: `PCS`, `KG`, `TON`, `BATANG`.

## POST /api/suppliers

Request body:

```json
{
  "code": "SUP-001",
  "name": "PT Baja Makmur",
  "phone": "021-555-0101",
  "email": "sales@bajamakmur.test",
  "address": "Jakarta",
  "contactPerson": "Budi",
  "isActive": true
}
```

## POST /api/customers

Request body:

```json
{
  "code": "CUS-001",
  "name": "CV Konstruksi Jaya",
  "type": "B2B",
  "phone": "08123456789",
  "email": "admin@konstruksijaya.test",
  "address": "Bekasi",
  "taxNumber": "01.234.567.8-999.000",
  "paymentTermDays": 30,
  "isActive": true
}
```
