"use client"

import { UploadCloudIcon } from "lucide-react"

import type { Material } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TopicPlayerHeaderProps {
  materials: { material: Material }[]
}

export function UploadMaterialButton({ materials }: TopicPlayerHeaderProps) {
  console.log(materials)

  const uploadMaterials = materials
    .filter(({ material }) => material.type === "upload")
    .map((item) => item.material)

  function openLinks() {
    uploadMaterials.forEach((material) => {
      window.open(material.link, "_blank")
    })
  }

  const isDisabled = uploadMaterials.length === 0

  return (
    <Button
      onClick={openLinks}
      variant="outline"
      className={cn(
        "flex items-center rounded-2xl",
        isDisabled && "custom-cursor-not-allowed"
      )}
      disabled={isDisabled}
    >
      <UploadCloudIcon className="mr-2 h-4 w-4" />
      Upload Materials
      <span className="sr-only">Upload Materials</span>
    </Button>
  )
}
