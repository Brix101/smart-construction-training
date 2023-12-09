import { CourseCard } from "@/components/cards/course-card"
import { SiteHeader } from "@/components/layouts/site-header"
import { currentUser } from "@clerk/nextjs"
import getCourses from "./_action/getCourses"

export default async function Home() {
  const user = await currentUser()
  const courses = await getCourses()

  return (
    <>
      <SiteHeader user={user} />
      <main className="container flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map(course => {
            return <CourseCard key={course.id} course={course} />
          })}
        </div>
      </main>
    </>
  )
}
