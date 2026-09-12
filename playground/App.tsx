import { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  Copy,
  Moon,
  Sun,
  Box,
  Sliders,
  Trash2,
  Plus,
  ArrowRight,
  Monitor,
  Tablet,
  Smartphone,
  LayoutGrid,
  Square,
  CheckCircle2,
  Eye,
  Search,
  ChevronRight,
  Fingerprint,
  Palette,
  ArrowUpRight,
  SlidersHorizontal,
  X,
  CheckCheck,
  Code2,
  FileCode,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
  Avatar,
  AvatarImage,
  AvatarFallback,
  Slider,
  Input,
  Label,
  Textarea,
  Toaster,
  toast,
  cn,
} from "@/index";
import { Logo } from "@docs/components/Logo";
import { apiReferenceData } from "@docs/data/api-reference";
import { ShowcaseNewComponents } from "./ShowcaseNewComponents";

function parseUnionOptions(typeStr?: string | null): string[] {
  if (!typeStr) return [];
  const matches = typeStr.match(/"([^"]+)"/g);
  if (matches && matches.length > 0) {
    const list = matches.map((m) => m.replace(/"/g, ""));
    return Array.from(new Set(list));
  }
  if (typeStr.includes("boolean")) {
    return ["true", "false"];
  }
  return [];
}

export type ComponentCategory =
  | "All"
  | "Primitives"
  | "Form"
  | "Navigation"
  | "Overlays"
  | "Feedback"
  | "Data";

export interface ComponentMeta {
  id: string;
  name: string;
  category: "Primitives" | "Form" | "Navigation" | "Overlays" | "Feedback" | "Data";
  primitive: string;
  desc: string;
  cssToken: string;
  docsPath: string;
}

export const COMPONENT_CATALOG: ComponentMeta[] = [
  // Primitives (7)
  { id: "aspect-ratio", name: "Aspect Ratio", category: "Primitives", primitive: "CSS AspectRatio", desc: "Maintains consistent width-to-height ratio for responsive media.", cssToken: "--radius-xl", docsPath: "/components/aspect-ratio" },
  { id: "avatar", name: "Avatar", category: "Primitives", primitive: "@base-ui/react/Avatar", desc: "Profile image presentation with fallback initials and presence indicator.", cssToken: "--radius-full + --border", docsPath: "/components/avatar" },
  { id: "badge", name: "Badge", category: "Primitives", primitive: "cva / cn", desc: "Status tag indicators with semantic border tints and count badges.", cssToken: "--radius-md + status ramps", docsPath: "/components/badge" },
  { id: "button", name: "Button", category: "Primitives", primitive: "@base-ui/react/Button", desc: "Interactive tactile button with spring physics and canonical size matrix.", cssToken: "--primary + --size-default", docsPath: "/components/button" },
  { id: "kbd", name: "Kbd", category: "Primitives", primitive: "Semantic Kbd", desc: "Keyboard shortcut key indicator for commands and accessibility hints.", cssToken: "--font-mono + --radius-sm", docsPath: "/components/kbd" },
  { id: "separator", name: "Separator", category: "Primitives", primitive: "@base-ui/react/Separator", desc: "Visual horizontal or vertical divider grouping interface sections.", cssToken: "--border", docsPath: "/components/separator" },
  { id: "skeleton", name: "Skeleton", category: "Primitives", primitive: "Tailwind Pulse", desc: "Animated placeholder container indicating loading content structures.", cssToken: "--muted", docsPath: "/components/skeleton" },

  // Form Controls (17)
  { id: "checkbox", name: "Checkbox", category: "Form", primitive: "@base-ui/react/Checkbox", desc: "Tri-state custom checkbox with high-contrast check indicator.", cssToken: "--radius-sm + --border", docsPath: "/components/checkbox" },
  { id: "checkbox-group", name: "Checkbox Group", category: "Form", primitive: "@base-ui/react/CheckboxGroup", desc: "Accessible grouping for multiple related checkbox selections.", cssToken: "--radius-sm + space/2", docsPath: "/components/checkbox" },
  { id: "combobox", name: "Combobox", category: "Form", primitive: "@base-ui/react/Combobox", desc: "Autocomplete search input with popup list of filtered suggestions.", cssToken: "--input + --popover", docsPath: "/components/combobox" },
  { id: "field", name: "Field", category: "Form", primitive: "@base-ui/react/Field", desc: "Accessible field wrapper providing label, description, and error messaging.", cssToken: "--destructive + --muted-foreground", docsPath: "/components/field" },
  { id: "fieldset", name: "Fieldset", category: "Form", primitive: "Base UI Fieldset", desc: "Grouped form sections with semantic legend and description typography.", cssToken: "--border + --radius-xl", docsPath: "/components/fieldset" },
  { id: "form", name: "Form", category: "Form", primitive: "@base-ui/react/Form", desc: "Native HTML form wrapper supporting validation schemas and submit handlers.", cssToken: "--card + --border", docsPath: "/components/form" },
  { id: "input", name: "Input", category: "Form", primitive: "HTML Input / cva", desc: "Typography-calibrated input fields with canonical 4-step sizing scale.", cssToken: "--input + --size-default", docsPath: "/components/input" },
  { id: "input-otp", name: "Input OTP", category: "Form", primitive: "@base-ui/react/OTPField", desc: "Segmented verification code field with animated character slots.", cssToken: "--input + --radius-lg", docsPath: "/components/input-otp" },
  { id: "label", name: "Label", category: "Form", primitive: "Base UI Label", desc: "Accessible form label primitive connected directly to associated inputs.", cssToken: "--foreground + --font-sans", docsPath: "/components/label" },
  { id: "number-field", name: "Number Field", category: "Form", primitive: "@base-ui/react/NumberField", desc: "Numeric input with increment/decrement stepper buttons and scrub area.", cssToken: "--input + --border", docsPath: "/components/number-field" },
  { id: "radio-group", name: "Radio Group", category: "Form", primitive: "@base-ui/react/RadioGroup", desc: "Mutually exclusive choice selector with keyboard arrow traversal.", cssToken: "--radius-full + --primary", docsPath: "/components/radio-group" },
  { id: "select", name: "Select", category: "Form", primitive: "@base-ui/react/Select", desc: "Custom popup select menu with grouped choices and typeahead support.", cssToken: "--popover + --border", docsPath: "/components/select" },
  { id: "slider", name: "Slider", category: "Form", primitive: "@base-ui/react/Slider", desc: "Continuous and dual-thumb range slider with smooth drag interaction.", cssToken: "--primary + --radius-full", docsPath: "/components/slider" },
  { id: "switch", name: "Switch", category: "Form", primitive: "@base-ui/react/Switch", desc: "Toggle switch for binary settings with spring-actuated thumb animation.", cssToken: "--primary + --radius-full", docsPath: "/components/switch" },
  { id: "textarea", name: "Textarea", category: "Form", primitive: "HTML Textarea / cva", desc: "Multi-line text input with auto-resize and consistent border states.", cssToken: "--input + --radius-lg", docsPath: "/components/textarea" },
  { id: "toggle", name: "Toggle", category: "Form", primitive: "@base-ui/react/Toggle", desc: "Two-state pressed button for binary on/off toolbar actions.", cssToken: "--muted + --primary", docsPath: "/components/toggle" },
  { id: "toggle-group", name: "Toggle Group", category: "Form", primitive: "@base-ui/react/ToggleGroup", desc: "Segmented multi-item toggle row for single or multiple selection.", cssToken: "--muted + --radius-lg", docsPath: "/components/toggle" },

  // Navigation (6)
  { id: "breadcrumb", name: "Breadcrumb", category: "Navigation", primitive: "Semantic Nav", desc: "Hierarchical trail navigation showing current position in deep site trees.", cssToken: "--muted-foreground + --font-sans", docsPath: "/components/breadcrumb" },
  { id: "menubar", name: "Menubar", category: "Navigation", primitive: "@base-ui/react/Menubar", desc: "Desktop application menu bar with top-level nested dropdown commands.", cssToken: "--radius-xl + --popover", docsPath: "/components/menubar" },
  { id: "navigation-menu", name: "Navigation Menu", category: "Navigation", primitive: "@base-ui/react/NavigationMenu", desc: "Header navigation with animated indicator and rich mega-menu popups.", cssToken: "--card + --shadow-2xl", docsPath: "/components/navigation-menu" },
  { id: "pagination", name: "Pagination", category: "Navigation", primitive: "Semantic Nav", desc: "Multi-page navigation with next, previous, and page number links.", cssToken: "--radius-md + --border", docsPath: "/components/pagination" },
  { id: "stepper", name: "Stepper", category: "Navigation", primitive: "Compound Stepper", desc: "Step-by-step wizard progression indicator showing completed, active, and upcoming stages.", cssToken: "--primary + --border", docsPath: "/components/stepper" },
  { id: "tabs", name: "Tabs", category: "Navigation", primitive: "@base-ui/react/Tabs", desc: "Segmented container switching between multiple functional views.", cssToken: "--muted + --radius-lg", docsPath: "/components/tabs" },

  // Overlays (8)
  { id: "alert-dialog", name: "Alert Dialog", category: "Overlays", primitive: "@base-ui/react/AlertDialog", desc: "Modal confirmation prompt for destructive or irreversible actions.", cssToken: "--destructive + --radius-2xl", docsPath: "/components/alert-dialog" },
  { id: "context-menu", name: "Context Menu", category: "Overlays", primitive: "@base-ui/react/ContextMenu", desc: "Right-click popup menu with submenus, icons, and keyboard shortcut badges.", cssToken: "--popover + --radius-xl", docsPath: "/components/context-menu" },
  { id: "dialog", name: "Dialog (Modal)", category: "Overlays", primitive: "@base-ui/react/Dialog", desc: "Modal overlay with focus trapping, backdrop blur, and escape dismissal.", cssToken: "--card + --radius-2xl", docsPath: "/components/dialog" },
  { id: "drawer", name: "Drawer (Sheet)", category: "Overlays", primitive: "@base-ui/react/Drawer", desc: "Slide-over panel from viewport edges with gesture swipe dismissal.", cssToken: "--background + --border", docsPath: "/components/drawer" },
  { id: "dropdown-menu", name: "Dropdown Menu", category: "Overlays", primitive: "@base-ui/react/Menu", desc: "Action menu trigger with keyboard traversal and separator groups.", cssToken: "--popover + --radius-xl", docsPath: "/components/dropdown-menu" },
  { id: "popover", name: "Popover", category: "Overlays", primitive: "@base-ui/react/Popover", desc: "Floating contextual card with collision detection and smooth transitions.", cssToken: "--popover + --radius-xl", docsPath: "/components/popover" },
  { id: "preview-card", name: "Preview Card", category: "Overlays", primitive: "@base-ui/react/PreviewCard", desc: "Rich preview popup on pointer hover for links or user profiles.", cssToken: "--popover + --radius-2xl", docsPath: "/components/preview-card" },
  { id: "tooltip", name: "Tooltip", category: "Overlays", primitive: "@base-ui/react/Tooltip", desc: "Contextual micro-label appearing on pointer hover or keyboard focus.", cssToken: "--radius-md + --popover", docsPath: "/components/tooltip" },

  // Feedback & Status (6)
  { id: "alert", name: "Alert", category: "Feedback", primitive: "cva / cn", desc: "Status banner callouts with semantic color indicators and icons.", cssToken: "--border + status ramps", docsPath: "/components/alert" },
  { id: "empty-state", name: "Empty State", category: "Feedback", primitive: "Compound Layout", desc: "Visual placeholder displayed when data or records are empty.", cssToken: "--border + --radius-2xl", docsPath: "/components/empty-state" },
  { id: "meter", name: "Meter", category: "Feedback", primitive: "@base-ui/react/Meter", desc: "Visual display for scalar measurements, quotas, and utilization bars.", cssToken: "--primary + --radius-full", docsPath: "/components/meter" },
  { id: "progress", name: "Progress", category: "Feedback", primitive: "@base-ui/react/Progress", desc: "Determinate and indeterminate loading indicators.", cssToken: "--primary + --radius-full", docsPath: "/components/progress" },
  { id: "timeline", name: "Timeline", category: "Feedback", primitive: "Compound Timeline", desc: "Chronological sequence of milestone events with status dots and connectors.", cssToken: "--primary + --border", docsPath: "/components/timeline" },
  { id: "toast", name: "Toast", category: "Feedback", primitive: "@base-ui/react/Toast", desc: "Queue-based notification toasts with swipe dismiss and promise helpers.", cssToken: "--popover + --radius-xl", docsPath: "/components/toast" },

  // Data & Layout (9)
  { id: "accordion", name: "Accordion", category: "Data", primitive: "@base-ui/react/Accordion", desc: "Vertically stacked interactive disclosure headings and content panels.", cssToken: "--border + --radius-xl", docsPath: "/components/accordion" },
  { id: "calendar", name: "Calendar", category: "Data", primitive: "Base UI Calendar", desc: "Interactive date picker calendar supporting single date and range selection.", cssToken: "--card + --primary", docsPath: "/components/calendar" },
  { id: "card", name: "Card", category: "Data", primitive: "Compound Layout", desc: "Elevated structural surface with header, content, and footer slots.", cssToken: "--card + --border", docsPath: "/components/card" },
  { id: "collapsible", name: "Collapsible", category: "Data", primitive: "@base-ui/react/Collapsible", desc: "Expandable disclosure container controlled by an interactive trigger.", cssToken: "--border + --radius-xl", docsPath: "/components/collapsible" },
  { id: "command", name: "Command (Palette)", category: "Data", primitive: "Command Primitive", desc: "Fast keyboard-driven command palette with search filter and item groups.", cssToken: "--popover + --border", docsPath: "/components/command" },
  { id: "date-picker", name: "Date Picker", category: "Data", primitive: "Compound DatePicker", desc: "Date and range selector with input field and calendar popup.", cssToken: "--input + --popover", docsPath: "/components/date-picker" },
  { id: "scroll-area", name: "Scroll Area", category: "Data", primitive: "@base-ui/react/ScrollArea", desc: "Custom styled cross-browser scrollbar without layout shift.", cssToken: "--muted + --radius-full", docsPath: "/components/scroll-area" },
  { id: "table", name: "Table", category: "Data", primitive: "Semantic Table", desc: "Structured data table with responsive styled rows and cells.", cssToken: "--border + --card", docsPath: "/components/table" },
  { id: "toolbar", name: "Toolbar", category: "Data", primitive: "@base-ui/react/Toolbar", desc: "Container grouping interactive controls, buttons, inputs, and toggles.", cssToken: "--card + --border", docsPath: "/components/toolbar" },
];

export default function Playground() {
  // Navigation & View Mode State
  const [activeTab, setActiveTab] = useState<"workbench" | "tokens">("workbench");
  const [selectedComp, setSelectedComp] = useState<string>("button");
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"focus" | "matrix">("focus");
  const [viewport, setViewport] = useState<"100%" | "768px" | "375px">("100%");
  const [canvasBg, setCanvasBg] = useState<"dots" | "grid" | "plain">("dots");

  // Dynamic Props Configuration
  const [btnVariant, setBtnVariant] = useState<string>("primary");
  const [btnSize, setBtnSize] = useState<string>("default");
  const [btnLabel, setBtnLabel] = useState<string>("Execute Action");
  const [customCn, setCustomCn] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showIcon, setShowIcon] = useState<boolean>(true);

  // Sidebar Tabs & API Reference State
  const [sidebarMode, setSidebarMode] = useState<"controls" | "api">("controls");
  const [propSearchQuery, setPropSearchQuery] = useState("");
  const [selectedSubcomp, setSelectedSubcomp] = useState<string>("");
  const [selectedOrientation, setSelectedOrientation] = useState<string>("horizontal");
  const [customPropValues, setCustomPropValues] = useState<Record<string, boolean>>({});

  // Live Specimen States
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [radioValue, setRadioValue] = useState("enterprise");
  const [sliderValue, setSliderValue] = useState<number>(72);
  const [inputValue, setInputValue] = useState("architect@galaui.dev");
  const [selectValue, setSelectValue] = useState<string | null>("production");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState("components");
  const [copiedCode, setCopiedCode] = useState(false);

  // Theme Sync
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("galaui-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return savedTheme === "dark" || (!savedTheme && prefersDark);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("galaui-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("galaui-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const currentMeta = useMemo(() => {
    return COMPONENT_CATALOG.find((c) => c.id === selectedComp) || COMPONENT_CATALOG[3];
  }, [selectedComp]);

  // Component Files & API Metadata Resolution
  const compFileNames = useMemo(() => {
    return apiReferenceData.byFile[selectedComp] || [];
  }, [selectedComp]);

  const primaryCompName = compFileNames[0] || currentMeta.name;

  useEffect(() => {
    setSelectedSubcomp(compFileNames[0] || currentMeta.name);
    setPropSearchQuery("");
    setCustomPropValues({});
  }, [selectedComp, compFileNames, currentMeta.name]);

  const primaryDoc = useMemo(() => {
    return apiReferenceData.components[primaryCompName] || null;
  }, [primaryCompName]);

  const activeSubcompDoc = useMemo(() => {
    const target = selectedSubcomp || primaryCompName;
    return apiReferenceData.components[target] || primaryDoc;
  }, [selectedSubcomp, primaryCompName, primaryDoc]);

  // Available variants extracted dynamically from real component props
  const variantProp = useMemo(() => {
    return primaryDoc?.props.find((p) => p.name === "variant");
  }, [primaryDoc]);

  const availableVariants = useMemo(() => {
    return parseUnionOptions(variantProp?.type);
  }, [variantProp]);

  // Auto-align variant to valid component options
  useEffect(() => {
    if (availableVariants.length > 0 && !availableVariants.includes(btnVariant)) {
      const defaultVal = variantProp?.defaultValue?.replace(/"/g, "");
      setBtnVariant(defaultVal && availableVariants.includes(defaultVal) ? defaultVal : availableVariants[0]);
    }
  }, [availableVariants, btnVariant, variantProp]);

  // Available sizes extracted dynamically from real component props
  const sizeProp = useMemo(() => {
    return primaryDoc?.props.find((p) => p.name === "size");
  }, [primaryDoc]);

  const availableSizes = useMemo(() => {
    return parseUnionOptions(sizeProp?.type);
  }, [sizeProp]);

  // Auto-align size to valid component options
  useEffect(() => {
    if (availableSizes.length > 0 && !availableSizes.includes(btnSize)) {
      const defaultVal = sizeProp?.defaultValue?.replace(/"/g, "");
      setBtnSize(defaultVal && availableSizes.includes(defaultVal) ? defaultVal : availableSizes[0]);
    }
  }, [availableSizes, btnSize, sizeProp]);

  // Orientation prop
  const orientProp = useMemo(() => {
    return primaryDoc?.props.find((p) => p.name === "orientation");
  }, [primaryDoc]);

  const availableOrientations = useMemo(() => {
    if (!orientProp) return [];
    const parsed = parseUnionOptions(orientProp.type);
    return parsed.length > 0 ? parsed : ["horizontal", "vertical"];
  }, [orientProp]);

  // Other boolean props (like multiple, clickable, checked, etc.)
  const booleanProps = useMemo(() => {
    return (
      primaryDoc?.props.filter(
        (p) =>
          p.type === "boolean" &&
          p.name !== "disabled" &&
          p.name !== "autoFocus" &&
          p.name !== "keepMounted" &&
          p.name !== "hiddenUntilFound"
      ) || []
    );
  }, [primaryDoc]);

  const hasDisabled = useMemo(() => {
    return Boolean(primaryDoc?.props.some((p) => p.name === "disabled"));
  }, [primaryDoc]);

  const hasChildren = useMemo(() => {
    return Boolean(
      primaryDoc?.props.some(
        (p) => p.name === "children" || p.name === "label" || p.name === "title"
      )
    );
  }, [primaryDoc]);

  const hasPlaceholder = useMemo(() => {
    return Boolean(primaryDoc?.props.some((p) => p.name === "placeholder"));
  }, [primaryDoc]);

  // Filtered props list for the API reference tab
  const filteredPropsList = useMemo(() => {
    if (!activeSubcompDoc?.props) return [];
    if (!propSearchQuery.trim()) return activeSubcompDoc.props;
    const q = propSearchQuery.toLowerCase();
    return activeSubcompDoc.props.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    );
  }, [activeSubcompDoc, propSearchQuery]);

  const filteredComponents = useMemo(() => {
    return COMPONENT_CATALOG.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.primitive.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const showToast = (msg: string) => {
    toast.show(msg);
  };

  const copyToClipboard = (text: string, label = "Copied to clipboard") => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    toast.success(label);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getGeneratedCode = (): string => {
    switch (selectedComp) {
      case "button":
        return `import { Button } from "@galaui/react";
import { Sparkles } from "lucide-react";

export function ExampleButton() {
  return (
    <Button
      variant="${btnVariant}"
      size="${btnSize}"
      ${isDisabled ? "disabled " : ""}${customCn ? `className="${customCn}" ` : ""}>
      ${showIcon ? '<Sparkles className="w-3.5 h-3.5 mr-1.5" /> ' : ""}${btnLabel}
    </Button>
  );
}`;
      case "badge":
        return `import { Badge } from "@galaui/react";

export function ExampleBadge() {
  return (
    <Badge variant="${btnVariant as any}" size="${btnSize as any}"${customCn ? ` className="${customCn}"` : ""}>
      ${btnLabel || "Status Badge"}
    </Badge>
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
  Button,
  Input,
} from "@galaui/react";

export function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="primary">Launch Modal</Button>} />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>${btnLabel || "Authorize Action"}</DialogTitle>
          <DialogDescription>
            This modal is built on Base UI Dialog primitives with full focus trapping and escape dismissal.
          </DialogDescription>
        </DialogHeader>
        <div className="py-3 space-y-2">
          <Input placeholder="Enter identifier..." />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <DialogClose render={<Button variant="primary">Confirm</Button>} />
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}`;
      case "switch":
        return `import { useState } from "react";
import { Switch } from "@galaui/react";

export function ExampleSwitch() {
  const [checked, setChecked] = useState(${switchChecked});
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
      <span className="text-xs font-medium">${btnLabel || "Automatic Token Synchronization"}</span>
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        size="${btnSize as any}"
        ${isDisabled ? "disabled " : ""}/>
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
} from "@galaui/react";

export function ExampleSelect() {
  return (
    <Select defaultValue="production">
      <SelectTrigger size="${btnSize as any}">
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
import { Slider } from "@galaui/react";

export function ExampleSlider() {
  const [value, setValue] = useState(${sliderValue});
  return (
    <div className="w-full max-w-sm space-y-3 p-4 rounded-xl border border-border bg-card">
      <div className="flex justify-between text-xs font-medium">
        <span>${btnLabel || "Bandwidth Allocation"}</span>
        <span className="font-mono text-primary font-bold">{value} GB/s</span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        variant="${btnVariant as any}"
        size="${btnSize as any}"
        ${isDisabled ? "disabled " : ""}min={0}
        max={100}
      />
    </div>
  );
}`;
      case "input":
        return `import { Input } from "@galaui/react";

export function ExampleInput() {
  return (
    <Input
      size="${btnSize as any}"
      placeholder="${btnLabel || "Enter email or identifier..."}"
      ${isDisabled ? "disabled " : ""}${customCn ? `className="${customCn}" ` : ""}/>
  );
}`;
      case "card":
        return `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@galaui/react";

export function ExampleCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>${btnLabel || "Enterprise Production"}</CardTitle>
        <CardDescription>Zero-downtime deployment pipeline.</CardDescription>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        Tailwind v4 CSS-first design tokens with Base UI headless accessibility.
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">Audit Log</Button>
        <Button variant="primary" size="sm">Configure</Button>
      </CardFooter>
    </Card>
  );
}`;
      default:
        return `import { ${currentMeta.name.replace(/[^a-zA-Z0-9]/g, "")} } from "@galaui/react";

export function Example() {
  return (
    <${currentMeta.name.replace(/[^a-zA-Z0-9]/g, "")} />
  );
}`;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col font-sans bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <Toaster />

      {/* Global Workbench Header */}
      <header className="h-14 border-b border-border bg-card/95 backdrop-blur-md flex items-center justify-between px-4 z-40 shrink-0">
        {/* Left: Brand Identity + Version */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            <Logo withText size={28} />
          </a>
          <span className="hidden sm:inline-block h-4 w-px bg-border" />
          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-mono">
              Workbench v0.6.1
            </Badge>
          </div>
        </div>

        {/* Center: Top-Level Mode Navigation */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
          <TabsList className="h-9">
            <TabsTab value="workbench" className="text-xs px-3">
              <Box className="w-3.5 h-3.5 mr-1.5 text-primary" />
              <span>Components</span>
            </TabsTab>
            <TabsTab value="tokens" className="text-xs px-3">
              <Palette className="w-3.5 h-3.5 mr-1.5 text-primary" />
              <span>Tokens Studio</span>
            </TabsTab>
          </TabsList>
        </Tabs>

        {/* Right: Quick Links + Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Docs Link */}
          <a
            href="/getting-started/introduction"
            className="hidden md:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors font-medium"
          >
            <span>Documentation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="/components"
            className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors font-medium"
          >
            <span>Catalog</span>
          </a>

          <span className="hidden md:inline-block h-4 w-px bg-border" />

          {/* Theme Mode Toggle Button */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={toggleTheme}
            className="rounded-lg text-muted-foreground hover:text-foreground"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </Button>
        </div>
      </header>

      {/* VIEW 1: COMPONENT WORKBENCH */}
      {activeTab === "workbench" && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Component Catalog */}
          <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col overflow-hidden">
            {/* Search and Category Filter */}
            <div className="p-3 border-b border-border space-y-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                <Input
                  size="sm"
                  placeholder="Filter 53 components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-7 font-mono text-xs"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1">
                {(["All", "Primitives", "Form", "Navigation", "Overlays", "Feedback", "Data"] as ComponentCategory[]).map(
                  (cat) => (
                    <Badge
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                      className="cursor-pointer text-[10px]"
                    >
                      {cat}
                    </Badge>
                  )
                )}
              </div>
            </div>

            {/* Scrollable Component List */}
            <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
              {filteredComponents.map((c) => {
                const active = c.id === selectedComp;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedComp(c.id)}
                    className={cn(
                      "w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer group",
                      active
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                    )}
                  >
                    <span className="truncate">{c.name}</span>
                    <span
                      className={cn(
                        "text-[9px] px-1.5 py-0.2 rounded font-mono shrink-0 transition-colors",
                        active
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground group-hover:bg-card"
                      )}
                    >
                      {c.category}
                    </span>
                  </button>
                );
              })}

              {filteredComponents.length === 0 && (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  No components match "{searchQuery}"
                </div>
              )}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-3 border-t border-border bg-muted/20 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>{filteredComponents.length} of {COMPONENT_CATALOG.length} Primitives</span>
              <span className="text-primary font-bold">100% Base UI</span>
            </div>
          </aside>

          {/* Center Stage: Canvas & Controls */}
          <main className="flex-1 flex flex-col bg-muted/10 overflow-hidden">
            {/* Canvas Sub-Header */}
            <div className="h-11 border-b border-border bg-card px-4 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-xs font-bold text-foreground tracking-tight truncate">
                  {currentMeta.name}
                </span>
                <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0.2 shrink-0">
                  {currentMeta.primitive}
                </Badge>
                <span className="hidden sm:inline text-xs text-muted-foreground truncate">
                  {currentMeta.desc}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Stage View Mode: Focus vs Matrix */}
                <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
                  <TabsList className="h-8">
                    <TabsTab value="focus" className="text-[11px] px-2.5">
                      <Square className="w-3 h-3 mr-1" /> Focus Stage
                    </TabsTab>
                    <TabsTab value="matrix" className="text-[11px] px-2.5">
                      <LayoutGrid className="w-3 h-3 mr-1" /> Variant Matrix
                    </TabsTab>
                  </TabsList>
                </Tabs>

                {/* Viewport Width Buttons (Focus Mode Only) */}
                {viewMode === "focus" && (
                  <div className="hidden lg:flex items-center gap-1">
                    <Button
                      variant={viewport === "100%" ? "secondary" : "ghost"}
                      size="xs"
                      onClick={() => setViewport("100%")}
                    >
                      <Monitor className="w-3 h-3 mr-1" /> 100%
                    </Button>
                    <Button
                      variant={viewport === "768px" ? "secondary" : "ghost"}
                      size="xs"
                      onClick={() => setViewport("768px")}
                    >
                      <Tablet className="w-3 h-3 mr-1" /> 768px
                    </Button>
                    <Button
                      variant={viewport === "375px" ? "secondary" : "ghost"}
                      size="xs"
                      onClick={() => setViewport("375px")}
                    >
                      <Smartphone className="w-3 h-3 mr-1" /> 375px
                    </Button>
                  </div>
                )}

                {/* Canvas Background Textures */}
                <div className="flex items-center gap-0.5 border border-border rounded-lg p-0.5 bg-muted/40">
                  <Button
                    variant={canvasBg === "dots" ? "secondary" : "ghost"}
                    size="icon-xs"
                    onClick={() => setCanvasBg("dots")}
                    title="Dot matrix canvas"
                  >
                    <Sparkles className="w-3 h-3" />
                  </Button>
                  <Button
                    variant={canvasBg === "grid" ? "secondary" : "ghost"}
                    size="icon-xs"
                    onClick={() => setCanvasBg("grid")}
                    title="Blueprint grid"
                  >
                    <LayoutGrid className="w-3 h-3" />
                  </Button>
                  <Button
                    variant={canvasBg === "plain" ? "secondary" : "ghost"}
                    size="icon-xs"
                    onClick={() => setCanvasBg("plain")}
                    title="Plain solid canvas"
                  >
                    <Square className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Rendering Canvas Area */}
            <div
              className={cn(
                "flex-1 overflow-auto p-6 flex items-center justify-center transition-colors",
                canvasBg === "dots" &&
                  "bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#242429_1px,transparent_1px)] [background-size:20px_20px]",
                canvasBg === "grid" &&
                  "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e1e24_1px,transparent_1px),linear-gradient(to_bottom,#1e1e24_1px,transparent_1px)] [background-size:24px_24px]",
                canvasBg === "plain" && "bg-background"
              )}
            >
              {viewMode === "focus" ? (
                /* FOCUS STAGE SPECIMEN */
                <div
                  style={{ maxWidth: viewport }}
                  className="w-full transition-all duration-200 flex items-center justify-center min-h-[340px] p-8 rounded-2xl border border-border bg-card shadow-xs"
                >
                  <div className="flex items-center justify-center w-full max-w-lg">
                    {/* BUTTON */}
                    {selectedComp === "button" && (
                      <div className="space-y-4 text-center">
                        <Button
                          variant={btnVariant as any}
                          size={btnSize as any}
                          disabled={isDisabled}
                          className={cn(customCn)}
                          onClick={() => showToast("Button clicked")}
                        >
                          {showIcon && (
                            <Sparkles className={btnSize.includes("xs") ? "w-3 h-3 mr-1" : "w-3.5 h-3.5 mr-1.5"} />
                          )}
                          {btnSize.startsWith("icon") ? <Plus className="w-4 h-4" /> : btnLabel}
                        </Button>
                        <p className="text-[11px] font-mono text-muted-foreground">
                          Canonical Scale: xs=24px · sm=28px · default=32px · lg=36px
                        </p>
                      </div>
                    )}

                    {/* BADGE */}
                    {selectedComp === "badge" && (
                      <div className="flex flex-wrap gap-2.5 items-center justify-center">
                        <Badge variant={btnVariant as any} size={btnSize as any} className={cn(customCn)}>
                          {btnLabel || "Default Badge"}
                        </Badge>
                        <Badge variant="success" size={btnSize as any}>Confirmed</Badge>
                        <Badge variant="warning" size={btnSize as any}>Syncing</Badge>
                        <Badge variant="destructive" size={btnSize as any}>Critical</Badge>
                      </div>
                    )}

                    {/* CARD */}
                    {selectedComp === "card" && (
                      <Card className={cn("w-full max-w-sm", customCn)}>
                        <CardHeader>
                          <CardTitle>{btnLabel || "Enterprise Cluster"}</CardTitle>
                          <CardDescription>Multi-region deployment with zero downtime.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs text-muted-foreground">
                          <p className="flex items-center gap-2 text-foreground font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Pure CSS Custom Variable Engine
                          </p>
                          <p className="flex items-center gap-2 text-foreground font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Void & Bevel Pitch Black Palette
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" size={btnSize as any} disabled={isDisabled}>Audit Log</Button>
                          <Button variant={btnVariant as any} size={btnSize as any} disabled={isDisabled} onClick={() => showToast("Saved configuration")}>Configure</Button>
                        </CardFooter>
                      </Card>
                    )}

                    {/* AVATAR */}
                    {selectedComp === "avatar" && (
                      <div className={cn("flex items-center gap-4", customCn)}>
                        <div className="relative">
                          <Avatar className={cn(
                            btnSize === "xs" ? "h-7 w-7 text-[10px]" : btnSize === "sm" ? "h-9 w-9 text-xs" : btnSize === "lg" ? "h-14 w-14 text-base" : "h-11 w-11 text-sm",
                            "border border-border"
                          )}>
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" />
                            <AvatarFallback>{btnLabel ? btnLabel.slice(0, 2).toUpperCase() : "DP"}</AvatarFallback>
                          </Avatar>
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{btnLabel || "Dian Pratama"}</p>
                          <p className="text-xs text-muted-foreground font-mono">Lead System Architect</p>
                        </div>
                      </div>
                    )}

                    {/* SLIDER */}
                    {selectedComp === "slider" && (
                      <div className="w-full max-w-sm p-5 rounded-2xl border border-border bg-card shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-foreground">{btnLabel || "Bandwidth Allocation"}</p>
                            <p className="text-[11px] text-muted-foreground">Adjust real-time throughput quota</p>
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
                          <span>0 GB/s</span>
                          <span>50 GB/s</span>
                          <span>100 GB/s</span>
                        </div>
                      </div>
                    )}

                    {/* INPUT & TEXTAREA */}
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
                          <Textarea placeholder="Add notes here..." className="h-20" disabled={isDisabled} />
                        </div>
                      </div>
                    )}

                    {/* SWITCH */}
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
                            checked={switchChecked}
                            onCheckedChange={setSwitchChecked}
                            className={cn(customCn)}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
                          <span>Status:</span>
                          <span className={switchChecked ? "text-primary font-bold" : "text-muted-foreground"}>
                            {switchChecked ? "LIVE SYNCHRONIZED" : "STANDBY"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* CHECKBOX */}
                    {selectedComp === "checkbox" && (
                      <div className="space-y-3 w-full max-w-sm p-4 rounded-xl border border-border bg-card">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                          <Checkbox
                            checked={checkboxChecked}
                            onCheckedChange={(c) => setCheckboxChecked(!!c)}
                            disabled={isDisabled}
                          />
                          <span className="text-xs font-medium text-foreground">
                            {btnLabel || "Enforce WCAG AA contrast ratio compliance"}
                          </span>
                        </label>
                        <p className="text-[10px] font-mono text-muted-foreground">
                          Validation: <span className="text-primary font-bold">{checkboxChecked ? "PASSED" : "OFFLINE"}</span>
                        </p>
                      </div>
                    )}

                    {/* RADIO */}
                    {selectedComp === "radio" && (
                      <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-3">
                        <p className="text-xs font-semibold text-foreground">Environment Tier</p>
                        <RadioGroup value={radioValue} onValueChange={(val: any) => setRadioValue(String(val))}>
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

                    {/* SELECT */}
                    {selectedComp === "select" && (
                      <div className="w-full max-w-xs space-y-2">
                        <label className="text-xs font-medium text-foreground block">
                          {btnLabel || "Active Cluster Target"}
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

                    {/* DIALOG */}
                    {selectedComp === "dialog" && (
                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger render={
                          <Button variant={btnVariant as any} size={btnSize as any} disabled={isDisabled} className={cn("shadow-2xs", customCn)}>
                            <Fingerprint className="w-4 h-4 mr-1.5" /> {btnLabel || "Launch Base UI Dialog"}
                          </Button>
                        } />
                        <DialogPopup>
                          <DialogHeader>
                            <DialogTitle>{btnLabel || "Authorize Key Provisioning"}</DialogTitle>
                            <DialogDescription>
                              Built on Base UI Dialog with full focus trapping, backdrop blur, and escape dismissal.
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

                    {/* POPOVER */}
                    {selectedComp === "popover" && (
                      <Popover>
                        <PopoverTrigger render={
                          <Button variant={btnVariant as any} size={btnSize as any} disabled={isDisabled} className={cn(customCn)}>
                            <Sliders className="w-4 h-4 mr-1.5" /> {btnLabel || "Open Base UI Popover"}
                          </Button>
                        } />
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
                            <Button size="sm" variant="primary" onClick={() => showToast("Settings applied")}>Apply</Button>
                          </div>
                        </PopoverPopup>
                      </Popover>
                    )}

                    {/* DROPDOWN MENU */}
                    {selectedComp === "dropdown-menu" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger render={
                          <Button variant={btnVariant as any} size={btnSize as any} disabled={isDisabled} className={cn(customCn)}>
                            <span>{btnLabel || "Actions Menu"}</span>
                            <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        }>
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </DropdownMenuTrigger>
                        <DropdownMenuPopup className="w-52">
                          <DropdownMenuItem onClick={() => showToast("Edited component")}>
                            <Sparkles className="w-3.5 h-3.5 mr-2 text-primary" /> Edit Component
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => showToast("Duplicated token")}>
                            <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate Token
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => showToast("Deleted item")}>
                            <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Entry
                          </DropdownMenuItem>
                        </DropdownMenuPopup>
                      </DropdownMenu>
                    )}

                    {/* ACCORDION */}
                    {selectedComp === "accordion" && (
                      <div className={cn("w-full max-w-md", customCn)}>
                        <Accordion defaultValue={["item-1"]}>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>{btnLabel || "What is Base UI?"}</AccordionTrigger>
                            <AccordionPanel>
                              Base UI provides unstyled accessible primitives created by MUI, built specifically for modern Tailwind CSS v4 styling.
                            </AccordionPanel>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger>What are GalaUI Design Tokens?</AccordionTrigger>
                            <AccordionPanel>
                              Pure CSS custom variables mapped 1:1 between Figma variables, Tailwind v4 @theme, and runtime code.
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}

                    {/* TABS */}
                    {selectedComp === "tabs" && (
                      <div className={cn("w-full max-w-md space-y-3", customCn)}>
                        <Tabs value={tabValue} onValueChange={setTabValue}>
                          <TabsList className="w-full grid grid-cols-3">
                            <TabsTab value="components">{btnLabel || "Components"}</TabsTab>
                            <TabsTab value="tokens">Tokens</TabsTab>
                            <TabsTab value="exports">Exports</TabsTab>
                          </TabsList>
                          <TabsPanel value="components" className="p-4 rounded-xl border border-border bg-card text-xs text-muted-foreground">
                            Production Base UI primitives calibrated for Tailwind CSS v4.
                          </TabsPanel>
                          <TabsPanel value="tokens" className="p-4 rounded-xl border border-border bg-card text-xs text-muted-foreground">
                            1:1 pure CSS custom variables in globals.css.
                          </TabsPanel>
                          <TabsPanel value="exports" className="p-4 rounded-xl border border-border bg-card text-xs text-muted-foreground">
                            Clean copyable React JSX snippets with compiled cn imports.
                          </TabsPanel>
                        </Tabs>
                      </div>
                    )}

                    {/* TOOLTIP */}
                    {selectedComp === "tooltip" && (
                      <Tooltip>
                        <TooltipTrigger render={
                          <Button variant={btnVariant as any} size={btnSize as any} disabled={isDisabled} className={cn(customCn)}>
                            <Eye className="w-4 h-4 mr-1.5" /> {btnLabel || "Hover for Tooltip"}
                          </Button>
                        } />
                        <TooltipPopup>
                          {btnLabel ? `Tooltip for: ${btnLabel}` : "Rendered with @base-ui/react Tooltip"}
                        </TooltipPopup>
                      </Tooltip>
                    )}

                    {/* RENDER ALL REMAINING SPECIMENS FROM SHOWCASE */}
                    {selectedComp !== "button" &&
                      selectedComp !== "badge" &&
                      selectedComp !== "card" &&
                      selectedComp !== "avatar" &&
                      selectedComp !== "slider" &&
                      selectedComp !== "input" &&
                      selectedComp !== "switch" &&
                      selectedComp !== "checkbox" &&
                      selectedComp !== "radio" &&
                      selectedComp !== "select" &&
                      selectedComp !== "dialog" &&
                      selectedComp !== "popover" &&
                      selectedComp !== "dropdown-menu" &&
                      selectedComp !== "accordion" &&
                      selectedComp !== "tabs" &&
                      selectedComp !== "tooltip" && (
                        <ShowcaseNewComponents
                          selectedComp={selectedComp}
                          viewMode="focus"
                          showToast={showToast}
                          btnVariant={btnVariant}
                          btnSize={btnSize}
                          btnLabel={btnLabel}
                          isDisabled={isDisabled}
                          customCn={customCn}
                          orientation={selectedOrientation as any}
                          sliderValue={sliderValue}
                        />
                      )}
                  </div>
                </div>
              ) : (
                /* VARIANT MATRIX VIEW */
                <div className="w-full max-w-4xl p-6 rounded-2xl border border-border bg-card shadow-xs space-y-6 overflow-y-auto max-h-[540px] custom-scrollbar">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Complete Variant Matrix — {currentMeta.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      Side-by-side verification of all design tokens, sizing scales, and states.
                    </p>
                  </div>

                  {selectedComp === "button" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-muted-foreground">Semantic Variants</span>
                        <div className="flex flex-wrap gap-3 items-center">
                          <Button variant="primary"><Sparkles className="w-4 h-4 mr-1" /> Primary</Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="destructive"><Trash2 className="w-4 h-4 mr-1" /> Destructive</Button>
                          <Button variant="ghost">Ghost</Button>
                          <Button variant="link">Link</Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-border">
                        <span className="text-xs font-semibold text-muted-foreground">Canonical Sizing Scale</span>
                        <div className="flex flex-wrap gap-3 items-center">
                          <Button size="xs">Extra Small (xs / 24px)</Button>
                          <Button size="sm">Small (sm / 28px)</Button>
                          <Button size="default">Default (default / 32px)</Button>
                          <Button size="lg">Large (lg / 36px)</Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-border">
                        <span className="text-xs font-semibold text-muted-foreground">Icon Sizes</span>
                        <div className="flex flex-wrap gap-3 items-center">
                          <Button size="icon-xs" title="Icon XS"><Plus className="w-3 h-3" /></Button>
                          <Button size="icon-sm" title="Icon SM"><Plus className="w-3.5 h-3.5" /></Button>
                          <Button size="icon" title="Icon Default"><Plus className="w-4 h-4" /></Button>
                          <Button size="icon-lg" title="Icon LG"><Plus className="w-5 h-5" /></Button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-border">
                        <span className="text-xs font-semibold text-muted-foreground">Interaction States</span>
                        <div className="flex flex-wrap gap-3 items-center">
                          <Button variant="primary">Normal</Button>
                          <Button variant="primary" disabled>Disabled State</Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedComp === "badge" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-muted-foreground">Variants</span>
                        <div className="flex flex-wrap gap-2.5 items-center">
                          <Badge variant="default">Default</Badge>
                          <Badge variant="secondary">Secondary</Badge>
                          <Badge variant="outline">Outline</Badge>
                          <Badge variant="destructive">Destructive</Badge>
                          <Badge variant="success">Success</Badge>
                          <Badge variant="warning">Warning</Badge>
                          <Badge variant="info">Info</Badge>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-border">
                        <span className="text-xs font-semibold text-muted-foreground">Sizes</span>
                        <div className="flex flex-wrap gap-2.5 items-center">
                          <Badge size="sm">Small (sm)</Badge>
                          <Badge size="default">Default (default)</Badge>
                          <Badge size="lg">Large (lg)</Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedComp === "slider" && (
                    <div className="space-y-6 max-w-xl">
                      <div className="space-y-3">
                        <span className="text-xs font-semibold text-muted-foreground">Sizes</span>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-medium text-foreground">Small (sm)</span>
                            <span className="font-mono text-muted-foreground">35%</span>
                          </div>
                          <Slider defaultValue={35} size="sm" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-medium text-foreground">Default (default)</span>
                            <span className="font-mono text-muted-foreground">60%</span>
                          </div>
                          <Slider defaultValue={60} size="default" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-medium text-foreground">Large (lg)</span>
                            <span className="font-mono text-muted-foreground">80%</span>
                          </div>
                          <Slider defaultValue={80} size="lg" />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedComp === "input" && (
                    <div className="space-y-4 max-w-sm">
                      <span className="text-xs font-semibold text-muted-foreground">Canonical Input Scale</span>
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
                    <div className="space-y-4 max-w-md">
                      <span className="text-xs font-semibold text-muted-foreground">Sizes Scale</span>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs font-medium text-foreground">Extra Small (xs)</p>
                            <p className="text-[10px] text-muted-foreground">16px track</p>
                          </div>
                          <Switch size="xs" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs font-medium text-foreground">Small (sm)</p>
                            <p className="text-[10px] text-muted-foreground">20px track</p>
                          </div>
                          <Switch size="sm" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs font-medium text-foreground">Default (default)</p>
                            <p className="text-[10px] text-muted-foreground">24px track</p>
                          </div>
                          <Switch size="default" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs font-medium text-foreground">Large (lg)</p>
                            <p className="text-[10px] text-muted-foreground">28px track</p>
                          </div>
                          <Switch size="lg" defaultChecked />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedComp !== "button" &&
                    selectedComp !== "badge" &&
                    selectedComp !== "slider" &&
                    selectedComp !== "input" &&
                    selectedComp !== "switch" && (
                      <ShowcaseNewComponents
                        selectedComp={selectedComp}
                        viewMode="matrix"
                        showToast={showToast}
                        btnVariant={btnVariant}
                        btnSize={btnSize}
                        btnLabel={btnLabel}
                        isDisabled={isDisabled}
                        customCn={customCn}
                        orientation={selectedOrientation as any}
                        sliderValue={sliderValue}
                      />
                    )}
                </div>
              )}
            </div>

            {/* Bottom Code Drawer */}
            <div className="h-44 border-t border-border bg-zinc-950 flex flex-col shrink-0">
              <div className="h-9 border-b border-zinc-800/80 px-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-zinc-300 font-semibold">Generated React JSX</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-500">@galaui/react</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(getGeneratedCode(), "Copied React code")}
                  className="h-7 text-xs text-primary hover:text-white"
                >
                  {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                </Button>
              </div>
              <pre className="flex-1 p-3.5 overflow-auto custom-scrollbar font-mono text-xs text-emerald-400/90 leading-relaxed selection:bg-emerald-950">
                {getGeneratedCode()}
              </pre>
            </div>
          </main>

         {/* Right Sidebar: Props & Token Architecture */}
          <aside className="w-84 shrink-0 border-l border-border bg-card flex flex-col overflow-hidden">
            {/* Header with Title and Mode Switcher */}
            <div className="p-3.5 border-b border-border space-y-2.5 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground truncate">
                    {primaryCompName} Props
                  </h3>
                  <Badge variant="outline" className="text-[10px] font-mono px-1.5 h-4.5">
                    {primaryDoc?.props.length || 0} Props
                  </Badge>
                </div>
              </div>

              {/* Sidebar Tabs: Dynamic Controls vs Full API Reference */}
              <Tabs value={sidebarMode} onValueChange={(v: any) => setSidebarMode(v)}>
                <TabsList className="w-full grid grid-cols-2 h-8">
                  <TabsTab value="controls" className="text-[11px]">
                    <SlidersHorizontal className="w-3 h-3 mr-1" /> Controls
                  </TabsTab>
                  <TabsTab value="api" className="text-[11px]">
                    <FileCode className="w-3 h-3 mr-1" /> API Reference
                  </TabsTab>
                </TabsList>
              </Tabs>
            </div>

            {/* TAB 1: DYNAMIC INTERACTIVE CONTROLS */}
            {sidebarMode === "controls" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs custom-scrollbar">
                {/* 1. VARIANT CONTROL (Only if component accepts variant) */}
                {availableVariants.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-[11px] text-muted-foreground font-semibold">
                        variant <span className="font-mono text-[10px] text-primary">({availableVariants.length})</span>
                      </Label>
                      {variantProp?.defaultValue && (
                        <span className="text-[10px] font-mono text-muted-foreground">
                          def: {variantProp.defaultValue.replace(/"/g, "")}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {availableVariants.map((v) => {
                        const active = btnVariant === v;
                        return (
                          <Button
                            key={v}
                            size="xs"
                            variant={active ? "primary" : "outline"}
                            onClick={() => setBtnVariant(v)}
                            className={cn(
                              "text-[11px] font-mono capitalize",
                              active && "shadow-xs font-bold"
                            )}
                          >
                            {v}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. SIZE CONTROL (Only if component accepts size) */}
                {availableSizes.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-[11px] text-muted-foreground font-semibold">
                        size <span className="font-mono text-[10px] text-primary">({availableSizes.length})</span>
                      </Label>
                      {sizeProp?.defaultValue && (
                        <span className="text-[10px] font-mono text-muted-foreground">
                          def: {sizeProp.defaultValue.replace(/"/g, "")}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {availableSizes.map((s) => {
                        const active = btnSize === s;
                        return (
                          <Button
                            key={s}
                            size="xs"
                            variant={active ? "primary" : "outline"}
                            onClick={() => setBtnSize(s)}
                            className={cn(
                              "text-[11px] font-mono",
                              active && "shadow-xs font-bold"
                            )}
                          >
                            {s}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. ORIENTATION CONTROL (Only if component accepts orientation) */}
                {availableOrientations.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-[11px] text-muted-foreground font-semibold">
                      orientation
                    </Label>
                    <div className="flex gap-1">
                      {availableOrientations.map((o) => {
                        const active = selectedOrientation === o;
                        return (
                          <Button
                            key={o}
                            size="xs"
                            variant={active ? "primary" : "outline"}
                            onClick={() => setSelectedOrientation(o)}
                            className={cn(
                              "flex-1 text-[11px] font-mono capitalize",
                              active && "shadow-xs font-bold"
                            )}
                          >
                            {o}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. CONTENT / LABEL CONTROL */}
                {hasChildren && (
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-muted-foreground">
                      children / label
                    </Label>
                    <Input
                      size="sm"
                      value={btnLabel}
                      onChange={(e) => setBtnLabel(e.target.value)}
                      placeholder="Enter content text..."
                    />
                  </div>
                )}

                {/* 5. PLACEHOLDER CONTROL */}
                {hasPlaceholder && (
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-muted-foreground">
                      placeholder
                    </Label>
                    <Input
                      size="sm"
                      value={btnLabel}
                      onChange={(e) => setBtnLabel(e.target.value)}
                      placeholder="Enter placeholder..."
                    />
                  </div>
                )}

                {/* 6. BOOLEAN PROPS OF THIS COMPONENT */}
                {(hasDisabled || booleanProps.length > 0 || selectedComp === "button") && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Component Flags
                    </Label>

                    {hasDisabled && (
                      <div className="flex items-center justify-between p-2 rounded-lg border border-border bg-muted/20">
                        <span className="text-xs font-mono font-medium">disabled</span>
                        <Switch
                          size="sm"
                          checked={isDisabled}
                          onCheckedChange={(c) => setIsDisabled(Boolean(c))}
                        />
                      </div>
                    )}

                    {selectedComp === "button" && (
                      <div className="flex items-center justify-between p-2 rounded-lg border border-border bg-muted/20">
                        <span className="text-xs font-medium">showIcon (Leading Icon)</span>
                        <Switch
                          size="sm"
                          checked={showIcon}
                          onCheckedChange={(c) => setShowIcon(Boolean(c))}
                        />
                      </div>
                    )}

                    {booleanProps.slice(0, 4).map((bp) => (
                      <div key={bp.name} className="flex items-center justify-between p-2 rounded-lg border border-border bg-muted/20">
                        <span className="text-xs font-mono font-medium truncate pr-2">{bp.name}</span>
                        <Switch
                          size="sm"
                          checked={Boolean(customPropValues[bp.name])}
                          onCheckedChange={(c) => setCustomPropValues((prev) => ({ ...prev, [bp.name]: Boolean(c) }))}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 7. CUSTOM CLASSNAME OVERRIDE */}
                <div className="space-y-1.5 pt-2 border-t border-border">
                  <Label className="text-[11px] text-muted-foreground">className override</Label>
                  <Input
                    size="sm"
                    value={customCn}
                    onChange={(e) => setCustomCn(e.target.value)}
                    placeholder="e.g. shadow-md ring-2 ring-primary"
                    className="font-mono text-xs"
                  />
                  <span className="text-[10px] text-muted-foreground block font-mono">
                    Merged via <code className="text-primary">cn(...)</code> utility.
                  </span>
                </div>

                {/* TOKEN ARCHITECTURE CARD */}
                <div className="pt-2 border-t border-border space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Token Architecture
                    </span>
                    <button
                      onClick={() => setActiveTab("tokens")}
                      className="text-[10px] text-primary hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <span>Tokens Studio</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  <div className="font-mono text-[11px] space-y-1.5 text-muted-foreground bg-muted/20 p-3 rounded-xl border border-border">
                    <p><span className="text-foreground font-semibold">CSS Token:</span> <code className="text-primary">{currentMeta.cssToken}</code></p>
                    <p><span className="text-foreground font-semibold">Primitive:</span> {currentMeta.primitive}</p>
                    <p><span className="text-foreground font-semibold">Base UI:</span> {primaryDoc?.file || "Native Base UI"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COMPLETE PROPS API REFERENCE TABLE */}
            {sidebarMode === "api" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Subcomponent Pill Selector (if multiple) */}
                {compFileNames.length > 1 && (
                  <div className="p-2.5 border-b border-border bg-muted/30 shrink-0">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5 px-1">
                      Subcomponents ({compFileNames.length})
                    </span>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto custom-scrollbar">
                      {compFileNames.map((name) => (
                        <Badge
                          key={name}
                          variant={selectedSubcomp === name ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSubcomp(name)}
                          className="cursor-pointer font-mono text-[10px]"
                        >
                          {name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prop Search Filter */}
                <div className="p-2.5 border-b border-border shrink-0">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                    <Input
                      size="sm"
                      placeholder={`Filter ${activeSubcompDoc?.props.length || 0} props...`}
                      value={propSearchQuery}
                      onChange={(e) => setPropSearchQuery(e.target.value)}
                      className="pl-8 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Props List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
                  {filteredPropsList.map((prop) => (
                    <Card
                      key={prop.name}
                      className="p-2.5 bg-muted/20 border-border/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <code className="text-xs font-bold text-foreground font-mono">
                            {prop.name}
                          </code>
                          {prop.required && (
                            <Badge variant="destructive" size="sm" className="text-[9px] h-3.5 px-1 font-mono">
                              required
                            </Badge>
                          )}
                        </div>

                        {prop.defaultValue && (
                          <Badge variant="secondary" size="sm" className="text-[9px] font-mono">
                            def: {prop.defaultValue}
                          </Badge>
                        )}
                      </div>

                      {/* Type Chip */}
                      <div className="font-mono text-[10px] text-primary/90 bg-primary/5 border border-primary/15 px-1.5 py-0.5 rounded-md break-all leading-tight">
                        {prop.type}
                      </div>

                      {/* Description */}
                      {prop.description && (
                        <p className="text-[11px] text-muted-foreground leading-normal pt-0.5">
                          {prop.description}
                        </p>
                      )}
                    </Card>
                  ))}

                  {filteredPropsList.length === 0 && (
                    <div className="p-4 text-center text-xs text-muted-foreground">
                      No props match "{propSearchQuery}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* VIEW 2: DESIGN TOKENS STUDIO */}
      {activeTab === "tokens" && (
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background p-6 md:p-8 space-y-10 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 text-xs font-mono">
                    1:1 Docs Parity
                  </Badge>
                  <Badge variant="outline" className="text-xs font-mono">
                    Pure CSS Custom Variables
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground mt-2">
                  GalaUI Design Tokens Studio
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  100% driven by pure CSS variables defined in <code className="text-primary">globals.css</code> and documented in <code className="text-primary">theming.mdx</code>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const css = `:root {
  --primary: #1d54db;
  --primary-hover: #143eb0;
  --primary-active: #12348e;
  --background: #fcfcfd;
  --foreground: #121417;
  --card: #ffffff;
  --popover: #ffffff;
  --muted: #f1f3f5;
  --muted-foreground: #6c757d;
  --border: #e4e7eb;
}

.dark {
  --primary: #2f6fed;
  --primary-hover: #558ff8;
  --primary-active: #8ab4fc;
  --background: #000000;
  --foreground: #ededf0;
  --card: #111113;
  --popover: #111113;
  --muted: #161619;
  --muted-foreground: #94949e;
  --border: #242429;
}`;
                    copyToClipboard(css, "Copied GalaUI CSS Variables");
                  }}
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy Tokens CSS
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab("workbench")}
                >
                  <Box className="w-3.5 h-3.5 mr-1.5" /> Test in Workbench
                </Button>
              </div>
            </div>
          </div>

          {/* Section 1: Semantic Color Matrix (Light vs Dark) */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">
                1. Semantic Color Tokens (Light & Dark Matrix)
              </h2>
              <p className="text-xs text-muted-foreground">
                Runtime semantic variables used across all GalaUI components. Click any variable to copy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: "Primary Brand", var: "--primary", light: "#1D54DB", dark: "#2F6FED", desc: "Electric Cobalt brand focus" },
                { name: "Primary Hover", var: "--primary-hover", light: "#143EB0", dark: "#558FF8", desc: "Interactive hover state" },
                { name: "Primary Active", var: "--primary-active", light: "#12348E", dark: "#8AB4FC", desc: "Pressed active state" },
                { name: "Canvas Background", var: "--background", light: "#FCFCFD", dark: "#000000", desc: "Pitch black void in dark mode" },
                { name: "Foreground Text", var: "--foreground", light: "#121417", dark: "#EDEDF0", desc: "Base high-contrast typography" },
                { name: "Card / Surface", var: "--card", light: "#FFFFFF", dark: "#111113", desc: "Elevated surfaces and modals" },
                { name: "Popover / Menu", var: "--popover", light: "#FFFFFF", dark: "#111113", desc: "Floating contextual cards" },
                { name: "Muted Surface", var: "--muted", light: "#F1F3F5", dark: "#161619", desc: "Secondary tags and input fills" },
                { name: "Muted Foreground", var: "--muted-foreground", light: "#6C757D", dark: "#94949E", desc: "Secondary captions and metadata" },
                { name: "Border (Bevel)", var: "--border", light: "#E4E7EB", dark: "#242429", desc: "Crisp structural divider lines" },
                { name: "Input Background", var: "--input", light: "#F8F9FA", dark: "#111113", desc: "Interactive form fields" },
                { name: "Focus Ring", var: "--ring", light: "#1D54DB", dark: "#2F6FED", desc: "Keyboard accessibility focus ring" },
                { name: "Destructive", var: "--destructive", light: "#E03131", dark: "#F03E3E", desc: "Critical alerts and teardowns" },
                { name: "Success", var: "--success", light: "#2F9E44", dark: "#37B24D", desc: "Confirmed operations and sync" },
                { name: "Warning", var: "--warning", light: "#F08C00", dark: "#F59F00", desc: "Cautionary notes and rate limits" },
                { name: "Info Accent", var: "--info", light: "#1971C2", dark: "#1C7ED6", desc: "Informative callouts" },
              ].map((token) => (
                <div
                  key={token.var}
                  className="p-3.5 rounded-xl border border-border bg-card space-y-3 transition-all hover:border-primary/40 hover:shadow-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">{token.name}</span>
                    <button
                      onClick={() => copyToClipboard(`var(${token.var})`, `Copied var(${token.var})`)}
                      className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      title="Copy CSS Variable"
                    >
                      {token.var}
                    </button>
                  </div>

                  {/* Dual Swatches (Light vs Dark) */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div
                        className="h-9 rounded-lg border border-border flex items-center justify-center text-[10px] font-mono font-bold shadow-2xs cursor-pointer"
                        style={{
                          backgroundColor: token.light,
                          color: token.light === "#FFFFFF" || token.light === "#FCFCFD" || token.light === "#F8F9FA" || token.light === "#F1F3F5" || token.light === "#E4E7EB" ? "#121417" : "#FFFFFF",
                        }}
                        onClick={() => copyToClipboard(token.light, `Copied ${token.light}`)}
                        title="Click to copy Light Hex"
                      >
                        {token.light}
                      </div>
                      <span className="text-[10px] text-muted-foreground block text-center">Light</span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className="h-9 rounded-lg border border-zinc-800 flex items-center justify-center text-[10px] font-mono font-bold shadow-2xs cursor-pointer"
                        style={{
                          backgroundColor: token.dark,
                          color: token.dark === "#000000" || token.dark === "#111113" || token.dark === "#161619" || token.dark === "#242429" ? "#EDEDF0" : "#FFFFFF",
                        }}
                        onClick={() => copyToClipboard(token.dark, `Copied ${token.dark}`)}
                        title="Click to copy Dark Hex"
                      >
                        {token.dark}
                      </div>
                      <span className="text-[10px] text-muted-foreground block text-center">Dark</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {token.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Electric Cobalt Brand Ramp */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">
                2. Electric Cobalt Brand Focus Ramp (50 - 950)
              </h2>
              <p className="text-xs text-muted-foreground">
                The signature GalaUI primary brand palette calibrated for maximum digital contrast and optical clarity.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-card space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
                {[
                  { step: "50", hex: "#EEF4FF", text: "#121417" },
                  { step: "100", hex: "#D8E6FF", text: "#121417" },
                  { step: "200", hex: "#B9D2FE", text: "#121417" },
                  { step: "300", hex: "#8AB4FC", text: "#121417" },
                  { step: "400", hex: "#558FF8", text: "#FFFFFF" },
                  { step: "500", hex: "#2F6FED", text: "#FFFFFF", badge: "Dark Def" },
                  { step: "600", hex: "#1D54DB", text: "#FFFFFF", badge: "Light Def" },
                  { step: "700", hex: "#143EB0", text: "#FFFFFF" },
                  { step: "800", hex: "#12348E", text: "#FFFFFF" },
                  { step: "900", hex: "#142F73", text: "#FFFFFF" },
                  { step: "950", hex: "#0C1C45", text: "#FFFFFF" },
                ].map((item) => (
                  <button
                    key={item.step}
                    onClick={() => copyToClipboard(item.hex, `Copied brand-${item.step} (${item.hex})`)}
                    className="p-2.5 rounded-xl flex flex-col items-center justify-between h-24 border border-border/60 transition-transform hover:scale-105 cursor-pointer shadow-2xs"
                    style={{ backgroundColor: item.hex, color: item.text }}
                  >
                    <span className="text-xs font-bold font-mono">{item.step}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-black/40 text-white font-mono uppercase">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-[10px] font-mono">{item.hex}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Neutral Zinc Scale (Void & Bevel Dark Mode) */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">
                3. Refined Neutral Zinc Scale (0 - 1000)
              </h2>
              <p className="text-xs text-muted-foreground">
                Pure black #000000 void canvas, elevated #111113 card surfaces, and crisp #242429 bevel borders.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-card space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-13 gap-1.5">
                {[
                  { step: "0", hex: "#FFFFFF", text: "#121417" },
                  { step: "50", hex: "#F8F9FA", text: "#121417" },
                  { step: "100", hex: "#F1F3F5", text: "#121417" },
                  { step: "200", hex: "#E9ECEF", text: "#121417" },
                  { step: "300", hex: "#DEE2E6", text: "#121417" },
                  { step: "400", hex: "#CED4DA", text: "#121417" },
                  { step: "500", hex: "#868E96", text: "#FFFFFF" },
                  { step: "600", hex: "#495057", text: "#FFFFFF" },
                  { step: "700", hex: "#343A40", text: "#FFFFFF" },
                  { step: "800", hex: "#212529", text: "#FFFFFF" },
                  { step: "900", hex: "#111113", text: "#FFFFFF", badge: "Surface" },
                  { step: "950", hex: "#000000", text: "#FFFFFF", badge: "Void" },
                  { step: "1000", hex: "#000000", text: "#FFFFFF" },
                ].map((item) => (
                  <button
                    key={item.step + item.hex}
                    onClick={() => copyToClipboard(item.hex, `Copied zinc-${item.step} (${item.hex})`)}
                    className="p-2 rounded-lg flex flex-col items-center justify-between h-20 border border-border/80 transition-transform hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: item.hex, color: item.text }}
                  >
                    <span className="text-[11px] font-bold font-mono">{item.step}</span>
                    {item.badge && (
                      <span className="text-[8px] px-1 py-0.2 rounded bg-white/20 text-white font-mono uppercase">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-[9px] font-mono">{item.hex}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Corner Radius & Component Sizing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Corner Radius Scale */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-foreground tracking-tight">
                  4. Border Radius Scale
                </h2>
                <p className="text-xs text-muted-foreground">
                  Strict geometric corner curvature defined in pure CSS variables.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-border bg-card space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { token: "--radius-none", px: "0px", name: "none" },
                    { token: "--radius-xs", px: "2px", name: "xs" },
                    { token: "--radius-sm", px: "4px", name: "sm" },
                    { token: "--radius-md", px: "6px", name: "md" },
                    { token: "--radius-lg", px: "8px", name: "lg (Default)" },
                    { token: "--radius-xl", px: "12px", name: "xl" },
                    { token: "--radius-2xl", px: "16px", name: "2xl" },
                    { token: "--radius-full", px: "9999px", name: "full" },
                  ].map((r) => (
                    <button
                      key={r.token}
                      onClick={() => copyToClipboard(`var(${r.token})`, `Copied var(${r.token})`)}
                      className="p-3 border border-border/80 bg-muted/30 hover:bg-muted/60 flex flex-col items-center justify-between h-24 transition-all cursor-pointer text-center"
                      style={{ borderRadius: r.px }}
                    >
                      <span className="text-xs font-bold text-foreground">{r.name}</span>
                      <span className="text-[11px] font-mono text-primary font-bold">{r.px}</span>
                      <span className="text-[9px] font-mono text-muted-foreground">{r.token}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Component Sizing Scale */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-foreground tracking-tight">
                  5. Base Component Sizing Scale
                </h2>
                <p className="text-xs text-muted-foreground">
                  The canonical 4-step vertical rhythm for Buttons, Inputs, Selects, and Switches.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-border bg-card space-y-3">
                <div className="space-y-2.5">
                  {[
                    { token: "--size-xs", px: "24px / 1.5rem", name: "Extra Small (xs)", height: "h-6" },
                    { token: "--size-sm", px: "28px / 1.75rem", name: "Small (sm)", height: "h-7" },
                    { token: "--size-default", px: "32px / 2rem", name: "Default / Medium (default / md)", height: "h-8" },
                    { token: "--size-lg", px: "36px / 2.25rem", name: "Large (lg)", height: "h-9" },
                  ].map((s) => (
                    <div
                      key={s.token}
                      className="p-2.5 rounded-xl border border-border bg-muted/20 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <Button
                          variant="primary"
                          size={s.token === "--size-xs" ? "xs" : s.token === "--size-sm" ? "sm" : s.token === "--size-lg" ? "lg" : "default"}
                        >
                          Specimen
                        </Button>
                        <div>
                          <p className="text-xs font-semibold text-foreground">{s.name}</p>
                          <p className="text-[10px] font-mono text-muted-foreground">{s.token}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-primary">{s.px}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Typography & Live CSS Snippet */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">
                6. CSS Variable Definitions (globals.css Parity)
              </h2>
              <p className="text-xs text-muted-foreground">
                Direct copyable CSS custom properties block ready for immediate use in any project.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-zinc-950 text-zinc-300 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-zinc-400">@galaui/react/styles.css</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const css = `:root {
  /* 1. Typography */
  --font-sans: "Geist", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "Geist Mono", monospace;

  /* 2. Border Radius Scale */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius: var(--radius-lg);

  /* 3. Semantic Brand Colors */
  --primary: #1d54db;
  --primary-hover: #143eb0;
  --primary-active: #12348e;
  --primary-foreground: #ffffff;

  /* 4. Canvas Colors */
  --background: #fcfcfd;
  --foreground: #121417;
  --muted: #f1f3f5;
  --muted-foreground: #6c757d;
  --border: #e4e7eb;
  --card: #ffffff;
}

/* Dark Mode Overrides */
.dark {
  --primary: #2f6fed;
  --primary-hover: #558ff8;
  --primary-active: #8ab4fc;
  --primary-foreground: #ffffff;

  --background: #000000;
  --foreground: #ededf0;
  --muted: #161619;
  --muted-foreground: #94949e;
  --border: #242429;
  --card: #111113;
}`;
                    copyToClipboard(css, "Copied globals.css definitions");
                  }}
                >
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy CSS Code
                </Button>
              </div>
              <pre className="text-emerald-400 overflow-x-auto leading-relaxed">
{`:root {
  --primary: #1d54db;
  --primary-hover: #143eb0;
  --primary-active: #12348e;
  --background: #fcfcfd;
  --foreground: #121417;
  --card: #ffffff;
  --popover: #ffffff;
  --muted: #f1f3f5;
  --muted-foreground: #6c757d;
  --border: #e4e7eb;
}

.dark {
  --primary: #2f6fed;
  --primary-hover: #558ff8;
  --primary-active: #8ab4fc;
  --background: #000000;
  --foreground: #ededf0;
  --card: #111113;
  --popover: #111113;
  --muted: #161619;
  --muted-foreground: #94949e;
  --border: #242429;
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
