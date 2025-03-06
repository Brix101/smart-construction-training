"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import type { getCategoryTransaction } from "@/app/_actions/category"
import type { Category } from "@/db/schema"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { catchError } from "@/lib/utils"

interface CategoriesTableProps {
  transaction: ReturnType<typeof getCategoryTransaction>
}

export function CategoriesTable({ transaction }: CategoriesTableProps) {
  const { items: data, pageCount } = React.use(transaction)

  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<Category["id"][]>(
    []
  )

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<(typeof data)[0], unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row.id)
              )
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.id]
                  : prev.filter((id) => id !== row.original.id)
              )
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "imgSrc",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Image" />
        ),
        cell: ({ row }) => {
          const imgSrc = row.original.imgSrc
          const name = row.original.name
          return (
            <div className="h-16 w-16 overflow-hidden rounded-sm border">
              <AspectRatio ratio={4 / 4}>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/70" />
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={name}
                    className="object-center"
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                    fill
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="h-full rounded-t-md border-b object-center"
                    style={getRandomPatternStyle(row.original.id)}
                  />
                )}
              </AspectRatio>
            </div>
          )
        },
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "courseCount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Course Count" />
        ),
        enableSorting: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/categories/${row.original.id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href={`/topic/${row.original.id}`}>View</Link>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  startTransition(() => {
                    row.toggleSelected(false)
                    //TODO: implement deleteCategory
                    // toast.promise(
                    //   deleteCategory({
                    //     id: row.original.id,
                    //     courseId,
                    //   }),
                    //   {
                    //     loading: "Deleting...",
                    //     success: () => "Category deleted successfully.",
                    //     error: (err: unknown) => catchError(err),
                    //   }
                    // )
                  })
                }}
                disabled={isPending}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, isPending]
  )

  function deleteSelectedRows() {
    toast.promise(
      Promise.all(
        selectedRowIds.map((id) => {
          // TODO: implement deleteCategory
          console.log(id)
        })
      ),
      {
        loading: "Deleting...",
        success: () => {
          setSelectedRowIds([])
          return "Category deleted successfully."
        },
        error: (err: unknown) => {
          setSelectedRowIds([])
          return catchError(err)
        },
      }
    )
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[]}
      searchableColumns={
        [
          // {
          //   id: "name",
          //   title: "names",
          // },
        ]
      }
      newRowLink={`/dashboard/categories/new`}
      deleteRowsAction={() => void deleteSelectedRows()}
    />
  )
}
