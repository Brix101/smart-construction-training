"use client"

import { useParams } from "next/navigation"

import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shell"

export default function TopicNotFound() {
  const params = useParams()

  const courseId = Number(params.courseId)

  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Topic not found"
        description="The topic may have deleted or you may have already updated your topic"
        retryLink={`/dashboard/courses/${courseId}/topics`}
        retryLinkText="Go to Topics"
      />
    </Shell>
  )
}
