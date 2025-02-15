"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"

import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"

export function LogOutButtons() {
  const router = useRouter()
  const mounted = useMounted()

  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ? (
        <SignOutButton
          redirectUrl={`${window.location.origin}/?redirect=false`}
        >
          <Button aria-label="Log out" size="sm" className="w-full">
            Log out
            <span className="sr-only">Log out</span>
          </Button>
        </SignOutButton>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground"
          )}
        >
          Log out
        </Skeleton>
      )}
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
      >
        Go back
        <span className="sr-only">Previous page</span>
      </Button>
    </div>
  )
}
