import { SiteHeader } from "@/components/layouts/site-header"
import { getCacheduser } from "@/lib/actions/auth"
import { checkRole } from "@/lib/roles"

export default async function LobyLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCacheduser()
  const isAdmin = await checkRole("admin")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} isAdmin={isAdmin} />
      <main className="flex-1">
        {children}
        {/* {modal} */}
      </main>
      {/* <SiteFooter /> */}
    </div>
  )
}
