"use server"

import { revalidatePath } from "next/cache"

import { clerkClient } from "@clerk/nextjs"
import { z } from "zod"
import { userPublicMetadataSchema } from "@/lib/validations/auth"

const updateUserParams = userPublicMetadataSchema.extend({
  userId: z.string(),
})

export async function updateUser({
  userId,
  ...publicMetadata
}: z.infer<typeof updateUserParams>) {
  await clerkClient.users.updateUserMetadata(userId, { publicMetadata })
  revalidatePath(`/dashboard/users`)
}

export async function deleteUser(userId: string) {
  await clerkClient.users.deleteUser(userId)
  revalidatePath(`/dashboard/users`)
}

export async function updateUserForm(userId: string, fd: FormData) {
  const params = updateUserParams.parse({
    userId,
    level: fd.get("level"),
  })

  await updateUser(params)

  revalidatePath(`/dashboard/users/${userId}`)
}
