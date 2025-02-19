import React from "react"
import { type Metadata } from "next"

import { env } from "@/env"
import { getCourse } from "@/lib/queries/course"

import CourseContainer from "../_components/course-container"
import CourseContainerLoader from "../_components/course-container-loader"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage course",
  description: "Manage your course",
}

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
}

export default async function CoursePage(props: CoursePageProps) {
  const { courseId } = await props.params

  const coursePromise = getCourse(courseId)

  return (
    <React.Suspense fallback={<CourseContainerLoader />}>
      <CourseContainer coursePromise={coursePromise} />
    </React.Suspense>
  )
}
