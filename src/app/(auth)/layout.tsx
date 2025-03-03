import Image from "next/image"
import Link from "next/link"

import { Icons } from "@/components/icons"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { siteConfig } from "@/config/site"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
