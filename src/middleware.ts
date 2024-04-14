import { adminRouters } from "@/lib/constants"
import { userPrivateMetadataSchema } from "@/lib/validations/auth"
import { authMiddleware, clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: [
    // "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/sso-callback(.*)",
  ],

  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [],
  async afterAuth(auth, req) {
    const url = new URL(req.nextUrl.origin)
    // Handle users who aren't authenticated
    if (!auth.isPublicRoute && !auth.userId) {
      //  redirect them to the sign in page
      url.pathname = "/sign-in"
      return NextResponse.redirect(url)
    }

    if (adminRouters.includes(req.nextUrl.pathname) && auth.userId) {
      const user = await clerkClient.users.getUser(auth.userId)
      const metaData = userPrivateMetadataSchema.safeParse(user.privateMetadata)

      if (!(metaData.success && metaData.data.role.includes("admin"))) {
        // return new NextResponse(null, { status: 403 })
        return NextResponse.redirect(url)
      }
    }

    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next()
    }

    // Allow users visiting public routes to access them
    return NextResponse.next()
  },
})

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
}
