import { useEffect, useState } from "react";
import { api } from "../lib/api";

type Product = { id: string; minimumStock: string; stocks?: Array<{ quantity: string }> };
type Supplier = { id: string };
type Customer = { id: string };
type Stock = { id: string; quantity: string; product: { minimumStock: string } };

const modules = [
  "Manajemen stok per lokasi",
  "Purchase order dan goods receipt",
  "Sales order, invoice, dan harga bertingkat",
  "Accounts receivable dan payment history",
  "Delivery order, armada, dan driver",
];

export function DashboardPage() {
  const [metrics, setMetrics] = useState([
    { label: "SKU Aktif", value: "0", note: "Produk besi aktif" },
    { label: "Stok Minimum", value: "0", note: "Item di bawah minimum" },
    { label: "Supplier", value: "0", note: "Supplier aktif" },
    { label: "Customer", value: "0", note: "B2B/B2C terdaftar" },
  ]);

  useEffect(() => {
    const safeGet = async <T,>(path: string): Promise<T[]> => {
      try {
        const response = await api.get<T[]>(path);
        return response.data ?? [];
      } catch {
        return [];
      }
    };

    Promise.all([
      safeGet<Product>("/api/products"),
      safeGet<Stock>("/api/stocks"),
      safeGet<Supplier>("/api/suppliers"),
      safeGet<Customer>("/api/customers"),
    ]).then(([products, stocks, suppliers, customers]) => {
      const lowStock = stocks.filter((stock) => Number(stock.quantity) <= Number(stock.product.minimumStock)).length;
      setMetrics([
        { label: "SKU Aktif", value: String(products.length), note: "Produk besi aktif" },
        { label: "Stok Minimum", value: String(lowStock), note: "Item di bawah minimum" },
        { label: "Supplier", value: String(suppliers.length), note: "Supplier aktif" },
        { label: "Customer", value: String(customers.length), note: "B2B/B2C terdaftar" },
      ]);
    });
  }, []);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Operasional distributor besi</h2>
        </div>
        <span className="status-pill">Starter Ready</span>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.note}</p>
          </article>
        ))}
      </div>

      <div className="work-panel">
        <div>
          <p className="eyebrow">Modul Awal</p>
          <h3>Fondasi ERP yang siap dikembangkan</h3>
        </div>
        <ul className="module-list">
          {modules.map((module) => (
            <li key={module}>{module}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
