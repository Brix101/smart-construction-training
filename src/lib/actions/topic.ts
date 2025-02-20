"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { and, asc, eq, ilike, lte, or } from "drizzle-orm"
import { z } from "zod"

import type { topicSchema } from "@/lib/validations/topic"
import type { TopicGroup } from "@/types/topic"
import { db } from "@/db"
import { courses, materials, topicMaterials, topics } from "@/db/schema"
import { getCacheduser } from "@/lib/actions/auth"
import { updateTopicMaterialsLink } from "@/lib/actions/material"
import { getErrorMessage } from "@/lib/handle-error"
import { publicMetadataSchema } from "@/lib/validations/auth"
import { getTopicSchema, updateTopicSchema } from "@/lib/validations/topic"

import { checkRole } from "../roles"

type GroupedTopics = Record<string, TopicGroup>

export async function filterTopics({ query }: { query: string }) {
  noStore()
  const user = await getCacheduser()
  const publicMetadata = publicMetadataSchema.parse(user?.publicMetadata)

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
            ilike(topics.name, `%${query}%`)
          )
        )
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
//TODO: use the formdata with useActionState
export async function addTopic(
  courseId: string,
  { materials: inputTopicMaterials, ...input }: z.infer<typeof topicSchema>
) {
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

  await db.transaction(async (tx) => {
    const [newTopic] = await tx
      .insert(topics)
      .values({
        ...input,
        courseId,
      })
      .returning({ id: topics.id })

    const insertedMaterials = await tx
      .insert(materials)
      .values(inputTopicMaterials)
      .onConflictDoNothing()
      .returning({ id: materials.id })

    const newTopicMaterials = insertedMaterials.map((material) => {
      return { materialId: material.id, topicId: newTopic.id }
    })

    await tx.insert(topicMaterials).values(newTopicMaterials)
  })

  revalidatePath(`/dashboard/courses/${courseId}/topics.`)
}

const _extendedTopicSchemaWithId = updateTopicSchema.extend({
  id: z.string(),
  courseId: z.string(),
})

type UpdateTopicInput = z.infer<typeof _extendedTopicSchemaWithId>

export async function updateTopic({ materials, ...input }: UpdateTopicInput) {
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

  const topic = await db.query.topics.findFirst({
    where: and(eq(topics.id, input.id), eq(topics.courseId, input.courseId)),
  })

  if (!topic) {
    throw new Error("Topic not found.")
  }

  await db.update(topics).set(input).where(eq(topics.id, input.id))

  await updateTopicMaterialsLink(topic.id, materials || [])

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

  // await db.delete(topics).where(eq(topics.id, input.id))
  await db
    .update(topics)
    .set({ isActive: false })
    .where(eq(topics.id, input.id))

  revalidatePath(`/dashboard/courses/${input.courseId}/topics`)
}
