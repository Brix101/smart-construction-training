import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { UpdateTopicForm } from "@/components/forms/update-topic-form"
import { TopicPager } from "@/components/pagers/topic-pager"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { env } from "@/env"
import { getCourseTopic } from "@/lib/queries/course"

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

export default async function TopicPage(props: TopicPageProps) {
  const { courseId, topicId } = await props.params

  const topic = await getCourseTopic(courseId, topicId)

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
