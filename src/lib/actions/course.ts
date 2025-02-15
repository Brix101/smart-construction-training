"use server"

import type { z } from "zod"
import { revalidatePath, unstable_cache } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { and, asc, eq, lte, not, sql } from "drizzle-orm"

import type { courseSchema } from "@/lib/validations/course"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { checkRole } from "@/lib/roles"
import { updateCourseSchema } from "@/lib/validations/course"

export async function getCourseList() {
  const { sessionClaims } = await auth()
  const level = sessionClaims?.metadata?.level ?? 1

  return await unstable_cache(
    async () => {
      try {
        return await db
          .select({
            id: courses.id,
            name: courses.name,
            description: courses.description,
            active: courses.isActive,
            level: courses.level,
          })
          .from(courses)
          .where(and(eq(courses.isPublished, true), lte(courses.level, level)))
          .orderBy(asc(courses.name))
      } catch (error) {
        console.error(error)
        return []
      }
    },
    ["courses-list"],
    {
      revalidate: 1,
      tags: ["courses-list"],
    }
  )()
}

export async function getCourses() {
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

  return await unstable_cache(
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      return db.select().from(courses).orderBy(asc(courses.name))
    },
    ["all-courses"],
    {
      revalidate: 1,
      tags: ["all-courses"],
    }
  )()
}

export async function getCourseAlertCount() {
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

  return await unstable_cache(
    async () => {
      return db
        .select({
          isPublished: courses.isPublished,
          count: sql<number>`count(${courses.isPublished})`,
        })
        .from(courses)
        .groupBy(sql`${courses.isPublished}`)
    },
    ["courses-alert-count"],
    {
      revalidate: 1,
      tags: ["courses-alert-countt"],
    }
  )()
}

export async function addCourse(input: z.infer<typeof courseSchema>) {
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

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
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

  await db
    .update(courses)
    .set({
      isPublished: true,
    })
    .where(eq(courses.id, courseId))

  revalidatePath(`/dashboard/courses/${courseId}`)
}

export async function updateCourse(courseId: number, fd: FormData) {
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

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
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

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
