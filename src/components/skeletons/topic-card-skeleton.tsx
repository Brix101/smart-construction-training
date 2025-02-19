import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TopicCardSkeleton() {
  return (
    <Card className="h-full w-full overflow-hidden transition-colors hover:bg-muted/50">
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 3}>
          <div className="h-full w-full animate-pulse bg-muted" />
        </AspectRatio>
      </CardHeader>
      <CardContent className="space-y-1.5 p-4">
        <div className="h-6 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  )
}
