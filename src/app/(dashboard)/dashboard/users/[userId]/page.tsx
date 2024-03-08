import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { getUserEmail } from "@/lib/utils"
import { clerkClient } from "@clerk/nextjs"
import { notFound } from "next/navigation"

interface UpdateUserPageProps {
  params: {
    userId: string
  }
}

export default async function UpdateUserPage({ params }: UpdateUserPageProps) {
  const user = await clerkClient.users.getUser(params.userId)

  if (!user) {
    notFound()
  }

  const email = getUserEmail(user)
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
        {email}
      </section>
    </Shell>
  )
}
