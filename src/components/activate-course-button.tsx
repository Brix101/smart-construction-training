"use client"

import * as React from "react"

import type { Course } from "@/db/schema"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { publishCourse } from "@/lib/actions/course"
import { catchError } from "@/lib/utils"

interface PublishCourseButtonProps {
  courseId: Course["id"]
}

export function PublishCourseButton({ courseId }: PublishCourseButtonProps) {
  const [isPending, startTransaction] = React.useTransition()
  return (
    <Button
      aria-label="Connect to Stripe"
      onClick={() => {
        startTransaction(async () => {
          try {
            await publishCourse(courseId)
          } catch (err) {
            catchError(err)
          }
        })
      }}
      disabled={isPending}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 size-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Publish Course
    </Button>
  )
}
