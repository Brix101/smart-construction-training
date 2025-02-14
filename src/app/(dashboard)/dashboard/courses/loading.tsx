import { RocketIcon } from "@radix-ui/react-icons"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { CourseCardSkeleton } from "@/components/skeletons/course-card-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursesLoading() {
  return (
    <Shell variant="sidebar">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Courses</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          View and manage courses
        </PageHeaderDescription>
      </PageHeader>
      <Alert>
        <RocketIcon className="size-4" aria-hidden="true" />
        <AlertTitle>
          <Skeleton className="h-4 w-32" />
        </AlertTitle>
        <AlertDescription>
          <Skeleton className="h-4 w-52" />
        </AlertDescription>
      </Alert>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </section>
    </Shell>
  )
}
