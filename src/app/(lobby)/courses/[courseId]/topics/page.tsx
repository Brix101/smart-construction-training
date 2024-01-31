import { TopicCard } from "@/components/cards/topic-card"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { asc, eq } from "drizzle-orm"
import Link from "next/link"
import { notFound } from "next/navigation"

interface UpdateCoursePageProps {
  params: {
    courseId: string
  }
}

export default async function TopicsPage({ params }: UpdateCoursePageProps) {
  const courseId = Number(params.courseId)

  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      topics: {
        orderBy: asc(topics.createdAt),
      },
    },
  })
  if (!course) {
    notFound()
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="border-b bg-blue-50 shadow-lg">
          <div className="e container flex w-full justify-between p-2 px-4">
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
            <div className="flex rounded-lg border bg-white">
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
        <div className="relative bg-blue-50">
          <div className="container relative z-10 flex space-x-4 pt-4">
            <div
              className="h-40 w-60 rounded-t-lg border"
              style={getRandomPatternStyle(String(course.id))}
            />
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
                {course.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {course.description}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 w-full bg-blue-200">
            <div className="container flex space-x-4">
              <div className="w-60"></div>
              <div>
                <Button variant="secondary" className="rounded-none">
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
