import { notFound } from "next/navigation"

import { DownloadMaterialButton } from "@/app/(player)/_components/download-material-button"
import { TopicPlayerHeader } from "@/app/(player)/_components/topic-player-header"
import { TopicSideBar } from "@/app/(player)/_components/topic-sidebar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card } from "@/components/ui/card"
import { getCourse } from "@/lib/queries/course"
import { getTopic } from "@/lib/queries/topic"
import { Suspense } from "react"
import { TopicSidebarLoader } from "@/app/(player)/_components/topic-sidebar-loader"

interface UpdateTopicPageProps {
  params: {
    topicId: string
  }
}

export default async function TopicPage(props: UpdateTopicPageProps) {
  const topic = await getTopic(Number(props.params.topicId))

  if (!topic) {
    notFound()
  }

  const coursePromises = getCourse(topic.courseId)

  return (
    <div className="container flex w-full flex-col gap-6">
      <TopicPlayerHeader />
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="w-full overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${topic.youtubeId}?modestbranding=1&rel=0&autoplay=0&controls=1&disablekb=1&fs=1`}
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
          <div className="mb-4 flex items-center justify-between">
            <DownloadMaterialButton materials={topic.materials} />
          </div>
        </div>
        <div className="lg:col-span-4">
          <Suspense fallback={<TopicSidebarLoader />}>
            <TopicSideBar coursePromise={coursePromises} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
