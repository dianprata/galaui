# GalaUI — Base UI & Tailwind CSS v4 Design System & React Playground

A modern, production-ready Design System & Component Library powered by **[@base-ui/react](https://base-ui.com/)**, **Tailwind CSS v4 (Pure CSS-First / Zero Config)**, and the compiled **[`cn`](https://github.com/shadcn-ui/cn)** package (`npm i cn`), maintaining a 1:1 token parity with **Figma Local Variables** and **Tokens Studio**.

---

## 🌟 Tech Stack & Architecture

- **Base UI Engine**: [`@base-ui/react`](https://base-ui.com/) — Headless, fully accessible WAI-ARIA compliant UI primitives.
- **Styling Engine**: **Tailwind CSS v4** — CSS-First configuration with native `@theme` directives (no `tailwind.config.js` required).
- **Class Merging**: [`cn`](https://github.com/shadcn-ui/cn) via `npm i cn` — fast, small, compiled drop-in replacement for `twMerge(clsx(...))`.
- **Live React Playground**: Built with **Vite + React 19** for live component testing and interactive state inspection.
- **Figma Variables**: Dual-layer architecture:
  - **`Primitives` Collection**: Raw Zinc, Brand Indigo, and Status values (Hidden from publishing).
  - **`Semantics` Collection**: `Light` and `Dark` modes mapped to primitive aliases.

---

## 🚀 Quick Start (React Playground & Dev Server)

```bash
# 1. Jalankan development server lokal
npm run dev

# 2. Build untuk production
npm run build
```

Aplikasi playground interaktif akan berjalan di `http://localhost:5173`.

---

## 📁 Repository Structure

```
galaui/
├── src/
│   ├── App.tsx                      # Interactive React Component Playground & Test Workbench
│   ├── main.tsx                     # React application root entrypoint
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx           # Button (Variants + Sizes with cva & cn)
│   │       ├── dialog.tsx           # Base UI Dialog (Root, Trigger, Backdrop, Popup, Title, Close)
│   │       ├── popover.tsx          # Base UI Popover (Root, Trigger, Positioner, Popup)
│   │       ├── dropdown-menu.tsx    # Base UI Menu (Root, Trigger, Item, Separator)
│   │       ├── switch.tsx           # Base UI Switch (Root, Thumb)
│   │       ├── checkbox.tsx         # Base UI Checkbox (Root, Indicator)
│   │       ├── radio-group.tsx      # Base UI RadioGroup (Root, Item, Indicator)
│   │       ├── tooltip.tsx          # Base UI Tooltip (Root, Trigger, Positioner, Popup)
│   │       ├── accordion.tsx        # Base UI Accordion (Root, Item, Trigger, Panel)
│   │       ├── tabs.tsx             # Base UI Tabs (Root, List, Tab, Panel)
│   │       ├── select.tsx           # Base UI Select (Root, Trigger, Popup, Item)
│   │       ├── avatar.tsx           # Base UI Avatar (Root, Image, Fallback)
│   │       ├── slider.tsx           # Base UI Slider (Root, Track, Indicator, Thumb)
│   │       ├── input.tsx            # Input & Textarea
│   │       ├── badge.tsx            # Badge (Variants with cva & cn)
│   │       ├── card.tsx             # Card (Header, Title, Description, Content, Footer)
│   │       └── separator.tsx        # Base UI Separator
│   ├── lib/
│   │   └── utils.ts                 # Re-exporting from 'cn' package (npm i cn)
│   ├── styles/
│   │   └── globals.css              # Pure CSS-first Tailwind v4 @import "tailwindcss" & @theme
│   └── index.ts                     # Full component & utility exports
├── tokens/
│   ├── tokens.json                  # Tokens Studio for Figma ($themes Light & Dark)
│   ├── figma-variables.json         # Figma Local Variables Schema (REST API / Plugin format)
│   └── index.ts                     # Type-safe TypeScript token definitions
├── designs/
│   ├── playground.html              # Standalone React Playground Build
│   └── design-system-showcase.html  # Interactive Standalone UI Showcase
├── vite.config.ts                   # Vite configuration with @tailwindcss/vite
├── package.json
└── tsconfig.json
```
