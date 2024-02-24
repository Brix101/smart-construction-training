import { ThemeProvider } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
            <Analytics />
          </body>
        </html>
      </ClerkProvider>
    </>
  )
}
