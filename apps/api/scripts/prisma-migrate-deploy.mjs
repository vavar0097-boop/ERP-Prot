import { spawnSync } from "node:child_process";
import { config } from "dotenv";

config();
config({ path: "apps/api/.env" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is required before running Prisma migrations.");
  process.exit(1);
}

function deriveSupabaseDirectUrl(rawUrl) {
  const url = new URL(rawUrl);
  const isSupabasePooler = url.hostname.includes("pooler.supabase.com");
  const projectRef = decodeURIComponent(url.username).replace(/^postgres\./, "");

  if (!isSupabasePooler || !projectRef || projectRef === url.username) {
    return null;
  }

  const direct = new URL(rawUrl);
  direct.hostname = `db.${projectRef}.supabase.co`;
  direct.port = "5432";
  direct.username = "postgres";
  direct.searchParams.delete("pgbouncer");
  direct.searchParams.set("sslmode", "require");

  return direct.toString();
}

const migrationDatabaseUrl =
  process.env.MIGRATE_DATABASE_URL ||
  process.env.DIRECT_URL ||
  deriveSupabaseDirectUrl(databaseUrl) ||
  databaseUrl;

const result = spawnSync(
  "npm",
  ["run", "prisma:migrate", "--workspace=@erp-besi/api"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: migrationDatabaseUrl,
    },
  }
);

process.exit(result.status ?? 1);
