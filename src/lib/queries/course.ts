"use server"

import { unstable_cache } from "next/cache"
import { and, eq, lte, sql } from "drizzle-orm"

import type { Course } from "@/db/schema"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { getCacheduser } from "@/lib/actions/auth"
import { publicMetadataSchema } from "@/lib/validations/auth"

export async function getCourse(courseId: Course["id"]) {
  const user = await getCacheduser()
  const metadata = publicMetadataSchema.parse(user?.publicMetadata)

  return await unstable_cache(
    async () => {
      try {
        const course = await db.query.courses.findFirst({
          where: and(
            eq(courses.id, courseId),
            eq(courses.isPublished, true),
            lte(courses.level, metadata.level)
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
