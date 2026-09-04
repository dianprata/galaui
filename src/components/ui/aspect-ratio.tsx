import * as React from "react";
import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        aspectRatio: ratio,
        ...style,
      }}
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
