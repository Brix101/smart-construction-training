import { db } from "@/db"
import { courses } from "@/db/schema"
import { notFound, redirect } from "next/navigation"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { CourseSwitcher } from "@/components/pagers/course-switcher"
import { CourseTabs } from "@/components/pagers/course-tabs"
import { Shell } from "@/components/shells/shell"
import { getCacheduser } from "@/lib/actions/auth"

interface CourseLayoutProps extends React.PropsWithChildren {}

export default async function CourseLayout({ children }: CourseLayoutProps) {
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
