import Image from "next/image"
import Link from "next/link"

import type { Course } from "@/db/schema"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"

interface LobbyCourseCardProps {
  course: {
    id?: Course["id"]
    imgSrc?: string
    name: string
    description?: string
  }
  href: string
  isDisabled?: boolean
}

export function LobbyCourseCard({
  course,
  href,
  isDisabled,
}: LobbyCourseCardProps) {
  return (
    <Link
      href={href}
      className={cn(isDisabled && "pointer-events-none")}
      aria-disabled={isDisabled}
    >
      <span className="sr-only">{course.name}</span>
      <Card className="grid grid-cols-4 overflow-hidden transition-colors hover:bg-muted/50">
        <AspectRatio className="col-span-1" ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/70" />
          {course.imgSrc ? (
            <Image
              src={course.imgSrc}
              alt={course.name!}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
              loading="lazy"
            />
          ) : (
            <div
              className="h-full rounded-t-md border-b"
              style={getRandomPatternStyle(course.id!)}
            />
          )}
        </AspectRatio>
        <CardHeader className="col-span-3 space-y-2">
          <CardTitle className="line-clamp-1">{course.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {course.description ? course.description : `Explore ${course.name}`}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export function LobbyCourseCardSkeleton() {
  return (
    <Card className="grid grid-cols-4 overflow-hidden">
      <AspectRatio className="col-span-1" ratio={21 / 9}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/70" />
        <Skeleton className="h-full w-full rounded-b-none" />
      </AspectRatio>
      <CardHeader className="col-span-3 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
    </Card>
  )
}
