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
import { getCourse } from "@/lib/queries/course"

export const dynamic = "force-dynamic"

interface TopicsPageProps {
  params: Promise<{
    courseId: string
  }>
}

export default async function TopicsPage(props: TopicsPageProps) {
  const course = await getCourse(Number((await props.params).courseId))
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
            <p className="text-muted-foreground text-base">
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
