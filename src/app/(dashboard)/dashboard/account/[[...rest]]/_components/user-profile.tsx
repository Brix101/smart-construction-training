"use client"

import { UserProfile as ClerkUserProfile } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

import type { Theme, UserProfileProps } from "@clerk/types"

const appearance: Theme = {
  variables: {
    borderRadius: "0.25rem",
  },
}

export function UserProfile({ ...props }: UserProfileProps) {
  const { theme } = useTheme()

  return (
    <ClerkUserProfile
      appearance={{
        ...appearance,
        baseTheme: theme === "light" ? appearance.baseTheme : dark,
        variables: {
          ...appearance.variables,
        },
      }}
      {...props}
    />
  )
}
