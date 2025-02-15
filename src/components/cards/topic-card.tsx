"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import type { Topic } from "@/db/schema"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TopicCardProps {
  topic: Topic
  href: string
}

export function TopicCard({ topic, href }: TopicCardProps) {
  return (
    <Link href={href}>
      <span className="sr-only">{topic.name}</span>
      <Card className="h-full w-full overflow-hidden transition-colors hover:bg-muted/50">
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={`https://img.youtube.com/vi/${topic.youtubeId}/hqdefault.jpg`}
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
