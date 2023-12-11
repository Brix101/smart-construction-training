import type { Icons } from "@/components/icons"
import { userPrivateMetadataSchema } from "@/lib/validations/auth"
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

export type Material = {
  name?: string
  url: string
}

export type Course = {
  id: string
  title: string
  url: string
  materials?: Array<Material>
}

export interface SSOCallbackProps {
  searchParams: HandleOAuthCallbackParams
}
