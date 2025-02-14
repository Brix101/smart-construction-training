import type { Roles } from "@/types/globals"

import { getCacheduser } from "./actions/auth"

export const checkRole = async (role: Roles) => {
  const user = await getCacheduser()

  console.log(user?.publicMetadata)

  return user?.publicMetadata.role === role
}
