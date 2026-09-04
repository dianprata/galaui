import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Skeleton,
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  Fieldset,
  FieldsetLegend,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  useToastManager,
  Drawer,
  DrawerTrigger,
  DrawerPopup,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldStepper,
  InputOTP,
  InputOTPSlot,
  InputOTPSeparator,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  CheckboxGroup,
  Checkbox,
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
  Meter,
  MeterTrack,
  MeterIndicator,
  MeterLabel,
  MeterValue,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Kbd,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuGroupLabel,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarPositioner,
  MenubarPopup,
  MenubarItem,
  MenubarSeparator,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuViewport,
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPositioner,
  PreviewCardPopup,
  AspectRatio,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  Button,
  Badge,
  Separator,
  cn,
} from "../index";

import {
  Sparkle,
  WarningCircle,
  CheckCircle,
  Info,
  XCircle,
  BellRinging,
  Sidebar,
  Hash,
  Key,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  TextAlignJustify,
  CaretDown,
  CaretRight,
  Warning,
  FolderSimplePlus,
  Plus,
  Copy,
  Trash,
} from "@phosphor-icons/react";

interface ShowcaseProps {
  selectedComp: string;
  viewMode: "focus" | "matrix";
  showToast: (msg: string) => void;
  btnVariant?: any;
  btnSize?: any;
  btnLabel?: string;
  isDisabled?: boolean;
  customCn?: string;
}

function ToastDemoButton({ showToast }: { showToast: (msg: string) => void }) {
  const toastManager = useToastManager();
  const handleCreate = (type?: "default" | "success" | "warning" | "destructive") => {
    if (toastManager?.add) {
      if (type === "success") {
        toastManager.add({
          title: "Token Synchronized",
          description: "Variables matched 1:1 with Figma Tokens Studio.",
          type: "success",
        });
      } else if (type === "destructive") {
        toastManager.add({
          title: "Cluster Disconnected",
          description: "Connection to ap-southeast-1 was terminated.",
          type: "destructive",
        });
      } else if (type === "warning") {
        toastManager.add({
          title: "Rate Limit Approaching",
          description: "You have used 85% of your API token quota.",
          type: "warning",
        });
      } else {
        toastManager.add({
          title: "System Notification",
          description: "GalaUI Base UI Toast dispatched with auto-dismiss.",
        });
      }
    } else {
      showToast("Toast notification dispatched");
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      <Button variant="primary" size="sm" onClick={() => handleCreate()}>
        <BellRinging weight="bold" className="w-4 h-4 mr-1.5" /> Dispatch Toast
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleCreate("success")}>
        <CheckCircle weight="bold" className="w-4 h-4 mr-1.5 text-emerald-500" /> Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleCreate("warning")}>
        <Warning weight="bold" className="w-4 h-4 mr-1.5 text-amber-500" /> Warning
      </Button>
      <Button variant="destructive" size="sm" onClick={() => handleCreate("destructive")}>
        <XCircle weight="bold" className="w-4 h-4 mr-1.5" /> Destructive
      </Button>
    </div>
  );
}

export function ShowcaseNewComponents({
  selectedComp,
  viewMode,
  showToast,
  btnVariant = "default",
  btnSize = "default",
  btnLabel,
  isDisabled = false,
  customCn = "",
}: ShowcaseProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alertDlgOpen, setAlertDlgOpen] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [togglePressed, setTogglePressed] = useState(false);
  const [alignValues, setAlignValues] = useState<string[]>(["left"]);
  const [checkedItems, setCheckedItems] = useState<string[]>(["analytics"]);
  const [numberVal, setNumberVal] = useState<number | null>(42);
  const [progressVal, setProgressVal] = useState(68);
  const [ctxMenuOpen, setCtxMenuOpen] = useState(false);

  /* FOCUS STAGE */
  if (viewMode === "focus") {
    switch (selectedComp) {
      case "alert":
        return (
          <div className="w-full max-w-md space-y-3">
            <Alert variant={btnVariant} className={cn(customCn)}>
              <Info weight="bold" className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <AlertTitle>{btnLabel || "Production Cluster Ready"}</AlertTitle>
                <AlertDescription>
                  All system tokens and base primitives have passed accessibility checks with zero regression.
                </AlertDescription>
              </div>
            </Alert>
          </div>
        );

      case "skeleton":
        return (
          <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-20 w-full rounded-lg" />
            <div className="flex justify-end gap-2 pt-1">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-7 w-20" />
            </div>
          </div>
        );

      case "field":
        return (
          <Fieldset className="w-full max-w-sm space-y-4">
            <FieldsetLegend>Account Credentials</FieldsetLegend>
            <Field className="space-y-1.5">
              <FieldLabel>API Access Token</FieldLabel>
              <FieldControl
                defaultValue="gala_live_9921_secret"
                disabled={isDisabled}
                className={cn(customCn)}
              />
              <FieldDescription>Issued by GalaUI Token Engine.</FieldDescription>
            </Field>
            <Field className="space-y-1.5">
              <FieldLabel>Namespace (Required)</FieldLabel>
              <FieldControl
                defaultValue="invalid namespace!"
                data-invalid="true"
                disabled={isDisabled}
              />
              <FieldError>Alphanumeric characters only, no spaces allowed.</FieldError>
            </Field>
          </Fieldset>
        );

      case "toast":
        return (
          <div className="flex flex-col items-center gap-6 text-center w-full max-w-md">
            <div className="w-full text-left space-y-2">
              <span className="text-xs font-semibold text-muted-foreground">Interactive Queue Dispatcher</span>
              <div className="p-4 rounded-xl border border-border bg-card flex flex-col items-center justify-center gap-3">
                <ToastDemoButton showToast={showToast} />
                <p className="text-[11px] text-muted-foreground">
                  Dispatches Base UI animated queue toast to the viewport in the bottom-right.
                </p>
              </div>
            </div>

            <div className="w-full text-left space-y-2">
              <span className="text-xs font-semibold text-muted-foreground">Notification Specimen (Live Preview)</span>
              <div className="w-full max-w-md p-4 rounded-xl border border-border bg-card shadow-md space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-foreground tracking-tight">Token Synchronized</p>
                    <p className="text-xs text-muted-foreground leading-normal">
                      Variables matched 1:1 with Figma Tokens Studio.
                    </p>
                  </div>
                  <Badge variant="success">Queue Ready</Badge>
                </div>
                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Swipe to dismiss supported</span>
                  <span>5000ms auto-timeout</span>
                </div>
            </div>
            </div>
          </div>
        );

      case "drawer":
        return (
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger render={<Button variant="primary" />}>
              <Sidebar weight="bold" className="w-4 h-4 mr-1.5" /> Open Drawer (Sheet)
            </DrawerTrigger>
            <DrawerPopup side="right">
              <DrawerHeader>
                <DrawerTitle>{btnLabel || "Token Configuration Drawer"}</DrawerTitle>
                <DrawerDescription>
                  Slides in smoothly with gesture swipe-to-dismiss and escape key listeners.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 py-4 space-y-3">
                <Field className="space-y-1">
                  <FieldLabel>Theme Mode</FieldLabel>
                  <FieldControl defaultValue="Electric Cobalt" />
                </Field>
                <Field className="space-y-1">
                  <FieldLabel>Border Radius Scale</FieldLabel>
                  <FieldControl defaultValue="12px (xl)" />
                </Field>
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
                <DrawerClose render={<Button variant="primary" onClick={() => showToast("Drawer changes saved")} />}>
                  Save Preferences
                </DrawerClose>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        );

      case "number-field":
        return (
          <div className="w-full max-w-xs space-y-2 p-4 rounded-xl border border-border bg-card">
            <label className="text-xs font-medium text-foreground block">
              {btnLabel || "Concurrent Connections"}
            </label>
            <NumberField
              value={numberVal}
              onValueChange={setNumberVal}
              min={0}
              max={1000}
              step={10}
              disabled={isDisabled}
            >
              <NumberFieldGroup className={cn(customCn)}>
                <NumberFieldInput />
                <NumberFieldStepper>
                  <NumberFieldIncrement />
                  <NumberFieldDecrement />
                </NumberFieldStepper>
              </NumberFieldGroup>
            </NumberField>
            <p className="text-[10px] font-mono text-muted-foreground flex justify-between">
              <span>Min: 0</span>
              <span>Current: {numberVal}</span>
              <span>Max: 1000</span>
            </p>
          </div>
        );

      case "input-otp":
        return (
          <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <div className="text-center space-y-0.5">
              <p className="text-xs font-semibold text-foreground">Security Verification PIN</p>
              <p className="text-[11px] text-muted-foreground">Enter the 6-digit MFA code</p>
            </div>
            <InputOTP length={6} disabled={isDisabled} className={cn(customCn)}>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSeparator />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTP>
          </div>
        );

      case "toggle":
        return (
          <div className="flex flex-col items-center gap-3">
            <Toggle
              pressed={togglePressed}
              onPressedChange={setTogglePressed}
              variant={btnVariant}
              size={btnSize}
              disabled={isDisabled}
              className={cn(customCn)}
            >
              <Sparkle weight={togglePressed ? "fill" : "bold"} className="w-4 h-4 mr-1.5" />
              {btnLabel || "Bookmark Token"}
            </Toggle>
            <span className="text-[10px] font-mono text-muted-foreground">
              State: {togglePressed ? "PRESSED (ON)" : "UNPRESSED (OFF)"}
            </span>
          </div>
        );

      case "toggle-group":
        return (
          <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <p className="text-xs font-medium text-foreground">Text Alignment Segment</p>
            <ToggleGroup
              value={alignValues}
              onValueChange={setAlignValues}
              disabled={isDisabled}
              className={cn(customCn)}
            >
              <ToggleGroupItem value="left" aria-label="Align Left">
                <TextAlignLeft weight="bold" className="w-3.5 h-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align Center">
                <TextAlignCenter weight="bold" className="w-3.5 h-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align Right">
                <TextAlignRight weight="bold" className="w-3.5 h-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="justify" aria-label="Align Justify">
                <TextAlignJustify weight="bold" className="w-3.5 h-3.5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        );

      case "checkbox-group":
        return (
          <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-3">
            <p className="text-xs font-semibold text-foreground">Active Observability Feeds</p>
            <CheckboxGroup value={checkedItems} onValueChange={setCheckedItems}>
              <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                <Checkbox value="analytics" />
                <span>Real-time Analytics Dashboard</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                <Checkbox value="logs" />
                <span>Structured JSON Application Logs</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                <Checkbox value="tracing" />
                <span>Distributed OpenTelemetry Traces</span>
              </label>
            </CheckboxGroup>
          </div>
        );

      case "collapsible":
        return (
          <div className="w-full max-w-sm rounded-xl border border-border bg-card overflow-hidden shadow-xs">
            <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
              <CollapsibleTrigger className="p-3.5 text-xs text-foreground hover:bg-muted transition-colors">
                <span className="font-semibold">{btnLabel || "Advanced Token Metadata"}</span>
                <CaretRight
                  weight="bold"
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200 text-muted-foreground",
                    collapsibleOpen && "rotate-90 text-foreground"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsiblePanel className="border-t border-border/50">
                <div className="p-3.5 space-y-2 text-muted-foreground">
                  <p>Tokens Studio collection: <strong className="text-foreground">$themes/Light</strong> & <strong className="text-foreground">$themes/Dark</strong></p>
                  <p>WCAG contrast ratio score: <strong className="text-foreground">14.2:1 (AAA)</strong></p>
                  <p className="text-[11px] font-mono text-muted-foreground/80">CSS variable: --collapsible-panel-height</p>
                </div>
              </CollapsiblePanel>
            </Collapsible>
          </div>
        );

      case "alert-dialog":
        return (
          <AlertDialog open={alertDlgOpen} onOpenChange={setAlertDlgOpen}>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              <Trash weight="bold" className="w-4 h-4 mr-1.5" /> Purge Deployment
            </AlertDialogTrigger>
            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely certain?</AlertDialogTitle>
                <AlertDialogDescription>
                  This operation will permanently delete the staging cluster and unlink all active routing variables.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Cluster</AlertDialogCancel>
                <AlertDialogAction onClick={() => showToast("Cluster purged successfully")}>
                  Confirm Destruction
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialog>
        );

      case "progress":
        return (
          <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-4">
            <Progress value={progressVal}>
              <div className="flex justify-between items-center">
                <ProgressLabel>Build Optimization</ProgressLabel>
                <ProgressValue />
              </div>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <div className="flex justify-end gap-2">
              <Button size="xs" variant="outline" onClick={() => setProgressVal(Math.max(10, progressVal - 20))}>-20%</Button>
              <Button size="xs" variant="outline" onClick={() => setProgressVal(Math.min(100, progressVal + 20))}>+20%</Button>
            </div>
          </div>
        );

      case "meter":
        return (
          <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-2">
            <Meter value={84} max={100}>
              <div className="flex justify-between items-center">
                <MeterLabel>Cluster Memory Utilization</MeterLabel>
                <MeterValue />
              </div>
              <MeterTrack>
                <MeterIndicator />
              </MeterTrack>
            </Meter>
            <span className="text-[11px] text-muted-foreground block text-right font-mono">
              26.8 GB / 32 GB Allocated
            </span>
          </div>
        );

      case "breadcrumb":
        return (
          <div className="p-4 rounded-xl border border-border bg-card">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => showToast("Navigated to Workspace")}>Workspace</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => showToast("Navigated to Primitives")}>Primitives</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Button.tsx</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        );

      case "pagination":
        return (
          <div className="p-4 rounded-xl border border-border bg-card">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => showToast("Previous page")} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive onClick={() => showToast("Page 1 selected")}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => showToast("Page 2 selected")}>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => showToast("Page 3 selected")}>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => showToast("Page 12 selected")}>12</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => showToast("Next page")} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        );

      case "scroll-area":
        return (
          <ScrollArea className="h-44 w-72 rounded-xl border border-border bg-card p-3 shadow-xs">
            <div className="space-y-2 text-xs text-muted-foreground">
              <h6 className="font-bold text-foreground text-xs">GalaUI Changelog Timeline</h6>
              <p>v1.2.0: Introduced Base UI primitives including Field, Toast, Drawer, and NumberField.</p>
              <p>v1.1.0: Full 1:1 token sync with Tokens Studio and Figma Local Variables.</p>
              <p>v1.0.0: Initial release powered by Tailwind CSS v4 CSS-first theme architecture.</p>
              <p>WAI-ARIA compliant keyboard focus traps with spring-actuated micro-animations.</p>
              <p>Built with React 19, Vite, and high-performance class merging via compiled cn.</p>
            </div>
          </ScrollArea>
        );

      case "kbd":
        return (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <span className="text-xs text-foreground">Quick Palette:</span>
            <div className="flex items-center gap-1.5">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </div>
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex items-center gap-1.5">
              <Kbd>Ctrl</Kbd>
              <Kbd>Shift</Kbd>
              <Kbd>P</Kbd>
            </div>
          </div>
        );

      case "table":
        return (
          <div className="w-full max-w-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Auth Broker</TableCell>
                  <TableCell>us-east-1</TableCell>
                  <TableCell>99.99%</TableCell>
                  <TableCell className="text-right"><Badge variant="success">Operational</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CDN Gateway</TableCell>
                  <TableCell>ap-southeast-1</TableCell>
                  <TableCell>99.95%</TableCell>
                  <TableCell className="text-right"><Badge variant="success">Operational</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Database Replica</TableCell>
                  <TableCell>eu-central-1</TableCell>
                  <TableCell>99.80%</TableCell>
                  <TableCell className="text-right"><Badge variant="warning">Syncing</Badge></TableCell>
                </TableRow>
              </TableBody>
              <TableCaption>Real-time cluster telemetry snapshot</TableCaption>
            </Table>
          </div>
        );

      case "context-menu":
        return (
          <div className="flex flex-col items-center gap-3">
            <ContextMenu open={ctxMenuOpen} onOpenChange={setCtxMenuOpen}>
              <ContextMenuTrigger className="flex flex-col items-center justify-center gap-2.5 h-44 w-80 rounded-2xl border-2 border-dashed border-border bg-card/70 p-6 text-center select-none cursor-context-menu hover:border-primary/60 hover:bg-card transition-all shadow-xs">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  <Copy className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Right-Click Inside Area</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    On Mac trackpad: two-finger tap or <kbd className="px-1 py-0.5 rounded bg-muted font-mono text-[10px]">Ctrl + Click</kbd>
                  </p>
                </div>
              </ContextMenuTrigger>

              <ContextMenuPortal>
                <ContextMenuPositioner className="z-50 outline-none">
                  <ContextMenuPopup>
                    <ContextMenuGroup>
                      <ContextMenuGroupLabel>Component Actions</ContextMenuGroupLabel>
                      <ContextMenuItem onClick={() => showToast("Copied spec")}>
                        <Copy className="w-3.5 h-3.5 mr-2 text-muted-foreground" /> Copy Spec
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => showToast("Exported token")}>
                        <Sparkle className="w-3.5 h-3.5 mr-2 text-primary" /> Export Token
                      </ContextMenuItem>
                    </ContextMenuGroup>
                    <ContextMenuSeparator />
                    <ContextMenuGroup>
                      <ContextMenuItem className="text-destructive" onClick={() => showToast("Deleted item")}>
                        <Trash className="w-3.5 h-3.5 mr-2 text-destructive" /> Delete Specimen
                      </ContextMenuItem>
                    </ContextMenuGroup>
                  </ContextMenuPopup>
                </ContextMenuPositioner>
              </ContextMenuPortal>
            </ContextMenu>

            <div className="flex items-center gap-2 pt-1">
              <Button
                variant="outline"
                size="xs"
                onClick={() => setCtxMenuOpen(!ctxMenuOpen)}
                className="text-[11px]"
              >
                {ctxMenuOpen ? "Close Menu" : "Test Open via Button Click"}
              </Button>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              Supports both native right-click and programmatic trigger
            </span>
          </div>
        );

      case "menubar":
        return (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarPopup>
                <MenubarItem onClick={() => showToast("New Tab")}>New Project</MenubarItem>
                <MenubarItem onClick={() => showToast("Opened")}>Open Folder...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => showToast("Saved")}>Save Variables</MenubarItem>
              </MenubarPopup>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarPopup>
                <MenubarItem onClick={() => showToast("Undo")}>Undo Action</MenubarItem>
                <MenubarItem onClick={() => showToast("Redo")}>Redo Action</MenubarItem>
              </MenubarPopup>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Tokens</MenubarTrigger>
              <MenubarPopup>
                <MenubarItem onClick={() => showToast("Synchronizing...")}>Sync with Figma</MenubarItem>
                <MenubarItem onClick={() => showToast("Exported")}>Export JSON</MenubarItem>
              </MenubarPopup>
            </MenubarMenu>
          </Menubar>
        );

      case "navigation-menu":
        return (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Design Tokens</NavigationMenuTrigger>
                <NavigationMenuContent className="w-72 space-y-2">
                  <h6 className="font-bold text-xs text-foreground">Primitives & Semantics</h6>
                  <p className="text-xs text-muted-foreground">
                    Electric Cobalt brand ramp and neutral Zinc palettes with 1:1 Tokens Studio parity.
                  </p>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent className="w-72 space-y-2">
                  <h6 className="font-bold text-xs text-foreground">Base UI Primitives</h6>
                  <p className="text-xs text-muted-foreground">
                    Headless accessible components styled with pure CSS-first Tailwind v4.
                  </p>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        );

      case "preview-card":
        return (
          <div className="text-xs text-foreground leading-relaxed text-center">
            Learn more about the architect behind{" "}
            <PreviewCard>
              <PreviewCardTrigger className="font-semibold text-primary underline underline-offset-4 cursor-pointer">
                GalaUI Systems
              </PreviewCardTrigger>
              <PreviewCardPopup className="space-y-2 text-left">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-mono text-sm">
                    G
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">GalaUI Core</p>
                    <p className="text-[11px] text-muted-foreground font-mono">@galaui/design-system</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-normal">
                  High-craft design system engine marrying Base UI headless primitives and Tailwind v4.
                </p>
              </PreviewCardPopup>
            </PreviewCard>
          </div>
        );

      case "aspect-ratio":
        return (
          <div className="w-full max-w-sm space-y-2">
            <span className="text-xs font-semibold text-foreground">Aspect Ratio 16:9</span>
            <AspectRatio ratio={16 / 9} className="rounded-xl border border-border bg-muted/40 flex items-center justify-center text-xs font-mono text-muted-foreground">
              16 : 9 Media Container
            </AspectRatio>
          </div>
        );

      case "separator":
        return (
          <div className="w-full max-w-md space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Horizontal</p>
              <Separator />
            </div>
            <div className="flex h-10 items-center gap-4">
              <span className="text-xs text-muted-foreground">Navigation</span>
              <Separator orientation="vertical" />
              <span className="text-xs text-muted-foreground">Settings</span>
            </div>
          </div>
        );

      case "empty-state":
        return (
          <EmptyState className="w-full max-w-md">
            <EmptyStateIcon>
              <FolderSimplePlus weight="bold" />
            </EmptyStateIcon>
            <EmptyStateTitle>{btnLabel || "No Custom Tokens Found"}</EmptyStateTitle>
            <EmptyStateDescription>
              You have not created any custom semantic variable mappings yet. Start by syncing with Tokens Studio.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button variant="outline" size="sm">Documentation</Button>
              <Button variant="primary" size="sm" onClick={() => showToast("Initiated token sync")}>
                <Plus weight="bold" className="w-3.5 h-3.5 mr-1" /> Add Variable
              </Button>
            </EmptyStateActions>
          </EmptyState>
        );

      default:
        return null;
    }
  }

  /* VARIANT MATRIX VIEW */
  switch (selectedComp) {
    case "alert":
      return (
        <div className="space-y-3 max-w-xl">
          <Alert variant="default">
            <Info weight="bold" className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>Neutral surface background with card border.</AlertDescription>
            </div>
          </Alert>
          <Alert variant="info">
            <Info weight="bold" className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <AlertTitle>Information Alert</AlertTitle>
              <AlertDescription>Electric cobalt accent for informative notes.</AlertDescription>
            </div>
          </Alert>
          <Alert variant="success">
            <CheckCircle weight="bold" className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <AlertTitle>Success Alert</AlertTitle>
              <AlertDescription>Emerald tint indicating confirmed completion.</AlertDescription>
            </div>
          </Alert>
          <Alert variant="warning">
            <Warning weight="bold" className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <AlertTitle>Warning Alert</AlertTitle>
              <AlertDescription>Amber highlight for cautionary conditions.</AlertDescription>
            </div>
          </Alert>
          <Alert variant="destructive">
            <XCircle weight="bold" className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <AlertTitle>Destructive Alert</AlertTitle>
              <AlertDescription>Red status tint for critical failure states.</AlertDescription>
            </div>
          </Alert>
        </div>
      );

    case "toggle":
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <Toggle variant="default">Default Unpressed</Toggle>
            <Toggle variant="default" defaultPressed>Default Pressed</Toggle>
            <Toggle variant="outline">Outline Unpressed</Toggle>
            <Toggle variant="outline" defaultPressed>Outline Pressed</Toggle>
            <Toggle disabled>Disabled State</Toggle>
          </div>
        </div>
      );

    case "separator":
      return (
        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground">Horizontal Orientation</span>
            <div className="space-y-2 p-3 rounded-xl border border-border bg-card">
              <p className="text-xs font-medium text-foreground">Section Alpha</p>
              <Separator />
              <p className="text-xs text-muted-foreground">Section Beta</p>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground">Vertical Orientation</span>
            <div className="flex h-10 items-center gap-4 p-3 rounded-xl border border-border bg-card">
              <span className="text-xs font-medium text-foreground">Dashboard</span>
              <Separator orientation="vertical" />
              <span className="text-xs font-medium text-foreground">Analytics</span>
              <Separator orientation="vertical" />
              <span className="text-xs font-medium text-foreground">Settings</span>
            </div>
          </div>
        </div>
      );

    case "toast":
      return (
        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground">Variant Specimens</span>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-border bg-card shadow-sm flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-foreground">Default Toast</p>
                  <p className="text-xs text-muted-foreground">Standard system notification card with neutral border.</p>
                </div>
                <Badge variant="secondary">Default</Badge>
              </div>
              <div className="p-4 rounded-xl border border-success-500/30 bg-emerald-50 dark:border-success-500/40 dark:bg-emerald-950 shadow-sm flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-emerald-950 dark:text-emerald-200">Success Toast</p>
                  <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">Confirmed operation or variable synchronization completed.</p>
                </div>
                <Badge variant="success">Success</Badge>
              </div>
              <div className="p-4 rounded-xl border border-warning-500/30 bg-amber-50 dark:border-warning-500/40 dark:bg-amber-950 shadow-sm flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-amber-950 dark:text-amber-200">Warning Toast</p>
                  <p className="text-xs text-amber-800/80 dark:text-amber-300/80">Cautionary notification for rate limits or sync warnings.</p>
                </div>
                <Badge variant="warning">Warning</Badge>
              </div>
              <div className="p-4 rounded-xl border border-destructive-500/30 bg-red-50 dark:border-destructive-500/40 dark:bg-red-950 shadow-sm flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-destructive-700 dark:text-red-200">Destructive Toast</p>
                  <p className="text-xs text-destructive-600/80 dark:text-red-300/80">Deletion event, cluster teardown, or critical error.</p>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-4 text-xs text-muted-foreground">
          Switch to Focus Stage for live interactive specimen testing of {selectedComp}.
        </div>
      );
  }
}
