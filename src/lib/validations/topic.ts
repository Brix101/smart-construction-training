import * as z from "zod"
import { materialSchema } from "@/lib/validations/material"

export const topicSchema = z.object({
  name: z.string().min(3).max(256),
  youtubeId: z.string().max(100),
  youtubeUrl: z.string().min(3).max(256),
  description: z.string().optional(),
  materials: z.array(materialSchema),
})

export const getTopicSchema = z.object({
  id: z.number(),
  courseId: z.number(),
})

export const getTopicsSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  sort: z.string().optional().nullable(),
  store_ids: z.string().optional().nullable(),
  active: z.string().optional().nullable(),
})
