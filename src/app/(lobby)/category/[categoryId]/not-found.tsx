import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shell"

export default function CourseNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Course not found"
        description="The requested course could not be found."
        retryLink="/"
        retryLinkText="Go to Courses"
      />
    </Shell>
  )
}
