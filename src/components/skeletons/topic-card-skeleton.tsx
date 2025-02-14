import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TopicCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <AspectRatio ratio={4 / 3}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
        <Skeleton className="absolute top-2 right-2 h-6 w-14 rounded-sm px-2 py-1" />
        <Skeleton className="h-full w-full rounded-b-none" />
      </AspectRatio>
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    </Card>
  )
}
