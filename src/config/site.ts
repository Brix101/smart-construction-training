import { MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Smart Construction Training",
  description: "",
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Courses",
          href: "/",
          description: "All the courses currently available.",
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
}
