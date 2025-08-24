import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles matching your design system
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus:outline-none relative overflow-hidden",
  {
    variants: {
      variant: {
        // Primary button - matches .btn-primary from globals.css
        primary: [
          // Light mode - primary gradient background
          "bg-gradient-to-br from-[#1A365D] to-[#2D4A6B] text-white",
          "shadow-sm hover:shadow-md hover:-translate-y-0.5",
          "hover:from-[#2D4A6B] hover:to-[#1E3A5F]",
          "focus:shadow-[0_0_0_3px_rgba(26,54,93,0.3)]",
          // Dark mode - updated primary gradient
          "dark:bg-gradient-to-br dark:from-[#60A5FA] dark:to-[#3B82F6]",
          "dark:hover:from-[#3B82F6] dark:hover:to-[#2563EB]",
          "dark:focus:shadow-[0_0_0_3px_rgba(96,165,250,0.3)]"
        ],
        
        // Brand button - matches .btn-brand from globals.css
        brand: [
          // Light mode - brand gradient (orange to golden)
          "bg-gradient-to-br from-[#C2410C] to-[#D97706] text-white",
          "shadow-sm hover:shadow-md hover:-translate-y-0.5",
          "hover:from-[#A3340A] hover:to-[#B45309]",
          "focus:shadow-[0_0_0_3px_rgba(194,65,12,0.3)]",
          // Dark mode - brighter brand gradient
          "dark:bg-gradient-to-br dark:from-[#EA580C] dark:to-[#F59E0B]",
          "dark:hover:from-[#DC2626] dark:hover:to-[#EA580C]",
          "dark:focus:shadow-[0_0_0_3px_rgba(234,88,12,0.3)]"
        ],
        
        // Secondary button - matches .btn-secondary from globals.css
        secondary: [
          // Light mode
          "bg-transparent border-2 border-slate-300 text-[#1A365D]",
          "hover:bg-slate-50 hover:border-[#1A365D] hover:-translate-y-0.5",
          "focus:border-[#1A365D] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.1)]",
          // Dark mode
          "dark:border-slate-600 dark:text-[#60A5FA]",
          "dark:hover:bg-slate-800 dark:hover:border-[#60A5FA]",
          "dark:focus:shadow-[0_0_0_3px_rgba(96,165,250,0.2)]"
        ],
        
        // Outline variant - enhanced version
        outline: [
          "border-2 border-slate-300 bg-white text-slate-900 shadow-sm",
          "hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5",
          "focus:border-[#1A365D] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.1)]",
          // Dark mode
          "dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100",
          "dark:hover:bg-slate-800 dark:hover:border-slate-500",
          "dark:focus:border-[#60A5FA] dark:focus:shadow-[0_0_0_3px_rgba(96,165,250,0.2)]"
        ],
        
        // Ghost variant - subtle hover effects
        ghost: [
          "bg-transparent text-slate-700",
          "hover:bg-slate-100 hover:text-slate-900",
          "focus:bg-slate-100 focus:shadow-[0_0_0_3px_rgba(26,54,93,0.1)]",
          // Dark mode
          "dark:text-slate-300",
          "dark:hover:bg-slate-800 dark:hover:text-slate-100",
          "dark:focus:bg-slate-800"
        ],
        
        // Link variant
        link: [
          "bg-transparent text-[#1A365D] underline-offset-4 hover:underline p-0 h-auto",
          "dark:text-[#60A5FA]"
        ],
        
        // Success variant - using semantic colors from globals.css
        success: [
          "bg-[#059669] text-white shadow-sm",
          "hover:bg-[#047857] hover:-translate-y-0.5 hover:shadow-md",
          "focus:shadow-[0_0_0_3px_rgba(5,150,105,0.3)]",
          "dark:bg-[#10B981] dark:hover:bg-[#059669]",
          "dark:focus:shadow-[0_0_0_3px_rgba(16,185,129,0.3)]"
        ],
        
        // Warning variant
        warning: [
          "bg-[#D97706] text-white shadow-sm",
          "hover:bg-[#B45309] hover:-translate-y-0.5 hover:shadow-md",
          "focus:shadow-[0_0_0_3px_rgba(217,119,6,0.3)]",
          "dark:bg-[#F59E0B] dark:hover:bg-[#D97706]",
          "dark:focus:shadow-[0_0_0_3px_rgba(245,158,11,0.3)]"
        ],
        
        // Destructive variant
        destructive: [
          "bg-[#DC2626] text-white shadow-sm",
          "hover:bg-[#B91C1C] hover:-translate-y-0.5 hover:shadow-md",
          "focus:shadow-[0_0_0_3px_rgba(220,38,38,0.3)]",
          "dark:bg-[#F87171] dark:hover:bg-[#EF4444]",
          "dark:focus:shadow-[0_0_0_3px_rgba(248,113,113,0.3)]"
        ]
      },
      
      size: {
        // Sizes matching your design system spacing
        sm: "h-8 px-3 py-2 text-xs gap-1.5 rounded-md has-[>svg]:px-2.5",
        default: "h-9 px-4 py-3 text-sm rounded-lg has-[>svg]:px-3", // Updated to match 12px padding from globals.css
        lg: "h-10 px-6 py-3 text-base rounded-lg has-[>svg]:px-5", // Updated to match 24px padding from globals.css
        xl: "h-12 px-8 py-4 text-lg rounded-xl has-[>svg]:px-6",
        icon: "size-9 p-0 rounded-lg",
        "icon-sm": "size-8 p-0 rounded-md",
        "icon-lg": "size-10 p-0 rounded-lg"
      }
    },
    defaultVariants: {
      variant: "primary", // Changed default to primary to match your design system
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // If asChild is true and loading is true, we can't use Slot because it expects single child
    if (asChild && loading) {
      console.warn("Button: Cannot use loading state with asChild prop. Loading state will be ignored.");
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          // Loading state styling - only apply when not using asChild
          loading && !asChild && "opacity-60 pointer-events-none",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        data-slot="button"
        {...props}
      >
        {/* Only render loading spinner when not using asChild */}
        {loading && !asChild ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </div>
            <span className="opacity-0">{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }