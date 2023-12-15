import { env } from "@/env.mjs"
import type { Metadata } from "next"

import { userColumns } from "@/components/data-table/columns/user.columns"
import { DataTable } from "@/components/data-table/data-table"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { clerkClient } from "@clerk/nextjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Users",
  description: "Manage your users settings",
}

export default async function UsersPage() {
  const _users = await clerkClient.users.getUserList()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="users-header"
        aria-labelledby="users-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Users</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your users settings
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-users-info"
        aria-labelledby="user-users-info-heading"
        className="w-full overflow-hidden"
      >
        <DataTable data={[]} columns={userColumns} />
      </section>
    </Shell>
  )
}
