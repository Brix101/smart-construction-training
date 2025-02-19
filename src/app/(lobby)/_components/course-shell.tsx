import { notFound } from "next/navigation"

import type { getCourse } from "@/lib/queries/course"
import { TopicCard } from "@/components/cards/topic-card"
import { Shell } from "@/components/shell"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

interface TopicsPageProps {
  coursePromise: ReturnType<typeof getCourse>
}

export async function CourseShell(props: TopicsPageProps) {
  const [course] = await Promise.all([props.coursePromise])

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
            {course.topics.map((topic) => {
              return (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  href={`/course/${course.id}/${topic.id}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </Shell>
  )
}
