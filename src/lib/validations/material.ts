import * as z from "zod"

export const materialSchema = z.object({
  materialLink: z.string().max(100),
})
