"use server"

import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { and, asc, eq, ilike, lte, or } from "drizzle-orm"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { z } from "zod"

import { getErrorMessage } from "@/lib/handle-error"
import { userPublicMetadataSchema } from "@/lib/validations/auth"
import { getTopicSchema, topicSchema } from "@/lib/validations/topic"
import { TopicGroup } from "@/types/topic"
import { currentUser } from "@clerk/nextjs"
import { addTopicMaterialsLink, updateTopicMaterialsLink } from "./material"

const extendedTopicSchema = topicSchema.extend({
  courseId: z.number(),
})

type GroupedTopics = Record<number, TopicGroup>

export async function filterTopics({ query }: { query: string }) {
  noStore()
  const user = await currentUser()
  const publicMetadata = userPublicMetadataSchema.parse(user?.publicMetadata)

  try {
    if (query.length === 0) {
      return {
        data: null,
        error: null,
      }
    }

    const filteredTopics = await db
      .select({
        id: topics.id,
        name: topics.name,
        courseId: topics.courseId,
        course: courses.name,
        level: courses.level,
        isPublished: courses.isPublished,
      })
      .from(topics)
      .innerJoin(courses, eq(courses.id, topics.courseId))
      .where(
        and(
          lte(courses.level, publicMetadata.level),
          eq(courses.isPublished, true),
          or(
            ilike(courses.name, `%${query}%`),
            ilike(topics.name, `%${query}%`),
          ),
        ),
      )
      .orderBy(asc(topics.name))
      .limit(10)

    const groupedByCourse = filteredTopics.reduce((result, item) => {
      const { courseId, course, ...rest } = item
      if (!result[courseId]) {
        result[courseId] = { courseId, course, topics: [] }
      }
      result[courseId].topics.push(rest)
      return result
    }, {} as GroupedTopics)

    return {
      data: Object.values(groupedByCourse),
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export async function addTopic(input: z.infer<typeof extendedTopicSchema>) {
  const newTopic = await db
    .insert(topics)
    .values({
      ...input,
      courseId: input.courseId,
    })
    .returning({ id: topics.id })

  await addTopicMaterialsLink({
    materials: input.materials || "",
    topicId: newTopic[0].id,
  })

  revalidatePath(`/dashboard/courses/${input.courseId}/topics.`)
}

const extendedTopicSchemaWithId = extendedTopicSchema.extend({
  id: z.number(),
})

export async function updateTopic({
  materials,
  ...input
}: z.infer<typeof extendedTopicSchemaWithId>) {
  const topic = await db.query.topics.findFirst({
    where: and(eq(topics.id, input.id), eq(topics.courseId, input.courseId)),
  })

  if (!topic) {
    throw new Error("Topic not found.")
  }

  await db.update(topics).set(input).where(eq(topics.id, input.id))

  await updateTopicMaterialsLink({
    materials: materials || "",
    topicId: input.id,
  })

  revalidatePath(`/dashboard/courses/${input.courseId}/topics/${input.id}`)
}

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
  // await db
  //   .update(topics)
  //   .set({ isActive: false })
  //   .where(eq(topics.id, input.id))

  revalidatePath(`/dashboard/courses/${input.courseId}/topics`)
}
