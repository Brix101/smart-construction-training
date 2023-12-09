import getCourses from "@/app/_action/getCourses"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface UpdateCoursePageProps {
  params: {
    courseId: string
  }
}

export default async function CoursePage({ params }: UpdateCoursePageProps) {
  const courses = await getCourses()

  const course = courses.find(course => course.id == params.courseId)

  return (
    <div className="flex flex-col space-y-10 pb-10">
      <iframe
        className="h-[calc(100vh-5rem)] w-full"
        src={`https://www.youtube.com/embed/${params.courseId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <PageHeader>
        <PageHeaderHeading>{course?.title}</PageHeaderHeading>
        <ul className="space-y-2 pt-5">
          {course?.materials?.map((material, index) => {
            return (
              <li key={index}>
                <PageHeaderDescription size="sm">
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "default",
                      }),
                    )}
                    href={material.url}
                    target="_blank"
                  >
                    {material.name ?? `Material link ${index + 1}`}
                  </Link>
                </PageHeaderDescription>
              </li>
            )
          })}
        </ul>
      </PageHeader>
    </div>
  )
}
