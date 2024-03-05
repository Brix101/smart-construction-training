import { siteConfig } from "@/config/site"
import { db } from "@/db"
import { getUserEmail } from "@/lib/utils"
import type { User } from "@clerk/nextjs/server"
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Icons } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button, buttonVariants } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { TopicCommandMenu } from "../topic-command-menu"
import { getActiveCourses } from "@/lib/actions/course"

interface SiteHeaderProps {
  user: User | null
}

export async function SiteHeader({ user }: SiteHeaderProps) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`
  const email = getUserEmail(user)
  const coursePromises = await getActiveCourses()
  const [allCourses] = await Promise.all([coursePromises])

  const navItems = allCourses.map(course => ({
    title: course.name,
    href: `/${course.id}`,
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
                      <AvatarFallback>{initials}</AvatarFallback>
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
                    <Link href="/signout">
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
                href="/signin"
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
