import * as React from "react"
import { Link } from "lucide-react"

import { Icons } from "@/components/icons"
import { SidebarNav } from "@/components/layouts/sidebar-nav"
import { ScrollArea } from "@/components/ui/scroll-area"
import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
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
      <div className="hidden h-[3.55rem] items-center border-b border-border/60 px-4 lg:flex lg:px-6">
        <Link
          href="/"
          className="font-heading flex w-fit items-center tracking-wider text-foreground/90 transition-colors hover:text-foreground"
        >
          <Icons.logo className="mb-1 mr-2 h-7 w-7" aria-hidden="true" />
          {siteConfig.name}
        </Link>
      </div>
      <div className="flex flex-col gap-2.5 px-4 pt-2 lg:px-6 lg:pt-4">
        {children}
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)] px-3 py-2.5 lg:px-5">
        <SidebarNav items={filteredNav} className="p-1 pt-4" />
      </ScrollArea>
    </aside>
  )
}
