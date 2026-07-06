import { FormEvent, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

type Supplier = { id: string; name: string; code: string };
type Product = { id: string; sku: string; name: string };
type Location = { id: string; name: string };
type PurchaseOrder = {
  id: string;
  poNumber: string;
  status: string;
  totalAmount: string;
  supplier: Supplier;
  items: Array<{
    id: string;
    quantity: string;
    receivedQty: string;
    unitPrice: string;
    product: Product;
  }>;
};

export function PurchaseOrdersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [form, setForm] = useState({ supplierId: "", productId: "", quantity: 1, unitPrice: 0 });

  const canSubmit = useMemo(() => form.supplierId && form.productId && form.quantity > 0, [form]);

  const load = () => {
    api.get<PurchaseOrder[]>("/api/purchase-orders").then((response) => setOrders(response.data ?? []));
  };

  useEffect(() => {
    api.get<Supplier[]>("/api/suppliers").then((response) => {
      const data = response.data ?? [];
      setSuppliers(data);
      setForm((current) => ({ ...current, supplierId: current.supplierId || data[0]?.id || "" }));
    });
    api.get<Product[]>("/api/products").then((response) => {
      const data = response.data ?? [];
      setProducts(data);
      setForm((current) => ({ ...current, productId: current.productId || data[0]?.id || "" }));
    });
    api.get<Location[]>("/api/stocks/locations").then((response) => setLocations(response.data ?? []));
    load();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    await api.post<PurchaseOrder>("/api/purchase-orders", {
      supplierId: form.supplierId,
      items: [{ productId: form.productId, quantity: Number(form.quantity), unitPrice: Number(form.unitPrice) }],
    });
    load();
  };

  const receive = async (order: PurchaseOrder) => {
    const location = locations[0];
    if (!location) return;

    await api.post(`/api/purchase-orders/${order.id}/receive`, {
      locationId: location.id,
      remarks: "Penerimaan dari UI",
      items: order.items
        .map((item) => ({
          productId: item.product.id,
          quantity: Number(item.quantity) - Number(item.receivedQty),
        }))
        .filter((item) => item.quantity > 0),
    });
    load();
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Purchase</p>
          <h2>Purchase Order</h2>
        </div>
      </div>
      <form className="data-form" onSubmit={submit}>
        <select value={form.supplierId} onChange={(e) => setForm({ ...form, supplierId: e.target.value })}>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.code} - {supplier.name}
            </option>
          ))}
        </select>
        <select value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.sku} - {product.name}
            </option>
          ))}
        </select>
        <input
          min="1"
          placeholder="Qty"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        />
        <input
          min="0"
          placeholder="Harga"
          type="number"
          value={form.unitPrice}
          onChange={(e) => setForm({ ...form, unitPrice: Number(e.target.value) })}
        />
        <button disabled={!canSubmit} type="submit">
          Buat PO
        </button>
      </form>

      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>No PO</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Total</th>
              <th>Item</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.poNumber}</td>
                <td>{order.supplier.name}</td>
                <td>{order.status}</td>
                <td>Rp {Number(order.totalAmount).toLocaleString("id-ID")}</td>
                <td>{order.items.map((item) => `${item.product.sku} (${item.receivedQty}/${item.quantity})`).join(", ")}</td>
                <td>
                  <button className="table-action" disabled={order.status === "RECEIVED"} onClick={() => receive(order)} type="button">
                    Receive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
