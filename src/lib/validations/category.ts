import type { z } from "zod"
import { createInsertSchema } from "drizzle-zod"

import { categories } from "@/db/schema"

export const categorySchema = createInsertSchema(categories, {
  name: (s) => s.min(1, { message: "Category name is required." }).max(255),
  description: (s) => s.max(255),
}).omit({
  id: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
})

export type CategoryInput = z.infer<typeof categorySchema>
