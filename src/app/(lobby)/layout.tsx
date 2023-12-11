import { CourseSidebarNav } from "@/components/layouts/course-sidebar-nav"
import { SiteHeader } from "@/components/layouts/site-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import getCourses from "../_action/getCourses"

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const courses = await getCourses()

  const navItems = courses.map(course => ({
    ...course,
    href: `/courses/${course.id}`,
    items: [],
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <div className="mx-10 flex-1 items-start md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-2">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <CourseSidebarNav items={navItems} className="p-1" />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
