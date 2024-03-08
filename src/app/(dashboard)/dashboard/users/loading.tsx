import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function UsersLoading() {
  return (
    <Shell variant="sidebar">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Users</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          View and manage users
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-10">
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-2/4" />
          </CardHeader>
          <CardContent>
            <div className="grid w-full max-w-xl gap-4">
              <div className="space-y-2.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6" />
              </div>
              <div className="space-y-2.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="xs:flex-row flex flex-col gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </div>
    </Shell>
  )
}
