import { NavLink, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { authStorage } from "./lib/api";
import { DashboardPage } from "./pages/DashboardPage";
import { HealthCheckPage } from "./pages/HealthCheckPage";
import { LoginPage } from "./pages/LoginPage";
import { ProductsPage } from "./pages/ProductsPage";
import { SuppliersPage } from "./pages/SuppliersPage";
import { CustomersPage } from "./pages/CustomersPage";
import { StocksPage } from "./pages/StocksPage";
import { PurchaseOrdersPage } from "./pages/PurchaseOrdersPage";

export default function App() {
  const [authenticated, setAuthenticated] = useState(Boolean(authStorage.getToken()));

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">ERP Besi</p>
          <h1>Distributor Workspace</h1>
        </div>
        <nav className="nav">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/products">Produk</NavLink>
          <NavLink to="/stocks">Stok</NavLink>
          <NavLink to="/purchase-orders">Purchase Order</NavLink>
          <NavLink to="/suppliers">Supplier</NavLink>
          <NavLink to="/customers">Customer</NavLink>
          <NavLink to="/health">Health Check</NavLink>
        </nav>
        <button
          className="logout-button"
          onClick={() => {
            authStorage.clear();
            setAuthenticated(false);
          }}
          type="button"
        >
          Logout
        </button>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/health" element={<HealthCheckPage />} />
        </Routes>
      </main>
    </div>
  );
}
