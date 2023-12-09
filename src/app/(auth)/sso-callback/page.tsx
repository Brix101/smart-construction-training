import { SSOCallback } from "@/components/auth/sso-callback"
import { Shell } from "@/components/shells/shell"
import { SSOCallbackProps } from "@/types"

export default function SSOCallbackPage({ searchParams }: SSOCallbackProps) {
  return (
    <Shell className="max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  )
}
