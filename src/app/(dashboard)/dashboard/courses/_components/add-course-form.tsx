"use client"

import type { z } from "zod"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { Category } from "@/db/schema"
import { Icons } from "@/components/icons"
import { MultiSelect } from "@/components/multi-select"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addCourse } from "@/lib/actions/course"
import { catchError } from "@/lib/utils"
import { courseSchema } from "@/lib/validations/course"

type Inputs = z.infer<typeof courseSchema>

interface AddCourseFormProps {
  categories: Category[]
}

export function AddCourseForm({ categories }: AddCourseFormProps) {
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      level: 1,
      description: "",
      categories: [],
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await addCourse({ ...data })
      } catch (err) {
        catchError(err)
      }
    })
  }

  const selectOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type course name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <MultiSelect
                  options={selectOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select options"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Type course level here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type course description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add Course
          <span className="sr-only">Add Course</span>
        </Button>
      </form>
    </Form>
  )
}
