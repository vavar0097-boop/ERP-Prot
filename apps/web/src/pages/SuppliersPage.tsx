import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/api";

type Supplier = { id: string; code: string; name: string; phone?: string; contactPerson?: string };

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [form, setForm] = useState({ code: "", name: "", phone: "", contactPerson: "" });

  const load = () => api.get<Supplier[]>("/api/suppliers").then((response) => setSuppliers(response.data ?? []));

  useEffect(() => {
    load();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await api.post<Supplier>("/api/suppliers", form);
    setForm({ code: "", name: "", phone: "", contactPerson: "" });
    load();
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Purchase</p>
          <h2>Supplier</h2>
        </div>
      </div>
      <form className="data-form" onSubmit={submit}>
        <input placeholder="Kode" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
        <input placeholder="Nama supplier" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Telepon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="PIC" value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} />
        <button type="submit">Tambah Supplier</button>
      </form>
      <DataTable rows={suppliers} columns={["code", "name", "phone", "contactPerson"]} />
    </section>
  );
}

function DataTable({ rows, columns }: { rows: Supplier[]; columns: Array<keyof Supplier> }) {
  return (
    <div className="table-panel">
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>{columns.map((column) => <td key={column}>{row[column] ?? "-"}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
