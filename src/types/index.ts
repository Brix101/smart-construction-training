import type { Icons } from "@/components/icons"
import { userPrivateMetadataSchema } from "@/lib/validations/auth"
import { EmailAddress, User } from "@clerk/nextjs/server"
import { HandleOAuthCallbackParams } from "@clerk/types"
import * as z from "zod"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>
export type PrivateMetadata = z.infer<typeof userPrivateMetadataSchema>

export interface SSOCallbackProps {
  searchParams: HandleOAuthCallbackParams
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}

export type FileWithPreview = File & {
  preview: string
}

export interface SearchParams {
  [key: string]: string | string[] | undefined
}
