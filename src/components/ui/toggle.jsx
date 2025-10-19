import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex max-w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-colors duration-800 dark:bg-[#0f172aad] hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "bg-transparent shadow-md hover:bg-accent hover:text-accent-foreground",
      }, //border border-input
      size: {
        default: "min-h-9 p-2.5 min-w-9", //h-9 px-2
        sm: "min-h-8 p-1.5 min-w-8", //h-8 px-1.5
        lg: "min-h-10 p-2.5 min-w-10", //h-10 px-2.5
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
