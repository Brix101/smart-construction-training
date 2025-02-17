import { Pool } from "@neondatabase/serverless"
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"

import { env } from "@/env"

import * as schema from "./schema"

const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

export const dbPool = pgDrizzle(pool, {
  logger: env.NODE_ENV === "development",
  casing: "snake_case",
})

export const db = drizzle({
  schema,
  logger: env.NODE_ENV === "development",
  casing: "snake_case",
})
