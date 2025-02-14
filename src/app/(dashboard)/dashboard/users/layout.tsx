import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

export default async function CourseLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <Shell variant="sidebar">
      <PageHeader
        id="users-header"
        aria-labelledby="users-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Users</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          View and manage users
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-users-info"
        aria-labelledby="user-users-info-heading"
        className="w-full overflow-hidden"
      >
        {children}
      </section>
    </Shell>
  )
}
