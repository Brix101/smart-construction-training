import { type Metadata } from "next"
import { notFound } from "next/navigation"

import type { getCourse } from "@/lib/queries/course"
import { PublishCourseButton } from "@/components/activate-course-button"
import { LoadingButton } from "@/components/loading-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { env } from "@/env"
import { deleteCourse, updateCourse } from "@/lib/actions/course"

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
          <form
            action={updateCourse.bind(null, course.id)}
            className="grid w-full max-w-xl gap-5"
          >
            {course.isPublished && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="update-couse-published">Published</Label>
                <Switch
                  id="update-course-published"
                  name="isPublished"
                  defaultChecked={course.isPublished}
                />
              </div>
            )}
            <div className="grid gap-2.5">
              <Label htmlFor="update-course-name">Name</Label>
              <Input
                id="update-course-name"
                aria-describedby="update-course-name-description"
                name="name"
                required
                minLength={3}
                maxLength={50}
                placeholder="Type course name here."
                defaultValue={course.name}
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="update-course-name">Level</Label>
              <Input
                id="update-course-name"
                aria-describedby="update-course-name-description"
                name="level"
                required
                type="number"
                min={1}
                placeholder="Type course level here."
                defaultValue={course.level}
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="update-course-description">Description</Label>
              <Textarea
                id="update-course-description"
                aria-describedby="update-course-description-description"
                name="description"
                minLength={3}
                maxLength={255}
                placeholder="Type course description here."
                defaultValue={course.description ?? ""}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <LoadingButton>
                Update course
                <span className="sr-only">Update course</span>
              </LoadingButton>
              <LoadingButton
                formAction={deleteCourse.bind(null, course.id)}
                variant="destructive"
              >
                Delete course
                <span className="sr-only">Delete course</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
