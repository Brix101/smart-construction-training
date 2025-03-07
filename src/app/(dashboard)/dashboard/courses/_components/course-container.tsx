import { type Metadata } from "next"
import { notFound } from "next/navigation"

import type { getCourse } from "@/app/_actions/course"
import { getCategories } from "@/app/_actions/category"
import { PublishCourseButton } from "@/components/activate-course-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { env } from "@/env"

import { UpdateCourseForm } from "./update-course-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage course",
  description: "Manage your course",
}

interface CourseContainerProps {
  coursePromise: ReturnType<typeof getCourse>
}

export default async function CourseContainer(props: CourseContainerProps) {
  const [course] = await Promise.all([props.coursePromise])

  if (!course) {
    notFound()
  }

  const categories = await getCategories()

  return (
    <div className="space-y-10">
      {!course.isPublished && (
        <Card id="publish-course" aria-labelledby="publish-couse-heading">
          <CardHeader className="space-y-1">
            <CardTitle className="line-clamp-1 text-2xl">
              Publish Your Course
            </CardTitle>
            <CardDescription>
              Make this course available for users to access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PublishCourseButton courseId={course.id} />
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Keep Your Course Up to Date
          </CardTitle>
          <CardDescription>
            Modify course details or remove it if no longer needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateCourseForm course={course} categories={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
