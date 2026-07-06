import { useEffect, useState } from "react";
import { api, ApiResponse } from "../lib/api";

type HealthData = {
  service: string;
  status: string;
};

type HealthState =
  | { status: "loading" }
  | { status: "success"; response: ApiResponse<HealthData> }
  | { status: "error"; message: string };

export function HealthCheckPage() {
  const [health, setHealth] = useState<HealthState>({ status: "loading" });

  useEffect(() => {
    api
      .get<HealthData>("/health")
      .then((response) => setHealth({ status: "success", response }))
      .catch((error: Error) => setHealth({ status: "error", message: error.message }));
  }, []);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Backend</p>
          <h2>Health Check</h2>
        </div>
      </div>

      <div className="work-panel">
        {health.status === "loading" && <p className="muted">Mengecek koneksi API...</p>}
        {health.status === "error" && (
          <div className="health-result error">
            <span>Connection failed</span>
            <strong>{health.message}</strong>
          </div>
        )}
        {health.status === "success" && (
          <div className="health-result success">
            <span>{health.response.message}</span>
            <strong>{health.response.data?.service}</strong>
            <p>Status: {health.response.data?.status}</p>
          </div>
        )}
      </div>
    </section>
  );
}
