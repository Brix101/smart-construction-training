import { relations, sql } from "drizzle-orm"
import { pgTable, primaryKey } from "drizzle-orm/pg-core"

export const courses = pgTable("courses", (t) => ({
  id: t.serial().primaryKey(),
  name: t.varchar({ length: 256 }).notNull(),
  description: t.text(),
  level: t.integer().notNull().default(1),
  sequence: t.integer().notNull().default(0),
  isPublished: t.boolean().notNull().default(false),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}))

export type Course = typeof courses.$inferSelect
export type NewCourse = typeof courses.$inferInsert

export const coursesRelations = relations(courses, ({ many }) => ({
  topics: many(topics),
}))

export const topics = pgTable("topics", (t) => ({
  id: t.serial().primaryKey(),
  name: t.varchar({ length: 256 }).notNull(),
  youtubeId: t.varchar({ length: 100 }).notNull(),
  youtubeUrl: t.text(),
  description: t.text(),
  courseId: t
    .integer()
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}))

export type Topic = typeof topics.$inferSelect
export type NewTopic = typeof topics.$inferInsert

export const topicsRelations = relations(topics, ({ one, many }) => ({
  course: one(courses, {
    fields: [topics.courseId],
    references: [courses.id],
  }),
  materials: many(topicsToMaterials),
}))

export const materials = pgTable("materials", (t) => ({
  id: t.serial().primaryKey(),
  name: t.varchar({ length: 256 }).default(""),
  link: t.text().unique().notNull(),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}))

export type Material = typeof materials.$inferSelect
export type NewMaterial = typeof materials.$inferInsert

export const materialsRelations = relations(materials, ({ many }) => ({
  topics: many(topicsToMaterials),
}))

export const topicsToMaterials = pgTable(
  "topics_to_materials",
  (t) => ({
    topicId: t
      .integer()
      .notNull()
      .references(() => topics.id),
    materialId: t
      .integer()
      .notNull()
      .references(() => materials.id),
  }),
  (t) => [primaryKey({ columns: [t.topicId, t.materialId] })]
)

export type NewTopicsToMaterials = typeof topicsToMaterials.$inferInsert

export const topicsToMaterialsRelations = relations(
  topicsToMaterials,
  ({ one }) => ({
    material: one(materials, {
      fields: [topicsToMaterials.materialId],
      references: [materials.id],
    }),
    topic: one(topics, {
      fields: [topicsToMaterials.topicId],
      references: [topics.id],
    }),
  })
)
