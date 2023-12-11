import { userPrivateMetadataSchema } from "@/lib/validations/auth"
import { type UserRole } from "@/types"
import { authMiddleware, clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: [
    // "/",
    "/signin(.*)",
    "/signup(.*)",
    "/sso-callback(.*)",
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next()
    }

    const url = new URL(req.nextUrl.origin)

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/signin"
      return NextResponse.redirect(url)
    }

    // Set the user's role to user if it doesn't exist
    const user = await clerkClient.users.getUser(auth.userId)

    if (!user) {
      throw new Error("User not found.")
    }

    // If the user doesn't have a role, set it to user
    if (!user.privateMetadata.role) {
      await clerkClient.users.updateUserMetadata(auth.userId, {
        privateMetadata: {
          role: "user" satisfies UserRole,
        },
      })
    }

    const privateMetadata = userPrivateMetadataSchema.safeParse(
      user.privateMetadata,
    )

    // Protect dashboard from ordinary user
    if (privateMetadata.success) {
      if (
        req.nextUrl.pathname.includes("dashboard") &&
        !privateMetadata.data.role.includes("admin")
      ) {
        url.pathname = "/"
        return NextResponse.redirect(url)
        // throw new Error("User unauthorized!")
        // return new NextResponse(null, { status: 403 })
      }
    }
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
