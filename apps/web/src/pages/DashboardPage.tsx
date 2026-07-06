const metrics = [
  { label: "SKU Aktif", value: "0", note: "Produk besi siap didaftarkan" },
  { label: "Stok Minimum", value: "0", note: "Alert berbasis minimum stock" },
  { label: "PO Terbuka", value: "0", note: "Draft sampai received" },
  { label: "Piutang", value: "Rp 0", note: "Aging dan status pembayaran" },
];

const modules = [
  "Manajemen stok per lokasi",
  "Purchase order dan goods receipt",
  "Sales order, invoice, dan harga bertingkat",
  "Accounts receivable dan payment history",
  "Delivery order, armada, dan driver",
];

export function DashboardPage() {
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
