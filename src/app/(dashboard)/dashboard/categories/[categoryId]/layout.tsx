import React from "react"
import { unauthorized } from "next/navigation"

import { getCategoryList } from "@/app/_actions/category"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { Skeleton } from "@/components/ui/skeleton"
import { getCacheduser } from "@/lib/actions/auth"

import { CategorySwitcher } from "../_components/category-switcher"

export default async function CategoryLayout(props: React.PropsWithChildren) {
  const { children } = props

  const user = await getCacheduser()
  const categoriesPromise = getCategoryList()

  if (!user) {
    unauthorized()
  }

  return (
    <Shell variant="sidebar">
      <div className="xxs:flex-row flex flex-col gap-4 pr-1">
        <PageHeader className="flex-1">
          <PageHeaderHeading size="sm">Categories</PageHeaderHeading>
        </PageHeader>

        <React.Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <CategorySwitcher
            categoriesPromise={categoriesPromise}
            dashboardRedirectPath={"/dashboard/categories/new"}
          />
        </React.Suspense>
      </div>
      {children}
    </Shell>
  )
}
