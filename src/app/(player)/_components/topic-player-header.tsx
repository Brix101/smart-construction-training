"use client"

import { Button } from "@/components/ui/button"
import { Course, Material } from "@/db/schema"
import { useSidebar } from "@/providers/sidebar-provider"
import {
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DownloadIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons"
import Link from "next/link"

interface TopicPlayerHeaderProps {
  course: Course
  materials: { material: Material }[]
}

export function TopicPlayerHeader({
  materials,
  course,
}: TopicPlayerHeaderProps) {
  const { open, setOpen } = useSidebar()

  function openLinks() {
    materials.forEach(({ material }) => {
      window.open(material.link, "_blank")
    })
  }

  return (
    <nav className="flex w-full justify-between border-b bg-background px-4 py-2">
      <div>
        <Button variant="secondary" onClick={() => setOpen(prev => !prev)}>
          <span className="size-4 mr-2">
            {open ? (
              <DoubleArrowLeftIcon aria-hidden="true" />
            ) : (
              <HamburgerMenuIcon aria-hidden="true" />
            )}
          </span>
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
  )
}
