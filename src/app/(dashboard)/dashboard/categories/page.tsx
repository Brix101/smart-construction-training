import type { Metadata } from "next"
import React from "react"
import { unauthorized } from "next/navigation"

import type { SearchParams } from "@/types"
import { getCategoryTransaction } from "@/app/_actions/category"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { env } from "@/env"
import { checkRole } from "@/lib/roles"

import { CategoriesTable } from "./_components/categories-table"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Categories",
  description: "Manage your categories settings",
}

export const dynamic = "force-dynamic"

interface CategoryPageProps {
  searchParams: Promise<SearchParams>
}

export default async function CategoriesPage(props: CategoryPageProps) {
  const searchParams = await props.searchParams
  // Parse search params using zod schema

  const transaction = getCategoryTransaction(searchParams)

  if (!checkRole("admin")) {
    unauthorized()
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="categories-header"
        aria-labelledby="categories-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex-1">
          Categories
        </PageHeaderHeading>
      </PageHeader>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={6}
            isNewRowCreatable={true}
            isRowsDeletable={true}
          />
        }
      >
        <CategoriesTable transaction={transaction} />
      </React.Suspense>
    </Shell>
  )
}
