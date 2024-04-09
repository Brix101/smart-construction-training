import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

export default function TopicNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Topic not found"
        description="The topic may have updated"
        retryLink="/"
        retryLinkText="Go to Courses"
      />
    </Shell>
  )
}
