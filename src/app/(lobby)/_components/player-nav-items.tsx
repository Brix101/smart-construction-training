"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { PlayIcon } from "@radix-ui/react-icons"

import type { Topic } from "@/db/schema"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface TopicPlayerSideBarProps {
  topics: Topic[]
}

export function PlayerNavItems({ topics }: TopicPlayerSideBarProps) {
  const { topicId } = useParams<{ topicId: string }>()
  const pathname = usePathname()

  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="flex flex-col gap-2">
        {topics.map((topic) => {
          const href = pathname.replace(topicId, topic.id)
          const isActive = topic.id === topicId

          return (
            <Link aria-label={topic.name} key={topic.id} href={href}>
              <span
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                  isActive
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <div className={cn(isActive ? "" : "invisible")}>
                  <PlayIcon className="w-8" />
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
