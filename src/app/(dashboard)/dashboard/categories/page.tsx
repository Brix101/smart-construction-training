import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"
import { env } from "@/env"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Courses",
  description: "Manage your courses settings",
}

export const dynamic = "force-dynamic"

export default function CategoriesPage() {
  return (
    <Shell variant="sidebar">
      <PageHeader id="courses-header" aria-labelledby="courses-header-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeaderHeading size="sm" className="flex-1">
            Categories
          </PageHeaderHeading>
          <Link
            aria-label="Create course"
            href="/dashboard/categories/new"
            className={cn(
              buttonVariants({
                size: "sm",
              })
            )}
          >
            Add Category
          </Link>
        </div>
      </PageHeader>
    </Shell>
  )
}
