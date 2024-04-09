import { CourseCard } from "@/components/cards/course-card"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { getPublishedCourses } from "@/lib/actions/course"

export default async function IndexPage() {
  const coursePromises = await getPublishedCourses()
  const [allCourses] = await Promise.all([coursePromises])

  return (
    <Shell>
      <PageHeader className="container">
        <PageHeaderHeading>Courses</PageHeaderHeading>
        <PageHeaderDescription>Explore available courses</PageHeaderDescription>
      </PageHeader>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            href={`/course/${course.id}`}
          />
        ))}
      </section>
    </Shell>
  )
}
