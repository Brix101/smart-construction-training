import { CourseCard } from "@/components/cards/course-card"
import { SiteHeader } from "@/components/layouts/site-header"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs"

export default async function Home() {
  const user = await currentUser()
  const courses = await db.query.courses.findMany()

  return (
    <>
      <SiteHeader user={user} />
      <div className="pt-4">
        <main className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              href={`/courses/${course.id}`}
            />
          ))}
        </main>
      </div>
    </>
  )
}
