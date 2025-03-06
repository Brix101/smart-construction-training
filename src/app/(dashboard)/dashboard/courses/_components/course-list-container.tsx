import type { getCourses } from "@/lib/actions/course"
import { CourseCard } from "@/components/cards/course-card"
import { CourseCardSkeleton } from "@/components/skeletons/course-card-skeleton"

interface CourseAlertCountProps {
  coursesPromise: ReturnType<typeof getCourses>
}

export async function CourseListContainer(props: CourseAlertCountProps) {
  const [allCourses] = await Promise.all([props.coursesPromise])
  return (
    <Container>
      {allCourses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          href={`/dashboard/courses/${course.id}`}
          hasBadge
        />
      ))}
    </Container>
  )
}

export function CourseListContainerLoader() {
  return (
    <Container>
      {Array.from({ length: 3 }).map((_, i) => (
        <CourseCardSkeleton key={i} hasBadge />
      ))}
    </Container>
  )
}

function Container({ children }: React.PropsWithChildren) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </section>
  )
}
