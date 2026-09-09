import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Button,
  Badge,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
  Switch,
  Slider,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  DatePicker,
  NumberField,
  Progress,
  Meter,
  MeterTrack,
  MeterIndicator,
  MeterLabel,
  MeterValue,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Field,
  FieldLabel,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  Kbd,
  KbdGroup,
  Separator,
  toast,
  cn,
} from "@/index";
import { Logo } from "./components/Logo";
import { ThemeToggle } from "./components/ThemeToggle";
import { SearchDialog } from "./components/SearchDialog";
import { CodeBlock } from "./components/CodeBlock";
import { docSections } from "./routes";
import { usePackageVersion } from "./lib/version";
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Terminal,
  Sparkles,
  Zap,
  ShieldCheck,
  Palette,
  Package,
  Search,
  ExternalLink,
  CheckCircle2,
  BellRing,
} from "lucide-react";

export default function LandingPage() {
  const version = usePackageVersion();
  const shouldReduce = useReducedMotion();
  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState<string>("form");
  const [dxTab, setDxTab] = useState<string>("preview");

  // Hero interactive state
  const [sliderVal, setSliderVal] = useState(72);
  const [switchVal, setSwitchVal] = useState(true);
  const [selectedCity, setSelectedCity] = useState("jakarta");
  const [dateVal, setDateVal] = useState<Date | undefined>(new Date());
  const [numberVal, setNumberVal] = useState<number | null>(4);

  // Component search / filter in the showcase section
  const [compQuery, setCompQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const installCommand = "npm i @galaui/react";
  const quickCodeSnippet = `import { Button, Dialog, DialogTrigger, DialogPopup } from "@galaui/react";
import { Sparkles } from "lucide-react";

export function ReleaseModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Launch Project</span>
        </Button>
      </DialogTrigger>
      
      <DialogPopup>
        <div className="p-4 space-y-2">
          <h3 className="text-base font-bold">Project Initialized</h3>
          <p className="text-xs text-muted-foreground">
            Production release configured with Base UI accessibility.
          </p>
        </div>
      </DialogPopup>
    </Dialog>
  );
}`;

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    toast.success("Command copied to clipboard", installCommand);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(quickCodeSnippet);
    setCodeCopied(true);
    toast.success("Code snippet copied", "Paste into your React component");
    setTimeout(() => setCodeCopied(false), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const allComponents = (docSections[1]?.items || []).filter((comp) => comp.path !== "/components");

  const filteredComponents = allComponents.filter((comp) => {
    const matchesQuery = comp.title.toLowerCase().includes(compQuery.toLowerCase());
    if (!matchesQuery) return false;

    if (selectedCategory === "all") return true;
    if (selectedCategory === "inputs") {
      return [
        "button",
        "input",
        "select",
        "checkbox",
        "switch",
        "slider",
        "date-picker",
        "calendar",
        "number-field",
        "input-otp",
        "textarea",
        "form",
        "radio-group",
        "combobox",
      ].some((k) => comp.path.includes(k));
    }
    if (selectedCategory === "overlays") {
      return [
        "dialog",
        "alert-dialog",
        "popover",
        "tooltip",
        "drawer",
        "dropdown-menu",
        "context-menu",
        "toast",
        "preview-card",
      ].some((k) => comp.path.includes(k));
    }
    if (selectedCategory === "core") {
      return [
        "badge",
        "card",
        "avatar",
        "table",
        "tabs",
        "accordion",
        "breadcrumb",
        "pagination",
        "progress",
        "meter",
        "skeleton",
        "separator",
      ].some((k) => comp.path.includes(k));
    }
    return true;
  });

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col antialiased selection:bg-primary selection:text-primary-foreground relative overflow-x-clip">
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Global Navigation Header with Glassmorphism */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1 font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity">
              <Logo withText size={26} />
            </Link>
            <Link href="/getting-started/changelog" title="Changelog">
              <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-mono cursor-pointer hover:bg-muted transition-colors">
                v{version}
              </Badge>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/components" className="hover:text-foreground transition-colors">
              Components
            </Link>
            <a href="#features" className="hover:text-foreground transition-colors">
              Architecture
            </a>
            <Link href="/getting-started/introduction" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/getting-started/changelog" className="hover:text-foreground transition-colors">
              Changelog
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 text-xs rounded-lg border border-border/80 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search docs...</span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </button>

            <a
              href="https://github.com/dianprata/galaui"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section with Motion Animations */}
      <section className="relative pt-12 md:pt-16 pb-16 md:pb-24 border-b border-border/60 overflow-hidden">
        {/* Subtle Background Mesh & Radial Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <motion.div
          animate={shouldReduce ? false : { scale: [1, 1.06, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-primary/15 dark:bg-primary/25 blur-[120px] rounded-full pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Hero Stack */}
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              {/* Element 1: Eyebrow with Beacon Ping */}
              <div className="inline-flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1 gap-2 text-xs text-primary border-primary/30 bg-primary/10 shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span>Base UI and Tailwind CSS v4</span>
                </Badge>
              </div>

              {/* Element 2: Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-foreground">
                Craft fluid interfaces with zero compromise.
              </h1>

              {/* Element 3: Subtext */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Over 45 enterprise React primitives with native accessibility, CSS variables theming, and unstyled foundations.
              </p>

              {/* Element 4: CTAs + Install Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href="/components">
                  <Button size="lg" className="w-full sm:w-auto gap-2 shadow-sm hover:shadow-primary/25 hover:shadow-md transition-all active:scale-[0.98]">
                    <span>Explore Components</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleCopyInstall}
                  className="font-mono text-xs gap-3 justify-between sm:justify-start hover:border-primary/50 transition-all duration-150 active:scale-[0.98] shadow-2xs"
                  title="Click to copy install command"
                >
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span>{installCommand}</span>
                  </div>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-success-500 animate-in zoom-in duration-150" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </motion.div>

            {/* Right Hero: Live Interactive Showcase Canvas with Motion */}
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <Tabs value={activeHeroTab} onValueChange={(val) => setActiveHeroTab(val as string)}>
                <Card className="shadow-2xl border-border/80 bg-card/95 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-primary/5">
                  {/* Showcase Header with GalaUI Tabs */}
                  <CardHeader className="py-3 px-4 border-b border-border bg-muted/30 flex-row items-center justify-between space-y-0 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-destructive-500/80" />
                        <div className="w-3 h-3 rounded-full bg-warning-500/80" />
                        <div className="w-3 h-3 rounded-full bg-success-500/80" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground ml-1">Live Component Hub</span>
                    </div>

                    {/* GalaUI TabsList */}
                    <TabsList size="sm">
                      <TabsTab value="form">Forms</TabsTab>
                      <TabsTab value="controls">Controls</TabsTab>
                      <TabsTab value="actions">Actions</TabsTab>
                    </TabsList>
                  </CardHeader>

                  {/* Showcase Body with AnimatePresence Tab Switching */}
                  <CardContent className="p-6 min-h-[340px]">
                    <AnimatePresence mode="wait">
                      {/* TAB 1: FORMS & INPUTS */}
                      {activeHeroTab === "form" && (
                        <motion.div
                          key="form"
                          initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field className="space-y-1.5">
                              <FieldLabel>Project Name</FieldLabel>
                              <Input defaultValue="GalaUI Production" placeholder="Enter title" />
                            </Field>

                            <Field className="space-y-1.5">
                              <FieldLabel>Cloud Region</FieldLabel>
                              <Select value={selectedCity} onValueChange={(val) => setSelectedCity(val)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select region" />
                                </SelectTrigger>
                                <SelectPopup>
                                  <SelectItem value="jakarta">ap-southeast (Jakarta)</SelectItem>
                                  <SelectItem value="singapore">ap-southeast (Singapore)</SelectItem>
                                  <SelectItem value="tokyo">ap-northeast (Tokyo)</SelectItem>
                                  <SelectItem value="frankfurt">eu-central (Frankfurt)</SelectItem>
                                </SelectPopup>
                              </Select>
                            </Field>
                          </div>

                          <Field className="space-y-1.5">
                            <FieldLabel>Launch Date</FieldLabel>
                            <DatePicker
                              value={dateVal}
                              onChange={(d) => setDateVal(d)}
                              placeholder="Pick target release"
                              className="w-full justify-between"
                            />
                          </Field>

                          <Card className="p-3.5 bg-muted/20 border-border/80 flex items-center justify-between transition-colors duration-150">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <p className="text-xs font-medium text-foreground">Automatic Edge Synchronization</p>
                                <span className={cn(
                                  "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                                  switchVal ? "bg-success-500" : "bg-muted-foreground"
                                )} />
                              </div>
                              <p className="text-[11px] text-muted-foreground">
                                {switchVal ? "Synchronizing state live across 4 regions" : "Synchronization paused"}
                              </p>
                            </div>
                            <Switch checked={switchVal} onCheckedChange={setSwitchVal} />
                          </Card>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-muted-foreground">Engine Status:</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-[11px]">Base UI 1.7</Badge>
                              <Badge variant="default" className="text-[11px]">Tailwind v4</Badge>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* TAB 2: RANGE & CONTROLS */}
                      {activeHeroTab === "controls" && (
                        <motion.div
                          key="controls"
                          initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5"
                        >
                          <Field className="space-y-2">
                            <div className="flex items-center justify-between">
                              <FieldLabel>Cluster Throughput</FieldLabel>
                              <span className="text-xs font-mono font-bold text-primary transition-all duration-150">{sliderVal} GB/s</span>
                            </div>
                            <Slider
                              value={sliderVal}
                              onValueChange={(val) => setSliderVal(Array.isArray(val) ? val[0] : val)}
                              min={10}
                              max={100}
                              step={1}
                            />
                          </Field>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field className="space-y-1.5">
                              <FieldLabel>Replica Instances</FieldLabel>
                              <NumberField
                                value={numberVal}
                                onValueChange={setNumberVal}
                                min={1}
                                max={32}
                                step={1}
                              />
                            </Field>

                            <Field className="space-y-1.5">
                              <FieldLabel>Health Status</FieldLabel>
                              <Card className="h-8 px-3 flex items-center justify-between bg-muted/30 border-border">
                                <span className="text-xs text-muted-foreground">Uptime</span>
                                <Badge variant="default" className="text-[10px] h-4.5 bg-success-500 text-white">99.98%</Badge>
                              </Card>
                            </Field>
                          </div>

                          <Meter value={sliderVal} min={0} max={100}>
                            <div className="flex items-center justify-between">
                              <MeterLabel>Asset Processing</MeterLabel>
                              <MeterValue>{sliderVal}%</MeterValue>
                            </div>
                            <MeterTrack>
                              <MeterIndicator />
                            </MeterTrack>
                          </Meter>

                          <Separator />

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Active Team</span>
                            <div className="flex -space-x-2">
                              <Avatar size="sm" className="border-2 border-card hover:translate-y-[-2px] transition-transform">
                                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
                                <AvatarFallback>DP</AvatarFallback>
                              </Avatar>
                              <Avatar size="sm" className="border-2 border-card hover:translate-y-[-2px] transition-transform">
                                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" />
                                <AvatarFallback>AL</AvatarFallback>
                              </Avatar>
                              <Avatar size="sm" className="border-2 border-card hover:translate-y-[-2px] transition-transform">
                                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces" />
                                <AvatarFallback>RK</AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* TAB 3: ACTIONS, DIALOG & TOAST */}
                      {activeHeroTab === "actions" && (
                        <motion.div
                          key="actions"
                          initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <span className="text-xs font-medium text-foreground">Interactive Triggers</span>
                            <div className="grid grid-cols-2 gap-2.5">
                              {/* GalaUI Dialog */}
                              <Dialog>
                                <DialogTrigger>
                                  <Button variant="default" className="w-full shadow-2xs hover:shadow-primary/20 active:scale-[0.98] transition-all">
                                    <span>Open Dialog</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogPopup>
                                  <DialogHeader>
                                    <DialogTitle>Authorize Key Deployment</DialogTitle>
                                    <DialogDescription>
                                      This confirms the rollout of GalaUI component tokens across your production environment.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-3 text-xs text-muted-foreground">
                                    All instances will automatically inherit new variables with zero layout shift.
                                  </div>
                                  <DialogFooter>
                                    <DialogClose>
                                      <Button variant="outline" size="sm">
                                        Cancel
                                      </Button>
                                    </DialogClose>
                                    <DialogClose>
                                      <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => toast.success("Key successfully deployed", "Cluster is now synced")}
                                      >
                                        Deploy Now
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogPopup>
                              </Dialog>

                              {/* GalaUI Toast Action */}
                              <Button
                                variant="secondary"
                                className="w-full gap-1.5 active:scale-[0.98] transition-all"
                                onClick={() =>
                                  toast.info("Instant Feedback", "GalaUI toasts stack seamlessly with spring physics")
                                }
                              >
                                <BellRing className="w-3.5 h-3.5" />
                                <span>Fire Toast</span>
                              </Button>
                            </div>
                          </div>

                          {/* Button Hierarchy */}
                          <div className="space-y-1.5">
                            <span className="text-xs font-medium text-foreground">Button Variants</span>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" variant="default" className="active:scale-[0.97] transition-all">Primary</Button>
                              <Button size="sm" variant="secondary" className="active:scale-[0.97] transition-all">Secondary</Button>
                              <Button size="sm" variant="outline" className="active:scale-[0.97] transition-all">Outline</Button>
                              <Button size="sm" variant="ghost" className="active:scale-[0.97] transition-all">Ghost</Button>
                              <Button size="sm" variant="destructive" className="active:scale-[0.97] transition-all">Destructive</Button>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="space-y-1.5">
                            <span className="text-xs font-medium text-foreground">Semantic Badges</span>
                            <div className="flex flex-wrap gap-1.5">
                              <Badge variant="default" className="transition-transform hover:scale-105">Production</Badge>
                              <Badge variant="outline" className="transition-transform hover:scale-105">Preview</Badge>
                              <Badge variant="destructive" className="transition-transform hover:scale-105">Error 500</Badge>
                              <Badge variant="secondary" className="transition-transform hover:scale-105">Ready</Badge>
                            </div>
                          </div>

                          <Separator />

                          {/* GalaUI Tooltip */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Hover for tooltip:</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button variant="ghost" size="sm" className="h-auto p-0 text-primary hover:bg-transparent hover:underline">
                                  Accessibility Info
                                </Button>
                              </TooltipTrigger>
                              <TooltipPopup>
                                Full WAI-ARIA compliance provided by Base UI engine.
                              </TooltipPopup>
                            </Tooltip>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>

                  {/* Showcase Footer Note */}
                  <CardFooter className="py-2.5 px-4 bg-muted/30 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>Interactive Preview</span>
                    <Link href="/components/button" className="hover:text-primary transition-colors inline-flex items-center gap-1 group">
                      <span>View all 45+ components</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Highlights Section with Motion Stagger */}
      <section id="features" className="py-16 md:py-20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-3 mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Architected for modern React stacks
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every primitive is built to give engineering teams full styling autonomy without sacrificing accessibility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: "Base UI Engine",
                desc: "Unstyled primitives with built-in keyboard navigation, focus trap, and WAI-ARIA compliance.",
              },
              {
                icon: Zap,
                title: "Tailwind CSS v4",
                desc: "Native CSS-first design with zero build configuration. Inherits your theme automatically.",
              },
              {
                icon: Palette,
                title: "CSS Variables",
                desc: "Seamless light and dark mode switching with calibrated zinc neutrals and cobalt brand accents.",
              },
              {
                icon: Package,
                title: "Tree Shakeable",
                desc: "PreserveModules architecture ensures you import only the exact bytes you need in production.",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card className="h-full shadow-2xs hover:border-primary/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                    <CardHeader className="space-y-3 p-5">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                      <CardDescription className="text-xs leading-relaxed">
                        {feature.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Component Matrix Showcase Section (Interactive Filter & Search) */}
      <section id="showcase" className="py-16 md:py-20 border-b border-border/60 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
          >
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Comprehensive Component Matrix
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Browse our complete catalog of 45+ accessible primitives with copyable code snippets.
              </p>
            </div>

            {/* Filter Pills using GalaUI Tabs & Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={compQuery}
                  onChange={(e) => setCompQuery(e.target.value)}
                  placeholder="Filter components..."
                  className="pl-8 h-8 text-xs w-full sm:w-48 transition-all focus:w-56"
                />
              </div>

              <Tabs value={selectedCategory} onValueChange={(val) => setSelectedCategory(val as string)}>
                <TabsList size="sm">
                  <TabsTab value="all">All ({allComponents.length})</TabsTab>
                  <TabsTab value="inputs">Inputs</TabsTab>
                  <TabsTab value="overlays">Overlays</TabsTab>
                  <TabsTab value="core">Core</TabsTab>
                </TabsList>
              </Tabs>
            </div>
          </motion.div>

          {/* Components Grid with Hover Elevation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredComponents.map((comp) => (
              <Link key={comp.path} href={comp.path}>
                <Card className="p-3.5 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex items-center justify-between cursor-pointer">
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {comp.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      @galaui/{comp.title.toLowerCase().replace(/\s+/g, "-")}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {comp.badge && (
                      <Badge variant={comp.badge === "New" ? "default" : "secondary"} className="text-[10px] h-4 px-1.5">
                        {comp.badge}
                      </Badge>
                    )}
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <EmptyState className="animate-in fade-in-50 duration-200">
              <EmptyStateIcon>
                <Search />
              </EmptyStateIcon>
              <EmptyStateTitle>No components found</EmptyStateTitle>
              <EmptyStateDescription>
                No components match your filter criteria. Try searching with a different keyword.
              </EmptyStateDescription>
            </EmptyState>
          )}
        </div>
      </section>

      {/* Code / Developer Experience Section */}
      <section className="py-16 md:py-20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-4"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Simple, expressive, and type-safe
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Import components directly into your Next.js, Vite, or Remix application. Every prop is strictly typed with TypeScript autocompletion.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Compound component APIs for flexible layout arrangement</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Supports Tailwind className overrides through cn utility</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Zero runtime CSS injection, pure compile-time styles</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/getting-started/installation">
                  <Button variant="outline" size="sm" className="gap-1.5 shadow-2xs hover:border-primary/50 transition-colors">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Installation Guide</span>
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <Tabs value={dxTab} onValueChange={(val) => setDxTab(val as string)}>
                <Card className="shadow-2xl overflow-hidden border-border bg-card text-card-foreground transition-all duration-200">
                  <CardHeader className="py-2.5 px-4 border-b border-border bg-muted/40 flex-row items-center justify-between space-y-0 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-destructive-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-warning-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-success-500/80" />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-muted-foreground ml-1">QuickStart.tsx</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="hidden sm:inline-flex text-[10px]">React 19 + TS</Badge>
                      <TabsList size="sm">
                        <TabsTab value="preview">Preview</TabsTab>
                        <TabsTab value="code">Code</TabsTab>
                      </TabsList>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <AnimatePresence mode="wait">
                      {dxTab === "preview" && (
                        <motion.div
                          key="dx-preview"
                          initial={shouldReduce ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="p-8 sm:p-12 flex flex-col items-center justify-center gap-4 bg-muted/10 min-h-[260px]"
                        >
                          <div className="text-center space-y-1 mb-2">
                            <Badge variant="outline" className="text-[11px] mb-1">Live Component Preview</Badge>
                            <h4 className="text-sm font-semibold text-foreground">Click button below to open modal</h4>
                            <p className="text-xs text-muted-foreground">Interactive demo of the exact code declared in the snippet.</p>
                          </div>

                          <Dialog>
                            <DialogTrigger>
                              <Button variant="default" size="lg" className="gap-2 shadow-sm hover:shadow-primary/25 active:scale-[0.98] transition-all">
                                <Sparkles className="w-4 h-4" />
                                <span>Launch Project</span>
                              </Button>
                            </DialogTrigger>
                            <DialogPopup>
                              <DialogHeader>
                                <DialogTitle>Project Initialized</DialogTitle>
                                <DialogDescription>
                                  Production release configured with Base UI accessibility and zero-config Tailwind CSS v4.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4 space-y-2 text-xs text-muted-foreground">
                                <div className="p-3 rounded-lg border border-border bg-muted/40 font-mono text-[11px] text-foreground">
                                  Status: 200 OK. Ready for deployment.
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose>
                                  <Button variant="outline" size="sm">
                                    Dismiss
                                  </Button>
                                </DialogClose>
                                <DialogClose>
                                  <Button variant="default" size="sm" onClick={() => toast.success("Project launched successfully")}>
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogPopup>
                          </Dialog>
                        </motion.div>
                      )}

                      {dxTab === "code" && (
                        <motion.div
                          key="dx-code"
                          initial={shouldReduce ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="p-0"
                        >
                          <CodeBlock
                            code={quickCodeSnippet}
                            language="tsx"
                            className="my-0 border-0 rounded-none bg-transparent"
                            showCopy={true}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner with Radial Highlight */}
      <section className="py-16 md:py-20 border-b border-border/60 bg-muted/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,84,219,0.06),transparent_70%)] pointer-events-none" />
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-6 relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Ready to build faster with GalaUI?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Install the package or explore the full documentation to start crafting clean, accessible user interfaces.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/getting-started/introduction">
              <Button size="lg" className="gap-2 shadow-sm hover:shadow-primary/25 hover:shadow-md active:scale-[0.98] transition-all">
                <span>Read Documentation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="https://github.com/dianprata/galaui" target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="gap-2 hover:border-primary/50 active:scale-[0.98] transition-all">
                <span>View on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Minimalist Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Logo size={20} />
            <span>GalaUI Design System. MIT License.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/getting-started/introduction" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/getting-started/installation" className="hover:text-foreground transition-colors">
              Install
            </Link>
            <Link href="/getting-started/changelog" className="hover:text-foreground transition-colors">
              Changelog
            </Link>
            <a
              href="https://github.com/dianprata/galaui"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
