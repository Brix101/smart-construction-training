import { notFound } from "next/navigation"

import type { getCategory } from "@/app/_actions/category"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { UpdateCategoryForm } from "./update-category-form"

interface CategoryContainerProps {
  categoryPromise: ReturnType<typeof getCategory>
}

export async function CategoryContainer(props: CategoryContainerProps) {
  const [category] = await Promise.all([props.categoryPromise])

  if (!category) {
    notFound()
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          Keep Your Category Up to Date
        </CardTitle>
        <CardDescription>
          Modify category details or remove it if no longer needed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateCategoryForm category={category} />
      </CardContent>
    </Card>
  )
}

export function CategoryContainerLoader() {
  return (
    <div className="space-y-10">
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-2/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-2/4" />
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-xl gap-4">
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6" />
            </div>
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-20" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="xs:flex-row flex flex-col gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}
