import { neon, Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres"

import { env } from "@/env"

import * as schema from "./schema"

const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

export const dbPool = pgDrizzle(pool)

const connection = neon(env.DATABASE_URL!)
export const db = drizzle(connection, {
  schema,
  logger: env.NODE_ENV === "development",
  casing: "snake_case",
})
