import { CourseCard } from "@/components/cards/course-card"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/db"

export default async function Home() {
  const courses = await db.query.courses.findMany()

  return (
    <>
      <section className="w-full bg-blue-50 py-12">
        <div className="container relative">
          <h1 className="hidden text-left text-3xl font-bold leading-tight tracking-tighter text-background md:block md:text-6xl lg:leading-[1.1]">
            All Courses
          </h1>
          <div className="absolute flex w-full translate-y-2 justify-between rounded-sm border bg-white p-4 shadow-lg">
            <div></div>
            <div className="flex">
              <Input
                className="rounded-none rounded-l"
                type="search"
                placeholder="Search courses"
              />
              <Button className="rounded-none rounded-r">
                <Icons.search />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="pt-14">
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
