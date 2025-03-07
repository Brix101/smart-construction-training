import React from "react"
import { unauthorized } from "next/navigation"

import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { CourseSwitcher } from "@/components/pagers/course-switcher"
import { CourseTabs } from "@/components/pagers/course-tabs"
import { Shell } from "@/components/shell"
import { Skeleton } from "@/components/ui/skeleton"
import { getCourses } from "@/lib/actions/course"
import { checkRole } from "@/lib/roles"

interface CourseLayoutProps extends React.PropsWithChildren {
  params: Promise<{
    courseId: string
  }>
}

export default async function CourseLayout(props: CourseLayoutProps) {
  const { courseId } = await props.params

  const { children } = props

  const coursesPromise = getCourses()

  if (!checkRole("admin")) {
    unauthorized()
  }

  return (
    <Shell variant="sidebar">
      <div className="xxs:flex-row flex flex-col gap-4 pr-1">
        <PageHeader className="flex-1">
          <PageHeaderHeading size="sm">Courses</PageHeaderHeading>
        </PageHeader>

        <React.Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <CourseSwitcher
            coursesPromise={coursesPromise}
            dashboardRedirectPath={"/dashboard/courses/new"}
          />
        </React.Suspense>
      </div>
      <div className="space-y-8 overflow-auto">
        <CourseTabs courseId={courseId} />
        {children}
      </div>
    </Shell>
  )
}
