"use client"

import * as React from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import {
  CaretSortIcon,
  CheckIcon,
  CircleIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import type { getCategories } from "@/app/_actions/category"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface categorySwitcherProps
  extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  categoriesPromise: ReturnType<typeof getCategories>
  dashboardRedirectPath: string
}

export function CategorySwitcher({
  categoriesPromise,
  dashboardRedirectPath,
  className,
  ...props
}: categorySwitcherProps) {
  const { categoryId } = useParams<{ categoryId: string }>()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const categories = React.use(categoriesPromise)
  const activeCategory = categories.find(
    (category) => category.id === categoryId
  )

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-label="Select a category"
            className={cn(
              "xxs:w-[180px] w-full justify-between px-3",
              className
            )}
            {...props}
          >
            <CircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            <span className="line-clamp-1">
              {activeCategory?.name ?? "Select a category"}
            </span>
            <CaretSortIcon
              className="ml-auto h-4 w-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search category..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      setIsOpen(false)
                      if (pathname.includes(category.id)) {
                        router.replace(
                          pathname.replace(categoryId, category.id)
                        )
                      } else {
                        router.push(`/dashboard/categories/${category.id}`)
                      }
                    }}
                    className="text-sm"
                  >
                    <CircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span className="line-clamp-1">{category.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        activeCategory?.id === category.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                      aria-hidden="true"
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      router.push(dashboardRedirectPath)
                      setIsOpen(false)
                      setIsDialogOpen(true)
                    }}
                  >
                    <PlusCircledIcon
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Create Category
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  )
}
