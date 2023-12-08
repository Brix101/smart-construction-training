import { SiteHeader } from "@/components/layouts/site-header"

async function getData() {
  type Course = {
    id: Number
    title: string
    url: string
  }

  const courses: Array<Course> = [
    {
      id: 1,
      title: "Civil 3D Basic Training",
      url: "https://youtu.be/P6gTAB0dohA",
    },
    {
      id: 2,
      title: "Part 1 - About Feature Line",
      url: "https://youtu.be/21uLZk-t-jM",
    },
    {
      id: 3,
      title: "Part 2 - About Road Assembly and Sub-assembly",
      url: "https://youtu.be/VTm5I_46jqM",
    },
    {
      id: 4,
      title: "Part 3 - About Corridors",
      url: "https://youtu.be/VTm5I_46jqM",
    },
    {
      id: 5,
      title: "Part 4 - Explode",
      url: "https://youtu.be/2RLunaf-Wko",
    },
    {
      id: 6,
      title: "Part 5 - Cleaning up drawing",
      url: "https://youtu.be/2RLunaf-Wko",
    },
    {
      id: 6,
      title: "Part 5 - Cleaning up drawing",
      url: "https://youtu.be/tdVZs4M5dS8",
    },
  ]
  return courses
}

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const courses = await getData()
  console.log(courses)
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={null} />
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          {/* <ScrollArea className="py-6 pr-6 lg:py-8"> */}
          {/*   <SidebarNav items={dashboardConfig.sidebarNav} className="p-1" /> */}
          {/* </ScrollArea> */}
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
