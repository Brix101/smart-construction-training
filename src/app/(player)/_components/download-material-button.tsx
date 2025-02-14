"use client"

import { Download } from "lucide-react"

import type { Material } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TopicPlayerHeaderProps {
  materials: { material: Material }[]
}

export function DownloadMaterialButton({ materials }: TopicPlayerHeaderProps) {
  function openLinks() {
    materials.forEach(({ material }) => {
      window.open(material.link, "_blank")
    })
  }

  const isDisabled = materials.length === 0

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
      Download Topics and Materials
      <span className="sr-only">Download Topics and Materials</span>
    </Button>
  )
}
