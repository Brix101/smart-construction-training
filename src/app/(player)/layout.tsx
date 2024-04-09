import { getCacheduser } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

interface LobyLayoutProps extends React.PropsWithChildren<{}> {}

export default async function LobyLayout({ children }: LobyLayoutProps) {
  const user = await getCacheduser()

  if (!user) {
    redirect("/sign-in")
  }

  return <main className="flex flex-1">{children}</main>
}
