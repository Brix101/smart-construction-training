"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { CircleIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"

import type { TopicGroup } from "@/types/topic"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebounce } from "@/hooks/use-debounce"
import { filterTopics } from "@/lib/actions/topic"
import { catchError, cn, isMacOs } from "@/lib/utils"

import { Kbd } from "./kbd"

export function TopicCommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)
  const [data, setData] = React.useState<TopicGroup[] | null>(null)
  const [isPending, startTransition] = React.useTransition()

  React.useEffect(() => {
    if (debouncedQuery.length <= 0) {
      setData(null)
      return
    }

    async function fetchData() {
      try {
        const { data } = await filterTopics({ query: debouncedQuery })
        setData(data)
      } catch (err) {
        catchError(err)
      }
    }

    startTransition(fetchData)

    return () => setData(null)
  }, [debouncedQuery])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setOpen(false)
    callback()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon className="size-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Start typing...</span>
        <span className="sr-only">Start typing</span>
        <Kbd
          title={isMacOs() ? "Command" : "Control"}
          className="pointer-events-none absolute right-1.5 top-1.5 hidden xl:block"
        >
          {isMacOs() ? "⌘" : "Ctrl"} K
        </Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          if (!open) {
            setQuery("")
          }
        }}
      >
        <CommandInput
          placeholder="Start typing..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No Item found.
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={group.course}
                className="capitalize"
                heading={group.course}
              >
                {group.topics.map((item) => {
                  return (
                    <CommandItem
                      key={item.id}
                      className="h-9"
                      value={item.name}
                      onSelect={() =>
                        handleSelect(() => router.push(`/topic/${item.id}`))
                      }
                    >
                      <CircleIcon
                        className="mr-2.5 size-3 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
