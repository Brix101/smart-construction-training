import "server-only"

import { cache } from "react"
import { currentUser } from "@clerk/nextjs/server"

export const getCacheduser = cache(async () => {
  try {
    return await currentUser()
  } catch (err) {
    console.error(err)
    return null
  }
})
