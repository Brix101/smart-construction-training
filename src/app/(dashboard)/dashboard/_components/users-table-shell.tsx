"use client"

import { User } from "@clerk/nextjs/server"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import * as React from "react"
import { toast } from "sonner"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteUser } from "@/lib/actions/user"
import { formatSignInDate } from "@/lib/date-utils"
import { catchError } from "@/lib/utils"
import { publicMetadataSchema } from "@/lib/validations/auth"
import Link from "next/link"

type AwaitedUser = Pick<
  User,
  | "id"
  | "emailAddresses"
  | "imageUrl"
  | "lastSignInAt"
  | "firstName"
  | "lastName"
  | "publicMetadata"
  | "primaryEmailAddressId"
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

  const [isPending, startTransition] = React.useTransition()

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<AwaitedUser, unknown>[]>(
    () => [
      {
        accessorKey: "firstName",
        enableSorting: false,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User" />
        ),
        cell: ({ row: { original } }) => {
          const emails = original.emailAddresses
          const email =
            emails.find(e => e.id === original.primaryEmailAddressId)
              ?.emailAddress ?? ""
          return (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={original.imageUrl} alt={""} />
                <AvatarFallback>{email.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p>{`${original.firstName ?? ""} ${
                  original.lastName ?? ""
                }`}</p>
                <ul className="text-muted-foreground">
                  {emails.map(email => {
                    return <li key={email.id}>{email.emailAddress}</li>
                  })}
                </ul>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "publicMetadata",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Level" />
        ),
        cell: ({ row: { original } }) => {
          const publicMetadata = publicMetadataSchema.parse(
            original.publicMetadata,
          )
          return <span>{publicMetadata.level}</span>
        },
      },

      {
        accessorKey: "lastSignInAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Last Signed In" />
        ),
        cell: ({ row }) => {
          const original = row.original
          const lastSignInAt = original.lastSignInAt
          const formattedDate = formatSignInDate(lastSignInAt)
          return <span>{formattedDate}</span>
        },
      },
      {
        id: "actions",
        cell: ({ row: { original } }) => {
          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label="Open menu"
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                    <DotsHorizontalIcon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/users/${original.id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      startTransition(() => {
                        // row.toggleSelected(false)

                        toast.promise(deleteUser(original.id), {
                          loading: "Deleting...",
                          success: () => "User deleted successfully.",
                          error: (err: unknown) => catchError(err),
                        })
                      })
                    }}
                    disabled={isPending}
                  >
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )
        },
      },
    ],
    [isPending],
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[]}
      searchableColumns={[{ id: "firstName", title: "user" }]}
    />
  )
}
