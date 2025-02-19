import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPage() {
  return (
    <>
      <Skeleton className="mb-4 aspect-video w-full rounded-xl" />
      <Skeleton className="mb-2 mt-10 h-8 w-3/4" />
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-8 w-1/4 rounded-2xl" />
      </div>
    </>
  )
}
