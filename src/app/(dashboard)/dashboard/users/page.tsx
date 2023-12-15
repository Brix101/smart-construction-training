import { env } from "@/env.mjs"
import type { Metadata } from "next"

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
  const users = await clerkClient.users.getUserList()

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
        <table className="min-w-full border border-gray-300 bg-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">First Name</th>
              <th className="border-b px-4 py-2">Last Name</th>
              <th className="border-b px-4 py-2">Emails</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2">{user.firstName}</td>
                <td className="border-b px-4 py-2">{user.lastName}</td>
                <td className="border-b px-4 py-2">
                  <ul>
                    {user.emailAddresses.map(email => {
                      return <li key={email.id}>{email.emailAddress}</li>
                    })}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Shell>
  )
}
