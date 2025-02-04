import { asc, eq, sql } from "drizzle-orm"
import { notFound } from "next/navigation"

import { TopicCard } from "@/components/cards/topic-card"
import { Shell } from "@/components/shells/shell"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"

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
        // orderBy: asc(topics.name),
        orderBy: sql`
    COALESCE(
      SUBSTRING(${topics.name} FROM '^(\\d+)')::INTEGER, 
      99999999
    )
  `,
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
    <Shell>
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
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="flex w-full flex-col gap-4">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{course.name}</h2>
            <p className="text-base text-muted-foreground">
              {course.description}
            </p>
          </div>
          <Separator className="my-1.5" />
          <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {course.topics.map(topic => {
              return (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  href={`/topic/${topic.id}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </Shell>
  )
}
