import { DashboardSidebar } from "@/app/(dashboard)/dashboard/_components/dashboard-sidebar"
import { SiteHeader } from "@/components/layouts/site-header"
import { getCacheduser } from "@/lib/actions/auth"
import { checkRole } from "@/lib/roles"
import { SidebarProvider } from "@/providers/sidebar-provider"

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCacheduser()
  const isAdmin = await checkRole("admin")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader user={user} />
        <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <DashboardSidebar
            className="top-[calc(theme('spacing.16')_+_0.1rem)] z-30 hidden border-r lg:sticky lg:block"
            isAdmin={isAdmin}
          />
          <main className="flex w-full flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
