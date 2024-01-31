import { CourseCard } from "@/components/cards/course-card"
import { db } from "@/db"

export default async function CoursesPage() {
  const courses = await db.query.courses.findMany()

  return (
    <div className="pt-4">
      <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            href={`/courses/${course.id}`}
          />
        ))}
      </div>
    </div>
  )
}
