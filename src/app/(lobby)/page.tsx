import { CourseCard } from "@/components/cards/course-card"
import { getPublishedCourses } from "@/lib/actions/course"

export default async function HomePage() {
  const coursePromises = await getPublishedCourses()
  const [allCourses] = await Promise.all([coursePromises])

  return (
    <>
      <div
        className="w-full bg-blue-50 py-10"
        style={{
          backgroundImage: "url(/svg/default_banner.svg)",
          backgroundSize: "cover",
          backgroundPosition: "80% 20%",
        }}
      >
        <div className="container ">
          <h1 className="hidden text-left text-3xl font-bold leading-tight tracking-tighter text-background md:block md:text-6xl lg:leading-[1.1]">
            All Courses
          </h1>
        </div>
      </div>
      <div className="pt-14">
        <main className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              href={`/${course.id}`}
            />
          ))}
        </main>
      </div>
    </>
  )
}
