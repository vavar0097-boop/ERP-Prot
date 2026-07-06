import { useEffect, useState } from "react";
import { api } from "../lib/api";

type Stock = {
  id: string;
  quantity: string;
  product: { sku: string; name: string; minimumStock: string; unit: string };
  location: { name: string };
};

type Movement = {
  id: string;
  movementType: string;
  quantity: string;
  remarks?: string;
  createdAt: string;
  product: { sku: string; name: string };
  location: { name: string };
};

export function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);

  useEffect(() => {
    api.get<Stock[]>("/api/stocks").then((response) => setStocks(response.data ?? []));
    api.get<Movement[]>("/api/stocks/movements").then((response) => setMovements(response.data ?? []));
  }, []);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Inventory</p>
          <h2>Stok & Movement</h2>
        </div>
      </div>
      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Produk</th>
              <th>Lokasi</th>
              <th>Qty</th>
              <th>Minimum</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.product.sku}</td>
                <td>{stock.product.name}</td>
                <td>{stock.location.name}</td>
                <td>{stock.quantity} {stock.product.unit}</td>
                <td>{stock.product.minimumStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-panel">
        <h3>Riwayat Movement</h3>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Produk</th>
              <th>Lokasi</th>
              <th>Tipe</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td>{new Date(movement.createdAt).toLocaleDateString("id-ID")}</td>
                <td>{movement.product.sku}</td>
                <td>{movement.location.name}</td>
                <td>{movement.movementType}</td>
                <td>{movement.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
