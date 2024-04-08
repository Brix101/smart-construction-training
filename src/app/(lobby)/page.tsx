import { CourseCard } from "@/components/cards/course-card"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { getPublishedCourses } from "@/lib/actions/course"

export default async function HomePage() {
  const coursePromises = await getPublishedCourses()
  const [allCourses] = await Promise.all([coursePromises])

  return (
    <>
      <div
        className="w-full bg-background py-10"
        style={{
          backgroundImage: "url(/svg/default_banner.svg)",
          backgroundSize: "cover",
          backgroundPosition: "80% 20%",
        }}
      >
        <PageHeader className="container">
          <PageHeaderHeading size="lg">All Courses</PageHeaderHeading>
        </PageHeader>
      </div>
      <Shell
        variant="default"
        className="grid grid-cols-1 gap-6 pt-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {allCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            href={`/courses/${course.id}`}
          />
        ))}
      </Shell>
    </>
  )
}
