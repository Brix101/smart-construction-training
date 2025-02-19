import { TopicSidebarLoader } from "@/app/(lobby)/_components/topic-sidebar-loader"
import { Shell } from "@/components/shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPage() {
  return (
    <Shell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Skeleton className="mb-4 aspect-video w-full rounded-xl" />
          <Skeleton className="mb-2 mt-10 h-8 w-3/4" />
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-8 w-1/4 rounded-2xl" />
          </div>
        </div>
        <div className="lg:col-span-4">
          <TopicSidebarLoader />
        </div>
      </div>
    </Shell>
  )
}
