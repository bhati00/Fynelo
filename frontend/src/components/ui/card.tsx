import type * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base card styling matching .card from globals.css
        "flex flex-col gap-6",
        // Light mode - using exact colors from globals.css
        "card",
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start",
        // Spacing from your design system (24px padding = p-6)
        "px-6 pt-6 gap-3",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "[.border-b]:pb-6 [.border-b]:border-slate-200 dark:[.border-b]:border-slate-700",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-2xl font-semibold leading-8 tracking-tight", "text-slate-900 dark:text-slate-50", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-5", "text-slate-600 dark:text-slate-300", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", "-mt-1", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 pb-2", "text-slate-900 dark:text-slate-100", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6 pb-6 gap-3",
        "[.border-t]:pt-6 [.border-t]:border-slate-200 dark:[.border-t]:border-slate-700",
        "text-sm text-slate-600 dark:text-slate-400",
        className,
      )}
      {...props}
    />
  )
}

function CardElevated({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-elevated"
      className={cn(
        "flex flex-col gap-8",
        "bg-white rounded-2xl border-0 px-8 py-8",
        "[box-shadow:0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
        "hover:[box-shadow:0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]",
        "dark:bg-slate-900",
        "dark:[box-shadow:0_10px_15px_-3px_rgba(0,0,0,0.4),0_4px_6px_-2px_rgba(0,0,0,0.3)]",
        "dark:hover:[box-shadow:0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.3)]",
        className,
      )}
      {...props}
    />
  )
}

function CardSurface({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-surface"
      className={cn(
        "flex flex-col gap-6",
        "bg-slate-50 border border-slate-300 rounded-xl px-6 py-6",
        "hover:bg-slate-100 hover:border-slate-400",
        "dark:bg-slate-800 dark:border-slate-700",
        "dark:hover:bg-slate-900 dark:hover:border-slate-600",
        className,
      )}
      {...props}
    />
  )
}

function CardBrand({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-brand"
      className={cn(
        "flex flex-col gap-6 relative overflow-hidden",
        "bg-white border border-slate-300 rounded-xl shadow-sm",
        "hover:shadow-md",
        "before:absolute before:top-0 before:left-0 before:right-0 before:h-1",
        "before:bg-gradient-to-r before:from-orange-700 before:to-amber-600",
        "dark:bg-slate-900 dark:border-slate-700",
        "dark:before:from-orange-600 dark:before:to-amber-500",
        className,
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardElevated,
  CardSurface,
  CardBrand,
}
