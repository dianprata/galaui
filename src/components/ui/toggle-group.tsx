import * as React from "react";
import { ToggleGroup as BaseToggleGroup, Toggle as BaseToggle } from "@base-ui/react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<{
  size?: VariantProps<typeof toggleVariants>["size"];
  variant?: VariantProps<typeof toggleVariants>["variant"];
}>({});

const ToggleGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToggleGroup> & {
    size?: VariantProps<typeof toggleVariants>["size"];
    variant?: VariantProps<typeof toggleVariants>["variant"];
    className?: string;
  }
>(({ className, variant = "default", size = "default", children, ...props }, ref) => (
  <ToggleGroupContext.Provider value={{ variant, size }}>
    <BaseToggleGroup
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-xl bg-muted/60 p-1 text-muted-foreground border border-border/50",
        className
      )}
      {...props}
    >
      {children}
    </BaseToggleGroup>
  </ToggleGroupContext.Provider>
));
ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof BaseToggle>,
  React.ComponentPropsWithoutRef<typeof BaseToggle> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <BaseToggle
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "data-pressed:bg-background data-pressed:text-foreground data-pressed:shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </BaseToggle>
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
