"use client"

import { type Material, type Topic } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { deleteTopic, updateTopic } from "@/lib/actions/topic"
import { catchError } from "@/lib/utils"
import { topicSchema } from "@/lib/validations/topic"

interface UpdateTopicFormProps {
  topic: Topic & {
    materials: { topicId: number; materialId: number; material: Material }[]
  }
}

type Inputs = z.infer<typeof topicSchema>

export function UpdateTopicForm({ topic }: UpdateTopicFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const materialStr = topic.materials
    .map(({ material }) => material.link)
    .join(", ")

  const form = useForm<Inputs>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: topic.name ?? "",
      description: topic.description ?? "",
      youtubeId: topic.youtubeId ?? "",
      youtubeUrl: topic.youtubeUrl ?? "",
      materials: materialStr,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await updateTopic({
          ...data,
          id: topic.id,
          courseId: topic.courseId,
        })

        toast.success("Topic updated successfully.")
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.name}
              placeholder="Type topic name here."
              {...form.register("name")}
              defaultValue={topic.name ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem className="w-full">
          <FormLabel>Youtube url</FormLabel>
          <FormControl>
            <Input
              placeholder="Type topic youtube url here."
              {...form.register("youtubeUrl")}
              defaultValue={topic.youtubeUrl ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem className="w-full">
          <FormLabel>Youtube Id</FormLabel>
          <FormControl>
            <Input
              placeholder="Type topic youtube Id here."
              {...form.register("youtubeId")}
              defaultValue={topic.youtubeId ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Materials</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Type topic materials link here split by(,) ."
              {...form.register("materials")}
              defaultValue={materialStr ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Type topic description here."
              {...form.register("description")}
              defaultValue={topic.description ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <div className="flex space-x-2">
          <Button disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Update Topic
            <span className="sr-only">Update topic</span>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              startTransition(async () => {
                void form.trigger([
                  "name",
                  "youtubeId",
                  "youtubeUrl",
                  "materials",
                  "description",
                ])
                await deleteTopic({
                  courseId: topic.courseId,
                  id: topic.id,
                })
                router.push(`/dashboard/courses/${topic.courseId}/topics`)
              })
            }}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete Topic
            <span className="sr-only">Delete topic</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
