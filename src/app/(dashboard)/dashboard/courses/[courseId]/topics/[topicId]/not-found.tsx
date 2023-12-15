import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

interface TopicNotFoundProps {
  params: {
    courseId: string
  }
}

export default function TopicNotFound({ params }: TopicNotFoundProps) {
  // if (!params) {
  //   return redirect("/dashboard/courses")
  // }

  // const courseId = Number(params.courseId)

  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Topic not found"
        description="The topic may have expired or you may have already updated your topic"
        // retryLink={`/dashboard/courses/${courseId}/courses`}
        retryLink={`/dashboard/courses/`}
        retryLinkText="Go to Courses"
      />
    </Shell>
  )
}
