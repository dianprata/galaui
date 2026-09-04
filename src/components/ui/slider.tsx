import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sliderVariants = cva(
  "relative flex touch-none select-none items-center",
  {
    variants: {
      orientation: {
        horizontal: "w-full data-[orientation=horizontal]:flex-row",
        vertical: "h-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center",
      },
      disabled: {
        true: "opacity-50 pointer-events-none cursor-not-allowed",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const sliderControlVariants = cva(
  "relative flex grow items-center cursor-pointer touch-none select-none",
  {
    variants: {
      orientation: {
        horizontal: "w-full py-3",
        vertical: "h-full px-3 flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const sliderTrackVariants = cva(
  "relative rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors",
  {
    variants: {
      size: {
        default: "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5 data-[orientation=vertical]:h-full",
        xs: "data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=vertical]:h-full",
        sm: "data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=vertical]:h-full",
        md: "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5 data-[orientation=vertical]:h-full",
        lg: "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:h-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const sliderIndicatorVariants = cva(
  "rounded-full transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary",
        primary: "bg-primary",
        secondary: "bg-zinc-700 dark:bg-zinc-300",
        success: "bg-emerald-600 dark:bg-emerald-500",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const sliderThumbVariants = cva(
  "block rounded-full bg-background border-2 shadow-xs transition-[transform,box-shadow,border-color] duration-150 ease-out hover:scale-110 active:scale-95 data-[dragging]:scale-110 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2 data-[focused]:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary hover:border-primary-hover",
        primary: "border-primary hover:border-primary-hover",
        secondary: "border-zinc-700 hover:border-zinc-600 dark:border-zinc-300 dark:hover:border-zinc-200",
        success: "border-emerald-600 hover:border-emerald-500 dark:border-emerald-500",
        destructive: "border-destructive hover:border-destructive/90",
      },
      size: {
        default: "h-4.5 w-4.5",
        xs: "h-3.5 w-3.5",
        sm: "h-3.5 w-3.5",
        md: "h-4.5 w-4.5",
        lg: "h-5.5 w-5.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSlider.Root>, "size">,
    VariantProps<typeof sliderIndicatorVariants>,
    VariantProps<typeof sliderTrackVariants> {
  controlClassName?: string;
  trackClassName?: string;
  indicatorClassName?: string;
  thumbClassName?: string;
  thumbCount?: number;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof BaseSlider.Root>,
  SliderProps
>(
  (
    {
      className,
      controlClassName,
      trackClassName,
      indicatorClassName,
      thumbClassName,
      variant = "default",
      size = "default",
      thumbCount,
      ...props
    },
    ref
  ) => {
    const resolvedThumbCount = React.useMemo(() => {
      if (typeof thumbCount === "number") return thumbCount;
      if (Array.isArray(props.value)) return props.value.length;
      if (Array.isArray(props.defaultValue)) return props.defaultValue.length;
      return 1;
    }, [thumbCount, props.value, props.defaultValue]);

    return (
      <BaseSlider.Root
        ref={ref}
        className={cn(
          sliderVariants({
            orientation: props.orientation,
            disabled: props.disabled,
          }),
          className
        )}
        {...props}
      >
        <BaseSlider.Control
          className={cn(
            sliderControlVariants({ orientation: props.orientation }),
            controlClassName
          )}
        >
          <BaseSlider.Track
            className={cn(sliderTrackVariants({ size }), trackClassName)}
          >
            <BaseSlider.Indicator
              className={cn(
                sliderIndicatorVariants({ variant }),
                indicatorClassName
              )}
            />
            {Array.from({ length: resolvedThumbCount }).map((_, index) => (
              <BaseSlider.Thumb
                key={index}
                index={index}
                className={cn(
                  sliderThumbVariants({ variant, size }),
                  thumbClassName
                )}
              />
            ))}
          </BaseSlider.Track>
        </BaseSlider.Control>
      </BaseSlider.Root>
    );
  }
);
Slider.displayName = "Slider";

const SliderRoot = BaseSlider.Root;
const SliderControl = BaseSlider.Control;
const SliderTrack = BaseSlider.Track;
const SliderIndicator = BaseSlider.Indicator;
const SliderThumb = BaseSlider.Thumb;
const SliderValue = BaseSlider.Value;
const SliderLabel = BaseSlider.Label;

export {
  Slider,
  SliderRoot,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderValue,
  SliderLabel,
  sliderVariants,
  sliderControlVariants,
  sliderTrackVariants,
  sliderIndicatorVariants,
  sliderThumbVariants,
};
