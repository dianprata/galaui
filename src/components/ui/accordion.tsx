import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const Accordion = BaseAccordion.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>
>(({ className, ...props }, ref) => (
  <BaseAccordion.Item
    ref={ref}
    className={cn("border-b border-border", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionHeader = BaseAccordion.Header;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseAccordion.Header className="flex">
    <BaseAccordion.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-3.5 text-xs font-semibold transition-all hover:underline data-open:[&>svg]:rotate-180 cursor-pointer text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <CaretDown weight="bold" className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200" />
    </BaseAccordion.Trigger>
  </BaseAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionPanel = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Panel>,
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel>
>(({ className, children, ...props }, ref) => (
  <BaseAccordion.Panel
    ref={ref}
    className={cn(
      "overflow-hidden text-xs transition-all pb-3.5 pt-0 text-muted-foreground leading-relaxed",
      className
    )}
    {...props}
  >
    {children}
  </BaseAccordion.Panel>
));
AccordionPanel.displayName = "AccordionPanel";

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel };

