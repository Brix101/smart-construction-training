import { Icons } from "@/components/icons"
import { TopicCardSkeleton } from "@/components/skeletons/topic-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default async function LoadingPage() {
  return (
    <>
      <div className="flex flex-col pb-3">
        <div className="bg-blue-100">
          <div className="container flex w-full flex-col justify-between space-y-5 pb-2 pt-4 md:flex-row md:space-y-0 md:pt-1">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Skeleton className="h-4 w-20 bg-foreground" />
              <Icons.chevronRight />
              <Skeleton className="h-4 w-64 bg-foreground" />
            </div>
            <Skeleton className="h-12 w-64 border" />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-100" />
          <div className="container relative flex space-x-4 pt-2">
            <div className="space-y-1">
              <Skeleton className="h-10 w-64 bg-foreground" />
            </div>
          </div>
          <div className="w-full">
            <div className="container flex translate-y-1 space-x-4">
              <div className="h-10"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <TopicCardSkeleton key={i} />
        ))}
      </div>
    </>
  )
}
