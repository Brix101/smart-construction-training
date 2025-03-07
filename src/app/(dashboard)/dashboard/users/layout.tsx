import { unauthorized } from "next/navigation"

import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { checkRole } from "@/lib/roles"

export default async function CourseLayout({
  children,
}: React.PropsWithChildren) {
  if (!checkRole("admin")) {
    unauthorized()
  }

  return (
    <Shell variant="sidebar">
      <PageHeader id="users-header" aria-labelledby="users-header-heading">
        <PageHeaderHeading size="sm">Users</PageHeaderHeading>
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
