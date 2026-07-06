import { config } from "dotenv";

config();
config({ path: "apps/api/.env" });
config({ path: "apps/web/.env" });

const apiKeys = ["DATABASE_URL", "DIRECT_URL", "MIGRATE_DATABASE_URL", "NODE_ENV", "FRONTEND_URL"];
const webKeys = ["VITE_API_URL"];

function redactUrl(value) {
  if (!value) return "MISSING";

  try {
    const url = new URL(value);
    if (url.password) url.password = "***";
    return url.toString();
  } catch {
    return value;
  }
}

function printGroup(title, keys) {
  console.log(`\n${title}`);
  for (const key of keys) {
    console.log(`${key}=${redactUrl(process.env[key])}`);
  }
}

printGroup("Backend env", apiKeys);
printGroup("Frontend env", webKeys);

const warnings = [];

if (!process.env.DATABASE_URL) warnings.push("DATABASE_URL belum diset untuk backend.");
if (!process.env.FRONTEND_URL) warnings.push("FRONTEND_URL belum diset untuk CORS backend.");
if (!process.env.VITE_API_URL) warnings.push("VITE_API_URL belum diset untuk build Netlify.");

if (process.env.DATABASE_URL?.includes("pooler.supabase.com") && !process.env.DIRECT_URL && !process.env.MIGRATE_DATABASE_URL) {
  warnings.push("Supabase pooler terdeteksi. Set DIRECT_URL atau MIGRATE_DATABASE_URL untuk migration.");
}

if (warnings.length > 0) {
  console.log("\nWarnings");
  for (const warning of warnings) console.log(`- ${warning}`);
}
