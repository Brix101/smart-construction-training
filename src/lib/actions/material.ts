"use server"

import type { z } from "zod"
import { and, eq } from "drizzle-orm"

import type { NewMaterial } from "@/db/schema"
import type { topicMaterialSchema } from "@/lib/validations/material"
import { db } from "@/db"
import { materials, topicMaterials } from "@/db/schema"

function parseMaterialLinks(input: string): NewMaterial[] {
  const uniqueMaterials = [
    ...new Set(
      input
        .split(",")
        .map((value) => value.trim())
        .filter((value) => value !== "")
    ),
  ]

  return uniqueMaterials.map((value) => ({
    link: value,
  }))
}

export async function addTopicMaterialsLink(
  input: z.infer<typeof topicMaterialSchema>
) {
  if (input.materials !== "") {
    const materialLinks = parseMaterialLinks(input.materials)

    const insertedMaterials = await db
      .insert(materials)
      .values(materialLinks)
      .onConflictDoUpdate({ target: materials.link, set: { name: "" } })
      .returning({ id: materials.id })

    const newTopicToMaterials = insertedMaterials.map((material) => {
      return { materialId: material.id, topicId: input.topicId }
    })

    await db.insert(topicMaterials).values(newTopicToMaterials)
  }
}

export async function updateTopicMaterialsLink(
  input: z.infer<typeof topicMaterialSchema>
) {
  if (input.materials !== "") {
    const materialLinks = parseMaterialLinks(input.materials)

    const topicsMaterials = await db
      .select({
        materialId: topicMaterials.materialId,
        link: materials.link,
      })
      .from(topicMaterials)
      .leftJoin(materials, eq(materials.id, topicMaterials.materialId))
      .where(eq(topicMaterials.topicId, input.topicId))

    const toInsert = materialLinks.filter(
      (item) => !topicsMaterials.find(({ link }) => link === item.link)
    )

    if (toInsert.length > 0) {
      const insertedMaterials = await db
        .insert(materials)
        .values(toInsert)
        .onConflictDoUpdate({ target: materials.link, set: { name: "" } })
        .returning({ id: materials.id })

      const newTopicToMaterials = insertedMaterials.map((material) => {
        return { materialId: material.id, topicId: input.topicId }
      })
      await db
        .insert(topicMaterials)
        .values(newTopicToMaterials)
        .onConflictDoNothing()
    }

    const toDelete = topicsMaterials.filter(
      (item) => !materialLinks.find(({ link }) => link === item.link)
    )
    await Promise.all(
      toDelete.map(async ({ materialId }) => {
        await db
          .delete(topicMaterials)
          .where(
            and(
              eq(topicMaterials.topicId, input.topicId),
              eq(topicMaterials.materialId, materialId)
            )
          )
      })
    )
  }
}
