import CoursesGridShell from "@/components/shells/courses-grid-shell"
import { db } from "@/db"
import { searchParamsSchema } from "@/lib/validations/params"
import { SearchParams } from "@/types"

export const dynamic = "force-dynamic"

interface CoursesPageProps {
  searchParams: SearchParams
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { search } = searchParamsSchema.parse(searchParams)

  const courses = await db.query.courses.findMany({
    where: (course, { ilike }) => ilike(course.name, `%${search || ""}%`),
  })

  return (
    <>
      <CoursesGridShell courses={courses} />
    </>
  )
}
