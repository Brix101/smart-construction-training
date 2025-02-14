"use server"

import { revalidatePath } from "next/cache"
import { clerkClient } from "@clerk/nextjs/server"
import { z } from "zod"

import { publicMetadataSchema } from "@/lib/validations/auth"

const updateUserParams = publicMetadataSchema.extend({
  userId: z.string(),
})

export async function updateUser({
  userId,
  ...publicMetadata
}: z.infer<typeof updateUserParams>) {
  const cClient = await clerkClient()
  await cClient.users.updateUserMetadata(userId, { publicMetadata })
  revalidatePath(`/dashboard/users`)
}

export async function deleteUser(userId: string) {
  const cClient = await clerkClient()
  await cClient.users.deleteUser(userId)
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
