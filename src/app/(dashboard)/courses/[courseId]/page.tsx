interface UpdateCoursePageProps {
  params: {
    courseId: string
  }
}

export default async function CoursePage({ params }: UpdateCoursePageProps) {
  return (
    <div>
      <iframe
        className="h-[calc(100vh-5rem)] w-full"
        src={`https://www.youtube.com/embed/${params.courseId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )
}
