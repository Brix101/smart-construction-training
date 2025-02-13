import { env } from "@/env.mjs"
import { type Metadata } from "next"

import { Shell } from "@/components/shells/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResetPasswordConfirmForm } from "@/app/(auth)/_components/reset-password-confirm-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Reset Password",
  description: "Enter your email to reset your password",
}

export default function ResetPasswordStep2Page() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter the verification code and your new password to reset your
            account access. Please confirm your new password to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordConfirmForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
