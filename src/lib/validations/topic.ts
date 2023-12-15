import * as z from "zod"

export const topicSchema = z.object({
  name: z.string().min(3).max(256),
  urlId: z.string().max(100),
  videoLink: z.string().min(3).max(256),
  details: z.string().optional(),
})

export const getTopicSchema = z.object({
  id: z.number(),
  courseId: z.number(),
})
