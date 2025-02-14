import type { SSOCallbackProps } from "@/types"
import { SSOCallback } from "@/app/(auth)/_components/sso-callback"
import { Shell } from "@/components/shells/shell"

export default async function SSOCallbackPage(props: SSOCallbackProps) {
  const searchParams = await props.searchParams
  return (
    <Shell className="max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  )
}
