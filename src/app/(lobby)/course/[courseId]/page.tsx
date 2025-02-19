import React from "react"

import { CourseShell } from "@/app/(lobby)/_components/course-shell"
import CourseShellLoader from "@/app/(lobby)/_components/course-shell-loader"
import { getCourse } from "@/lib/queries/course"

export const dynamic = "force-dynamic"

interface TopicsPageProps {
  params: Promise<{
    courseId: string
  }>
}

export default async function CourseTopicsPage(props: TopicsPageProps) {
  const { courseId } = await props.params

  const coursePromise = getCourse(courseId)

  return (
    <React.Suspense fallback={<CourseShellLoader />}>
      <CourseShell coursePromise={coursePromise} />
    </React.Suspense>
  )
}
