"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle, X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import type { getCourseTopic } from "@/lib/queries/course"
import { Icons } from "@/components/icons"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { deleteTopic, updateTopic } from "@/lib/actions/topic"
import { catchError, cn } from "@/lib/utils"
import { updateTopicSchema } from "@/lib/validations/topic"

interface UpdateTopicFormProps {
  topic: Exclude<Awaited<ReturnType<typeof getCourseTopic>>, undefined>
}

type Inputs = z.infer<typeof updateTopicSchema>

export function UpdateTopicForm({ topic }: UpdateTopicFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(updateTopicSchema),
    defaultValues: {
      name: topic.name ?? "",
      description: topic.description ?? "",
      youtubeUrl: topic.youtubeUrl ?? "",
      materials: topic.materials.map((mat) => mat.material),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials",
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

  function addMaterial() {
    append({ type: "download", link: "", name: "" })
  }

  // TODO: update this form field same as add
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
        <FormField
          control={form.control}
          name="youtubeUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Youtube url</FormLabel>
              <FormControl>
                <Input placeholder="Type topic youtube url here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Materials</FormLabel>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className={cn(fields.length > 0 ? "visible" : "hidden")}
              onClick={addMaterial}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn("w-full", fields.length > 0 ? "hidden" : "visible")}
            onClick={addMaterial}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Material
          </Button>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <div className="flex items-start space-x-2">
                <FormField
                  control={form.control}
                  name={`materials.${index}.link`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input placeholder="Enter a link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`materials.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="download">Download</SelectItem>
                          <SelectItem value="upload">Upload</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                  aria-label="Remove link"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

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
