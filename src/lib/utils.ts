import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

import type { User } from "@clerk/nextjs/server"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserEmail(user: User | null) {
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ""

  return email
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (err instanceof Error) {
    if (err.message === "NEXT_REDIRECT") return

    return toast(err.message)
  } else {
    return toast("Something went wrong, please try again later.")
  }
}

export function catchClerkError(err: unknown) {
  const unknownErr = "Something went wrong, please try again later."

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
    // } else if (isClerkAPIResponseError(err)) {
    //   return toast.error(err.errors[0]?.longMessage ?? unknownErr)
  } else {
    return toast.error(unknownErr)
  }
}

export function isMacOs() {
  if (typeof window === "undefined") return false

  return window.navigator.userAgent.includes("Mac")
}
