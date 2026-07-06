import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/api";

type Customer = { id: string; code: string; name: string; type: string; phone?: string; paymentTermDays: number };

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({ code: "", name: "", type: "B2B", phone: "", paymentTermDays: 30 });

  const load = () => api.get<Customer[]>("/api/customers").then((response) => setCustomers(response.data ?? []));

  useEffect(() => {
    load();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await api.post<Customer>("/api/customers", form);
    setForm({ code: "", name: "", type: "B2B", phone: "", paymentTermDays: 30 });
    load();
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Sales</p>
          <h2>Customer</h2>
        </div>
      </div>
      <form className="data-form" onSubmit={submit}>
        <input placeholder="Kode" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
        <input placeholder="Nama customer" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="B2B">B2B</option>
          <option value="B2C">B2C</option>
        </select>
        <input placeholder="Telepon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button type="submit">Tambah Customer</button>
      </form>
      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama</th>
              <th>Tipe</th>
              <th>TOP</th>
              <th>Telepon</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.code}</td>
                <td>{customer.name}</td>
                <td>{customer.type}</td>
                <td>{customer.paymentTermDays} hari</td>
                <td>{customer.phone ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
