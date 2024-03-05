"use server"

import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { and, asc, eq, not } from "drizzle-orm"
import { revalidatePath, unstable_cache as cache } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { courseSchema, updateCourseSchema } from "@/lib/validations/course"

export async function getCourses() {
  return await cache(
    async () => {
      return db.select().from(courses).orderBy(asc(courses.name))
    },
    ["all-courses"],
    {
      revalidate: 1,
      tags: ["all-courses"],
    },
  )()
}

export async function getActiveCourses() {
  return await cache(
    async () => {
      return db
        .select({
          id: courses.id,
          name: courses.name,
          description: courses.description,
          active: courses.active,
        })
        .from(courses)
        .where(eq(courses.active, true))
        .orderBy(asc(courses.name))
    },
    ["active-courses"],
    {
      revalidate: 1,
      tags: ["active-courses"],
    },
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

export async function updateCourse(courseId: number, fd: FormData) {
  const input = updateCourseSchema.parse({
    name: fd.get("name"),
    description: fd.get("description"),
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
