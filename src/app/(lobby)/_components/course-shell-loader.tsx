import { Shell } from "@/components/shell"
import { TopicCardSkeleton } from "@/components/skeletons/topic-card-skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function CourseShellLoader() {
  return (
    <Shell>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Skeleton className="h-4 w-20 bg-foreground" />
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Skeleton className="h-4 w-20 bg-foreground" />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="flex w-full flex-col gap-4">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">
              <Skeleton className="h-7 w-44 bg-foreground" />
            </h2>
            <div className="text-mu4ted-foreground text-base">
              <Skeleton className="h-4 w-44 bg-foreground" />
            </div>
          </div>
          <Separator className="my-1.5" />
          <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <TopicCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}
