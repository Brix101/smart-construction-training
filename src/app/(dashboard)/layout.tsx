import { DashboardHeader } from "@/app/(dashboard)/dashboard/_components/dashboard-header"
import { DashboardSidebar } from "@/app/(dashboard)/dashboard/_components/dashboard-sidebar"
import { DashboardSidebarSheet } from "@/app/(dashboard)/dashboard/_components/dashboard-sidebar-sheet"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getCacheduser } from "@/lib/actions/auth"
import { checkRole } from "@/lib/roles"

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCacheduser()
  const isAdmin = await checkRole("admin")

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
        <DashboardSidebar
          isAdmin={isAdmin}
          className="top-0 z-30 hidden flex-col gap-4 border-r border-border/60 lg:sticky lg:block"
        />
        <div className="flex flex-col">
          <DashboardHeader user={user}>
            <DashboardSidebarSheet className="lg:hidden">
              <DashboardSidebar isAdmin={isAdmin} />
            </DashboardSidebarSheet>
          </DashboardHeader>
          <main className="flex-1 overflow-hidden px-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
