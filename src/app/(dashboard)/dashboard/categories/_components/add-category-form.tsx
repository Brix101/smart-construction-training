"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { CategoryInput } from "@/lib/validations/category"
import { addCategory } from "@/app/_actions/category"
import { Icons } from "@/components/icons"
import { AspectRatio } from "@/components/ui/aspect-ratio"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { UploadButton } from "@/lib/uploadthing"
import { catchError } from "@/lib/utils"
import { categorySchema } from "@/lib/validations/category"

export function AddCategoryForm() {
  const router = useRouter()
  const [isUploading, setIsUploading] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      imgSrc: "",
      description: "",
    },
  })

  function onSubmit(data: CategoryInput) {
    startTransition(async () => {
      try {
        await addCategory(data)

        form.reset()
        toast.success("Category added successfully.")
        router.push("/dashboard/categories")
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="imgSrc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="flex h-60 w-60 items-center justify-center overflow-hidden rounded-md border">
                  {field.value ? (
                    <AspectRatio ratio={4 / 4}>
                      <Skeleton className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/70" />
                      <Image
                        src={field.value}
                        alt={"Image"}
                        className="object-cover"
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                        fill
                        loading="lazy"
                      />
                      <Button
                        className="absolute right-2 top-2"
                        size={"icon"}
                        variant={"destructive"}
                        onClick={() => field.onChange("")}
                      >
                        <XIcon />
                      </Button>
                    </AspectRatio>
                  ) : (
                    <div className="py-20">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0].ufsUrl)
                          setIsUploading(false)
                        }}
                        onUploadError={(error: Error) => {
                          setIsUploading(false)
                          toast.error(error.message)
                        }}
                        onUploadBegin={() => {
                          setIsUploading(true)
                        }}
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type category name here." {...field} />
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
                  placeholder="Type category description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isPending || isUploading}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add category
          <span className="sr-only">Add category</span>
        </Button>
      </form>
    </Form>
  )
}
