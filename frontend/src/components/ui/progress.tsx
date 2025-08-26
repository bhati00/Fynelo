"use client"

import type * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({ className, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700", className)}
      style={{
        backgroundColor: "var(--color-border)",
      }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all bg-orange-500 dark:bg-orange-400"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: "var(--color-brand-orange)",
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
