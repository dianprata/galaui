import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Popover,
  PopoverTrigger,
  PopoverPopup,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPopup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Slider,
  Input,
  Textarea,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
  ToastProvider,
  ToastViewport,
  cn,
} from "./index";
import { ShowcaseNewComponents } from "./components/ShowcaseNewComponents";

import {
  Sparkle,
  Copy,
  Check,
  Moon,
  Sun,
  Cube,
  Sliders,
  ShieldCheck,
  User,
  Trash,
  Plus,
  ArrowRight,
  Desktop,
  DeviceTablet,
  DeviceMobile,
  GridFour,
  Square,
  CheckCircle,
  WarningCircle,
  Eye,
  Code,
  ArrowSquareOut,
  MagnifyingGlass,
  ShareNetwork,
  Command,
  CaretRight,
  Fingerprint,
  Cpu,
  SquaresFour,
  Rows,
  TerminalWindow,
  FileCode,
  Tag,
  Lightning,
  Activity,
  ArrowsClockwise,
} from "@phosphor-icons/react";

type ComponentId =
  | "button"
  | "dialog"
  | "popover"
  | "dropdown"
  | "switch"
  | "checkbox"
  | "radio"
  | "tooltip"
  | "accordion"
  | "tabs"
  | "select"
  | "avatar"
  | "slider"
  | "input"
  | "badge"
  | "card"
  | "alert"
  | "skeleton"
  | "field"
  | "toast"
  | "drawer"
  | "number-field"
  | "input-otp"
  | "toggle"
  | "toggle-group"
  | "checkbox-group"
  | "collapsible"
  | "alert-dialog"
  | "progress"
  | "meter"
  | "breadcrumb"
  | "pagination"
  | "scroll-area"
  | "kbd"
  | "table"
  | "context-menu"
  | "menubar"
  | "navigation-menu"
  | "preview-card"
  | "aspect-ratio"
  | "empty-state";

interface ComponentMeta {
  id: ComponentId;
  name: string;
  category: "Primitives" | "Molecules" | "Form";
  primitive: string;
  desc: string;
  figmaToken: string;
}

const COMPONENT_LIST: ComponentMeta[] = [
  { id: "accordion", name: "Accordion", category: "Molecules", primitive: "@base-ui/react/Accordion", desc: "Vertically stacked interactive disclosure headings and content panels.", figmaToken: "border/default + space/4" },
  { id: "alert", name: "Alert", category: "Molecules", primitive: "cva / cn", desc: "Status banner callouts with semantic color indicators.", figmaToken: "status/* + radius/xl" },
  { id: "alert-dialog", name: "Alert Dialog", category: "Molecules", primitive: "@base-ui/react/AlertDialog", desc: "Modal confirmation prompt for destructive or irreversible actions.", figmaToken: "status/destructive + radius/2xl" },
  { id: "aspect-ratio", name: "Aspect Ratio", category: "Primitives", primitive: "CSS AspectRatio", desc: "Proportional media wrapper maintaining defined aspect ratios.", figmaToken: "radius/xl" },
  { id: "avatar", name: "Avatar", category: "Primitives", primitive: "@base-ui/react/Avatar", desc: "Image presentation primitive with automatic initials fallback.", figmaToken: "radius/full + border/subtle" },
  { id: "badge", name: "Badge", category: "Primitives", primitive: "cva / cn", desc: "Status tag indicators with semantic border tints.", figmaToken: "radius/md + status/*" },
  { id: "breadcrumb", name: "Breadcrumb", category: "Molecules", primitive: "Semantic Nav", desc: "Hierarchical trail navigation showing user location.", figmaToken: "color/semantic/fg/muted" },
  { id: "button", name: "Button", category: "Primitives", primitive: "Base UI Button / cva", desc: "Interactive tactile button with spring physics and variant matrices.", figmaToken: "color/semantic/primary/default" },
  { id: "card", name: "Card", category: "Molecules", primitive: "Compound Layout", desc: "Elevated structural surface with header, content, and footer slots.", figmaToken: "color/semantic/bg/card" },
  { id: "checkbox", name: "Checkbox", category: "Primitives", primitive: "@base-ui/react/Checkbox", desc: "Tri-state capable custom checkbox with high-contrast indicator.", figmaToken: "radius/sm + border/default" },
  { id: "checkbox-group", name: "Checkbox Group", category: "Form", primitive: "@base-ui/react/CheckboxGroup", desc: "Accessible grouping for multiple checkbox selections.", figmaToken: "space/2.5" },
  { id: "collapsible", name: "Collapsible", category: "Molecules", primitive: "@base-ui/react/Collapsible", desc: "Expandable disclosure container controlled by an interactive trigger.", figmaToken: "border/default + radius/xl" },
  { id: "context-menu", name: "Context Menu", category: "Molecules", primitive: "@base-ui/react/ContextMenu", desc: "Right-click popup menu with submenus and shortcut hints.", figmaToken: "shadow/xl + radius/xl" },
  { id: "dialog", name: "Dialog (Modal)", category: "Molecules", primitive: "@base-ui/react/Dialog", desc: "Accessible modal overlay with focus trapping, backdrop blur, and escape dismissal.", figmaToken: "radius/2xl + shadow/2xl" },
  { id: "drawer", name: "Drawer (Sheet)", category: "Molecules", primitive: "@base-ui/react/Drawer", desc: "Slide-over panel from screen edges with gesture swipe dismiss.", figmaToken: "radius/2xl + shadow/2xl" },
  { id: "dropdown", name: "Dropdown Menu", category: "Molecules", primitive: "@base-ui/react/Menu", desc: "Action menu trigger with keyboard traversal and separator groups.", figmaToken: "color/semantic/bg/popover" },
  { id: "empty-state", name: "Empty State", category: "Molecules", primitive: "Compound Layout", desc: "Visual placeholder displayed when data or records are empty.", figmaToken: "border/dashed + radius/2xl" },
  { id: "field", name: "Field & Form", category: "Form", primitive: "@base-ui/react/Field", desc: "Accessible form field with label, control, description, and error validation.", figmaToken: "color/semantic/border + status/destructive" },
  { id: "input", name: "Input & Textarea", category: "Form", primitive: "Form HTML", desc: "Typography-calibrated input fields with label placement and helper text.", figmaToken: "color/semantic/input" },
  { id: "input-otp", name: "Input OTP", category: "Form", primitive: "@base-ui/react/OTPField", desc: "Segmented one-time password input with individual character slots.", figmaToken: "color/semantic/input + radius/lg" },
  { id: "kbd", name: "Kbd", category: "Primitives", primitive: "Semantic Kbd", desc: "Keyboard shortcut key badge indicator.", figmaToken: "font/mono + radius/sm" },
  { id: "menubar", name: "Menubar", category: "Molecules", primitive: "@base-ui/react/Menubar", desc: "Application menu bar with top-level dropdown commands.", figmaToken: "radius/xl + shadow/2xs" },
  { id: "meter", name: "Meter", category: "Primitives", primitive: "@base-ui/react/Meter", desc: "Visual display for scalar measurements and resource quotas.", figmaToken: "primary/default + radius/full" },
  { id: "navigation-menu", name: "Navigation Menu", category: "Molecules", primitive: "@base-ui/react/NavigationMenu", desc: "Header navigation with animated indicator and popup viewport.", figmaToken: "shadow/2xl + radius/2xl" },
  { id: "number-field", name: "Number Field", category: "Form", primitive: "@base-ui/react/NumberField", desc: "Numeric input with stepper buttons, formatting, and scrub area.", figmaToken: "color/semantic/input" },
  { id: "pagination", name: "Pagination", category: "Molecules", primitive: "Semantic Nav", desc: "Multi-page navigation with next, previous, and page number links.", figmaToken: "space/1 + radius/sm" },
  { id: "popover", name: "Popover", category: "Molecules", primitive: "@base-ui/react/Popover", desc: "Floating contextual popover card with collision detection and smooth transitions.", figmaToken: "color/semantic/bg/popover" },
  { id: "preview-card", name: "Preview Card", category: "Molecules", primitive: "@base-ui/react/PreviewCard", desc: "Rich preview popup on pointer hover for links or user profiles.", figmaToken: "shadow/xl + radius/2xl" },
  { id: "progress", name: "Progress Bar", category: "Primitives", primitive: "@base-ui/react/Progress", desc: "Determinate and indeterminate progress indicators.", figmaToken: "primary/default + radius/full" },
  { id: "radio", name: "Radio Group", category: "Primitives", primitive: "@base-ui/react/RadioGroup", desc: "Mutually exclusive choice selector with directional keyboard arrows.", figmaToken: "radius/full + primary" },
  { id: "scroll-area", name: "Scroll Area", category: "Primitives", primitive: "@base-ui/react/ScrollArea", desc: "Custom styled cross-browser scrollbar without layout shift.", figmaToken: "color/semantic/bg/muted" },
  { id: "select", name: "Select", category: "Form", primitive: "@base-ui/react/Select", desc: "Native-like custom select popup with typeahead search support.", figmaToken: "color/semantic/border/default" },
  { id: "skeleton", name: "Skeleton", category: "Primitives", primitive: "Tailwind Pulse", desc: "Animated placeholder skeleton for loading content structures.", figmaToken: "color/semantic/bg/muted" },
  { id: "slider", name: "Slider", category: "Form", primitive: "@base-ui/react/Slider", desc: "Continuous and stepped value slider with touch and drag physics.", figmaToken: "primary/default + radius/full" },
  { id: "switch", name: "Switch", category: "Primitives", primitive: "@base-ui/react/Switch / cva", desc: "Toggle primitive for binary options with spring-actuated thumb animation.", figmaToken: "color/semantic/primary/default" },
  { id: "table", name: "Table", category: "Molecules", primitive: "Semantic Table", desc: "Structured data table with responsive styled rows and cells.", figmaToken: "border/default + color/semantic/bg/card" },
  { id: "tabs", name: "Tabs", category: "Molecules", primitive: "@base-ui/react/Tabs", desc: "Segmented container switching between multiple functional views.", figmaToken: "color/semantic/bg/subtle" },
  { id: "toast", name: "Toast Notification", category: "Molecules", primitive: "@base-ui/react/Toast", desc: "Queue-based floating notification messages with swipe-to-dismiss.", figmaToken: "shadow/xl + radius/xl" },
  { id: "toggle", name: "Toggle", category: "Primitives", primitive: "@base-ui/react/Toggle", desc: "Two-state pressed button for binary on/off actions.", figmaToken: "primary/default + radius/lg" },
  { id: "toggle-group", name: "Toggle Group", category: "Primitives", primitive: "@base-ui/react/ToggleGroup", desc: "Grouped segmented toggle controls for single or multiple selection.", figmaToken: "color/semantic/bg/muted" },
  { id: "tooltip", name: "Tooltip", category: "Primitives", primitive: "@base-ui/react/Tooltip", desc: "Contextual label that appears on pointer hover or keyboard focus.", figmaToken: "color/semantic/bg/inverse" },
];

export default function App() {
  const [selectedComp, setSelectedComp] = useState<ComponentId>("button");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [viewport, setViewport] = useState<"100%" | "768px" | "375px">("100%");
  const [canvasBg, setCanvasBg] = useState<"grid" | "plain">("grid");
  const [viewMode, setViewMode] = useState<"focus" | "matrix">("focus");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic props configuration
  const [btnVariant, setBtnVariant] = useState<"primary" | "secondary" | "outline" | "destructive" | "ghost" | "link">("primary");
  const [btnSize, setBtnSize] = useState<"xs" | "sm" | "default" | "md" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg">("default");
  const [btnLabel, setBtnLabel] = useState("Execute Action");
  const [customCn, setCustomCn] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  // Active testing states
  const [switchState, setSwitchState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);
  const [radioValue, setRadioValue] = useState("enterprise");
  const [sliderValue, setSliderValue] = useState<number>(72);
  const [inputValue, setInputValue] = useState("architect@galaui.dev");
  const [selectValue, setSelectValue] = useState<string | null>("production");
  const [activeTab, setActiveTab] = useState("components");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Copied JSX to clipboard");
  };

  const currentMeta = COMPONENT_LIST.find((c) => c.id === selectedComp) || COMPONENT_LIST[0];

  const filteredComponents = COMPONENT_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const getGeneratedCode = (): string => {
    switch (selectedComp) {
      case "button":
        return `import { Button } from "@/components/ui/button";
import { Sparkle } from "@phosphor-icons/react";
import { cn } from "cn";

export function ActionButton() {
  return (
    <Button
      variant="${btnVariant}"
      size="${btnSize}"
      ${isDisabled ? "disabled" : ""}
      className={cn("${customCn}")}
    >
      ${showIcon ? '<Sparkle weight="bold" className="w-4 h-4" /> ' : ""}${btnLabel}
    </Button>
  );
}`;
      case "dialog":
        return `import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SecurityModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Authorize Key</Button>
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>${btnLabel || "Authorize Key Provisioning"}</DialogTitle>
          <DialogDescription>
            This action generates an encrypted credential pair for your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="py-3">
          <label className="text-xs font-medium text-foreground block mb-1.5">Environment Key Name</label>
          <input className="w-full h-9 rounded-lg border border-border bg-input px-3 text-xs" defaultValue="prod_sec_key_2026" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="primary">Confirm Provisioning</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}`;
      case "switch":
        return `import { Switch } from "@/components/ui/switch";
import { cn } from "cn";

export function SyncControl() {
  const [enabled, setEnabled] = useState(${switchState});
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
      <div>
        <p className="font-medium text-xs text-foreground">${btnLabel || "Figma Token Auto Sync"}</p>
        <p className="text-[11px] text-muted-foreground">Keep variables in lockstep with code</p>
      </div>
      <Switch
        size="${btnSize}"
        ${isDisabled ? "disabled\n        " : ""}checked={enabled}
        onCheckedChange={setEnabled}
        className={cn("${customCn}")}
      />
    </div>
  );
}`;
      case "select":
        return `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
} from "@/components/ui/select";

export function ClusterSelect() {
  return (
    <Select defaultValue="production">
      <SelectTrigger>
        <SelectValue placeholder="Select target..." />
      </SelectTrigger>
      <SelectPopup>
        <SelectItem value="staging">Staging (ap-southeast-1)</SelectItem>
        <SelectItem value="production">Production (us-east-1)</SelectItem>
        <SelectItem value="edge">Edge Global CDN</SelectItem>
      </SelectPopup>
    </Select>
  );
}`;
      case "slider":
        return `import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export function BandwidthSlider() {
  const [value, setValue] = useState(${sliderValue});
  return (
    <div className="w-full max-w-sm space-y-3 p-4 rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">${btnLabel || "Bandwidth Allocation"}</span>
        <span className="text-xs font-mono font-bold text-primary">{value} GB/s</span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        variant="${btnVariant}"
        size="${btnSize}"
        ${isDisabled ? "disabled" : ""}
        min={0}
        max={100}
        step={1}
      />
    </div>
  );
}`;
      default:
        return `import { ${selectedComp.toUpperCase()} } from "@/components/ui/${selectedComp}";`;
    }
  };

  return (
    <ToastProvider>
      <ToastViewport />
    <div className="h-screen flex flex-col font-sans bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Precision Top Navbar */}
      <header className="h-12 border-b border-border bg-card/95 backdrop-blur-md flex items-center justify-between px-4 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold text-xs shadow-xs">
            G
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs tracking-tight text-foreground">GalaUI Workbench</span>
            <span className="h-3 w-px bg-border" />
            <span className="text-[11px] font-mono text-muted-foreground">Base UI + Tailwind v4 + cn</span>
          </div>
        </div>

        {/* Center Mode Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg border border-border">
          <button
            onClick={() => setViewMode("focus")}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer",
              viewMode === "focus" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Square weight="bold" className="w-3 h-3" /> Focus Stage
          </button>
          <button
            onClick={() => setViewMode("matrix")}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer",
              viewMode === "matrix" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <SquaresFour weight="bold" className="w-3 h-3" /> Variant Matrix
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tokens Synced</span>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="h-7 w-7 rounded-md border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
            title="Toggle theme mode"
          >
            {isDark ? <Sun weight="bold" className="w-3.5 h-3.5 text-amber-400" /> : <Moon weight="bold" className="w-3.5 h-3.5 text-zinc-600" />}
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation: Directory */}
        <aside className="w-56 shrink-0 border-r border-border bg-card/60 flex flex-col overflow-hidden">
          <div className="p-2.5 border-b border-border">
            <div className="relative">
              <MagnifyingGlass weight="bold" className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filter catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 text-xs rounded-md border border-border bg-input text-foreground focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground font-mono"
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
            {filteredComponents.map((c) => {
              const active = c.id === selectedComp;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedComp(c.id)}
                  className={cn(
                    "w-full text-left px-2.5 py-1.5 rounded-md text-xs flex items-center justify-between transition-all cursor-pointer",
                    active
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Cube weight={active ? "fill" : "regular"} className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{c.name}</span>
                  </div>
                  <span
                    className={cn(
                      "text-[9px] px-1 py-0.2 rounded font-mono shrink-0",
                      active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {c.category[0]}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="p-2.5 border-t border-border bg-muted/20 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
            <span>{COMPONENT_LIST.length} Components</span>
            <span>v1.2.0</span>
          </div>
        </aside>

        {/* Center: Canvas & Code Inspection */}
        <main className="flex-1 flex flex-col bg-muted/20 overflow-hidden">
          {/* Canvas Sub-Header */}
          <div className="h-10 border-b border-border bg-card px-4 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground tracking-tight">{currentMeta.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-muted text-muted-foreground border border-border">
                {currentMeta.primitive}
              </span>
            </div>

            {/* Viewport Width Preset Buttons */}
            {viewMode === "focus" && (
              <div className="flex items-center gap-0.5 bg-muted p-0.5 rounded-lg border border-border text-xs">
                <button
                  onClick={() => setViewport("100%")}
                  className={cn(
                    "px-2 py-0.5 rounded-md font-medium text-[11px] flex items-center gap-1 transition-all cursor-pointer",
                    viewport === "100%" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Desktop weight="bold" className="w-3 h-3" /> 100%
                </button>
                <button
                  onClick={() => setViewport("768px")}
                  className={cn(
                    "px-2 py-0.5 rounded-md font-medium text-[11px] flex items-center gap-1 transition-all cursor-pointer",
                    viewport === "768px" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <DeviceTablet weight="bold" className="w-3 h-3" /> 768px
                </button>
                <button
                  onClick={() => setViewport("375px")}
                  className={cn(
                    "px-2 py-0.5 rounded-md font-medium text-[11px] flex items-center gap-1 transition-all cursor-pointer",
                    viewport === "375px" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <DeviceMobile weight="bold" className="w-3 h-3" /> 375px
                </button>
              </div>
            )}

            {/* Canvas Texture Mode */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCanvasBg("grid")}
                className={cn(
                  "p-1 rounded-md text-xs transition-colors cursor-pointer",
                  canvasBg === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                )}
                title="Blueprint grid"
              >
                <GridFour weight="bold" className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCanvasBg("plain")}
                className={cn(
                  "p-1 rounded-md text-xs transition-colors cursor-pointer",
                  canvasBg === "plain" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                )}
                title="Plain canvas"
              >
                <Square weight="bold" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas Rendering Stage */}
          <div
            className={cn(
              "flex-1 overflow-auto p-6 flex items-center justify-center transition-colors",
              canvasBg === "grid"
                ? "bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2429_1px,transparent_1px)] [background-size:20px_20px]"
                : "bg-background"
            )}
          >
            {viewMode === "focus" ? (
              <div
                style={{ maxWidth: viewport }}
                className="w-full transition-all duration-200 flex items-center justify-center min-h-[300px] p-6 rounded-xl border border-border bg-card shadow-xs"
              >
                {/* COMPONENT SPECIMEN STAGES */}
                <div className="flex items-center justify-center w-full max-w-md">
                  {selectedComp === "button" && (
                    <div className="space-y-3 text-center">
                      <Button
                        variant={btnVariant}
                        size={btnSize}
                        disabled={isDisabled}
                        className={cn(customCn)}
                        onClick={() => showToast("Button triggered")}
                      >
                        {showIcon && <Sparkle weight="bold" className={btnSize === "xs" || btnSize === "icon-xs" ? "w-3 h-3" : "w-3.5 h-3.5"} />}
                        {(btnSize === "icon" || btnSize === "icon-xs" || btnSize === "icon-sm" || btnSize === "icon-lg") ? (
                          <Plus weight="bold" className={btnSize === "icon-xs" ? "w-3 h-3" : btnSize === "icon-sm" ? "w-3.5 h-3.5" : (btnSize === "icon-lg" ? "w-4.5 h-4.5" : "w-4 h-4")} />
                        ) : (
                          btnLabel
                        )}
                      </Button>
                      <p className="text-[11px] font-mono text-muted-foreground">
                        Base Scale: xs=24 · sm=28 · default=32 · lg=36
                      </p>
                    </div>
                  )}

                  {selectedComp === "dialog" && (
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger render={<Button variant="primary" size="md" className="shadow-xs" />}>
                        <Fingerprint weight="bold" className="w-4 h-4" /> Launch Modal Dialog
                      </DialogTrigger>
                      <DialogPopup>
                        <DialogHeader>
                          <DialogTitle>{btnLabel || "Authorize Key Provisioning"}</DialogTitle>
                          <DialogDescription>
                            This modal is built on Base UI Dialog primitives with full focus trapping and escape dismissal.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-3 space-y-2">
                          <label className="text-xs font-medium text-foreground block">Key Identifier</label>
                          <Input defaultValue="pk_live_galaui_8921" />
                        </div>
                        <DialogFooter>
                          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                          <DialogClose render={<Button variant="primary" onClick={() => showToast("Key authorized")} />}>
                            Authorize Key
                          </DialogClose>
                        </DialogFooter>
                      </DialogPopup>
                    </Dialog>
                  )}

                  {selectedComp === "popover" && (
                    <Popover>
                      <PopoverTrigger render={<Button variant="outline" />}>
                        <Sliders weight="bold" className="w-4 h-4" /> Open Base UI Popover
                      </PopoverTrigger>
                      <PopoverPopup className="w-76 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-border">
                          <span className="font-semibold text-xs text-foreground">Canvas Settings</span>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Configure layout constraints and real-time color variable bindings.
                        </p>
                        <div className="pt-2 flex justify-end gap-2">
                          <Button size="sm" variant="secondary">Reset</Button>
                          <Button size="sm" variant="primary">Apply</Button>
                        </div>
                      </PopoverPopup>
                    </Popover>
                  )}

                  {selectedComp === "dropdown" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="outline" />}>
                        <span>Actions Menu</span>
                        <CaretRight weight="bold" className="w-3.5 h-3.5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuPopup className="w-52">
                        <DropdownMenuItem onClick={() => showToast("Edited item")}>
                          <Sparkle weight="bold" className="w-3.5 h-3.5 text-primary" /> Edit Component
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => showToast("Duplicated token")}>
                          <Copy weight="bold" className="w-3.5 h-3.5" /> Duplicate Token
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => showToast("Deleted item")}>
                          <Trash weight="bold" className="w-3.5 h-3.5" /> Delete Entry
                        </DropdownMenuItem>
                      </DropdownMenuPopup>
                    </DropdownMenu>
                  )}

                  {selectedComp === "switch" && (
                    <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-xs text-foreground">{btnLabel || "Continuous Sync"}</p>
                          <p className="text-[11px] text-muted-foreground">Broadcast token updates instantly</p>
                        </div>
                        <Switch
                          size={btnSize as any}
                          disabled={isDisabled}
                          checked={switchState}
                          onCheckedChange={setSwitchState}
                          className={cn(customCn)}
                        />
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
                        <span>Variable Mode:</span>
                        <span className={switchState ? "text-primary font-bold" : "text-muted-foreground"}>
                          {switchState ? "LIVE SYNCHRONIZED" : "STANDBY"}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedComp === "checkbox" && (
                    <div className="space-y-3 w-full max-w-sm p-4 rounded-xl border border-border bg-card">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <Checkbox
                          checked={checkboxState}
                          onCheckedChange={(c) => setCheckboxState(!!c)}
                        />
                        <span className="text-xs font-medium text-foreground">
                          {btnLabel || "Enforce WCAG AA contrast validation"}
                        </span>
                      </label>
                      <p className="text-[10px] font-mono text-muted-foreground">
                        Status: <span className="text-primary font-bold">{checkboxState ? "COMPLIANT" : "OFFLINE"}</span>
                      </p>
                    </div>
                  )}

                  {selectedComp === "radio" && (
                    <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-3">
                      <p className="text-xs font-semibold text-foreground">Deployment Tier</p>
                      <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                        <label className="flex items-center gap-2.5 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer text-xs transition-colors">
                          <RadioGroupItem value="starter" />
                          <span className="font-medium text-foreground">Developer Sandbox (Free)</span>
                        </label>
                        <label className="flex items-center gap-2.5 p-2 rounded-lg border border-border hover:bg-muted cursor-pointer text-xs transition-colors">
                          <RadioGroupItem value="enterprise" />
                          <span className="font-medium text-foreground">Enterprise Production ($49/mo)</span>
                        </label>
                      </RadioGroup>
                    </div>
                  )}

                  {selectedComp === "tooltip" && (
                    <Tooltip>
                      <TooltipTrigger render={<Button variant="secondary" />}>
                        <Eye weight="bold" className="w-4 h-4 mr-1.5" /> Hover for Inspection
                      </TooltipTrigger>
                      <TooltipPopup>
                        Rendered with @base-ui/react Tooltip with automatic collision boundaries
                      </TooltipPopup>
                    </Tooltip>
                  )}

                  {selectedComp === "accordion" && (
                    <div className="w-full max-w-md">
                      <Accordion defaultValue="item-1">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>What is Base UI?</AccordionTrigger>
                          <AccordionPanel>
                            Base UI provides unstyled accessible primitives created by the Material UI team, built specifically for modern styling systems like Tailwind CSS v4.
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Why is the cn package used?</AccordionTrigger>
                          <AccordionPanel>
                            The compiled <code>cn</code> package merges Tailwind utility classes cleanly, resolving conflicts without manual overrides.
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}

                  {selectedComp === "tabs" && (
                    <div className="w-full max-w-md space-y-3">
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="w-full grid grid-cols-3">
                          <TabsTab value="components">Components</TabsTab>
                          <TabsTab value="tokens">Tokens</TabsTab>
                          <TabsTab value="exports">Exports</TabsTab>
                        </TabsList>
                        <TabsPanel value="components" className="p-4 rounded-xl border border-border bg-card text-xs text-muted-foreground">
                          Production Base UI primitives calibrated for Tailwind CSS v4.
                        </TabsPanel>
                        <TabsPanel value="tokens" className="p-4 rounded-xl border border-border bg-card text-xs text-muted-foreground">
                          Figma variables 1:1 mapped to CSS custom properties.
                        </TabsPanel>
                        <TabsPanel value="exports" className="p-4 rounded-xl border border-border bg-card text-xs text-muted-foreground">
                          Clean copyable React JSX snippets with compiled cn imports.
                        </TabsPanel>
                      </Tabs>
                    </div>
                  )}

                  {selectedComp === "select" && (
                    <div className="w-full max-w-xs space-y-2">
                      <label className="text-xs font-medium text-foreground block">
                        {btnLabel || "Active Cluster"}
                      </label>
                      <Select
                        value={selectValue}
                        onValueChange={setSelectValue}
                        disabled={isDisabled}
                      >
                        <SelectTrigger size={btnSize as any} className={cn(customCn)}>
                          <SelectValue placeholder="Select cluster..." />
                        </SelectTrigger>
                        <SelectPopup>
                          <SelectItem value="staging">Staging (ap-southeast-1)</SelectItem>
                          <SelectItem value="production">Production (us-east-1)</SelectItem>
                          <SelectItem value="edge">Edge Global CDN</SelectItem>
                        </SelectPopup>
                      </Select>
                    </div>
                  )}

                  {selectedComp === "avatar" && (
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border border-border">
                          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" />
                          <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Dian Punya</p>
                        <p className="text-xs text-muted-foreground font-mono">Lead System Architect</p>
                      </div>
                    </div>
                  )}

                  {selectedComp === "slider" && (
                    <div className="w-full max-w-sm p-5 rounded-2xl border border-border bg-card shadow-xs space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold text-foreground">{btnLabel || "Bandwidth Allocation"}</p>
                          <p className="text-[11px] text-muted-foreground">Adjust live throughput quota</p>
                        </div>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                          {sliderValue} GB/s
                        </span>
                      </div>
                      <Slider
                        value={sliderValue}
                        onValueChange={(val: any) => setSliderValue(typeof val === "number" ? val : (Array.isArray(val) ? val[0] : 72))}
                        min={0}
                        max={100}
                        step={1}
                        variant={btnVariant as any}
                        size={btnSize as any}
                        disabled={isDisabled}
                        className={cn(customCn)}
                      />
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/60">
                        <span>0 GB/s (Min)</span>
                        <span>50 GB/s</span>
                        <span>100 GB/s (Max)</span>
                      </div>
                    </div>
                  )}

                  {selectedComp === "input" && (
                    <div className="w-full max-w-sm space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground block">
                          {btnLabel || "System Identifier"}
                        </label>
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          size={btnSize as any}
                          disabled={isDisabled}
                          placeholder="Enter email or ID..."
                          className={cn(customCn)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground block">Deployment Notes</label>
                        <Textarea placeholder="Add comments here..." className="h-20" disabled={isDisabled} />
                      </div>
                    </div>
                  )}

                  {selectedComp === "badge" && (
                    <div className="flex flex-wrap gap-2 items-center justify-center">
                      <Badge variant={btnVariant as any} className={cn(customCn)}>
                        {btnLabel || "Production Live"}
                      </Badge>
                      <Badge variant="success">99.9% Uptime</Badge>
                      <Badge variant="warning">Syncing</Badge>
                      <Badge variant="destructive">Deprecated</Badge>
                    </div>
                  )}

                  {selectedComp === "card" && (
                    <Card className="w-full max-w-sm">
                      <CardHeader>
                        <CardTitle>{btnLabel || "Enterprise Cluster"}</CardTitle>
                        <CardDescription>Multi-region deployment with zero downtime failover.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 text-xs text-muted-foreground">
                        <p className="flex items-center gap-2 text-foreground font-medium">
                          <CheckCircle weight="bold" className="w-4 h-4 text-emerald-500" /> 1:1 Figma Token Synchronization
                        </p>
                        <p className="flex items-center gap-2 text-foreground font-medium">
                          <CheckCircle weight="bold" className="w-4 h-4 text-emerald-500" /> Tailwind v4 CSS-First Architecture
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Audit Log</Button>
                        <Button variant="primary" size="sm">Configure</Button>
                      </CardFooter>
                    </Card>
                  )}

                  <ShowcaseNewComponents
                    selectedComp={selectedComp}
                    viewMode="focus"
                    showToast={showToast}
                    btnVariant={btnVariant}
                    btnSize={btnSize}
                    btnLabel={btnLabel}
                    isDisabled={isDisabled}
                    customCn={customCn}
                  />
                </div>
              </div>
            ) : (
              /* VARIANT MATRIX VIEW */
              <div className="w-full max-w-4xl p-6 rounded-xl border border-border bg-card shadow-xs space-y-6 overflow-y-auto max-h-[500px] custom-scrollbar">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Complete Variant Matrix</h3>
                  <p className="text-[11px] text-muted-foreground">Comparing all design token styles side-by-side</p>
                </div>

                {selectedComp === "button" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-muted-foreground">Variants (Default Size)</span>
                      <div className="flex flex-wrap gap-3 items-center">
                        <Button variant="primary"><Sparkle weight="bold" className="w-4 h-4" /> Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="destructive"><Trash weight="bold" className="w-4 h-4" /> Destructive</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-muted-foreground">Base Component Sizing Scale (Primary Variant)</span>
                      <div className="flex flex-wrap gap-3 items-center">
                        <Button size="xs">Extra Small (xs / 24px)</Button>
                        <Button size="sm">Small (sm / 28px)</Button>
                        <Button size="default">Default (default / 32px)</Button>
                        <Button size="lg">Large (lg / 36px)</Button>
                        <Button size="icon-xs" title="icon-xs (24px)"><Plus weight="bold" className="w-3 h-3" /></Button>
                        <Button size="icon-sm" title="icon-sm (28px)"><Plus weight="bold" className="w-3.5 h-3.5" /></Button>
                        <Button size="icon" title="icon-default (32px)"><Plus weight="bold" className="w-4 h-4" /></Button>
                        <Button size="icon-lg" title="icon-lg (36px)"><Plus weight="bold" className="w-4.5 h-4.5" /></Button>
                        <Button disabled size="default">Disabled State</Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedComp === "badge" && (
                  <div className="flex flex-wrap gap-2.5 items-center">
                    <Badge variant="default">Default Primary</Badge>
                    <Badge variant="secondary">Secondary Neutral</Badge>
                    <Badge variant="outline">Outline Border</Badge>
                    <Badge variant="success">Success State</Badge>
                    <Badge variant="warning">Warning State</Badge>
                    <Badge variant="destructive">Destructive State</Badge>
                    <Badge variant="info">Information</Badge>
                  </div>
                )}

                {selectedComp === "slider" && (
                  <div className="space-y-6">
                    {/* Sizes */}
                    <div className="space-y-3">
                      <span className="text-xs font-semibold text-muted-foreground">Sizes (Primary Variant)</span>
                      <div className="space-y-4 max-w-md">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-medium text-foreground">Small (sm / 4px track, 14px thumb)</span>
                            <span className="font-mono text-muted-foreground">35%</span>
                          </div>
                          <Slider defaultValue={35} size="sm" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-medium text-foreground">Medium (md / 6px track, 18px thumb — Default)</span>
                            <span className="font-mono text-muted-foreground">60%</span>
                          </div>
                          <Slider defaultValue={60} size="md" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-medium text-foreground">Large (lg / 10px track, 24px thumb)</span>
                            <span className="font-mono text-muted-foreground">80%</span>
                          </div>
                          <Slider defaultValue={80} size="lg" />
                        </div>
                      </div>
                    </div>

                    {/* Semantic Color Variants */}
                    <div className="space-y-3 pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-muted-foreground">Semantic Color Variants</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div className="p-3 rounded-xl border border-border bg-card space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-semibold text-foreground">Primary Brand</span>
                            <span className="font-mono text-primary font-bold">75%</span>
                          </div>
                          <Slider defaultValue={75} variant="primary" />
                        </div>
                        <div className="p-3 rounded-xl border border-border bg-card space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-semibold text-foreground">Success State</span>
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">90%</span>
                          </div>
                          <Slider defaultValue={90} variant="success" />
                        </div>
                        <div className="p-3 rounded-xl border border-border bg-card space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-semibold text-foreground">Secondary Neutral</span>
                            <span className="font-mono text-muted-foreground font-bold">45%</span>
                          </div>
                          <Slider defaultValue={45} variant="secondary" />
                        </div>
                        <div className="p-3 rounded-xl border border-border bg-card space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-semibold text-foreground">Destructive / Critical</span>
                            <span className="font-mono text-destructive font-bold">85%</span>
                          </div>
                          <Slider defaultValue={85} variant="destructive" />
                        </div>
                      </div>
                    </div>

                    {/* Range & States */}
                    <div className="space-y-3 pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-muted-foreground">Special Modes & States</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div className="p-3 rounded-xl border border-border bg-card space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-semibold text-foreground">Dual-Thumb Range Slider</span>
                            <span className="font-mono text-primary font-bold">25 - 75</span>
                          </div>
                          <Slider defaultValue={[25, 75]} />
                        </div>
                        <div className="p-3 rounded-xl border border-border bg-card space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-semibold text-foreground">Disabled State</span>
                            <span className="font-mono text-muted-foreground">Locked</span>
                          </div>
                          <Slider defaultValue={50} disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedComp === "select" && (
                  <div className="space-y-6">
                    {/* Sizes */}
                    <div className="space-y-3">
                      <span className="text-xs font-semibold text-muted-foreground">Sizes</span>
                      <div className="space-y-3 max-w-sm">
                        <div className="space-y-1">
                          <span className="text-[11px] font-medium text-foreground">Extra Small (xs / 24px)</span>
                          <Select defaultValue="staging">
                            <SelectTrigger size="xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectPopup>
                              <SelectItem value="staging">Staging (ap-southeast-1)</SelectItem>
                              <SelectItem value="production">Production (us-east-1)</SelectItem>
                              <SelectItem value="edge">Edge Global CDN</SelectItem>
                            </SelectPopup>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] font-medium text-foreground">Small (sm / 28px)</span>
                          <Select defaultValue="staging">
                            <SelectTrigger size="sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectPopup>
                              <SelectItem value="staging">Staging (ap-southeast-1)</SelectItem>
                              <SelectItem value="production">Production (us-east-1)</SelectItem>
                              <SelectItem value="edge">Edge Global CDN</SelectItem>
                            </SelectPopup>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] font-medium text-foreground">Default (default / 32px)</span>
                          <Select defaultValue="production">
                            <SelectTrigger size="default">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectPopup>
                              <SelectItem value="staging">Staging (ap-southeast-1)</SelectItem>
                              <SelectItem value="production">Production (us-east-1)</SelectItem>
                              <SelectItem value="edge">Edge Global CDN</SelectItem>
                            </SelectPopup>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] font-medium text-foreground">Large (lg / 36px)</span>
                          <Select defaultValue="edge">
                            <SelectTrigger size="lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectPopup>
                              <SelectItem value="staging">Staging (ap-southeast-1)</SelectItem>
                              <SelectItem value="production">Production (us-east-1)</SelectItem>
                              <SelectItem value="edge">Edge Global CDN</SelectItem>
                            </SelectPopup>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Grouped & Disabled */}
                    <div className="space-y-3 pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-muted-foreground">Grouped Options & States</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div className="p-3 rounded-xl border border-border bg-card space-y-2">
                          <span className="text-xs font-semibold text-foreground">Grouped by Region</span>
                          <Select defaultValue="tokyo">
                            <SelectTrigger size="sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectPopup>
                              <SelectGroup>
                                <SelectGroupLabel>Asia Pacific</SelectGroupLabel>
                                <SelectItem value="tokyo">Tokyo (ap-northeast-1)</SelectItem>
                                <SelectItem value="singapore">Singapore (ap-southeast-1)</SelectItem>
                              </SelectGroup>
                              <SelectSeparator />
                              <SelectGroup>
                                <SelectGroupLabel>Americas</SelectGroupLabel>
                                <SelectItem value="virginia">N. Virginia (us-east-1)</SelectItem>
                                <SelectItem value="oregon">Oregon (us-west-2)</SelectItem>
                              </SelectGroup>
                            </SelectPopup>
                          </Select>
                        </div>
                        <div className="p-3 rounded-xl border border-border bg-card space-y-2">
                          <span className="text-xs font-semibold text-foreground">Disabled State</span>
                          <Select defaultValue="staging" disabled>
                            <SelectTrigger size="sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectPopup>
                              <SelectItem value="staging">Staging (ap-southeast-1)</SelectItem>
                            </SelectPopup>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedComp === "input" && (
                  <div className="space-y-4 max-w-sm">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground">Input Sizing Scale</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-medium text-foreground">Extra Small (xs / 24px)</span>
                      <Input size="xs" defaultValue="xs.cluster.internal" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-medium text-foreground">Small (sm / 28px)</span>
                      <Input size="sm" defaultValue="sm.cluster.internal" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-medium text-foreground">Default (default / 32px)</span>
                      <Input size="default" defaultValue="default.cluster.internal" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-medium text-foreground">Large (lg / 36px)</span>
                      <Input size="lg" defaultValue="lg.cluster.internal" />
                    </div>
                  </div>
                )}

                {selectedComp === "switch" && (
                  <div className="space-y-6">
                    {/* Sizes */}
                    <div className="space-y-3">
                      <span className="text-xs font-semibold text-muted-foreground">Sizes Scale</span>
                      <div className="space-y-4 max-w-md">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs font-medium text-foreground">Extra Small (xs)</p>
                            <p className="text-[10px] text-muted-foreground">16px track / 12px thumb</p>
                          </div>
                          <Switch size="xs" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs font-medium text-foreground">Small (sm)</p>
                            <p className="text-[10px] text-muted-foreground">20px track / 16px thumb</p>
                          </div>
                          <Switch size="sm" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs font-medium text-foreground">Default / Medium (default / md)</p>
                            <p className="text-[10px] text-muted-foreground">24px track / 20px thumb</p>
                          </div>
                          <Switch size="default" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs font-medium text-foreground">Large (lg)</p>
                            <p className="text-[10px] text-muted-foreground">28px track / 24px thumb</p>
                          </div>
                          <Switch size="lg" defaultChecked />
                        </div>
                      </div>
                    </div>

                    {/* States */}
                    <div className="space-y-3 pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-muted-foreground">States & Interactions</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <span className="text-xs font-semibold text-foreground">Checked (Active)</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <span className="text-xs font-semibold text-foreground">Unchecked (Inactive)</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <span className="text-xs font-semibold text-foreground">Disabled (Checked)</span>
                          <Switch defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <span className="text-xs font-semibold text-foreground">Disabled (Unchecked)</span>
                          <Switch disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedComp !== "button" && selectedComp !== "badge" && selectedComp !== "slider" && selectedComp !== "select" && selectedComp !== "input" && selectedComp !== "switch" && (
                  <ShowcaseNewComponents
                    selectedComp={selectedComp}
                    viewMode="matrix"
                    showToast={showToast}
                    btnVariant={btnVariant}
                    btnSize={btnSize}
                    btnLabel={btnLabel}
                    isDisabled={isDisabled}
                    customCn={customCn}
                  />
                )}
              </div>
            )}
          </div>

          {/* Bottom Code Drawer */}
          <div className="h-40 border-t border-border bg-zinc-950 flex flex-col shrink-0">
            <div className="h-8 border-b border-zinc-800 px-3 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Code weight="bold" className="w-3.5 h-3.5 text-primary" />
                <span>Generated React JSX</span>
              </div>
              <button
                onClick={() => copyToClipboard(getGeneratedCode())}
                className="flex items-center gap-1 text-xs text-primary hover:text-white transition-colors cursor-pointer font-medium"
              >
                <Copy weight="bold" className="w-3 h-3" />
                <span>Copy JSX</span>
              </button>
            </div>
            <pre className="flex-1 p-3 overflow-auto custom-scrollbar font-mono text-xs text-emerald-400 leading-relaxed">
              {getGeneratedCode()}
            </pre>
          </div>
        </main>

        {/* Right Sidebar: Properties & Token Mapping */}
        <aside className="w-76 shrink-0 border-l border-border bg-card flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-3.5 border-b border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Props Configuration
            </h3>
          </div>

          <div className="p-3.5 space-y-4 text-xs">
            {/* Variant / Size for Button, Badge, Slider, Select, Input & Switch */}
            {(selectedComp === "button" || selectedComp === "badge" || selectedComp === "slider" || selectedComp === "select" || selectedComp === "input" || selectedComp === "switch") && (
              <>
                {selectedComp !== "select" && selectedComp !== "input" && selectedComp !== "switch" && (
                <div className="space-y-1">
                  <label className="text-muted-foreground font-medium block text-[11px]">Variant</label>
                  <select
                    value={btnVariant}
                    onChange={(e: any) => setBtnVariant(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-input text-foreground text-xs"
                  >
                    <option value="primary">Primary (Electric Cobalt)</option>
                    <option value="secondary">Secondary (Neutral)</option>
                    <option value="outline">Outline</option>
                    <option value="destructive">Destructive (Red)</option>
                    <option value="ghost">Ghost</option>
                    <option value="link">Link</option>
                  </select>
                </div>
                )}

                <div className="space-y-1">
                  <label className="text-muted-foreground font-medium block text-[11px]">Size</label>
                  <select
                    value={btnSize}
                    onChange={(e: any) => setBtnSize(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-input text-foreground text-xs"
                  >
                    <option value="xs">Extra Small (xs / 24px)</option>
                    <option value="sm">Small (sm / 28px)</option>
                    <option value="default">Default (default / 32px)</option>
                    <option value="lg">Large (lg / 36px)</option>
                    {selectedComp === "button" && (
                      <>
                        <option value="icon-xs">Icon Extra Small (xs / 24px)</option>
                        <option value="icon-sm">Icon Small (sm / 28px)</option>
                        <option value="icon">Icon Default (default / 32px)</option>
                        <option value="icon-lg">Icon Large (lg / 36px)</option>
                      </>
                    )}
                  </select>
                </div>
              </>
            )}

            {/* Label */}
            <div className="space-y-1">
              <label className="text-muted-foreground font-medium block text-[11px]">Component Label</label>
              <Input
                value={btnLabel}
                onChange={(e) => setBtnLabel(e.target.value)}
                placeholder="Custom label text..."
                className="h-8 text-xs font-sans"
              />
            </div>

            {/* Custom cn() class override */}
            <div className="space-y-1">
              <label className="text-muted-foreground font-medium block text-[11px]">Custom cn() Override</label>
              <Input
                value={customCn}
                onChange={(e) => setCustomCn(e.target.value)}
                placeholder="e.g. shadow-md ring-2 ring-primary"
                className="h-8 font-mono text-[11px]"
              />
              <span className="text-[10px] text-muted-foreground block font-mono">
                Merged via <code className="text-primary">cn(...)</code> package.
              </span>
            </div>

            {/* Flags */}
            <div className="space-y-2 pt-2 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <Checkbox
                  checked={isDisabled}
                  onCheckedChange={(c) => setIsDisabled(!!c)}
                />
                <span className="text-foreground text-xs">Disabled state</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <Checkbox
                  checked={showIcon}
                  onCheckedChange={(c) => setShowIcon(!!c)}
                />
                <span className="text-foreground text-xs">Display Icon</span>
              </label>
            </div>
          </div>

          {/* Token Architecture Summary */}
          <div className="mt-auto p-3.5 border-t border-border bg-muted/20 space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Figma Token Mapping
            </span>
            <div className="font-mono text-[11px] space-y-1 text-muted-foreground">
              <p><span className="text-foreground font-medium">Token:</span> {currentMeta.figmaToken}</p>
              <p><span className="text-foreground font-medium">Primitive:</span> {currentMeta.primitive}</p>
              <p><span className="text-foreground font-medium">Theme:</span> Tailwind v4 @theme</p>
              <p><span className="text-foreground font-medium">Merger:</span> cn (compiled drop-in)</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-3.5 py-2 rounded-lg bg-foreground text-background text-xs font-semibold shadow-2xl flex items-center gap-2 animate-toast">
          <Check weight="bold" className="w-3.5 h-3.5 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
    </ToastProvider>
  );
}
