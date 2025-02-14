import Link from "next/link"

import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"
import { siteConfig } from "@/config/site"

import { ModeToggle } from "./mode-toggle"

export function SiteFooter() {
  return (
    <footer className="bg-background w-full border-t">
      <Shell>
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        >
          <section
            id="footer-branding"
            aria-labelledby="footer-branding-heading"
          >
            <Link href="/" className="flex w-fit items-center space-x-2">
              <Icons.logo className="size-6" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </section>
        </section>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex items-center space-x-4"
        >
          <div className="text-muted-foreground flex-1 text-left text-sm leading-loose">
            {siteConfig.name} @ {new Date().getFullYear()}.
          </div>
          <div className="flex items-center space-x-1">
            <ModeToggle />
          </div>
        </section>
      </Shell>
    </footer>
  )
}
