import { type Metadata } from "next"
import { SignUp } from "@clerk/nextjs"

import { Shell } from "@/components/shell"
import { env } from "@/env"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign Up",
  description: "Sign up for an account",
}

export default function SignUpPage() {
  return (
    <Shell className="max-w-lg">
      <SignUp />
    </Shell>
  )
}
