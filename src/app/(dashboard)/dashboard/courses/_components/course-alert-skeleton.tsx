import { RocketIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

export default function CourseAlertSkeleton() {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" aria-hidden="true" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        <Skeleton className="inline-block h-4 w-2/3" />
      </AlertDescription>
    </Alert>
  )
}
