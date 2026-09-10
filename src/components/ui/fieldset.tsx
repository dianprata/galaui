 import * as React from "react";
 import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
 import { cva, type VariantProps } from "class-variance-authority";
 import { cn } from "@/lib/utils";
 
 const fieldsetVariants = cva(
   "w-full transition-opacity data-disabled:opacity-50 data-disabled:pointer-events-none",
   {
     variants: {
       variant: {
         default: "space-y-4",
         bordered: "space-y-4 rounded-xl border border-border p-4 sm:p-5",
         card: "space-y-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs p-5 sm:p-6",
         plain: "space-y-2",
       },
     },
     defaultVariants: {
       variant: "default",
     },
   }
 );
 
 export interface FieldsetProps
   extends React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>,
     VariantProps<typeof fieldsetVariants> {
   className?: string;
 }
 
 const Fieldset = React.forwardRef<
   React.ElementRef<typeof BaseFieldset.Root>,
   FieldsetProps
 >(({ className, variant, ...props }, ref) => (
   <BaseFieldset.Root
     ref={ref}
     className={cn(fieldsetVariants({ variant }), className)}
     {...props}
   />
 ));
 Fieldset.displayName = "Fieldset";
 
 export interface FieldsetLegendProps
   extends React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend> {
   className?: string;
 }
 
 const FieldsetLegend = React.forwardRef<
   React.ElementRef<typeof BaseFieldset.Legend>,
   FieldsetLegendProps
 >(({ className, ...props }, ref) => (
   <BaseFieldset.Legend
     ref={ref}
     className={cn(
       "text-sm font-semibold tracking-tight text-foreground border-b border-border pb-2 mb-3 w-full block",
       className
     )}
     {...props}
   />
 ));
 FieldsetLegend.displayName = "FieldsetLegend";
 
 export interface FieldsetDescriptionProps
   extends React.HTMLAttributes<HTMLParagraphElement> {
   className?: string;
 }
 
 const FieldsetDescription = React.forwardRef<
   HTMLParagraphElement,
   FieldsetDescriptionProps
 >(({ className, ...props }, ref) => (
   <p
     ref={ref}
     className={cn("text-xs text-muted-foreground -mt-1.5 mb-3 leading-relaxed", className)}
     {...props}
   />
 ));
 FieldsetDescription.displayName = "FieldsetDescription";
 
 export { Fieldset, FieldsetLegend, FieldsetDescription, fieldsetVariants };
 
