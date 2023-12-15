import { env } from "@/env.mjs"
import type { Metadata } from "next"

import { courseColumns } from "@/components/data-table/columns/course.columns"
import { DataTable } from "@/components/data-table/data-table"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { db } from "@/db"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Courses",
  description: "Manage your courses settings",
}

export default async function CoursesPage() {
  const allCourses = await db.query.courses.findMany({
    with: {
      materials: true,
    },
  })

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="courses-header"
        aria-labelledby="courses-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Courses</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your courses settings
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-courses-info"
        aria-labelledby="user-courses-info-heading"
        className="w-full overflow-hidden"
      >
        <DataTable data={allCourses} columns={courseColumns} />
      </section>
    </Shell>
  )
}
