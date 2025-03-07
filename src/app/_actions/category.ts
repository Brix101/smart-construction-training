"use server"

import type { SearchParams } from "next/dist/server/request/search-params"
import { revalidatePath, unstable_cache, unstable_noStore } from "next/cache"
import {
  and,
  asc,
  countDistinct,
  desc,
  eq,
  ilike,
  inArray,
  sql,
} from "drizzle-orm"

import type { Category } from "@/db/schema"
import { db } from "@/db"
import { categories, courseCategories } from "@/db/schema"
import { checkRole } from "@/lib/roles"
import { CategoryInput } from "@/lib/validations/category"
import { searchParamsSchema } from "@/lib/validations/params"

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
          .groupBy(categories.id, courseCategories.categoryId)
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

export async function getCategoryTransaction(searchParams: SearchParams) {
  const { page, per_page, name, sort } = searchParamsSchema.parse(searchParams)

  // Fallback page for invalid page numbers
  const pageAsNumber = Number(page)
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  // Number of items per page
  const perPageAsNumber = Number(per_page)
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0
  // Column and order to sort by
  const [column, order] = (sort?.split(".") as [
    keyof Category | undefined,
    "asc" | "desc" | undefined,
  ]) ?? ["createdAt", "desc"]

  // Transaction is used to ensure both queries are executed in a single transaction
  unstable_noStore()

  const transaction = db.transaction(async (tx) => {
    const whereFilter = and(
      eq(categories.isActive, true),
      // Filter by name
      name ? ilike(categories.name, `%${name}%`) : undefined
    )

    const items = await tx
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
      .groupBy(categories.id, courseCategories.categoryId)
      .limit(limit)
      .offset(offset)
      .where(whereFilter)
      .orderBy(
        column && column in categories
          ? order === "asc"
            ? asc(categories[column])
            : desc(categories[column])
          : desc(categories.createdAt)
      )

    const count = await tx
      .select({
        count: sql<number>`count(${categories.id})`,
      })
      .from(categories)
      .where(whereFilter)
      .then((res) => res[0]?.count ?? 0)

    return {
      items,
      count,
      pageCount: Math.ceil(count / limit),
    }
  })

  return transaction
}

export async function addCategory(input: CategoryInput) {
  try {
    if (!checkRole("admin")) {
      throw new Error("Unauthorized")
    }

    await db.insert(categories).values(input)

    revalidatePath("/dashboard/caregories")
  } catch (error) {
    throw error
  }
}

export async function updateCategory(id: Category["id"], input: CategoryInput) {
  try {
    if (!checkRole("admin")) {
      throw new Error("Unauthorized")
    }

    await db.update(categories).set(input).where(eq(categories.id, id))

    revalidatePath(`/dashboard/categories/${id}`)
    revalidatePath(`/dashboard/categories`)
  } catch (error) {
    throw error
  }
}

export async function deleteCategory(id: Category["id"]) {
  const category = await getCategory(id)

  if (!category) {
    throw new Error("Category not found.")
  }

  await db.delete(categories).where(eq(categories.id, category.id))

  revalidatePath(`/dashboard/categories`)
}

export async function deleteCategories(ids: Category["id"][]) {
  if (!checkRole("admin")) {
    throw new Error("Unauthorized")
  }

  await db.delete(categories).where(inArray(categories.id, ids))

  revalidatePath(`/dashboard/categories`)
}
