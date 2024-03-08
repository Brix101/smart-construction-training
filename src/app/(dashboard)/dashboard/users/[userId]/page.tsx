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
  return <div>{email}</div>
}
