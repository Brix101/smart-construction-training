import { Icons } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { siteConfig } from "@/config/site"
import { TopicSidebarLoader } from "@/app/(player)/_components/topic-sidebar-loader"

export default function LoadingPage() {
  return (
    <div className="container flex w-full flex-col gap-6">
      <header className="sticky top-0 z-50 w-full bg-background">
        <nav className="flex w-full justify-between bg-background px-4 py-2">
          <div className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" aria-hidden="true" />
            <span className="hidden text-2xl font-bold lg:inline-block">
              {siteConfig.name}
            </span>
            <span className="sr-only">Home</span>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-9 w-32" />
          </div>
        </nav>
      </header>
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Skeleton className="mb-4 aspect-video w-full rounded-xl" />
          <Skeleton className="mb-2 mt-10 h-8 w-3/4" />
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-8 w-1/4 rounded-2xl" />
          </div>
        </div>
        <div className="lg:col-span-4">
          <TopicSidebarLoader />
        </div>
      </section>
    </div>
  )
}
