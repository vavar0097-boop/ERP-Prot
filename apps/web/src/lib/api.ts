declare global {
  interface Window {
    __ERP_BESI_CONFIG__?: {
      API_URL?: string;
    };
  }
}

const configuredApiUrl =
  window.__ERP_BESI_CONFIG__?.API_URL || import.meta.env.VITE_API_URL || "";

const API_URL = configuredApiUrl.replace(/\/$/, "");

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
};

async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  if (!API_URL) {
    throw new Error("API URL belum diset. Isi VITE_API_URL di Netlify atau edit config.js.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
