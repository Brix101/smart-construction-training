import * as z from "zod"

import { materialSchema } from "./material"

export const topicSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  youtubeUrl: z.string().url({
    message: "Invalid YouTube URL",
  }),
  description: z.string().optional(),
  materials: z.array(materialSchema).optional(),
})

export const getTopicSchema = z.object({
  id: z.string(),
  courseId: z.string(),
})

export const getTopicsSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  sort: z.string().optional().nullable(),
  store_ids: z.string().optional().nullable(),
  active: z.string().optional().nullable(),
})
