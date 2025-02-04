import { eq, sql } from "drizzle-orm"
import { notFound } from "next/navigation"

import { TopicPlayerHeader } from "@/app/(player)/_components/topic-player-header"
import { TopicPlayerSideBar } from "@/app/(player)/_components/topic-player-sidebar"
import { db } from "@/db"
import { topics } from "@/db/schema"
import { SidebarProvider } from "@/providers/sidebar-provider"

interface UpdateTopicPageProps {
  params: {
    topicId: string
  }
}

async function getTopic({ params }: UpdateTopicPageProps) {
  const topicId = Number(params.topicId)
  return await db.query.topics.findFirst({
    where: eq(topics.id, topicId),
    with: {
      materials: {
        with: {
          material: true,
        },
      },
      course: {
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
      },
    },
  })
}

export default async function TopicPage(props: UpdateTopicPageProps) {
  const topic = await getTopic(props)

  if (!topic) {
    notFound()
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full flex-col">
        <TopicPlayerHeader course={topic.course} materials={topic.materials} />
        <section className="flex h-[calc(100vh-3.5rem)]">
          <TopicPlayerSideBar topics={topic.course.topics} />
          <div className="flex w-full flex-1 flex-col">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${topic.youtubeId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={topic.name}
            />
          </div>
        </section>
      </div>
    </SidebarProvider>
  )
}
