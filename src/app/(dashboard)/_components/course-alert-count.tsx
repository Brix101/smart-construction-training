import { RocketIcon } from "lucide-react"

import type { getCourseAlertCount } from "@/lib/actions/course"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CourseCountProps {
  alertCountPromise: ReturnType<typeof getCourseAlertCount>
}

export async function CourseAlertCount(props: CourseCountProps) {
  const [alertCount] = await Promise.all([props.alertCountPromise])

  return (
    <Alert>
      <RocketIcon className="h-4 w-4" aria-hidden="true" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        there are currently{" "}
        {alertCount.length > 0
          ? alertCount.map((count, index) => (
              <span key={index}>
                <strong className="font-semibold">
                  {count.count} {count.isPublished ? "published" : "unplublish"}
                </strong>
                {index !== alertCount.length - 1 && " and "}
              </span>
            ))
          : "no"}{" "}
        courses.
      </AlertDescription>
    </Alert>
  )
}
