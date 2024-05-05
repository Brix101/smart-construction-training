import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

export default function userNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="user not found"
        description="The user may have expired or you may have already updated your user"
        retryLink="/dashboard/users"
        retryLinkText="Go to users"
      />
    </Shell>
  )
}
