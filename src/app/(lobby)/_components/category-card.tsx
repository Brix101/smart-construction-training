import Image from "next/image"
import Link from "next/link"

import type { getCategoryList } from "@/app/_actions/category"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getRandomPatternStyle } from "@/lib/generate-pattern"

interface CategoryCardProps {
  category: Awaited<ReturnType<typeof getCategoryList>>[0]
  href: string
}

export function CategoryCard({ category, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <span className="sr-only">{category.name}</span>
      <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/70" />
          {category.imgSrc ? (
            <Image
              src={category.imgSrc}
              alt={category.name}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
              loading="lazy"
            />
          ) : (
            <div
              className="h-full rounded-t-md border-b"
              style={getRandomPatternStyle(category.id)}
            />
          )}
        </AspectRatio>
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1">{category.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            With {category.courseCount}{" "}
            {category.courseCount === 1 ? "course" : "courses"} available.
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
