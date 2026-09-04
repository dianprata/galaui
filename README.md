# @galaui/react

A modern, accessible React component library and design system powered by **[@base-ui/react](https://base-ui.com/)**, **Tailwind CSS v4 (CSS-first / Zero Config)**, and pure CSS variables for complete token and theme customizability.

---

## 📦 Installation

Install the package via your favorite package manager:

```bash
# npm
npm install @galaui/react

# pnpm
pnpm add @galaui/react

# yarn
yarn add @galaui/react

# bun
bun add @galaui/react
```

---

## 🚀 Quick Start

### 1. Import Stylesheet

Import the GalaUI stylesheet at the root of your application (e.g. `main.tsx`, `App.tsx`, or Next.js `layout.tsx`):

```tsx
import "@galaui/react/styles.css";
```

### 2. Use Components

```tsx
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
} from "@galaui/react";

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" size="md">
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>GalaUI Dialog</DialogTitle>
          <DialogDescription>
            Fully accessible Base UI dialog powered by Tailwind CSS v4.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" size="sm">Cancel</Button>
          </DialogClose>
          <Button variant="default" size="sm">Confirm</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
```

---

## 🎨 Full Design Token & Theme Customization

GalaUI design tokens (Typography, Corner Radii, Component Sizing, and Semantic Colors) are driven 100% by CSS Custom Variables. You can customize them directly in your project's `globals.css`:

```css
@import "@galaui/react/styles.css";

/* Customize Light Mode & Global Tokens */
:root {
  /* 1. Typography */
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* 2. Border Radius Scale */
  --radius: 12px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  /* 3. Brand / Semantic Colors */
  --primary: #4F46E5;
  --primary-hover: #4338CA;
  --primary-active: #3730A3;
  --primary-foreground: #FFFFFF;

  --background: #FFFFFF;
  --foreground: #09090B;
  --border: #E4E4E7;
}

/* Customize Dark Mode */
.dark {
  --primary: #6366F1;
  --primary-hover: #818CF8;
  --background: #09090B;
  --foreground: #FAFAFA;
  --border: #27272A;
}
```

---

## 🛠 Development & Local Workbench

To run the local interactive component test bench and playground:

```bash
# Start dev server
npm run dev

# Build library for publishing
npm run build:lib

# Build standalone playground HTML
npm run build:app
```

---

## 🚀 Publishing to npm

1. Login to your npm account:
   ```bash
   npm login
   ```

2. Publish to npm (public access is free):
   ```bash
   npm publish --access public
   ```

---

## 📄 License

MIT © [GalaUI](LICENSE)
