import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base card styling matching .card from globals.css
        "flex flex-col gap-6 transition-all duration-200 ease-in-out",
        // Light mode - using exact colors from globals.css
        "bg-white border border-slate-300 rounded-xl shadow-sm",
        "hover:shadow-md hover:border-slate-400 hover:-translate-y-0.5",
        // Dark mode - using exact dark colors from globals.css
        "dark:bg-slate-900 dark:border-slate-700",
        "dark:hover:shadow-lg dark:hover:border-slate-600",
        // Custom shadows from your design system
        "[box-shadow:0_1px_2px_0_rgba(0,0,0,0.05)] hover:[box-shadow:0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]",
        "dark:[box-shadow:0_1px_2px_0_rgba(0,0,0,0.3)] dark:hover:[box-shadow:0_4px_6px_-1px_rgba(0,0,0,0.4),0_2px_4px_-1px_rgba(0,0,0,0.3)]",
        className
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
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        // Typography matching .heading-3 from globals.css
        "text-2xl font-semibold leading-8 tracking-tight",
        // Text colors from your design system
        "text-slate-900 dark:text-slate-50",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        // Typography matching .text-body-secondary from globals.css
        "text-sm leading-5",
        // Secondary text colors from your design system
        "text-slate-600 dark:text-slate-300",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        // Ensure proper spacing and alignment
        "-mt-1", // Slight negative margin for visual alignment
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        // Consistent padding matching your design system
        "px-6 pb-2",
        // Text styling from your globals.css
        "text-slate-900 dark:text-slate-100",
        className
      )}
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
        // Border styling when border-top is present
        "[.border-t]:pt-6 [.border-t]:border-slate-200 dark:[.border-t]:border-slate-700",
        // Footer text styling
        "text-sm text-slate-600 dark:text-slate-400",
        className
      )}
      {...props}
    />
  )
}

// Enhanced Card variants matching your design system

function CardElevated({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-elevated"
      className={cn(
        // Enhanced card styling matching .card-elevated from globals.css
        "flex flex-col gap-8 transition-all duration-200 ease-in-out",
        // Light mode - elevated styling
        "bg-white rounded-2xl border-0 px-8 py-8",
        "hover:-translate-y-1",
        // Enhanced shadows from your design system
        "[box-shadow:0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
        "hover:[box-shadow:0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]",
        // Dark mode - elevated styling
        "dark:bg-slate-900",
        "dark:[box-shadow:0_10px_15px_-3px_rgba(0,0,0,0.4),0_4px_6px_-2px_rgba(0,0,0,0.3)]",
        "dark:hover:[box-shadow:0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.3)]",
        className
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
        // Surface card styling matching .card-surface from globals.css
        "flex flex-col gap-6 transition-all duration-200 ease-in-out",
        // Light mode - surface background
        "bg-slate-50 border border-slate-300 rounded-xl px-6 py-6",
        "hover:bg-slate-100 hover:border-slate-400",
        // Dark mode - surface background
        "dark:bg-slate-800 dark:border-slate-700",
        "dark:hover:bg-slate-900 dark:hover:border-slate-600",
        className
      )}
      {...props}
    />
  )
}

// Card with brand gradient accent
function CardBrand({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-brand"
      className={cn(
        // Base card with brand accent
        "flex flex-col gap-6 transition-all duration-200 ease-in-out relative overflow-hidden",
        "bg-white border border-slate-300 rounded-xl shadow-sm",
        "hover:shadow-md hover:-translate-y-0.5",
        // Brand gradient accent bar
        "before:absolute before:top-0 before:left-0 before:right-0 before:h-1",
        "before:bg-gradient-to-r before:from-orange-700 before:to-amber-600",
        // Dark mode
        "dark:bg-slate-900 dark:border-slate-700",
        "dark:before:from-orange-600 dark:before:to-amber-500",
        className
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
  // Enhanced variants
  CardElevated,
  CardSurface,
  CardBrand,
}