import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80",
        primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80",
        outline: "border border-border bg-background hover:bg-muted text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted text-foreground hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer",
      },
      size: {
        default: "h-8 px-3.5 rounded-lg text-xs gap-2",
        xs: "h-6 px-2.5 rounded-md text-xs gap-1.5",
        sm: "h-7 px-3 rounded-md text-xs gap-1.5",
        md: "h-8 px-3.5 rounded-lg text-xs gap-2",
        lg: "h-9 px-4 rounded-lg text-sm gap-2",
        icon: "h-8 w-8 rounded-lg p-0",
        "icon-xs": "h-6 w-6 rounded-md p-0",
        "icon-sm": "h-7 w-7 rounded-md p-0",
        "icon-md": "h-8 w-8 rounded-lg p-0",
        "icon-lg": "h-9 w-9 rounded-lg p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
