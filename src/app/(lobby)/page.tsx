import React from "react"

import { getCategoryList } from "@/app/_actions/category"
import { Shell } from "@/components/shell"

import {
  CategoryContent,
  CategoryContentSkeleton,
} from "./category/_components/category-content"

export const dynamic = "force-dynamic"

export default async function IndexPage() {
  const categoryPromises = getCategoryList()

  return (
    <Shell>
      <React.Suspense fallback={<CategoryContentSkeleton />}>
        <CategoryContent categoriesPromises={categoryPromises} />
      </React.Suspense>
    </Shell>
  )
}
