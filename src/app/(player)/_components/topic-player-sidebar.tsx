"use client"

import { CourseSidebarNav } from "@/app/(player)/_components/course-sidebar-nav"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Topic } from "@/db/schema"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/providers/sidebar-provider"

interface TopicPlayerSideBarProps {
  topics: Topic[]
}

export function TopicPlayerSideBar({ topics }: TopicPlayerSideBarProps) {
  const { open } = useSidebar()

  const navItems = topics.map(topic => ({
    title: topic.name,
    href: `/topic/${topic.id}`,
    items: [],
  }))

  return (
    <aside
      className={cn(
        "h-screen flex-shrink-0 border-r transition-all duration-300",
        open ? "ml-0" : "-ml-72",
      )}
    >
      <ScrollArea className="pt-4">
        <CourseSidebarNav items={navItems} className="p-1" />
      </ScrollArea>
    </aside>
  )
}
