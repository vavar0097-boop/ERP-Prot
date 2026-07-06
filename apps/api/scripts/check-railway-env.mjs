const requiredEnv = ["DATABASE_URL"];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error("Railway environment is missing required variables:");
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  console.error("");
  console.error("Set DATABASE_URL on the Railway backend service.");
  console.error("If using Railway PostgreSQL, reference the database variable, for example:");
  console.error('DATABASE_URL=${{Postgres.DATABASE_URL}}');
  process.exit(1);
}

if (!process.env.FRONTEND_URL) {
  console.warn("FRONTEND_URL is not set. CORS will only use the local default.");
}
