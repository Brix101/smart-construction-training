"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input, type InputProps } from "@/components/ui/input"
import { Icons } from "./icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
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
      [searchParams],
    )

    const initialFilter = searchParams.get(searchKey) || undefined

    const [filter, setFilter] = React.useState<string | undefined>(
      initialFilter,
    )

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
          className="h-12 rounded bg-background pr-14"
          value={filter}
          type="search"
          onChange={e => setFilter(e.target.value)}
          {...props}
        />
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-1"
        >
          <Icons.magnifyingGlass />
        </Button>
      </form>
    )
  },
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
