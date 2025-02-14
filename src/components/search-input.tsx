"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ ...props }, ref) => {
  const searchKey = "search"
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const initialFilter = searchParams.get(searchKey) || undefined

  const [filter, setFilter] = React.useState<string | undefined>(initialFilter)

  function handleFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (filter) {
      const newPath =
        pathname + "?" + createQueryString(searchKey, filter || "")
      router.push(newPath)
    } else {
      router.push(pathname)
    }
  }

  return (
    <form className="relative" onSubmit={handleFilterSubmit}>
      <Input
        ref={ref}
        className="bg-background h-12 rounded pr-14"
        value={filter}
        type="search"
        onChange={(e) => setFilter(e.target.value)}
        {...props}
      />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 h-full px-3 py-1"
      >
        <Icons.magnifyingGlass />
      </Button>
    </form>
  )
})
SearchInput.displayName = "SearchInput"

export { SearchInput }
