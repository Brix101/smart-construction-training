import { createInsertSchema } from "drizzle-zod"

import { categories } from "@/db/schema"

export const createCategorySchema = createInsertSchema(categories, {
  name: (s) => s.min(1, { message: "Category name is required." }).max(255),
  description: (s) => s.max(255),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
