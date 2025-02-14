"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { addTopic } from "@/lib/actions/topic"
import { catchError } from "@/lib/utils"
import { topicSchema } from "@/lib/validations/topic"

interface AddTopicFormProps {
  courseId: number
}

type Inputs = z.infer<typeof topicSchema>

export function AddTopicForm({ courseId }: AddTopicFormProps) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: "",
      youtubeId: "",
      youtubeUrl: "",
      description: "",
      materials: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await addTopic({
          ...data,
          courseId,
        })

        toast.success("Topic added successfully.")

        form.reset()
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type topic name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtubeUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Youtube url</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type topic youtube url here."
                  value={field.value}
                  onChange={(e) => {
                    const splitUrl = e.target.value.split("/")
                    const youtubeId = splitUrl[splitUrl.length - 1]
                    form.setValue("youtubeId", youtubeId)
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtubeId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Youtube Id</FormLabel>
              <FormControl>
                <Input placeholder="Type topic youtube Id here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="materials"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Materials</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type topic materials link here split by(,) ."
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
                  placeholder="Type topic description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() =>
              void form.trigger([
                "name",
                "youtubeId",
                "youtubeUrl",
                "description",
              ])
            }
            className="w-fit"
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Add Topic
            <span className="sr-only">Add Topic</span>
          </Button>
          <Link
            aria-label="Cancel"
            href={`/dashboard/courses/${courseId}/topics`}
            className={buttonVariants({
              variant: "destructive",
            })}
          >
            Cancel
            <span className="sr-only">Cancel</span>
          </Link>
        </div>
      </form>
    </Form>
  )
}
