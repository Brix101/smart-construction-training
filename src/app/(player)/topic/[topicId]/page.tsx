import { notFound } from "next/navigation"

import { DownloadMaterialButton } from "@/app/(player)/_components/download-material-button"
import { TopicPlayerHeader } from "@/app/(player)/_components/topic-player-header"
import { TopicPlayerSideBar } from "@/app/(player)/_components/topic-player-sidebar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card } from "@/components/ui/card"
import { getTopic } from "@/lib/queries/topic"
import { SidebarProvider } from "@/providers/sidebar-provider"

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

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="container flex w-full flex-col gap-6">
        <TopicPlayerHeader />
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Card className="w-full overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${topic.youtubeId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
            <h3 className="mb-4 font-semibold">{topic.course.name}</h3>
            <TopicPlayerSideBar topics={topic.course.topics} />
          </div>
        </section>
      </div>
    </SidebarProvider>
  )
}
