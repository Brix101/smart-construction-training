import { TopicCard } from "@/components/cards/topic-card"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { asc, eq } from "drizzle-orm"
import Link from "next/link"
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
        <div className="bg-blue-100">
          <div className="container flex w-full flex-col justify-between space-y-5 pb-2 pt-4 md:flex-row md:space-y-0 md:pt-1">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Link
                href="/"
                className="overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
              >
                Courses
              </Link>
              <Icons.chevronRight size={15} />
              <span className="font-medium text-foreground">{course.name}</span>
            </div>
          </div>
        </div>
        <div
          className="relative  bg-blue-100"
          style={getRandomPatternStyle(String(course.id))}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-100" />
          <div className="container relative flex space-x-4 pt-2">
            <div className="space-y-1">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight drop-shadow-xl">
                {course.name}
              </h1>
              {/* <p className="text-lg text-muted-foreground"> */}
              {/*   {course.description?.length */}
              {/*     ? course.description */}
              {/*     : `Explore ${course.name}`} */}
              {/* </p> */}
            </div>
          </div>
          <div className="w-full">
            <div className="container flex translate-y-1 space-x-4">
              <div>
                <Button
                  className="rounded-none border-b-transparent bg-background"
                  variant="outline"
                >
                  <Icons.home size={14} />
                  <span className="px-2">Topics</span>
                </Button>
              </div>
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
