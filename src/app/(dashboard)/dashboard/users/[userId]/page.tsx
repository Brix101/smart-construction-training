import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { clerkClient } from "@clerk/nextjs/server"

import { LoadingButton } from "@/components/loading-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { env } from "@/env"
import { deleteUser, updateUserForm } from "@/lib/actions/user"
import { publicMetadataSchema } from "@/lib/validations/auth"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage user",
  description: "Manage your user",
}

interface UpdateuserPageProps {
  params: Promise<{
    userId: string
  }>
}

async function getUser(userId: string) {
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    return user
  } catch {
    return null
  }
}

export default async function UpdateUserPage(props: UpdateuserPageProps) {
  const params = await props.params
  const userId = params.userId

  const user = await getUser(userId)

  if (!user) {
    notFound()
  }

  const emails = user.emailAddresses
  const email =
    emails.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ?? ""

  const publicMetadata = publicMetadataSchema.parse(user.publicMetadata)

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update user</CardTitle>
          <CardDescription>Update your user, or delete it</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={updateUserForm.bind(null, userId)}
            className="grid w-full max-w-xl gap-5"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue={email}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                name="level"
                className="col-span-3"
                type="number"
                min={1}
                placeholder="Type course level here."
                defaultValue={publicMetadata.level}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <LoadingButton>
                Update user
                <span className="sr-only">Update user</span>
              </LoadingButton>
              <LoadingButton
                formAction={deleteUser.bind(null, userId)}
                variant="destructive"
              >
                Delete user
                <span className="sr-only">Delete user</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
