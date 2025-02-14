import { Shell } from "@/components/shells/shell"
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

export default async function LoadingPage() {
  return (
    <Shell>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Skeleton className="bg-foreground h-4 w-20" />
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Skeleton className="bg-foreground h-4 w-20" />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="flex w-full flex-col gap-4">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">
              <Skeleton className="bg-foreground h-7 w-44" />
            </h2>
            <p className="text-mu4ted-foreground text-base">
              <Skeleton className="bg-foreground h-4 w-44" />
            </p>
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
