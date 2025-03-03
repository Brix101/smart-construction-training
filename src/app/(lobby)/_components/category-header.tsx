import { notFound } from "next/navigation"

import type { getCategory } from "@/app/_actions/category"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

interface CourseHeaderProps {
  categoryPromise: ReturnType<typeof getCategory>
}

export async function CategoryHeader(props: CourseHeaderProps) {
  const [category] = await Promise.all([props.categoryPromise])

  if (!category) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Courses</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full flex-col gap-4">
        <div className="space-y-2">
          <h2 className="line-clamp-1 text-2xl font-bold">{category.name}</h2>
          <span className="m-0 min-h-4 text-base text-muted-foreground">
            {category.description ?? `Explore ${category.name} courses`}
          </span>
        </div>
        <Separator className="my-1.5" />
      </div>
    </div>
  )
}

export function CategoryHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Courses</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Skeleton className="h-5 w-28" />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full flex-col gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-44" />
        </div>
        <Separator className="my-1.5" />
      </div>
    </div>
  )
}
