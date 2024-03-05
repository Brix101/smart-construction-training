import { env } from "@/env.mjs"
import type { Metadata } from "next"
import * as React from "react"

import { CourseCard } from "@/components/cards/course-card"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { CourseCardSkeleton } from "@/components/skeletons/course-card-skeleton"
import { buttonVariants } from "@/components/ui/button"
import { getCourseCount, getCourses } from "@/lib/actions/course"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RocketIcon } from "@radix-ui/react-icons"
import { getCacheduser } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Courses",
  description: "Manage your courses settings",
}

export default async function CoursesPage() {
  const user = await getCacheduser()

  if (!user) {
    redirect("/signin")
  }

  const coursePromises = await getCourses()
  const countPromises = await getCourseCount()
  const [allCourses, counts] = await Promise.all([
    coursePromises,
    countPromises,
  ])

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="courses-header"
        aria-labelledby="courses-header-heading"
        separated
      >
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Courses
          </PageHeaderHeading>
          <Link
            aria-label="Create course"
            href="/dashboard/courses/new"
            className={cn(
              buttonVariants({
                size: "sm",
              }),
            )}
          >
            Create course
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your courses
        </PageHeaderDescription>
      </PageHeader>
      <Alert>
        <RocketIcon className="size-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          there are currently{" "}
          {counts.map((count, index) => (
            <React.Fragment key={index}>
              <span className="font-semibold">{count.count}</span>{" "}
              {count.active ? "Active" : "Inactive"}
              {index !== counts.length - 1 && " and "}
            </React.Fragment>
          ))}{" "}
          courses.
        </AlertDescription>
      </Alert>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        >
          {allCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              href={`/dashboard/courses/${course.id}`}
              hasBadge
            />
          ))}
        </React.Suspense>
      </section>
    </Shell>
  )
}
