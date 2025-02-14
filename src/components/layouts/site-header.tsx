import type { User } from "@clerk/nextjs/server"
import { ModeToggle } from "@/components/layouts//mode-toggle"
import { AuthDropdown } from "@/components/layouts/auth-dropdown"
import { MainNav } from "@/components/layouts/main-nav"
import { MobileNav } from "@/components/layouts/mobile-nav"
import { TopicCommandMenu } from "@/components/topic-command-menu"
import { siteConfig } from "@/config/site"
import { getPublishedCourses } from "@/lib/actions/course"

interface SiteHeaderProps {
  user: User | null
}

export async function SiteHeader({ user }: SiteHeaderProps) {
  const coursePromises = await getPublishedCourses()
  const [allCourses] = await Promise.all([coursePromises])

  const navItems = allCourses.map((course) => ({
    title: course.name,
    href: `/course/${course.id}`,
    items: [],
  }))

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav sidebarNavItems={navItems} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <TopicCommandMenu />
            <ModeToggle />
            <AuthDropdown user={user} />
          </nav>
        </div>
      </div>
    </header>
  )
}
