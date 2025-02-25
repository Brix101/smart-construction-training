"use client"

import { Download } from "lucide-react"

import type { Material } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TopicPlayerHeaderProps {
  materials: { material: Material }[]
}

export function DownloadMaterialButton({ materials }: TopicPlayerHeaderProps) {
  console.log(materials)

  const downloadMaterial = materials
    .filter(({ material }) => material.type === "download")
    .map((item) => item.material)

  function openLinks() {
    downloadMaterial.forEach((material) => {
      window.open(material.link, "_blank")
    })
  }

  const isDisabled = downloadMaterial.length === 0

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
      <Download className="mr-2 h-4 w-4" />
      Download Training Materials
      <span className="sr-only">Download Training Materials</span>
    </Button>
  )
}
