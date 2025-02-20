import { type Metadata } from "next"
import { SignIn } from "@clerk/nextjs"

import { Shell } from "@/components/shell"
import { env } from "@/env"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description: "Sign in to your account",
}

export default function SignInPage() {
  return (
    <Shell className="max-w-lg">
      <SignIn />
    </Shell>
  )
}
