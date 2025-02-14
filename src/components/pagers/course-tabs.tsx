"use client"

import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface CourseTabsProps {
  courseId: number
}

export function CourseTabs({ courseId }: CourseTabsProps) {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  const tabs = [
    {
      title: "Course",
      href: `/dashboard/courses/${courseId}`,
      isActive: segment === null,
    },
    {
      title: "Topics",
      href: `/dashboard/courses/${courseId}/topics`,
      isActive: segment === "topics",
    },
    // {
    //   title: "Orders",
    //   href: `/dashboard/courses/${courseId}/orders`,
    //   isActive: segment === "orders",
    // },
    // {
    //   title: "Customers",
    //   href: `/dashboard/courses/${courseId}/customers`,
    //   isActive: segment === "customers",
    // },
    // {
    //   title: "Analytics",
    //   href: `/dashboard/courses/${courseId}/analytics`,
    //   isActive: segment === "analytics",
    // },
  ]

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      className="bg-background sticky top-0 z-30 w-full overflow-auto px-1"
      onValueChange={(value) => router.push(value)}
    >
      <TabsList className="text-muted-foreground inline-flex items-center justify-center space-x-1.5">
        {tabs.map((tab) => (
          <div
            role="none"
            key={tab.href}
            className={cn(
              "border-b-2 border-transparent py-1.5",
              tab.isActive && "border-foreground"
            )}
          >
            <TabsTrigger
              value={tab.href}
              className={cn(
                "text-muted-foreground ring-offset-background hover:bg-muted hover:text-primary focus-visible:ring-ring inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
                tab.isActive && "text-foreground"
              )}
            >
              {tab.title}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
      <Separator />
    </Tabs>
  )
}
