import { readFile } from "fs/promises"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

import type { Course, Material, Topic } from "@/db/schema"
import { db } from "@/db"
import { courses, materials, topicMaterials, topics } from "@/db/schema"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function readJSON(fileName: string) {
  try {
    const filePath = resolve(__dirname, "../../data", fileName)
    const data = await readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error)
    return null // Return null if file fails to read
  }
}

interface OldCourse extends Omit<Course, "id"> {
  id: number
}

interface OldMaterial extends Omit<Material, "id"> {
  id: number
}

interface OldTopic extends Omit<Topic, "id" | "courseId"> {
  id: number
  courseId: number
}

interface OldTopicMaterial {
  topic_id: number
  material_id: number
}

async function main() {
  const fileNames = [
    "course.json",
    "topic.json",
    "topicMaterials.json",
    "materials.json",
  ]

  const results = await Promise.all(fileNames.map(readJSON))

  const oldCourses = results[0] as OldCourse[]
  const oldTopics = results[1] as OldTopic[]
  const oldTopicMaterials = results[2] as OldTopicMaterial[]
  const oldMaterials = results[3] as OldMaterial[]

  for (const oCourse of oldCourses) {
    const [newCourse] = await db
      .insert(courses)
      .values({
        name: oCourse.name,
        level: oCourse.level,
        isPublished: oCourse.isPublished,
      })
      .onConflictDoNothing()
      .returning()

    const oCourseTopics = oldTopics.filter((t) => t.courseId === oCourse.id)

    console.log(newCourse)

    for (const oTopic of oCourseTopics) {
      const [newTopic] = await db
        .insert(topics)
        .values({
          name: oTopic.name,
          youtubeUrl: oTopic.youtubeUrl,
          courseId: newCourse.id,
          description: oTopic.description,
          isActive: oTopic.isActive,
        })
        .returning()

      const oTopicMaterials = oldTopicMaterials.filter(
        (tm) => tm.topic_id === oTopic.id
      )

      const oMaterials = oTopicMaterials
        .map((tm) => oldMaterials.find((m) => m.id === tm.material_id))
        .filter(Boolean) as OldMaterial[]

      for (const oMaterial of oMaterials) {
        const insertedMaterials = await db
          .insert(materials)
          .values({
            name: oMaterial.name,
            link: oMaterial.link,
            isActive: oMaterial.isActive ?? true,
          })
          .onConflictDoNothing()
          .returning({ id: materials.id })

        const newTopicToMaterials = insertedMaterials.map((material) => {
          return { materialId: material.id, topicId: newTopic.id }
        })

        if (newTopicToMaterials.length > 0) {
          await db.insert(topicMaterials).values(newTopicToMaterials)
        }
      }
    }
  }
}

void main()
