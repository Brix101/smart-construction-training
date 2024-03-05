import { SiteHeader } from "@/components/layouts/site-header"
import { getCacheduser } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCacheduser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      {children}
    </div>
  )
}
