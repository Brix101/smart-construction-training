import { TopicCard } from "@/components/cards/topic-card"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { asc, eq } from "drizzle-orm"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

interface TopicsPageProps {
  params: {
    courseId: string
  }
}

async function getCourseFromParams({ params }: TopicsPageProps) {
  const courseId = Number(params.courseId)

  return await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      topics: {
        where: eq(topics.isActive, true),
        orderBy: asc(topics.name),
      },
    },
  })
}

export default async function TopicsPage(props: TopicsPageProps) {
  const course = await getCourseFromParams(props)
  if (!course) {
    notFound()
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="container flex w-full flex-col justify-between space-y-5 pb-2 pt-4 md:flex-row md:space-y-0 md:pt-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Courses</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{course.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div
          className="relative"
          // style={getRandomPatternStyle(String(course.id))}
        >
          <div className="container relative flex space-x-4 pt-2">
            <div className="space-y-1">
              <PageHeader>
                <PageHeaderHeading size="lg">{course.name}</PageHeaderHeading>
                <PageHeaderDescription size="sm">
                  {course.description?.length
                    ? course.description
                    : `Explore ${course.name}`}
                </PageHeaderDescription>
              </PageHeader>
            </div>
          </div>
        </div>
      </div>
      <div className="container grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {course.topics.map(topic => {
          return (
            <TopicCard
              key={topic.id}
              topic={topic}
              href={`/courses/${course.id}/${topic.id}`}
            />
          )
        })}
      </div>
    </>
  )
}
