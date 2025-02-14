import { Slot } from "@radix-ui/react-slot"

import { Icons } from "@/components/icons"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"

interface PlaceholderImageProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatio> {
  asChild?: boolean
}

export function PlaceholderImage({
  asChild = false,
  className,
  ...props
}: PlaceholderImageProps) {
  const Comp = asChild ? Slot : AspectRatio

  return (
    <Comp ratio={16 / 9} {...props} className={cn(className)}>
      <div
        aria-label="Placeholder"
        role="img"
        aria-roledescription="placeholder"
        className="bg-secondary flex h-full w-full items-center justify-center rounded-lg"
      >
        <Icons.placeholder
          className="text-muted-foreground h-9 w-9"
          aria-hidden="true"
        />
      </div>
    </Comp>
  )
}
