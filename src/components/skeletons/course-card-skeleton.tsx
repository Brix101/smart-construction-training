import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface CourseCardSkeletonProps {
  hasBadge?: boolean
}

export function CourseCardSkeleton(props: CourseCardSkeletonProps) {
  return (
    <Card className="h-full overflow-hidden">
      <AspectRatio ratio={21 / 9}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/70" />
        <Skeleton
          className={cn(
            "absolute right-2 top-2 h-6 w-20 rounded-sm px-2 py-1",
            props.hasBadge ? "visible" : "invisible"
          )}
        />
        <Skeleton className="h-full w-full rounded-b-none" />
      </AspectRatio>
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
    </Card>
  )
}
