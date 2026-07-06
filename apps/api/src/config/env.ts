import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  FRONTEND_URLS: z.string().optional(),
  ADMIN_EMAIL: z.string().email().default("admin@erpbesi.local"),
  ADMIN_PASSWORD: z.string().min(8).default("Admin12345"),
  AUTH_SECRET: z.string().min(16).default("erp-besi-dev-secret"),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
