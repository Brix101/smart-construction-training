import { Skeleton } from "@/components/ui/skeleton"

export function TopicSidebarLoader() {
  return (
    <>
      <Skeleton className="mb-4 h-6 w-2/3" />
      <div className="flex flex-col gap-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div className="w-8" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </>
  )
}
