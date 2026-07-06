import { FormEvent, useState } from "react";
import { api, authStorage } from "../lib/api";

type LoginResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
};

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("admin@erpbesi.local");
  const [password, setPassword] = useState("Admin12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post<LoginResponse>("/api/auth/login", { email, password });
      if (response.data?.token) {
        authStorage.setToken(response.data.token);
        onLogin();
      }
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <form className="login-panel" onSubmit={submit}>
        <p className="eyebrow">ERP Besi</p>
        <h1>Masuk workspace</h1>
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
        </label>
        <label>
          Password
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Masuk..." : "Login"}
        </button>
        <p className="muted">Akses awal: admin@erpbesi.local / Admin12345</p>
      </form>
    </main>
  );
}
