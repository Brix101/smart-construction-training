"use server"

import { revalidatePath } from "next/cache"
import { clerkClient } from "@clerk/nextjs/server"
import { z } from "zod"

import type { Roles } from "@/types/globals"
import { publicMetadataSchema } from "@/lib/validations/auth"

import { checkRole } from "../roles"

const updateUserParams = publicMetadataSchema.extend({
  userId: z.string(),
})

export async function updateUser({
  userId,
  ...publicMetadata
}: z.infer<typeof updateUserParams>) {
  const client = await clerkClient()
  await client.users.updateUserMetadata(userId, { publicMetadata })
  revalidatePath(`/dashboard/users`)
}

export async function deleteUser(userId: string) {
  const client = await clerkClient()
  await client.users.deleteUser(userId)
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

export async function requireRole<T, A extends unknown[]>(
  role: Roles,
  action: (...args: A) => Promise<T> | T
): Promise<(...args: A) => Promise<T>> {
  return async (...args: A) => {
    try {
      // Ensure the user has the required role
      if (!(await checkRole(role))) {
        throw new Error("Unauthorized")
      }

      // Execute the action
      return await action(...args)
    } catch (error) {
      console.error(`Error in ${action.name}:`, error)
      throw new Error("An unexpected error occurred. Please try again.")
    }
  }
}
