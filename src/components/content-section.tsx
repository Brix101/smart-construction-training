import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ContentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  href?: string
  linkText?: string
  children: React.ReactNode
  asChild?: boolean
}

export function ContentSection({
  title,
  description,
  href,
  linkText = "View all",
  children,
  className,
  asChild = false,
  ...props
}: ContentSectionProps) {
  const ChildrenShell = asChild ? Slot : "div"

  return (
    <section className={cn("space-y-6", className)} {...props}>
      <div className="flex items-center justify-between gap-4">
        <div className="max-w-[58rem] flex-1 space-y-1">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="text-balance max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              {description}
            </p>
          ) : null}
        </div>
        {href && (
          <Button variant="outline" className="hidden sm:flex" asChild>
            <Link href={href}>
              {linkText}
              <ArrowRightIcon className="size-4 ml-2" aria-hidden="true" />
              <span className="sr-only"> {linkText}</span>
            </Link>
          </Button>
        )}
      </div>
      <div className="space-y-8">
        <ChildrenShell
          className={cn(
            !asChild &&
              "xs:grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {children}
        </ChildrenShell>
        {href && (
          <Button
            variant="ghost"
            className="mx-auto flex w-fit sm:hidden"
            asChild
          >
            <Link href={href}>
              {linkText}
              <ArrowRightIcon className="size-4 ml-2" aria-hidden="true" />
              <span className="sr-only"> {linkText}</span>
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}
