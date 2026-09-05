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

import ButtonDoc from "./content/components/button.mdx";
import DialogDoc from "./content/components/dialog.mdx";
import CardDoc from "./content/components/card.mdx";
import TabsDoc from "./content/components/tabs.mdx";
import BadgeDoc from "./content/components/badge.mdx";
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
      { title: "Button", path: "/components/button", component: ButtonDoc },
      { title: "Badge", path: "/components/badge", component: BadgeDoc },
      { title: "Card", path: "/components/card", component: CardDoc },
      { title: "Dialog", path: "/components/dialog", component: DialogDoc },
      { title: "Tabs", path: "/components/tabs", component: TabsDoc },
      { title: "Form Controls", path: "/components/form-controls", component: FormControlsDoc },
      { title: "Overlays & Tooltips", path: "/components/overlays", component: OverlaysDoc },
    ],
  },
];

export const allRoutes = docSections.flatMap((s) => s.items);
