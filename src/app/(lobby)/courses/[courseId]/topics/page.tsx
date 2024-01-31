import { TopicCard } from "@/components/cards/topic-card"
import { db } from "@/db"
import { courses, topics } from "@/db/schema"
import { asc, eq } from "drizzle-orm"
import { notFound } from "next/navigation"

interface UpdateTopicPageProps {
  params: {
    courseId: string
  }
}

export default async function TopicPage({ params }: UpdateTopicPageProps) {
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
    <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  )
}
