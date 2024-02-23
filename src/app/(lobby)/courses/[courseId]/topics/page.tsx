import { TopicCard } from "@/components/cards/topic-card"
import { Icons } from "@/components/icons"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { searchParamsSchema } from "@/lib/validations/params"
import { SearchParams } from "@/types"
import { asc, eq } from "drizzle-orm"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

interface TopicsPageProps {
  params: {
    courseId: string
  }
  searchParams: SearchParams
}

export default async function TopicsPage({
  params,
  searchParams,
}: TopicsPageProps) {
  const courseId = Number(params.courseId)
  const { search } = searchParamsSchema.parse(searchParams)

  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      topics: {
        orderBy: asc(topics.createdAt),
        where: (topic, { ilike }) => ilike(topic.name, `%${search}%`),
      },
    },
  })
  if (!course) {
    notFound()
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-blue-50">
          <div className="container flex w-full justify-between p-2 px-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Link
                href="/courses"
                className="overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
              >
                Courses
              </Link>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="font-medium text-foreground">{course.name}</span>
            </div>
            <SearchInput placeholder="Search topic" />
          </div>
        </div>
        <div
          className="relative space-y-4 bg-blue-50"
          style={getRandomPatternStyle(String(course.id))}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-50" />
          <div className="container relative flex space-x-4 pt-4">
            <div className="space-y-2">
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
                  <Icons.home />
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
              href={`/courses/${course.id}/topics/${topic.id}`}
            />
          )
        })}
      </div>
    </>
  )
}
