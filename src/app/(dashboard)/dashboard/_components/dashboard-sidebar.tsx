import * as React from "react"

import { SidebarNav } from "@/components/layouts/sidebar-nav"
import { ScrollArea } from "@/components/ui/scroll-area"
import { dashboardConfig } from "@/config/dashboard"
import { adminRoutes } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  isAdmin?: boolean
}

export function DashboardSidebar({
  isAdmin,
  children,
  className,
  ...props
}: DashboardSidebarProps) {
  const filteredNav = dashboardConfig.sidebarNav.filter(
    (item) => isAdmin || !adminRoutes.includes(item.href ?? "")
  )

  return (
    <aside className={cn("w-full", className)} {...props}>
      <div className="pr-6 pt-4 lg:pt-6">{children}</div>
      <ScrollArea className="h-[calc(100vh-8rem)] py-2.5 pr-6">
        <SidebarNav items={filteredNav} className="p-1 pt-4" />
      </ScrollArea>
    </aside>
  )
}
