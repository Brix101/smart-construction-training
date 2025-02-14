"use server"

import { db } from "@/db"
import { Course, courses, topics } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { unstable_cache } from "next/cache"

export async function getCourse(courseId: Course["id"]) {
  return await unstable_cache(
    async () => {
      return db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
          topics: {
            where: eq(topics.isActive, true),
            orderBy: sql`COALESCE(SUBSTRING(${topics.name} FROM '^(\\d+)')::INTEGER,99999999)`,
          },
        },
      })
    },
    ["course ", String(courseId)],
    { revalidate: 1, tags: ["course", String(courseId)] },
  )()
}
