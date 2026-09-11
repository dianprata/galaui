import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepState = "completed" | "current" | "upcoming";

interface StepperContextValue {
  value: number;
  onValueChange?: (step: number) => void;
  orientation: "horizontal" | "vertical";
  clickable?: boolean;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper compound components must be used within a <Stepper />");
  }
  return context;
}

interface StepItemContextValue {
  step: number;
  state: StepState;
}

const StepItemContext = React.createContext<StepItemContextValue | null>(null);

function useStepItem() {
  return React.useContext(StepItemContext);
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  onValueChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
  clickable?: boolean;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      value,
      onValueChange,
      orientation = "horizontal",
      clickable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <StepperContext.Provider
        value={{
          value,
          onValueChange,
          orientation,
          clickable,
        }}
      >
        <div
          ref={ref}
          role="group"
          aria-label="Stepper"
          data-orientation={orientation}
          className={cn(
            "flex w-full",
            orientation === "horizontal"
              ? "flex-row items-center justify-between gap-2"
              : "flex-col items-start gap-4",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = "Stepper";

export interface StepItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  state?: StepState;
}

const StepItem = React.forwardRef<HTMLDivElement, StepItemProps>(
  ({ step, state: explicitState, className, children, ...props }, ref) => {
    const { value, onValueChange, orientation, clickable } = useStepper();

    const state: StepState =
      explicitState !== undefined
        ? explicitState
        : step < value
        ? "completed"
        : step === value
        ? "current"
        : "upcoming";

    const isClickable = clickable && onValueChange && state !== "current";

    const handleClick = () => {
      if (isClickable) {
        onValueChange?.(step);
      }
    };

    return (
      <StepItemContext.Provider value={{ step, state }}>
        <div
          ref={ref}
          data-step={step}
          data-state={state}
          data-orientation={orientation}
          data-clickable={isClickable}
          onClick={handleClick}
          className={cn(
            "group flex items-center gap-3 select-none",
            orientation === "horizontal" ? "flex-1 last:flex-none" : "w-full",
            isClickable && "cursor-pointer",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepItemContext.Provider>
    );
  }
);
StepItem.displayName = "StepItem";

const stepIndicatorVariants = cva(
  "relative flex shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-150",
  {
    variants: {
      size: {
        default: "size-8 text-xs",
        xs: "size-5 text-[9px]",
        sm: "size-6 text-[10px]",
        lg: "size-10 text-sm",
      },
      state: {
        completed: "border-primary bg-primary text-primary-foreground shadow-2xs",
        current:
          "border-primary bg-background text-primary ring-4 ring-primary/15 font-bold shadow-2xs",
        upcoming: "border-border bg-muted/60 text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      state: "upcoming",
    },
  }
);

export interface StepIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepIndicatorVariants> {
  icon?: React.ReactNode;
}

const StepIndicator = React.forwardRef<HTMLDivElement, StepIndicatorProps>(
  ({ size, state: propState, icon, className, children, ...props }, ref) => {
    const itemContext = useStepItem();
    const state = propState || itemContext?.state || "upcoming";

    return (
      <div
        ref={ref}
        data-slot="step-indicator"
        className={cn(stepIndicatorVariants({ size, state }), className)}
        {...props}
      >
        {icon !== undefined ? (
          icon
        ) : state === "completed" ? (
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
        ) : (
          children
        )}
      </div>
    );
  }
);
StepIndicator.displayName = "StepIndicator";

export interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="step-content"
        className={cn("flex flex-col text-left", className)}
        {...props}
      />
    );
  }
);
StepContent.displayName = "StepContent";

export interface StepTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const StepTitle = React.forwardRef<HTMLHeadingElement, StepTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        data-slot="step-title"
        className={cn(
          "text-xs font-semibold tracking-tight text-foreground transition-colors group-data-[state=upcoming]:text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
StepTitle.displayName = "StepTitle";

export interface StepDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const StepDescription = React.forwardRef<
  HTMLParagraphElement,
  StepDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="step-description"
      className={cn("text-[11px] text-muted-foreground leading-tight mt-0.5", className)}
      {...props}
    />
  );
});
StepDescription.displayName = "StepDescription";

export interface StepSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const StepSeparator = React.forwardRef<HTMLDivElement, StepSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { orientation, value } = useStepper();
    const itemContext = useStepItem();
    const isCompleted = itemContext ? itemContext.step < value : false;

    return (
      <div
        ref={ref}
        role="separator"
        data-slot="step-separator"
        data-orientation={orientation}
        className={cn(
          "bg-border transition-colors duration-150",
          isCompleted && "bg-primary",
          orientation === "horizontal"
            ? "h-0.5 flex-1 mx-2 self-center rounded-full group-data-[state=completed]:bg-primary"
            : "w-0.5 h-6 ml-4 my-1 rounded-full group-data-[state=completed]:bg-primary",
          className
        )}
        {...props}
      />
    );
  }
);
StepSeparator.displayName = "StepSeparator";

export {
  Stepper,
  StepItem,
  StepIndicator,
  StepContent,
  StepTitle,
  StepDescription,
  StepSeparator,
  stepIndicatorVariants,
};
