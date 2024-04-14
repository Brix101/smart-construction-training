import { CourseCard } from "@/components/cards/course-card"
import { ContentSection } from "@/components/content-section"
import { Shell } from "@/components/shells/shell"
import { getPublishedCourses } from "@/lib/actions/course"

interface LobbyProps {
  coursesPromises: ReturnType<typeof getPublishedCourses>
}

export async function Lobby({ coursesPromises }: LobbyProps) {
  const [allCourses] = await Promise.all([coursesPromises])
  return (
    <Shell>
      <ContentSection
        title="Courses"
        description="Explore available courses for you"
      >
        {allCourses.map(course => (
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
