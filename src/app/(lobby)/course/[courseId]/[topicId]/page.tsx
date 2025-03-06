import { notFound } from "next/navigation"

import {
  DownloadMaterialButton,
  UploadMaterialButton,
} from "@/app/(lobby)/_components/material-button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card } from "@/components/ui/card"
import { getTopic } from "@/lib/queries/topic"
import { getYouTubeId } from "@/lib/youtube"

interface UpdateTopicPageProps {
  params: Promise<{
    topicId: string
  }>
}

export default async function TopicPage(props: UpdateTopicPageProps) {
  const { topicId } = await props.params

  const topic = await getTopic(topicId)

  if (!topic) {
    notFound()
  }

  const youtubeId = getYouTubeId(topic.youtubeUrl)

  return (
    <>
      <Card className="w-full overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0&autoplay=0&controls=1&disablekb=1&fs=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-same-origin allow-scripts allow-presentation"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title={topic.name}
          />
        </AspectRatio>
      </Card>
      <h1 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {topic.name}
      </h1>
      <div className="mb-4 flex items-center gap-2">
        <DownloadMaterialButton materials={topic.materials} />
        <UploadMaterialButton materials={topic.materials} />
      </div>
    </>
  )
}
