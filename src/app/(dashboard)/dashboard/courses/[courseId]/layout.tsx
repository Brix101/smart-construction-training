import { notFound, redirect } from "next/navigation"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { CourseSwitcher } from "@/components/pagers/course-switcher"
import { CourseTabs } from "@/components/pagers/course-tabs"
import { Shell } from "@/components/shells/shell"
import { db } from "@/db"
import { courses } from "@/db/schema"
import { getCacheduser } from "@/lib/actions/auth"

interface CourseLayoutProps extends React.PropsWithChildren {
  params: Promise<{
    courseId: string
  }>
}

export default async function CourseLayout(props: CourseLayoutProps) {
  const params = await props.params

  const { children } = props

  const courseId = Number(params.courseId)

  const user = await getCacheduser()

  if (!user) {
    redirect("/sign-in")
  }

  const allcourses = await db
    .select({
      id: courses.id,
      name: courses.name,
    })
    .from(courses)
    .orderBy(courses.name)

  const course = allcourses.find((course) => course.id === courseId)

  if (!course) {
    notFound()
  }

  return (
    <Shell variant="sidebar">
      <div className="xxs:flex-row flex flex-col gap-4 pr-1">
        <PageHeader className="flex-1">
          <PageHeaderHeading size="sm">Courses</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            View and manage courses{" "}
          </PageHeaderDescription>
        </PageHeader>
        {allcourses.length > 1 ? (
          <CourseSwitcher
            currentCourse={course}
            courses={allcourses}
            dashboardRedirectPath={"/dashboard/courses/new"}
          />
        ) : null}
      </div>
      <div className="space-y-8 overflow-auto">
        <CourseTabs courseId={courseId} />
        {children}
      </div>
    </Shell>
  )
}
