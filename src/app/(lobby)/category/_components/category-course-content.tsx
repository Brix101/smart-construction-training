import type { getCategoryCourses } from "@/app/_actions/category"
import {
  LobbyCourseCard,
  LobbyCourseCardSkeleton,
} from "@/app/(lobby)/_components/lobby-course-card"

interface CategoryCourseContentProps {
  categoryCoursesPromise: ReturnType<typeof getCategoryCourses>
}

export async function CategoryCourseContent(props: CategoryCourseContentProps) {
  const [categoryCourses] = await Promise.all([props.categoryCoursesPromise])

  return (
    <div className="flex flex-col gap-5">
      {categoryCourses.map((course) => (
        <LobbyCourseCard
          key={course.id}
          course={{
            id: course.id!,
            name: course.name!,
            description: course.description!,
            imgSrc: course.imgSrc!,
          }}
          href={`/course/${course.id}`}
        />
      ))}
    </div>
  )
}

export function CategoryCourseContentSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <LobbyCourseCardSkeleton key={i} />
      ))}
    </div>
  )
}
