import { CourseCard } from "@/components/cards/course-card"
import { SearchInput } from "@/components/search-input"
import CoursesGridShell from "@/components/shells/courses-grid-shell"
import { db } from "@/db"
import { searchParamsSchema } from "@/lib/validations/params"
import { SearchParams } from "@/types"

export const dynamic = "force-dynamic"

interface HomeProps {
  searchParams: SearchParams
}

export default async function HomePage({ searchParams }: HomeProps) {
  const { search } = searchParamsSchema.parse(searchParams)

  const courses = await db.query.courses.findMany({
    where: (course, { ilike }) => ilike(course.name, `%${search}%`),
  })

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
        <div className="container relative">
          <h1 className="hidden text-left text-3xl font-bold leading-tight tracking-tighter text-background md:block md:text-6xl lg:leading-[1.1]">
            All Courses
          </h1>
          <div className="container absolute w-full translate-y-2 p-0">
            <div className="mr-16 flex justify-between rounded-sm border bg-white p-2 shadow-lg">
              <div></div>
              <div>
                <SearchInput placeholder="Search courses" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-14">
        <main className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map(course => (
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
