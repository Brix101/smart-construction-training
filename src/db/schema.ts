import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  level: integer("level").notNull().default(1),
  sequence: integer("sequence").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Course = typeof courses.$inferSelect
export type NewCourse = typeof courses.$inferInsert

export const coursesRelations = relations(courses, ({ many }) => ({
  topics: many(topics),
}))

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  youtubeId: varchar("youtube_id", { length: 100 }).notNull(),
  youtubeUrl: text("youtube_url"),
  description: text("description"),
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Topic = typeof topics.$inferSelect
export type NewTopic = typeof topics.$inferInsert

export const topicsRelations = relations(topics, ({ one, many }) => ({
  course: one(courses, {
    fields: [topics.courseId],
    references: [courses.id],
  }),
  materials: many(topicsToMaterials),
}))

export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).default(""),
  link: text("link").unique().notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Material = typeof materials.$inferSelect
export type NewMaterial = typeof materials.$inferInsert

export const materialsRelations = relations(materials, ({ many }) => ({
  topics: many(topicsToMaterials),
}))

export const topicsToMaterials = pgTable(
  "topics_to_materials",
  {
    topicId: integer("topic_id")
      .notNull()
      .references(() => topics.id),
    materialId: integer("material_id")
      .notNull()
      .references(() => materials.id),
  },
  t => ({
    pk: primaryKey({ columns: [t.topicId, t.materialId] }),
  }),
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
  }),
)
