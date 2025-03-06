import { Shell } from "@/components/shell"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <Shell variant="centered" className="max-w-md">
      {children}
    </Shell>
  )
}
