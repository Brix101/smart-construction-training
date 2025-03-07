import type { Metadata } from "next"
import { unauthorized } from "next/navigation"

import { getCategories } from "@/app/_actions/category"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { env } from "@/env"
import { checkRole } from "@/lib/roles"

import { AddCourseForm } from "../_components/add-course-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Course",
  description: "Add a new course",
}

export const dynamic = "force-dynamic"

export default async function NewCoursePage() {
  if (!checkRole("admin")) {
    unauthorized()
  }
  const categories = await getCategories()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-course-page-header"
        aria-labelledby="new-course-page-header-heading"
      >
        <PageHeaderHeading size="sm">New Course</PageHeaderHeading>
      </PageHeader>
      <Card
        id="new-course-page-form-container"
        aria-labelledby="new-course-page-form-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add course</CardTitle>
          <CardDescription>Add a new course</CardDescription>
        </CardHeader>
        <CardContent>
          <AddCourseForm categories={categories} />
        </CardContent>
      </Card>
    </Shell>
  )
}
