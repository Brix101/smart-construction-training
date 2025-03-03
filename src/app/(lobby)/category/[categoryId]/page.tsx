import React from "react"

import { getCategory } from "@/app/_actions/category"
import { Shell } from "@/components/shell"

import {
  CategoryHeader,
  CategoryHeaderSkeleton,
} from "../../_components/category-header"

export const dynamic = "force-dynamic"

interface CategoryPageProps {
  params: Promise<{
    categoryId: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params

  const categoryPromise = getCategory(categoryId)

  return (
    <Shell>
      <React.Suspense fallback={<CategoryHeaderSkeleton />}>
        <CategoryHeader categoryPromise={categoryPromise} />
      </React.Suspense>
      <div>{categoryId}</div>
    </Shell>
  )
}
