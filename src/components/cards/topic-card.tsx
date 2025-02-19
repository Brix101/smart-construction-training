"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import type { Topic } from "@/db/schema"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getYouTubeId } from "@/lib/youtube"

interface TopicCardProps {
  topic: Topic
  href: string
}

export function TopicCard({ topic, href }: TopicCardProps) {
  const youtubeId = getYouTubeId(topic.youtubeUrl)

  const imageSrc = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : "/placeholder.svg"

  return (
    <Link href={href}>
      <span className="sr-only">{topic.name}</span>
      <Card className="h-full w-full overflow-hidden transition-colors hover:bg-muted/50">
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={21 / 9}>
            <Image
              src={imageSrc}
              alt={topic.name}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
              loading="lazy"
            />
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{topic.name}</span>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{topic.name}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  )
}
