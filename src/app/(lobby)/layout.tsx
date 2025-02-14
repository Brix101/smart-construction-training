import { SiteHeader } from "@/components/layouts/site-header"
import { getCacheduser } from "@/lib/actions/auth"

export default async function LobyLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCacheduser()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">
        {children}
        {/* {modal} */}
      </main>
      {/* <SiteFooter /> */}
    </div>
  )
}
