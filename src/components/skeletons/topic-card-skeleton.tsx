import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TopicCardSkeleton() {
  return (
    <Card className="h-full w-full overflow-hidden transition-colors hover:bg-muted/50">
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={21 / 9}>
          <Skeleton className="h-full w-full" />
        </AspectRatio>
      </CardHeader>
      <CardContent className="space-y-1.5 p-4">
        <Skeleton className="h-4" />
      </CardContent>
    </Card>
  )
}
