import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Badge,
  Button,
  Card,
  Input,
  Tabs,
  TabsList,
  TabsTab,
  Separator,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "@/index";
import {
  Search,
  ArrowRight,
  X,
  Sliders,
  Layers,
  MessageSquare,
  Compass,
  Activity,
} from "lucide-react";

export interface ComponentItem {
  title: string;
  path: string;
  category: "form-inputs" | "layout-structure" | "overlays-dialogs" | "feedback-status" | "navigation";
  description: string;
  badge?: "New" | "Updated";
}

const COMPONENTS: ComponentItem[] = [
  // Form & Inputs (18)
  { title: "Button", path: "/components/button", category: "form-inputs", description: "Interactive button with distinct visual variants, sizing scales, and loading states." },
  { title: "Calendar", path: "/components/calendar", category: "form-inputs", description: "Accessible date and range calendar with monthly navigation and disabled constraints." },
  { title: "Checkbox", path: "/components/checkbox", category: "form-inputs", description: "Control allowing users to toggle between checked, unchecked, and indeterminate states." },
  { title: "Combobox", path: "/components/combobox", category: "form-inputs", description: "Autocomplete input and searchable selection popup with keyboard navigation." },
  { title: "Command", path: "/components/command", category: "overlays-dialogs", description: "Fast, composable command palette with live search filtering, keyboard navigation, and shortcuts.", badge: "New" },
  { title: "Date Picker", path: "/components/date-picker", category: "form-inputs", description: "Input trigger combined with a calendar popover for single date or date range selection." },
  { title: "Field", path: "/components/field", category: "form-inputs", description: "Accessible form field primitive connecting labels, controls, descriptions, and error states." },
  { title: "Fieldset", path: "/components/fieldset", category: "form-inputs", description: "Accessible form grouping container with legend titles, descriptions, and disabled cascading.", badge: "New" },
  { title: "Form", path: "/components/form", category: "form-inputs", description: "High-level form container with Base UI validation and submission state handling." },
  { title: "Input", path: "/components/input", category: "form-inputs", description: "Typography-calibrated single-line text input with sizing scales and focus rings." },
  { title: "Input OTP", path: "/components/input-otp", category: "form-inputs", description: "Accessible segmented one-time password input with individual character slots." },
  { title: "Label", path: "/components/label", category: "form-inputs", description: "Accessible label associated with form controls, styled with GalaUI typography tokens." },
  { title: "Number Field", path: "/components/number-field", category: "form-inputs", description: "Input field tailored for numeric values with increment/decrement stepper controls." },
  { title: "Radio Group", path: "/components/radio-group", category: "form-inputs", description: "Set of checkable radio buttons where no more than one button can be checked at once." },
  { title: "Select", path: "/components/select", category: "form-inputs", description: "Custom select menu with option lists, value labels, and native keyboard interaction." },
  { title: "Slider", path: "/components/slider", category: "form-inputs", description: "Input control where the user selects a value or range from within continuous bounds." },
  { title: "Stepper", path: "/components/stepper", category: "form-inputs", description: "Workflow progress indicator for multi-step processes like wizards and onboarding.", badge: "New" },
  { title: "Switch", path: "/components/switch", category: "form-inputs", description: "Control allowing users to toggle between checked and unchecked binary states." },
  { title: "Textarea", path: "/components/textarea", category: "form-inputs", description: "Multiline text input field with configurable sizing and state indicators." },
  { title: "Toggle", path: "/components/toggle", category: "form-inputs", description: "Two-state toggle button or grouped segmented control for toolbars and filters." },
  { title: "Toolbar", path: "/components/toolbar", category: "form-inputs", description: "Container for grouping controls such as buttons, toggles, inputs, and dropdowns." },

  // Layout & Structure (10)
  { title: "Accordion", path: "/components/accordion", category: "layout-structure", description: "Vertically stacked interactive disclosure headings for expandable content sections." },
  { title: "Aspect Ratio", path: "/components/aspect-ratio", category: "layout-structure", description: "Displays content within a desired proportional aspect ratio, preventing layout shifts." },
  { title: "Avatar", path: "/components/avatar", category: "layout-structure", description: "Image element with a graceful initials fallback for representing user profiles." },
  { title: "Card", path: "/components/card", category: "layout-structure", description: "Structured container with header, content, and footer sections for grouping information." },
  { title: "Collapsible", path: "/components/collapsible", category: "layout-structure", description: "Interactive component that smoothly expands and collapses an arbitrary panel of content." },
  { title: "Empty State", path: "/components/empty-state", category: "layout-structure", description: "Visual placeholder displayed when records, search queries, or datasets are empty." },
  { title: "Scroll Area", path: "/components/scroll-area", category: "layout-structure", description: "Custom styled cross-browser scrollable container without sacrificing native behavior." },
  { title: "Separator", path: "/components/separator", category: "layout-structure", description: "Visual or semantic divider separating content within lists or layouts." },
  { title: "Table", path: "/components/table", category: "layout-structure", description: "Responsive tabular data display with styled headers, alternating rows, and border styles." },
  { title: "Tabs", path: "/components/tabs", category: "layout-structure", description: "Layered sections of content navigated by tab buttons with animated active indicators." },
  { title: "Timeline", path: "/components/timeline", category: "layout-structure", description: "Chronological milestone display for event logs, audit trails, and status tracking.", badge: "New" },

  // Overlays & Dialogs (9)
  { title: "Alert Dialog", path: "/components/alert-dialog", category: "overlays-dialogs", description: "Modal confirmation prompt for critical, irreversible, or destructive actions." },
  { title: "Context Menu", path: "/components/context-menu", category: "overlays-dialogs", description: "Floating menu positioned at pointer coordinates when triggered by a secondary click." },
  { title: "Dialog", path: "/components/dialog", category: "overlays-dialogs", description: "Modal window that interrupts the user with important content and requires user action." },
  { title: "Drawer", path: "/components/drawer", category: "overlays-dialogs", description: "Slide-over sheet panel with swipe gesture dismiss and spring transitions from viewport edges." },
  { title: "Dropdown Menu", path: "/components/dropdown-menu", category: "overlays-dialogs", description: "Floating menu presenting a list of actions or options triggered by a button." },
  { title: "Menubar", path: "/components/menubar", category: "overlays-dialogs", description: "Desktop application-style horizontal menu bar with top-level dropdown commands." },
  { title: "Popover", path: "/components/popover", category: "overlays-dialogs", description: "Rich contextual content layer anchored to an interactive trigger button." },
  { title: "Preview Card", path: "/components/preview-card", category: "overlays-dialogs", description: "Rich preview popup displayed on pointer hover for link previews or summary cards." },
  { title: "Tooltip", path: "/components/tooltip", category: "overlays-dialogs", description: "Popup displaying information related to an element when focused or hovered." },

  // Feedback & Status (7)
  { title: "Alert", path: "/components/alert", category: "feedback-status", description: "Callout banner for user attention, communicating status messages or system feedback." },
  { title: "Badge", path: "/components/badge", category: "feedback-status", description: "Displays a small status label, numerical count, category tag, or state indicator." },
  { title: "Kbd", path: "/components/kbd", category: "feedback-status", description: "Keyboard key indicator or key combination badge for displaying keyboard shortcuts." },
  { title: "Meter", path: "/components/meter", category: "feedback-status", description: "Scalar measurement gauge within a known range, such as storage usage or battery level." },
  { title: "Progress", path: "/components/progress", category: "feedback-status", description: "Indicator displaying task completion progress, determinate or indeterminate." },
  { title: "Skeleton", path: "/components/skeleton", category: "feedback-status", description: "Animated wireframe placeholder shown while content is asynchronously loading." },
  { title: "Toast", path: "/components/toast", category: "feedback-status", description: "Succinct notification floating temporarily over the screen for system feedback." },

  // Navigation (3)
  { title: "Breadcrumb", path: "/components/breadcrumb", category: "navigation", description: "Hierarchical trail of links showing the user's location within the website hierarchy." },
  { title: "Navigation Menu", path: "/components/navigation-menu", category: "navigation", description: "Top-level navigation bar with interactive rich dropdown viewports." },
  { title: "Pagination", path: "/components/pagination", category: "navigation", description: "Pagination controls with page numbers, previous, next, and jump controls for large datasets." },
];

interface CategoryMeta {
  id: string;
  categoryKey: ComponentItem["category"];
  title: string;
  description: string;
  icon: typeof Sliders;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: "form-inputs",
    categoryKey: "form-inputs",
    title: "Form & Inputs",
    description: "Interactive controls for collecting user input, submitting data, and managing form state.",
    icon: Sliders,
  },
  {
    id: "layout-structure",
    categoryKey: "layout-structure",
    title: "Layout & Structure",
    description: "Structural building blocks for content organization, data presentation, and layout hierarchy.",
    icon: Layers,
  },
  {
    id: "overlays-dialogs",
    categoryKey: "overlays-dialogs",
    title: "Overlays & Dialogs",
    description: "Contextual floating panels, modal prompts, drawers, and interactive action menus.",
    icon: MessageSquare,
  },
  {
    id: "feedback-status",
    categoryKey: "feedback-status",
    title: "Feedback & Status",
    description: "Indicators and banners to convey application status, async progress, and notifications.",
    icon: Activity,
  },
  {
    id: "navigation",
    categoryKey: "navigation",
    title: "Navigation",
    description: "Wayfinding components enabling users to navigate between views, documents, and records.",
    icon: Compass,
  },
];

function ComponentCard({ component }: { component: ComponentItem }) {
  return (
    <Link href={component.path} className="group block no-underline focus-visible:outline-none">
      <Card className="h-full p-4 rounded-xl border border-border/80 bg-card/60 hover:bg-muted/40 hover:border-primary/50 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {component.title}
            </span>
            {component.badge && (
              <Badge
                variant={
                  component.badge.toLowerCase() === "new"
                    ? "default"
                    : "secondary"
                }
                size="sm"
                className="text-[10px] h-4 px-1.5 font-medium"
              >
                {component.badge}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {component.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span>@galaui/{component.title.toLowerCase().replace(/\s+/g, "-")}</span>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150" />
        </div>
      </Card>
    </Link>
  );
}

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredComponents = useMemo(() => {
    return COMPONENTS.filter((comp) => {
      const matchesCategory =
        selectedCategory === "all" || comp.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        comp.title.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q) ||
        comp.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== "all";

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground">
          Components
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed my-2.5">
          A complete catalog of <strong>47 accessible primitives and components</strong> built on Base UI and styled with Tailwind CSS v4. Designed with keyboard accessibility, responsive scales, and unified design tokens.
        </p>

        <div className="flex flex-wrap items-center gap-2 my-4 not-prose">
          <Badge variant="default" className="font-mono text-xs px-2.5 py-1">
            47 Components
          </Badge>
          <Badge variant="secondary" className="text-xs px-2 py-1">
            Base UI Primitives
          </Badge>
          <Badge variant="outline" className="text-xs px-2 py-1">
            Tailwind CSS v4
          </Badge>
          <Badge variant="outline" className="text-xs px-2 py-1">
            WAI-ARIA Compliant
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Interactive Filter Bar */}
      <div className="space-y-3 not-prose">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components or keywords..."
              className="pl-8 pr-8 h-9 text-xs w-full bg-muted/30 focus:bg-background"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <Tabs
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val as string)}
          >
            <TabsList size="sm" className="overflow-x-auto max-w-full justify-start">
              <TabsTab value="all">All ({COMPONENTS.length})</TabsTab>
              <TabsTab value="form-inputs">Form</TabsTab>
              <TabsTab value="layout-structure">Layout</TabsTab>
              <TabsTab value="overlays-dialogs">Overlays</TabsTab>
              <TabsTab value="feedback-status">Feedback</TabsTab>
              <TabsTab value="navigation">Nav</TabsTab>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Results View */}
      {isFiltering ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-primary shrink-0" />
              <h2 className="text-lg font-semibold tracking-tight text-foreground !m-0 !mt-0 !mb-0 !p-0 leading-none">
                {searchQuery.trim() ? `Search Results (${filteredComponents.length})` : "Filtered Components"}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Reset filters
            </Button>
          </div>

          {filteredComponents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 not-prose">
              {filteredComponents.map((comp) => (
                <ComponentCard key={comp.path} component={comp} />
              ))}
            </div>
          ) : (
            <EmptyState className="animate-in fade-in-50 duration-200 not-prose">
              <EmptyStateIcon>
                <Search />
              </EmptyStateIcon>
              <EmptyStateTitle>No components found</EmptyStateTitle>
              <EmptyStateDescription>
                We couldn't find any component matching "{searchQuery}". Try a different keyword or reset your filter.
              </EmptyStateDescription>
              <EmptyStateActions>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear search
                </Button>
              </EmptyStateActions>
            </EmptyState>
          )}
        </div>
      ) : (
        /* Categorized View with Headings for Table of Contents */
        <div className="space-y-12">
          {CATEGORIES.map((cat) => {
            const items = COMPONENTS.filter((c) => c.category === cat.categoryKey);
            const Icon = cat.icon;
            return (
              <section key={cat.id} className="space-y-4">
                <div className="border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-5 h-5 text-primary shrink-0" />
                    <h2
                      id={cat.id}
                      className="text-2xl font-bold tracking-tight text-foreground !m-0 !mt-0 !mb-0 !p-0 leading-none scroll-mt-28 xl:scroll-mt-20"
                    >
                      {cat.title}
                    </h2>
                    <Badge variant="outline" size="sm" className="font-mono text-[11px] font-medium h-5 px-1.5 ml-0.5">
                      {items.length}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground !mt-2 !mb-0 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 not-prose">
                  {items.map((comp) => (
                    <ComponentCard key={comp.path} component={comp} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
