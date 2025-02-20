import type { Metadata } from "next"
import { Waitlist } from "@clerk/nextjs"

import { Shell } from "@/components/shell"
import { env } from "@/env"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Waitlist",
  description: "Join the waitlist",
}

export default function WaitlistPage() {
  return (
    <Shell className="max-w-lg">
      <Waitlist />
    </Shell>
  )
}
