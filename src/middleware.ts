import { userPrivateMetadataSchema } from "@/lib/validations/auth"
import { authMiddleware, clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { adminRouters } from "@/lib/constants"

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
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next()
    }

    const url = new URL(req.nextUrl.origin)

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/sign-in"
      return NextResponse.redirect(url)
    }

    if (adminRouters.includes(req.nextUrl.pathname)) {
      const user = await clerkClient.users.getUser(auth.userId)
      const metaData = userPrivateMetadataSchema.safeParse(user.privateMetadata)

      if (!(metaData.success && metaData.data.role.includes("admin"))) {
        return new NextResponse(null, { status: 403 })
      }
    }
  },
})

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
