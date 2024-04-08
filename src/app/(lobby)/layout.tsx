import { SiteHeader } from "@/components/layouts/site-header"
import { getCacheduser } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

interface LobyLayoutProps
  extends React.PropsWithChildren<{
    // modal: React.ReactNode
  }> {}

export default async function LobyLayout({ children }: LobyLayoutProps) {
  const user = await getCacheduser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">
        {children}
        {/* {modal} */}
      </main>
    </div>
  )
}
