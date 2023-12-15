"use server"

import { db } from "@/db"
import { topics } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getTopicSchema } from "@/lib/validations/topic"

export async function deleteTopic(rawInput: z.infer<typeof getTopicSchema>) {
  const input = getTopicSchema.parse(rawInput)

  const topic = await db.query.topics.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(topics.id, input.id), eq(topics.courseId, input.courseId)),
  })

  if (!topic) {
    throw new Error("Topic not found.")
  }

  await db.delete(topics).where(eq(topics.id, input.id))

  revalidatePath(`/dashboard/courses/${input.courseId}/topics`)
}
