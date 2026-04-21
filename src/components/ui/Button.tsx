import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "gold"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-dark-800 text-gray-100 hover:bg-dark-700 border border-dark-700": variant === "default",
            "border border-gold-500/30 text-gold-400 hover:bg-gold-500/10": variant === "outline",
            "hover:bg-dark-800 text-gray-300 hover:text-gray-100": variant === "ghost",
            "bg-gradient-to-r from-gold-600 to-gold-500 text-dark-900 hover:from-gold-500 hover:to-gold-400 shadow-lg shadow-gold-500/20": variant === "gold",
            "h-9 px-4 py-2": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-12 rounded-md px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
