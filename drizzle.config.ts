import { env } from "@/env.mjs"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/db/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: env.DATABASE_URL ?? "",
  },
  verbose: true,
  strict: true,
})
