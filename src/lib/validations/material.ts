import * as z from "zod"

export const materialSchema = z.object({
  name: z.string().optional().default(""),
  link: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.literal("")),
  type: z.enum(["download", "upload"]),
})

export const topicMaterialSchema = z.object({
  materials: z.string(),
  topicId: z.string(),
})
