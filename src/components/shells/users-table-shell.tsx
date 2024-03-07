"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import * as React from "react"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { User } from "@clerk/nextjs/server"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { userPublicMetadataSchema } from "@/lib/validations/auth"

type AwaitedUser = Pick<
  User,
  | "id"
  | "emailAddresses"
  | "imageUrl"
  | "lastSignInAt"
  | "firstName"
  | "lastName"
  | "publicMetadata"
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
          const email = original.emailAddresses[0].emailAddress || ""
          return (
            <Avatar className="h-8 w-8">
              <AvatarImage src={original.imageUrl} alt={""} />
              <AvatarFallback>{email.charAt(0)}</AvatarFallback>
            </Avatar>
          )
        },
      },
      {
        accessorKey: "firstName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="First name" />
        ),
      },
      {
        accessorKey: "lastName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Last name" />
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row: { original } }) => {
          const emails = original.emailAddresses
          return (
            <ul>
              {emails.map(email => {
                return <li key={email.id}>{email.emailAddress}</li>
              })}
            </ul>
          )
        },
      },
      {
        accessorKey: "publicMetadata",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Level" />
        ),
        cell: ({ row: { original } }) => {
          const publicMetadata = userPublicMetadataSchema.parse(
            original.publicMetadata,
          )
          return <span>{publicMetadata.level}</span>
        },
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
        id: "actions",
        cell: ({ row: { original } }) => (
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
                <Link href={`/dashboard/users/${original.id}`}>Edit</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href={`/topic/${row.original.id}`}>View</Link>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        ),
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
