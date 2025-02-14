import type { getCourse } from "@/lib/queries/course"

import { PlayerNavItems } from "./player-nav-items"

interface TopicPlayerSideBarProps {
  coursePromise: ReturnType<typeof getCourse>
}

export async function TopicSideBar({
  coursePromise: courseTopicsPromises,
}: TopicPlayerSideBarProps) {
  const [course] = await Promise.all([courseTopicsPromises])

  return (
    <>
      <h3 className="mb-4 font-semibold">{course?.name}</h3>
      <PlayerNavItems topics={course?.topics ?? []} />
    </>
  )
}
