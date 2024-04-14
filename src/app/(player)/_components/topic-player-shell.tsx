"use client"

import { CourseSidebarNav } from "@/app/(player)/_components/course-sidebar-nav"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Course, Material, Topic } from "@/db/schema"
import { cn } from "@/lib/utils"
import {
  ArrowRightIcon,
  DownloadIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons"
import Link from "next/link"
import React from "react"

interface PlayerShellProps extends React.PropsWithChildren {
  course: Course
  topics: Topic[]
  materials: { material: Material }[]
}

export function TopicPlayerShell({
  course,
  topics,
  materials,
  children,
}: PlayerShellProps) {
  const [open, setOpen] = React.useState<boolean>(true)

  const navItems = topics.map(topic => ({
    title: topic.name,
    href: `/topic/${topic.id}`,
    items: [],
  }))

  function openLinks() {
    materials.forEach(({ material }) => {
      window.open(material.link, "_blank")
    })
  }

  return (
    <div className="flex w-full flex-col">
      <nav className="flex w-full justify-between border-b bg-background px-4 py-2">
        <div>
          <Button variant="secondary" onClick={() => setOpen(prev => !prev)}>
            <HamburgerMenuIcon className="size-4 mr-2" aria-hidden="true" />
            Topics
            <span className="sr-only">Topics</span>
          </Button>
        </div>
        <div className="flex gap-4">
          {materials.length > 0 && (
            <Button onClick={openLinks}>
              Download Topics and Materials
              <DownloadIcon className="size-4 ml-2" aria-hidden="true" />
              <span className="sr-only">Download Topics and Materials</span>
            </Button>
          )}
          <Button variant="secondary" asChild>
            <Link href={`/course/${course.id}`}>
              Back to course
              <ArrowRightIcon className="size-4 ml-2" aria-hidden="true" />
              <span className="sr-only">Back to course</span>
            </Link>
          </Button>
        </div>
      </nav>
      <section className="flex h-[calc(100vh-3.5rem)]">
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
        <div className="flex-1">{children}</div>
      </section>
    </div>
  )
}
