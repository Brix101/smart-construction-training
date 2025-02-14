import type { Metadata } from "next"
import * as React from "react"
import { clerkClient } from "@clerk/nextjs/server"

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { env } from "@/env"
import { searchParamsSchema } from "@/lib/validations/params"

import { UsersTableShell } from "../_components/users-table-shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Users",
  description: "Manage your users settings",
}

interface UsersPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export const dynamic = "force-dynamic"

export default async function UsersPage(props: UsersPageProps) {
  const searchParams = await props.searchParams
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

  const client = await clerkClient()
  const count = await client.users.getCount()
  const userList = await client.users.getUserList({
    limit,
    offset,
    query: firstName,
  })

  const transaction = Promise.resolve({
    items: JSON.parse(JSON.stringify(userList.data)),
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
