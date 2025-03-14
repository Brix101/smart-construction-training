"use server"

import type { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { and, eq, inArray, not, sql } from "drizzle-orm"

import type { Course } from "@/db/schema"
import type { updateCourseSchema } from "@/lib/validations/course"
import { db } from "@/db"
import { courseCategories, courses, topicMaterials, topics } from "@/db/schema"
import { checkRole } from "@/lib/roles"

export async function getCourse(courseId: Course["id"]) {
  try {
    const course = await db.query.courses.findFirst({
      where: and(eq(courses.id, courseId)),
      with: {
        topics: {
          where: eq(topics.isActive, true),
          orderBy: sql`COALESCE(SUBSTRING(${topics.name} FROM '^(\\d+)')::INTEGER,99999999)`,
        },
        categories: true,
      },
    })

    return course ? course : null
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function updateCourse(
  id: Course["id"],
  { categories: categoryIds, ...input }: z.infer<typeof updateCourseSchema>
) {
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

  const courseWithSameName = await db.query.courses.findFirst({
    where: and(eq(courses.name, input.name), not(eq(courses.id, id))),
    columns: {
      id: true,
    },
  })

  if (courseWithSameName) {
    throw new Error("Course name already taken")
  }

  const course = await getCourse(id)

  if (!course) {
    throw new Error("Course not found")
  }

  await db.update(courses).set(input).where(eq(courses.id, id))

  if (categoryIds) {
    const oldCategoryIds = course.categories.map(
      (category) => category.categoryId
    )

    const toUnlink = oldCategoryIds.filter(
      (catId) => !categoryIds.find((categoryId) => categoryId === catId)
    )

    const toLink = categoryIds.filter(
      (categoryId) => !oldCategoryIds.find((catId) => catId === categoryId)
    )

    if (toLink.length > 0) {
      const toLinkData = toLink.map((categoryId) => ({
        categoryId,
        courseId: id,
      }))

      await db.insert(courseCategories).values(toLinkData)
    }

    await Promise.all(
      toUnlink.map(async (categoryId) => {
        await db
          .delete(courseCategories)
          .where(
            and(
              eq(courseCategories.courseId, id),
              eq(courseCategories.categoryId, categoryId)
            )
          )
      })
    )
  }

  // revalidatePath(`/dashboard/courses/${id}`)
}

export async function deleteCourse(courseId: Course["id"]) {
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    columns: {
      id: true,
    },
    with: {
      topics: true,
    },
  })

  if (!course) {
    throw new Error("Course not found")
  }

  const topicIds = course.topics.map((topic) => topic.id)

  await db.transaction(async (tx) => {
    if (topicIds.length > 0) {
      await tx
        .delete(topicMaterials)
        .where(inArray(topicMaterials.topicId, topicIds))

      await tx.delete(topics).where(inArray(topics.id, topicIds))
    }
    await tx.delete(courses).where(eq(courses.id, courseId))
  })

  const path = "/dashboard/courses"
  revalidatePath(path)
  redirect(path)
}
