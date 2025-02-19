import React from "react"
import { redirect } from "next/navigation"

import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { CourseSwitcher } from "@/components/pagers/course-switcher"
import { CourseTabs } from "@/components/pagers/course-tabs"
import { Shell } from "@/components/shell"
import { Skeleton } from "@/components/ui/skeleton"
import { getCacheduser } from "@/lib/actions/auth"
import { getCourses } from "@/lib/actions/course"

interface CourseLayoutProps extends React.PropsWithChildren {
  params: Promise<{
    courseId: string
  }>
}

export default async function CourseLayout(props: CourseLayoutProps) {
  const { courseId } = await props.params

  const { children } = props

  const user = await getCacheduser()
  const coursesPromise = getCourses()

  if (!user) {
    redirect("/sign-in")
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
