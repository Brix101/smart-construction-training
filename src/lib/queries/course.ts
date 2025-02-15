"use server"

import { unstable_cache } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { and, eq, lte, sql } from "drizzle-orm"

import type { Course, Topic } from "@/db/schema"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"

export async function getCourse(courseId: Course["id"]) {
  const { sessionClaims } = await auth()
  const level = sessionClaims?.metadata?.level ?? 1

  return await unstable_cache(
    async () => {
      try {
        const course = await db.query.courses.findFirst({
          where: and(
            eq(courses.id, courseId),
            eq(courses.isPublished, true),
            lte(courses.level, level)
          ),
          with: {
            topics: {
              where: eq(topics.isActive, true),
              orderBy: sql`COALESCE(SUBSTRING(${topics.name} FROM '^(\\d+)')::INTEGER,99999999)`,
            },
          },
        })

        return course ? course : null
      } catch (err) {
        console.error(err)
        return null
      }
    },
    ["course ", String(courseId)],
    { revalidate: 1, tags: ["course", String(courseId)] }
  )()
}

export async function getCourseTopic(
  couseId: Course["id"],
  topicId: Topic["id"]
) {
  return await db.query.topics.findFirst({
    where: and(eq(topics.courseId, couseId), eq(topics.id, topicId)),
    with: {
      materials: {
        with: {
          material: true,
        },
      },
    },
  })
}
