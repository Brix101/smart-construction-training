import { db } from "@/db"
import { topics } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { TopicPlayerShell } from "@/app/(player)/_components/topic-player-shell"

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
          topics: true,
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
    <TopicPlayerShell
      course={topic.course}
      topics={topic.course.topics}
      materials={topic.materials}
    >
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${topic.youtubeId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={topic.name}
      />
    </TopicPlayerShell>
  )
}
