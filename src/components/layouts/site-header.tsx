import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/layouts//mode-toggle"
import { MainNav } from "@/components/layouts/main-nav"
import { MobileNav } from "@/components/layouts/mobile-nav"
import { TopicCommandMenu } from "@/components/topic-command-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { siteConfig } from "@/config/site"
import { getPublishedCourses } from "@/lib/actions/course"
import { getUserEmail } from "@/lib/utils"
import type { User } from "@clerk/nextjs/server"
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons"
import Link from "next/link"

interface SiteHeaderProps {
  user: User | null
}

export async function SiteHeader({ user }: SiteHeaderProps) {
  const email = getUserEmail(user)
  const coursePromises = await getPublishedCourses()
  const [allCourses] = await Promise.all([coursePromises])

  const navItems = allCourses.map(course => ({
    title: course.name,
    href: `/courses/${course.id}`,
    items: [],
  }))

  const role = (user?.privateMetadata.role as String) ?? ""

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav sidebarNavItems={navItems} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <TopicCommandMenu />
            <ModeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.username ?? ""}
                      />
                      <AvatarFallback>{email.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {role.includes("admin") ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/courses">
                            <DashboardIcon
                              className="mr-2 h-4 w-4"
                              aria-hidden="true"
                            />
                            Dashboard
                            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/users">
                            <Icons.users
                              className="mr-2 h-4 w-4"
                              aria-hidden="true"
                            />
                            Users
                            <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    ) : undefined}
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">
                        <GearIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/sign-out">
                      <ExitIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                      Log out
                      <DropdownMenuShortcut></DropdownMenuShortcut>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/sign-in"
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Sign In
                <span className="sr-only">Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
