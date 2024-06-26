import { env } from "@/env.mjs"
import { clerkClient } from "@clerk/nextjs"
import type { Metadata } from "next"
import * as React from "react"

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { searchParamsSchema } from "@/lib/validations/params"
import { UsersTableShell } from "../_components/users-table-shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Users",
  description: "Manage your users settings",
}

interface UsersPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { page, per_page, firstName } = searchParamsSchema.parse(searchParams)

  // Fallback page for invalid page numbers
  const pageAsNumber = Number(page)
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  // Number of items per page
  const perPageAsNumber = Number(per_page)
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0

  const count = await clerkClient.users.getCount()
  const userList = await clerkClient.users.getUserList({
    limit,
    offset,
    query: firstName,
  })
  const transaction = Promise.resolve({
    items: JSON.parse(JSON.stringify(userList)),
    count,
  })

  return (
    <React.Suspense
      fallback={
        <DataTableSkeleton
          columnCount={6}
          isNewRowCreatable={true}
          isRowsDeletable={true}
        />
      }
    >
      <UsersTableShell transaction={transaction} limit={limit} />
    </React.Suspense>
  )
}
