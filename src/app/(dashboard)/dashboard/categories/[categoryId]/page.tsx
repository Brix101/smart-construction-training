import React from "react"
import { type Metadata } from "next"

import { getCategory } from "@/app/_actions/category"
import { env } from "@/env"

import {
  CategoryContainer,
  CategoryContainerLoader,
} from "../_components/category-container"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage category",
  description: "Manage your category",
}

interface CategoryPageProps {
  params: Promise<{
    categoryId: string
  }>
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { categoryId } = await props.params

  const categoryPromise = getCategory(categoryId)

  return (
    <React.Suspense fallback={<CategoryContainerLoader />}>
      <CategoryContainer categoryPromise={categoryPromise} />
    </React.Suspense>
  )
}
