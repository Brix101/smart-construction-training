import "server-only"

import { eq } from "drizzle-orm"

import type { Topic } from "@/db/schema"
import { db } from "@/db"
import { topics } from "@/db/schema"

export async function getTopic(topicId: Topic["id"]) {
  return await db.query.topics.findFirst({
    where: eq(topics.id, topicId),
    with: {
      materials: {
        with: {
          material: true,
        },
      },
      // course: {
      //   with: {
      //     topics: {
      //       where: eq(topics.isActive, true),
      //       orderBy: sql`COALESCE(SUBSTRING(${topics.name} FROM '^(\\d+)')::INTEGER,99999999)`,
      //     },
      //   },
      // },
    },
  })
}
