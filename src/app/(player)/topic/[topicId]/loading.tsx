import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPage() {
  return (
    <div className="flex w-full flex-col">
      <nav className="flex w-full justify-between border-b bg-background px-4 py-2">
        <div>
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-36" />
        </div>
      </nav>
      <section className="flex h-[calc(100vh-3.5rem)]">
        <aside className="mt-4  flex h-screen w-72 flex-col gap-2 border-r">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </aside>
        <div className="flex-1"></div>
      </section>
    </div>
  )
}
