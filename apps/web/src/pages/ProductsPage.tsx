import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/api";

type Product = {
  id: string;
  sku: string;
  name: string;
  shapeProfile: string;
  sizeText: string;
  unit: string;
  minimumStock: string;
  stocks?: Array<{ quantity: string; location: { name: string } }>;
};

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    sku: "",
    name: "",
    type: "BESI_PROFIL",
    shapeProfile: "WF",
    sizeText: "",
    lengthMm: 12000,
    weightKgPerPiece: 0,
    unit: "BATANG",
    minimumStock: 0,
  });

  const load = () => api.get<Product[]>("/api/products").then((response) => setProducts(response.data ?? []));

  useEffect(() => {
    load();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await api.post<Product>("/api/products", form);
    setForm({ ...form, sku: "", name: "", sizeText: "", minimumStock: 0, weightKgPerPiece: 0 });
    load();
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Master</p>
          <h2>Produk Besi</h2>
        </div>
      </div>
      <form className="data-form" onSubmit={submit}>
        <input placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
        <input placeholder="Nama produk" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Profil" value={form.shapeProfile} onChange={(e) => setForm({ ...form, shapeProfile: e.target.value })} />
        <input placeholder="Ukuran" value={form.sizeText} onChange={(e) => setForm({ ...form, sizeText: e.target.value })} />
        <button type="submit">Tambah Produk</button>
      </form>
      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nama</th>
              <th>Profil</th>
              <th>Ukuran</th>
              <th>Unit</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.shapeProfile}</td>
                <td>{product.sizeText}</td>
                <td>{product.unit}</td>
                <td>{product.stocks?.reduce((sum, stock) => sum + Number(stock.quantity), 0) ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
