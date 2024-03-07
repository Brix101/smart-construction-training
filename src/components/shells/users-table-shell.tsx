"use client"

import { type ColumnDef } from "@tanstack/react-table"
import * as React from "react"
import { format } from "date-fns"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { OmitedUser } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type AwaitedUser = Pick<
  OmitedUser,
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "level"
  | "createdAt"
  | "lastSignInAt"
  | "imageUrl"
>

interface UsersTableShellProps {
  transaction: Promise<{
    items: AwaitedUser[]
    count: number
  }>
  limit: number
}

export function UsersTableShell({ transaction, limit }: UsersTableShellProps) {
  const { items: data, count } = React.use(transaction)
  const pageCount = Math.ceil(count / limit)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<AwaitedUser, unknown>[]>(
    () => [
      {
        accessorKey: "imageUrl",
        enableSorting: false,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Image" />
        ),
        cell: ({ row: { original } }) => {
          return (
            <Avatar className="h-8 w-8">
              <AvatarImage src={original.imageUrl} alt={""} />
              <AvatarFallback>{original.email.charAt(0)}</AvatarFallback>
            </Avatar>
          )
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
      },
      {
        accessorKey: "level",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Level" />
        ),
      },
      {
        accessorKey: "lastSignInAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="last sign in" />
        ),
        cell: ({ row }) => {
          const original = row.original
          const formattedDate = original.lastSignInAt
            ? format(new Date(original.lastSignInAt), "MMM dd, yyyy HH:mm")
            : ""
          return <span>{formattedDate}</span>
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Account Created" />
        ),
        cell: ({ row }) => {
          const original = row.original
          const formattedDate = original.createdAt
            ? format(new Date(original.createdAt), "MMM dd, yyyy HH:mm")
            : ""
          return <span>{formattedDate}</span>
        },
      },
    ],
    [],
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[]}
      searchableColumns={[
        {
          id: "firstName",
          title: "name",
        },
      ]}
    />
  )
}
