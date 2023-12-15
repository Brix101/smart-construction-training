import * as z from "zod"

export const getTopicSchema = z.object({
  id: z.number(),
  courseId: z.number(),
})
