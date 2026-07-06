import { NavLink, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { HealthCheckPage } from "./pages/HealthCheckPage";

export default function App() {
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
          <NavLink to="/health">Health Check</NavLink>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/health" element={<HealthCheckPage />} />
        </Routes>
      </main>
    </div>
  );
}
