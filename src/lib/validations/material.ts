import * as z from "zod"

export const materialSchema = z.object({
  materials: z.string(),
  topicId: z.string(),
})
