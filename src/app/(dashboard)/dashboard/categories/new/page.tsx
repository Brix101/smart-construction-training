import type { Metadata } from "next"
import { unauthorized } from "next/navigation"

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

import { AddCategoryForm } from "../_components/add-category-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Category",
  description: "Add a new category",
}

export const dynamic = "force-dynamic"

export default async function NewCategoryPage() {
  if (!checkRole("admin")) {
    unauthorized()
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-category-page-header"
        aria-labelledby="new-category-page-header-heading"
      >
        <PageHeaderHeading size="sm">New Category</PageHeaderHeading>
      </PageHeader>
      <Card
        id="new-category-page-form-container"
        aria-labelledby="new-category-page-form-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add Category</CardTitle>
          <CardDescription>Add a new category</CardDescription>
        </CardHeader>
        <CardContent>
          <AddCategoryForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
