"use server"

import type { z } from "zod"
import { and, eq } from "drizzle-orm"

import type { materialSchema } from "@/lib/validations/material"
import { db } from "@/db"
import { materials, topicMaterials } from "@/db/schema"

export async function updateTopicMaterialsLink(
  topicId: string,
  inputMaterials: z.infer<typeof materialSchema>[]
) {
  const topicsMaterials = await db
    .select({
      materialId: topicMaterials.materialId,
      link: materials.link,
    })
    .from(topicMaterials)
    .leftJoin(materials, eq(materials.id, topicMaterials.materialId))
    .where(eq(topicMaterials.topicId, topicId))

  const toInsert = inputMaterials.filter(
    (item) => !topicsMaterials.find(({ link }) => link === item.link)
  )

  if (toInsert.length > 0) {
    //TODO: update this query to update and use the id pass from data
    const insertedMaterials = await db
      .insert(materials)
      .values(toInsert)
      .onConflictDoUpdate({ target: materials.link, set: { name: "" } })
      .returning({ id: materials.id })

    const newTopicToMaterials = insertedMaterials.map((material) => {
      return { materialId: material.id, topicId: topicId }
    })

    await db
      .insert(topicMaterials)
      .values(newTopicToMaterials)
      .onConflictDoNothing()
  }

  const toDelete = topicsMaterials.filter(
    (item) => !inputMaterials.find(({ link }) => link === item.link)
  )

  await Promise.all(
    toDelete.map(async ({ materialId }) => {
      await db
        .delete(topicMaterials)
        .where(
          and(
            eq(topicMaterials.topicId, topicId),
            eq(topicMaterials.materialId, materialId)
          )
        )
    })
  )
}
