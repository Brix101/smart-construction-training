"use client"

import { Button } from "@/components/ui/button"
import { Material } from "@/db/schema"
import { Download } from "lucide-react"

interface TopicPlayerHeaderProps {
  materials: { material: Material }[]
}

export function DownloadMaterialButton({ materials }: TopicPlayerHeaderProps) {
  function openLinks() {
    materials.forEach(({ material }) => {
      window.open(material.link, "_blank")
    })
  }

  return (
    <Button
      onClick={openLinks}
      variant="outline"
      className="flex items-center rounded-2xl"
      disabled={materials.length === 0}
    >
      <Download className="mr-2 h-4 w-4" />
      Download Topics and Materials
      <span className="sr-only">Download Topics and Materials</span>
    </Button>
  )
}
