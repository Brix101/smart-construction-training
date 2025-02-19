import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { AddTopicForm } from "@/components/forms/add-topic-form"
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
  title: "New Topic",
  description: "Add a new topic",
}

export default async function NewTopicPage() {
  const user = await getCacheduser()

  if (!user) {
    redirect("/sigin")
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add topic</CardTitle>
        <CardDescription>Add a new topic to your course</CardDescription>
      </CardHeader>
      <CardContent>
        <AddTopicForm />
      </CardContent>
    </Card>
  )
}
