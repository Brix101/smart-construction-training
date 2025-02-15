import type { getCourseList } from "@/lib/actions/course"
import { CourseCard } from "@/components/cards/course-card"
import { ContentSection } from "@/components/content-section"
import { Shell } from "@/components/shell"

interface LobbyProps {
  coursesPromises: ReturnType<typeof getCourseList>
}

export async function Lobby({ coursesPromises }: LobbyProps) {
  const [allCourses] = await Promise.all([coursesPromises])
  return (
    <Shell>
      <ContentSection
        title="Courses"
        description="Explore available courses for you"
      >
        {allCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            href={`/course/${course.id}`}
          />
        ))}
      </ContentSection>
    </Shell>
  )
}
