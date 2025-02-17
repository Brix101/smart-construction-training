import { relations, sql } from "drizzle-orm"
import { pgEnum, pgTable, primaryKey } from "drizzle-orm/pg-core"

export const courses = pgTable("courses", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 256 }).unique().notNull(),
  description: t.text(),
  level: t.integer().notNull().default(1),
  sequence: t.integer().notNull().default(0),
  isPublished: t.boolean().notNull().default(false),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "string", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}))

export type Course = typeof courses.$inferSelect
export type NewCourse = typeof courses.$inferInsert

export const coursesRelations = relations(courses, ({ many }) => ({
  topics: many(topics),
}))

export const topics = pgTable("topics", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 256 }).notNull(),
  youtubeUrl: t.text(),
  description: t.text(),
  courseId: t
    .uuid()
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "string", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}))

export type Topic = typeof topics.$inferSelect
export type NewTopic = typeof topics.$inferInsert

export const topicsRelations = relations(topics, ({ one, many }) => ({
  course: one(courses, {
    fields: [topics.courseId],
    references: [courses.id],
  }),
  materials: many(topicMaterials),
}))

export const materialType = pgEnum("material_type", ["upload", "download"])

export const materials = pgTable("materials", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 256 }).default(""),
  link: t.text().unique().notNull(),
  materialType: materialType().default("download").notNull(),
  isActive: t.boolean().notNull().default(true),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "string", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}))

export type Material = typeof materials.$inferSelect
export type NewMaterial = typeof materials.$inferInsert

export const materialsRelations = relations(materials, ({ many }) => ({
  topics: many(topicMaterials),
}))

export const topicMaterials = pgTable(
  "topic_materials",
  (t) => ({
    topicId: t
      .uuid()
      .notNull()
      .references(() => topics.id),
    materialId: t
      .uuid()
      .notNull()
      .references(() => materials.id),
  }),
  (t) => [primaryKey({ columns: [t.topicId, t.materialId] })]
)

export type NewTopicsToMaterials = typeof topicMaterials.$inferInsert

export const topicsToMaterialsRelations = relations(
  topicMaterials,
  ({ one }) => ({
    material: one(materials, {
      fields: [topicMaterials.materialId],
      references: [materials.id],
    }),
    topic: one(topics, {
      fields: [topicMaterials.topicId],
      references: [topics.id],
    }),
  })
)
