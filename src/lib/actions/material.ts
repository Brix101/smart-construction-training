"use server"

import { db } from "@/db"
import { NewMaterial, materials, topicsToMaterials } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { materialSchema } from "../validations/material"

function parseMaterialLinks(input: string): NewMaterial[] {
  const uniqueMaterials = [
    ...new Set(
      input
        .split(",")
        .map(value => value.trim())
        .filter(value => value !== ""),
    ),
  ]

  return uniqueMaterials.map(value => ({
    link: value,
  }))
}

export async function addTopicMaterialsLink(
  input: z.infer<typeof materialSchema>,
) {
  if (input.materials !== "") {
    const materialLinks = parseMaterialLinks(input.materials)

    const insertedMaterials = await db
      .insert(materials)
      .values(materialLinks)
      .onConflictDoUpdate({ target: materials.link, set: { name: "" } })
      .returning({ id: materials.id })

    const newTopicToMaterials = insertedMaterials.map(material => {
      return { materialId: material.id, topicId: input.topicId }
    })

    await db.insert(topicsToMaterials).values(newTopicToMaterials)
  }
}

export async function updateTopicMaterialsLink(
  input: z.infer<typeof materialSchema>,
) {
  if (input.materials !== "") {
    const materialLinks = parseMaterialLinks(input.materials)

    const topicsMaterials = await db
      .select({
        materialId: topicsToMaterials.materialId,
        link: materials.link,
      })
      .from(topicsToMaterials)
      .leftJoin(materials, eq(materials.id, topicsToMaterials.materialId))
      .where(eq(topicsToMaterials.topicId, input.topicId))

    const toInsert = materialLinks.filter(
      item => !topicsMaterials.find(({ link }) => link === item.link),
    )

    if (toInsert.length > 0) {
      const insertedMaterials = await db
        .insert(materials)
        .values(toInsert)
        .onConflictDoUpdate({ target: materials.link, set: { name: "" } })
        .returning({ id: materials.id })

      const newTopicToMaterials = insertedMaterials.map(material => {
        return { materialId: material.id, topicId: input.topicId }
      })
      await db
        .insert(topicsToMaterials)
        .values(newTopicToMaterials)
        .onConflictDoNothing()
    }

    const toDelete = topicsMaterials.filter(
      item => !materialLinks.find(({ link }) => link === item.link),
    )
    await Promise.all(
      toDelete.map(async ({ materialId }) => {
        await db
          .delete(topicsToMaterials)
          .where(
            and(
              eq(topicsToMaterials.topicId, input.topicId),
              eq(topicsToMaterials.materialId, materialId),
            ),
          )
      }),
    )
  }
}
