import { Shell } from "@/components/shells/shell"
import { SSOCallbackProps } from "@/types"
import { SSOCallback } from "@/app/(auth)/_components/sso-callback"

export default function SSOCallbackPage({ searchParams }: SSOCallbackProps) {
  return (
    <Shell className="max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  )
}
