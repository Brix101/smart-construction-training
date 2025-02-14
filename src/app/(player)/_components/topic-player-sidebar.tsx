import { ScrollArea } from "@/components/ui/scroll-area"
import { Topic } from "@/db/schema"
import Image from "next/image"
import Link from "next/link"

interface TopicPlayerSideBarProps {
  topics: Topic[]
}

export function TopicPlayerSideBar({ topics }: TopicPlayerSideBarProps) {
  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      {topics.map(topic => (
        <Link key={topic.id} href={`/topic/${topic.id}`}>
          <div className="mb-4 flex">
            <Image
              src={`https://img.youtube.com/vi/${topic.youtubeId}/hqdefault.jpg`}
              alt={topic.name}
              // sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              width={160}
              height={90}
              loading="lazy"
              className="mr-2 rounded-lg object-cover"
            />
            <div>
              <h4 className="max-w-[10rem] text-sm font-semibold">
                {topic.name}
              </h4>
              {/* <p className="text-xs text-gray-500">Channel Name</p> */}
            </div>
          </div>
        </Link>
      ))}
    </ScrollArea>
  )
}
