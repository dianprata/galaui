import type { ComponentType } from "react";

export interface DocItem {
  title: string;
  path: string;
  component: ComponentType<any>;
  badge?: string;
}

export interface DocSection {
  title: string;
  items: DocItem[];
}

import IntroDoc from "./content/getting-started/introduction.mdx";
import InstallDoc from "./content/getting-started/installation.mdx";
import ThemingDoc from "./content/getting-started/theming.mdx";

import AccordionDoc from "./content/components/accordion.mdx";
import AlertDoc from "./content/components/alert.mdx";
import AlertDialogDoc from "./content/components/alert-dialog.mdx";
import AspectRatioDoc from "./content/components/aspect-ratio.mdx";
import AvatarDoc from "./content/components/avatar.mdx";
import BadgeDoc from "./content/components/badge.mdx";
import BreadcrumbDoc from "./content/components/breadcrumb.mdx";
import ButtonDoc from "./content/components/button.mdx";
import CardDoc from "./content/components/card.mdx";
import CheckboxDoc from "./content/components/checkbox.mdx";
import CollapsibleDoc from "./content/components/collapsible.mdx";
import ContextMenuDoc from "./content/components/context-menu.mdx";
import DialogDoc from "./content/components/dialog.mdx";
import DrawerDoc from "./content/components/drawer.mdx";
import DropdownMenuDoc from "./content/components/dropdown-menu.mdx";
import EmptyStateDoc from "./content/components/empty-state.mdx";
import FieldDoc from "./content/components/field.mdx";
import InputDoc from "./content/components/input.mdx";
import InputOTPDoc from "./content/components/input-otp.mdx";
import KbdDoc from "./content/components/kbd.mdx";
import MenubarDoc from "./content/components/menubar.mdx";
import MeterDoc from "./content/components/meter.mdx";
import NavigationMenuDoc from "./content/components/navigation-menu.mdx";
import NumberFieldDoc from "./content/components/number-field.mdx";
import PaginationDoc from "./content/components/pagination.mdx";
import PopoverDoc from "./content/components/popover.mdx";
import PreviewCardDoc from "./content/components/preview-card.mdx";
import ProgressDoc from "./content/components/progress.mdx";
import RadioGroupDoc from "./content/components/radio-group.mdx";
import ScrollAreaDoc from "./content/components/scroll-area.mdx";
import SelectDoc from "./content/components/select.mdx";
import SeparatorDoc from "./content/components/separator.mdx";
import SkeletonDoc from "./content/components/skeleton.mdx";
import SliderDoc from "./content/components/slider.mdx";
import SwitchDoc from "./content/components/switch.mdx";
import TableDoc from "./content/components/table.mdx";
import TabsDoc from "./content/components/tabs.mdx";
import TextareaDoc from "./content/components/textarea.mdx";
import ToastDoc from "./content/components/toast.mdx";
import ToggleDoc from "./content/components/toggle.mdx";
import TooltipDoc from "./content/components/tooltip.mdx";

import FormControlsDoc from "./content/components/form-controls.mdx";
import OverlaysDoc from "./content/components/overlays.mdx";

export const docSections: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", path: "/getting-started/introduction", component: IntroDoc },
      { title: "Installation", path: "/getting-started/installation", component: InstallDoc },
      { title: "Theming & Tokens", path: "/getting-started/theming", component: ThemingDoc },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", path: "/components/accordion", component: AccordionDoc },
      { title: "Alert", path: "/components/alert", component: AlertDoc },
      { title: "Alert Dialog", path: "/components/alert-dialog", component: AlertDialogDoc },
      { title: "Aspect Ratio", path: "/components/aspect-ratio", component: AspectRatioDoc },
      { title: "Avatar", path: "/components/avatar", component: AvatarDoc },
      { title: "Badge", path: "/components/badge", component: BadgeDoc },
      { title: "Breadcrumb", path: "/components/breadcrumb", component: BreadcrumbDoc },
      { title: "Button", path: "/components/button", component: ButtonDoc },
      { title: "Card", path: "/components/card", component: CardDoc },
      { title: "Checkbox", path: "/components/checkbox", component: CheckboxDoc },
      { title: "Collapsible", path: "/components/collapsible", component: CollapsibleDoc },
      { title: "Context Menu", path: "/components/context-menu", component: ContextMenuDoc },
      { title: "Dialog", path: "/components/dialog", component: DialogDoc },
      { title: "Drawer", path: "/components/drawer", component: DrawerDoc },
      { title: "Dropdown Menu", path: "/components/dropdown-menu", component: DropdownMenuDoc },
      { title: "Empty State", path: "/components/empty-state", component: EmptyStateDoc },
      { title: "Field", path: "/components/field", component: FieldDoc },
      { title: "Input", path: "/components/input", component: InputDoc },
      { title: "Input OTP", path: "/components/input-otp", component: InputOTPDoc },
      { title: "Kbd", path: "/components/kbd", component: KbdDoc },
      { title: "Menubar", path: "/components/menubar", component: MenubarDoc },
      { title: "Meter", path: "/components/meter", component: MeterDoc },
      { title: "Navigation Menu", path: "/components/navigation-menu", component: NavigationMenuDoc },
      { title: "Number Field", path: "/components/number-field", component: NumberFieldDoc },
      { title: "Pagination", path: "/components/pagination", component: PaginationDoc },
      { title: "Popover", path: "/components/popover", component: PopoverDoc },
      { title: "Preview Card", path: "/components/preview-card", component: PreviewCardDoc },
      { title: "Progress", path: "/components/progress", component: ProgressDoc },
      { title: "Radio Group", path: "/components/radio-group", component: RadioGroupDoc },
      { title: "Scroll Area", path: "/components/scroll-area", component: ScrollAreaDoc },
      { title: "Select", path: "/components/select", component: SelectDoc },
      { title: "Separator", path: "/components/separator", component: SeparatorDoc },
      { title: "Skeleton", path: "/components/skeleton", component: SkeletonDoc },
      { title: "Slider", path: "/components/slider", component: SliderDoc },
      { title: "Switch", path: "/components/switch", component: SwitchDoc },
      { title: "Table", path: "/components/table", component: TableDoc },
      { title: "Tabs", path: "/components/tabs", component: TabsDoc },
      { title: "Textarea", path: "/components/textarea", component: TextareaDoc },
      { title: "Toast", path: "/components/toast", component: ToastDoc },
      { title: "Toggle", path: "/components/toggle", component: ToggleDoc },
      { title: "Tooltip", path: "/components/tooltip", component: TooltipDoc },
    ],
  },
];

// Fallback legacy routes included for backward-compatibility if accessed directly
export const legacyRoutes: DocItem[] = [
  { title: "Form Controls", path: "/components/form-controls", component: FormControlsDoc },
  { title: "Overlays & Tooltips", path: "/components/overlays", component: OverlaysDoc },
];

export const allRoutes = [...docSections.flatMap((s) => s.items), ...legacyRoutes];

