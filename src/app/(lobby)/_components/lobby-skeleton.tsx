import { ContentSection } from "@/components/content-section"
import { Shell } from "@/components/shells/shell"
import { CourseCardSkeleton } from "@/components/skeletons/course-card-skeleton"

export async function LobbySkeleton() {
  return (
    <Shell>
      <ContentSection
        title="Courses"
        description="Explore available courses for you"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </ContentSection>
    </Shell>
  )
}
