import React from "react"

import { getCategory, getCategoryCourses } from "@/app/_actions/category"
import { Shell } from "@/components/shell"

import {
  CategoryCourseContent,
  CategoryCourseContentSkeleton,
} from "../_components/category-course-content"
import {
  CategoryHeader,
  CategoryHeaderSkeleton,
} from "../_components/category-header"

export const dynamic = "force-dynamic"

interface CategoryPageProps {
  params: Promise<{
    categoryId: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params

  const categoryPromise = getCategory(categoryId)
  const categoryCoursesPromise = getCategoryCourses(categoryId)

  return (
    <Shell>
      <React.Suspense fallback={<CategoryHeaderSkeleton />}>
        <CategoryHeader categoryPromise={categoryPromise} />
      </React.Suspense>
      <React.Suspense fallback={<CategoryCourseContentSkeleton />}>
        <CategoryCourseContent
          categoryCoursesPromise={categoryCoursesPromise}
        />
      </React.Suspense>
    </Shell>
  )
}
