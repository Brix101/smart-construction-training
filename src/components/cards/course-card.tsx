import Link from "next/link"

import type { Course } from "@/db/schema"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  course: Partial<Course>
  href: string
  hasBadge?: boolean
}

export function CourseCard({ course, href, hasBadge }: CourseCardProps) {
  return (
    <Link href={href}>
      <span className="sr-only">{course.name}</span>
      <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-0.5 font-semibold",
              hasBadge ? "visible" : "invisible",
              course.isPublished
                ? "border-green-600/20 bg-green-100 text-green-700"
                : "border-red-600/10 bg-red-100 text-red-700"
            )}
          >
            {course.isPublished ? "Published" : "Unpublished"}
          </Badge>
          <div
            className="h-full rounded-t-md border-b"
            style={getRandomPatternStyle(course.id!)}
          />
        </AspectRatio>
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1">{course.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {course.description ? course.description : `Explore ${course.name}`}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
