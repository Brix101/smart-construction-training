"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlayIcon } from "@radix-ui/react-icons"

import type { Topic } from "@/db/schema"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface TopicPlayerSideBarProps {
  topics: Topic[]
}

export function PlayerNavItems({ topics }: TopicPlayerSideBarProps) {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="flex flex-col gap-2">
        {topics.map((topic) => {
          const href = `/topic/${topic.id}`
          const isActive = href.includes(pathname)
          return (
            <Link aria-label={topic.name} key={topic.id} href={href}>
              <span
                className={cn(
                  "group hover:bg-muted hover:text-foreground flex w-full items-center rounded-md border border-transparent px-2 py-1",
                  isActive
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                <div className="w-8">
                  <PlayIcon className={cn(isActive ? "" : "invisible")} />
                </div>
                <span className="line-clamp-1 overflow-ellipsis">
                  {topic.name}
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </ScrollArea>
  )
}
