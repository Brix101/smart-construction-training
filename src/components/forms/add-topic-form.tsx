"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle, X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { addTopic } from "@/lib/actions/topic"
import { catchError, cn } from "@/lib/utils"
import { topicSchema } from "@/lib/validations/topic"

type Inputs = z.infer<typeof topicSchema>

export function AddTopicForm() {
  const { courseId } = useParams<{ courseId: string }>()

  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: "",
      youtubeUrl: "",
      description: "",
      materials: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials",
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await addTopic(courseId, data)

        toast.success("Topic added successfully.")

        form.reset()
      } catch (err) {
        catchError(err)
      }
    })
  }

  function addMaterial() {
    append({ type: "download", link: "", name: "" })
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
                <Input placeholder="Type topic youtube url here." {...field} />
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

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() =>
              void form.trigger([
                "name",
                "youtubeUrl",
                "description",
                "materials",
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
