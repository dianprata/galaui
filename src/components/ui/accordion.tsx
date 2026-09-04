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
        "group flex flex-1 items-center justify-between py-3.5 text-xs font-semibold transition-colors duration-200 hover:text-primary cursor-pointer text-foreground select-none",
        className
      )}
      {...props}
    >
      {children}
      <CaretDown weight="bold" className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-panel-open:rotate-180 data-open:rotate-180" />
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
      "h-[var(--accordion-panel-height)] overflow-hidden text-xs transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-starting-style:h-0 data-ending-style:h-0 text-muted-foreground leading-relaxed",
      className
    )}
    {...props}
  >
    <div className="pb-3.5 pt-0">
      {children}
    </div>
  </BaseAccordion.Panel>
));
AccordionPanel.displayName = "AccordionPanel";

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel };
