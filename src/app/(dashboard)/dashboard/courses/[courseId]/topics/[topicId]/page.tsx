import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { and, eq } from "drizzle-orm"

import { UpdateTopicForm } from "@/components/forms/update-topic-form"
import { TopicPager } from "@/components/pagers/topic-pager"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/db"
import { topics } from "@/db/schema"
import { env } from "@/env"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage Topic",
  description: "Manage your topic",
}

interface TopicPageProps {
  params: Promise<{
    courseId: string
    topicId: string
  }>
}

async function getTopic({ params }: TopicPageProps) {
  const { courseId, topicId } = await params

  return await db.query.topics.findFirst({
    where: and(
      eq(topics.id, Number(topicId)),
      eq(topics.courseId, Number(courseId))
    ),
    with: {
      materials: {
        with: {
          material: true,
        },
      },
    },
  })
}

export default async function TopicPage(props: TopicPageProps) {
  const topic = await getTopic(
    /* @next-codemod-error 'props' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */
    props
  )

  if (!topic) {
    notFound()
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between space-x-2">
          <CardTitle className="text-2xl">Update topic</CardTitle>
          <TopicPager topic={topic} />
        </div>
        <CardDescription>
          Update your topic information, or delete it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateTopicForm topic={topic} />
      </CardContent>
    </Card>
  )
}
