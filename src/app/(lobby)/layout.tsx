import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { currentUser } from "@clerk/nextjs"

interface LobyLayoutProps
  extends React.PropsWithChildren<{
    // modal: React.ReactNode
  }> {}

export default async function LobyLayout({ children }: LobyLayoutProps) {
  const user = await currentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">
        {children}
        {/* {modal} */}
      </main>
      <SiteFooter />
    </div>
  )
}
