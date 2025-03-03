"use server"

import { unstable_cache } from "next/cache"
import { asc, count, countDistinct, eq } from "drizzle-orm"

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
