import type { Metadata } from "next"
import { redirect } from "next/navigation"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { env } from "@/env"
import { getCacheduser } from "@/lib/actions/auth"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Category",
  description: "Add a new category",
}

export const dynamic = "force-dynamic"

export default async function NewCategoryPage() {
  const user = await getCacheduser()

  if (!user) {
    redirect("/sign-in")
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
        <CardContent>{/* <AddcategoryForm /> */}</CardContent>
      </Card>
    </Shell>
  )
}
