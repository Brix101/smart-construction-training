export const unknownError = "An unknown error occurred. Please try again later."

export const redirects = {
  toLogin: "/sign-in",
  toSignup: "/sign-up",
  afterLogin: "/dashboard/stores",
  afterLogout: "/",
  toVerify: "/verify-email",
  afterVerify: "/dashboard/stores",
} as const

export const databasePrefix = "sctc"

export const adminRouters = ["/dashboard/courses", "/dashboard/users"]
