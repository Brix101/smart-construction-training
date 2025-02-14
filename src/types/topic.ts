import type { Course, Topic } from "@/db/schema"

export interface TopicGroup {
  courseId: Course["id"]
  course: Course["name"]
  topics: Pick<Topic, "id" | "name">[]
}
