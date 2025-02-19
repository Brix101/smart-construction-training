"use client"

import * as React from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import {
  CaretSortIcon,
  CheckIcon,
  CircleIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import type { getCourses } from "@/lib/actions/course"
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

interface CourseSwitcherProps
  extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  coursesPromise: ReturnType<typeof getCourses>
  dashboardRedirectPath: string
}

export function CourseSwitcher({
  coursesPromise,
  dashboardRedirectPath,
  className,
  ...props
}: CourseSwitcherProps) {
  const { courseId } = useParams<{ courseId: string }>()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const courses = React.use(coursesPromise)
  const selectedCourse = courses.find((course) => course.id === courseId)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-label="Select a course"
            className={cn(
              "xxs:w-[180px] w-full justify-between px-3",
              className
            )}
            {...props}
          >
            <CircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            <span className="line-clamp-1">
              {selectedCourse?.name ?? "Select a course"}
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
              <CommandInput placeholder="Search course..." />
              <CommandEmpty>No course found.</CommandEmpty>
              <CommandGroup>
                {courses.map((course) => (
                  <CommandItem
                    key={course.id}
                    onSelect={() => {
                      setIsOpen(false)
                      if (pathname.includes(course.id)) {
                        router.replace(pathname.replace(courseId, course.id))
                      } else {
                        router.push(`/dashboard/courses/${course.id}`)
                      }
                    }}
                    className="text-sm"
                  >
                    <CircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span className="line-clamp-1">{course.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedCourse?.id === course.id
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
                    Create course
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
