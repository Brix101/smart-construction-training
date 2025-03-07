import * as z from "zod"

export const courseSchema = z.object({
  name: z.string().min(3).max(50),
  level: z.coerce.number(),
  description: z.string().optional(),
  categories: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one category."),
})

export const getCourseSchema = z.object({
  id: z.number(),
  userId: z.string(),
})

export const getCoursesSchema = z.object({
  description: z.string().optional(),
  limit: z.number().default(10).optional(),
  offset: z.number().default(0).optional(),
  sort: z.string().optional().nullable(),
  statuses: z.string().optional().nullable(),
  userId: z.string().optional(),
})

export const updateCourseSchema = courseSchema.extend({
  isPublished: z.boolean(),
})
