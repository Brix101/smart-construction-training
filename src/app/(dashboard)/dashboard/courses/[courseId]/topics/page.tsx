import * as React from "react"
import { type Metadata } from "next"
import { unstable_noStore as noStore } from "next/cache"
import { and, asc, desc, eq, like, sql } from "drizzle-orm"

import type { Topic } from "@/db/schema"
import type { SearchParams } from "@/types"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { TopicsTableShell } from "@/components/shells/topics-table-shell"
import { db } from "@/db"
import { topics } from "@/db/schema"
import { env } from "@/env"
import { searchParamsSchema } from "@/lib/validations/params"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Topics",
  description: "Manage your topics",
}

interface TopicsPageProps {
  params: Promise<{
    courseId: string
  }>
  searchParams: Promise<SearchParams>
}

export default async function TopicsPage(props: TopicsPageProps) {
  const searchParams = await props.searchParams
  const { courseId } = await props.params

  // Parse search params using zod schema
  const { page, per_page, sort, name } = searchParamsSchema.parse(searchParams)

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
    keyof Topic | undefined,
    "asc" | "desc" | undefined,
  ]) ?? ["createdAt", "desc"]

  // Transaction is used to ensure both queries are executed in a single transaction
  noStore()

  const transaction = db.transaction(async (tx) => {
    const items = await tx
      .select({
        id: topics.id,
        name: topics.name,
        youtubeUrl: topics.youtubeUrl,
        createdAt: topics.createdAt,
      })
      .from(topics)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          eq(topics.isActive, true),
          eq(topics.courseId, courseId),
          // Filter by name
          name ? like(topics.name, `%${name}%`) : undefined
        )
      )
      .orderBy(
        column && column in topics
          ? order === "asc"
            ? asc(topics[column])
            : desc(topics[column])
          : desc(topics.createdAt)
      )

    const count = await tx
      .select({
        count: sql<number>`count(${topics.id})`,
      })
      .from(topics)
      .where(
        and(
          eq(topics.courseId, courseId),
          // Filter by name
          name ? like(topics.name, `%${name}%`) : undefined
        )
      )
      .then((res) => res[0]?.count ?? 0)

    return {
      items,
      count,
    }
  })

  return (
    <div className="space-y-6">
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={6}
            isNewRowCreatable={true}
            isRowsDeletable={true}
          />
        }
      >
        <TopicsTableShell
          transaction={transaction}
          limit={limit}
          courseId={courseId}
        />
      </React.Suspense>
    </div>
  )
}
