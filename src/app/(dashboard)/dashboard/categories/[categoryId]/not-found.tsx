import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shell"

export default function CourseNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Category not found"
        description="The requested category could not be found."
        retryLink="/dashboard/categories"
        retryLinkText="Go to Categories"
      />
    </Shell>
  )
}
