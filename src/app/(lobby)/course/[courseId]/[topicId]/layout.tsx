import { Suspense } from "react"

import { TopicSideBar } from "@/app/(lobby)/_components/topic-sidebar"
import { TopicSidebarLoader } from "@/app/(lobby)/_components/topic-sidebar-loader"
import { Shell } from "@/components/shell"
import { getCourse } from "@/lib/queries/course"

interface CourseTopicLayoutProps extends React.PropsWithChildren {
  params: Promise<{
    courseId: string
  }>
}

export default async function CourseTopicLayout({
  children,
  params,
}: CourseTopicLayoutProps) {
  const { courseId } = await params

  const coursePromises = getCourse(courseId)

  return (
    <Shell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">{children}</div>
        <div className="lg:col-span-4">
          <Suspense fallback={<TopicSidebarLoader />}>
            <TopicSideBar coursePromise={coursePromises} />
          </Suspense>
        </div>
      </div>
    </Shell>
  )
}
