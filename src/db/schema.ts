import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const courses = pgTable(
  "courses",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    urlId: varchar("url_id", { length: 100 }),
    youtubeUrl: text("youtube_irl"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  },
  //   courses => {
  //     return {
  //       nameIndex: uniqueIndex("name_idx").on(courses.name),
  //     }
  //   },
)

export type Course = typeof courses.$inferSelect
export type NewCourse = typeof courses.$inferInsert

export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).default(""),
  courseId: integer("course_id").references(() => courses.id),
})

export type Material = typeof materials.$inferSelect
export type NewMaterial = typeof materials.$inferInsert
