import Link from "next/link"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function TopicPlayerHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="flex w-full justify-between bg-background px-4 py-2">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" aria-hidden="true" />
          <span className="hidden text-2xl font-bold lg:inline-block">
            {siteConfig.name}
          </span>
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex gap-4">
          <Button variant="secondary" asChild>
            <Link href="/">
              View Courses
              <span className="sr-only">View Courses</span>
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
