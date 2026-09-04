import * as React from "react";
import { Avatar as BaseAvatar } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full ring-1 ring-border transition-transform duration-200 ease-out hover:scale-105 select-none",
  {
    variants: {
      size: {
        default: "h-8 w-8 text-xs",
        xs: "h-6 w-6 text-[10px]",
        sm: "h-7 w-7 text-xs",
        md: "h-8 w-8 text-xs",
        lg: "h-9 w-9 text-sm",
        xl: "h-10 w-10 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof BaseAvatar.Root>,
  AvatarProps
>(({ className, size = "default", ...props }, ref) => (
  <BaseAvatar.Root
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof BaseAvatar.Image>,
  React.ComponentPropsWithoutRef<typeof BaseAvatar.Image>
>(({ className, ...props }, ref) => (
  <BaseAvatar.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover transition-opacity duration-200 ease-out", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof BaseAvatar.Fallback>,
  React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>
>(({ className, ...props }, ref) => (
  <BaseAvatar.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground transition-colors duration-200 ease-out",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
export { avatarVariants };
