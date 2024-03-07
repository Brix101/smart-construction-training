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
    <div className="mx-10 flex-1 items-start md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-2">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <ScrollArea className="py-6 pr-6 lg:py-8">
          <CourseSidebarNav items={navItems} className="p-1" />
        </ScrollArea>
      </aside>
      <main className="flex w-full flex-col overflow-hidden">
        <div className="flex flex-col space-y-10 pb-10">
          <iframe
            className="mt-10 aspect-video"
            src={`https://www.youtube.com/embed/${topic.youtubeId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={topic.name}
          />
          <PageHeader>
            <PageHeaderHeading>{topic.name}</PageHeaderHeading>
            <ul className="space-y-2 pt-5">
              {topic.materials.map(({ material }, index) => {
                return (
                  <li key={index}>
                    <PageHeaderDescription size="sm">
                      <Link
                        className={cn(
                          buttonVariants({
                            size: "sm",
                            variant: "default",
                          }),
                        )}
                        href={material.link}
                        target="_blank"
                      >
                        {material.name != ""
                          ? material.name
                          : "Download training materials and intructions here!"}
                      </Link>
                    </PageHeaderDescription>
                  </li>
                )
              })}
            </ul>
          </PageHeader>
        </div>
      </main>
    </div>
  )
}
