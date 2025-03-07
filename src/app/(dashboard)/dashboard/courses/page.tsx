import type { Metadata } from "next"
import * as React from "react"
import Link from "next/link"
import { unauthorized } from "next/navigation"

import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"
import { env } from "@/env"
import { getCourseAlertCount, getCourses } from "@/lib/actions/course"
import { checkRole } from "@/lib/roles"
import { cn } from "@/lib/utils"

import { CourseAlertCount } from "./_components/course-alert-count"
import CourseAlertSkeleton from "./_components/course-alert-skeleton"
import {
  CourseListContainer,
  CourseListContainerLoader,
} from "./_components/course-list-container"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Courses",
  description: "Manage your courses settings",
}

export const dynamic = "force-dynamic"

export default async function CoursesPage() {
  const coursesPromise = getCourses()
  const alertCountPromise = getCourseAlertCount()

  if (!checkRole("admin")) {
    unauthorized()
  }

  return (
    <Shell variant="sidebar">
      <PageHeader id="courses-header" aria-labelledby="courses-header-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeaderHeading size="sm" className="flex-1">
            Courses
          </PageHeaderHeading>
          <Link
            aria-label="Create course"
            href="/dashboard/courses/new"
            className={cn(
              buttonVariants({
                size: "sm",
              })
            )}
          >
            Create course
          </Link>
        </div>
      </PageHeader>
      <React.Suspense fallback={<CourseAlertSkeleton />}>
        <CourseAlertCount alertCountPromise={alertCountPromise} />
      </React.Suspense>
      <React.Suspense fallback={<CourseListContainerLoader />}>
        <CourseListContainer coursesPromise={coursesPromise} />
      </React.Suspense>
    </Shell>
  )
}
