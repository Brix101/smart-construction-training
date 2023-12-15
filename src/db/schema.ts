import { relations } from "drizzle-orm"
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  urlId: varchar("url_id", { length: 100 }),
  youtubeUrl: text("youtube_irl"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})

export type Course = typeof courses.$inferSelect
export type NewCourse = typeof courses.$inferInsert

export const coursesRelations = relations(courses, ({ many }) => ({
  materials: many(materials),
}))

export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).default(""),
  link: text("link"),
  courseId: integer("course_id").references(() => courses.id),
})

export type Material = typeof materials.$inferSelect
export type NewMaterial = typeof materials.$inferInsert

export const materialsRelations = relations(materials, ({ one }) => ({
  course: one(courses, {
    fields: [materials.courseId],
    references: [courses.id],
  }),
}))
