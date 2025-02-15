import type { getCourses } from "@/lib/actions/course"
import { CourseCard } from "@/components/cards/course-card"

interface CourseAlertCountProps {
  coursesPromise: ReturnType<typeof getCourses>
}

export async function CourseContainer(props: CourseAlertCountProps) {
  const [allCourses] = await Promise.all([props.coursesPromise])
  return (
    <>
      {allCourses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          href={`/dashboard/courses/${course.id}`}
          hasBadge
        />
      ))}
    </>
  )
}
