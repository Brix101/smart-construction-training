import { CourseSidebarNav } from "@/components/layouts/course-sidebar-nav"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { db } from "@/db"
import { topics } from "@/db/schema"
import { cn } from "@/lib/utils"
import { SidebarNavItem } from "@/types"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { notFound } from "next/navigation"

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

  const navItems: SidebarNavItem[] = [
    {
      title: "Back to course",
      href: `/courses/${topic.courseId}`,
      items: [],
      icon: "home",
    },
    ...topic.course.topics.map(topic => ({
      title: topic.name,
      href: `/courses/${topic.courseId}/${topic.id}`,
      items: [],
    })),
  ]

  return (
    <div className="flex w-full flex-col">
      <nav className="h-12 w-full bg-background bg-green-200"></nav>
      <section className="flex h-[calc(100vh-5rem)] flex-1">
        <aside className="h-screen w-80 -translate-x-80 bg-red-200"></aside>
        <div className="w-full flex-1  bg-blue-400">
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
  )
}
