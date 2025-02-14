"use server"

import type { z } from "zod"
import { unstable_cache as cache, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { and, asc, eq, lte, not, sql } from "drizzle-orm"

import type { courseSchema } from "@/lib/validations/course"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { getCacheduser } from "@/lib/actions/auth"
import { publicMetadataSchema } from "@/lib/validations/auth"
import { updateCourseSchema } from "@/lib/validations/course"

export async function getAllCourses() {
  return await cache(
    async () => {
      return db.select().from(courses).orderBy(asc(courses.name))
    },
    ["all-courses"],
    {
      revalidate: 1,
      tags: ["all-courses"],
    }
  )()
}

export async function getPublishedCourses() {
  const user = await getCacheduser()
  const publicMetadata = publicMetadataSchema.parse(user?.publicMetadata)

  return await cache(
    async () => {
      return db
        .select({
          id: courses.id,
          name: courses.name,
          description: courses.description,
          active: courses.isActive,
          level: courses.level,
        })
        .from(courses)
        .where(
          and(
            eq(courses.isPublished, true),
            lte(courses.level, publicMetadata.level)
          )
        )
        .orderBy(asc(courses.name))
    },
    ["published-courses"],
    {
      revalidate: 1,
      tags: ["published-courses"],
    }
  )()
}

export async function getPublishedCourse() {
  return await cache(
    async () => {
      return db
        .select({
          isPublished: courses.isPublished,
          count: sql<number>`count(${courses.isPublished})`,
        })
        .from(courses)
        .groupBy(sql`${courses.isPublished}`)
    },
    ["courses-published-count"],
    {
      revalidate: 1,
      tags: ["courses-published-countt"],
    }
  )()
}

export async function addCourse(input: z.infer<typeof courseSchema>) {
  const courseWithSameName = await db.query.courses.findFirst({
    where: eq(courses.name, input.name),
  })

  if (courseWithSameName) {
    throw new Error("Course name already taken.")
  }

  await db.insert(courses).values({
    name: input.name,
    description: input.description,
  })

  revalidatePath("/dashboard/courses")
}

export async function publishCourse(courseId: number) {
  await db
    .update(courses)
    .set({
      isPublished: true,
    })
    .where(eq(courses.id, courseId))

  revalidatePath(`/dashboard/courses/${courseId}`)
}

export async function updateCourse(courseId: number, fd: FormData) {
  const input = updateCourseSchema.parse({
    name: fd.get("name"),
    description: fd.get("description"),
    level: fd.get("level"),
    isPublished: fd.get("isPublished")?.toString() === "on",
  })

  const courseWithSameName = await db.query.courses.findFirst({
    where: and(eq(courses.name, input.name), not(eq(courses.id, courseId))),
    columns: {
      id: true,
    },
  })

  if (courseWithSameName) {
    throw new Error("Course name already taken")
  }

  await db
    .update(courses)
    .set({
      name: input.name,
      description: input.description,
      level: input.level,
      isPublished: input.isPublished,
    })
    .where(eq(courses.id, courseId))

  revalidatePath(`/dashboard/courses/${courseId}`)
}

export async function deleteCourse(courseId: number) {
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    columns: {
      id: true,
    },
  })

  if (!course) {
    throw new Error("Course not found")
  }

  await db.delete(courses).where(eq(courses.id, courseId))

  // Delete all topics of this course
  await db.delete(topics).where(eq(topics.courseId, courseId))

  const path = "/dashboard/courses"
  revalidatePath(path)
  redirect(path)
}
