"use server"

import { unstable_cache } from "next/cache"
import { and, asc, countDistinct, eq } from "drizzle-orm"

import type { Category } from "@/db/schema"
import { db } from "@/db"
import { categories, courseCategories } from "@/db/schema"

export async function getCategoryList() {
  return await unstable_cache(
    async () => {
      try {
        return await db
          .select({
            id: categories.id,
            name: categories.name,
            imgSrc: categories.imgSrc,
            description: categories.description,
            courseCount: countDistinct(courseCategories.courseId),
          })
          .from(categories)
          .leftJoin(
            courseCategories,
            eq(categories.id, courseCategories.categoryId)
          )
          .groupBy(categories.id, courseCategories.courseId)
          .where(eq(categories.isActive, true))
          .orderBy(asc(categories.name))
      } catch (error) {
        console.error(error)
        return []
      }
    },
    ["category-list"],
    {
      revalidate: 3600, // every hour
      tags: ["category-list"],
    }
  )()
}

export async function getCategory(id: Category["id"]) {
  try {
    const item = await db.query.categories.findFirst({
      where: and(eq(categories.id, id), eq(categories.isActive, true)),
    })

    return item ? item : null
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getCategoryCourses(id: Category["id"]) {
  try {
    return await db.query.courseCategories.findMany({
      where: eq(courseCategories.categoryId, id),
      with: {
        course: true,
      },
    })
  } catch (err) {
    console.error(err)
    return []
  }
}

