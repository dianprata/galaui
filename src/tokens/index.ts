/**
 * GalaUI Design Tokens Definition & Exports
 * 1:1 Parity with Figma Variables & Tailwind CSS
 */

export const primitiveColors = {
 zinc: {
   0: "#FFFFFF",
    50: "#F8F9FA",
    100: "#F1F3F5",
    200: "#E9ECEF",
    300: "#DEE2E6",
    400: "#CED4DA",
    500: "#868E96",
    600: "#495057",
    700: "#343A40",
    800: "#212529",
    900: "#111113",
    950: "#000000",
    1000: "#000000",
  },
  brand: {
    50: "#EEF4FF",
    100: "#D8E6FF",
    200: "#B9D2FE",
    300: "#8AB4FC",
    400: "#558FF8",
    500: "#2F6FED",
    600: "#1D54DB",
    700: "#143EB0",
    800: "#12348E",
    900: "#142F73",
    950: "#0C1C45",
  },
  destructive: {
    500: "#E03131",
    600: "#C92A2A",
  },
  success: {
    500: "#2F9E44",
    600: "#2B8A3E",
  },
  warning: {
    500: "#F08C00",
    600: "#E67700",
  },
  info: {
    500: "#1971C2",
    600: "#1864AB",
  },
} as const;

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
} as const;

export const borderRadius = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
} as const;

export const componentSizes = {
  xs: "24px",
  sm: "28px",
  default: "32px",
  md: "32px",
  lg: "36px",
} as const;

export const typography = {
  fontSans: '"Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontMono: '"Geist Mono", "JetBrains Mono", monospace',
} as const;

export const semanticTokens = {
  light: {
    bg: {
      default: "#FCFCFD",
      subtle: "#F8F9FA",
      canvas: "#F1F3F5",
      card: "#FFFFFF",
      popover: "#FFFFFF",
      inverse: "#121417",
    },
    text: {
      default: "#121417",
      muted: "#6C757D",
      subtle: "#ADB5BD",
      inverse: "#FFFFFF",
    },
    primary: {
      default: "#1D54DB",
      hover: "#143EB0",
      active: "#12348E",
      foreground: "#FFFFFF",
    },
    secondary: {
      default: "#E9ECEF",
      foreground: "#121417",
    },
    border: {
      default: "#E4E7EB",
      subtle: "#EEF0F3",
      focus: "#1D54DB",
    },
    destructive: {
      default: "#E03131",
      foreground: "#FFFFFF",
    },
    success: {
      default: "#2F9E44",
      foreground: "#FFFFFF",
    },
    warning: {
      default: "#F08C00",
      foreground: "#FFFFFF",
    },
    info: {
      default: "#1971C2",
      foreground: "#FFFFFF",
    },
  },
  dark: {
    bg: {
      default: "#000000",
      subtle: "#111113",
      canvas: "#161619",
      card: "#111113",
      popover: "#111113",
      inverse: "#EDEDF0",
    },
    text: {
      default: "#EDEDF0",
      muted: "#94949E",
      subtle: "#52525C",
      inverse: "#000000",
    },
    primary: {
      default: "#2F6FED",
      hover: "#558FF8",
      active: "#8AB4FC",
      foreground: "#FFFFFF",
    },
    secondary: {
      default: "#1C1C20",
      foreground: "#EDEDF0",
    },
    border: {
      default: "#242429",
      subtle: "#18181C",
      focus: "#2F6FED",
    },
    destructive: {
      default: "#F03E3E",
      foreground: "#FFFFFF",
    },
    success: {
      default: "#37B24D",
      foreground: "#FFFFFF",
    },
    warning: {
      default: "#F59F00",
      foreground: "#FFFFFF",
    },
    info: {
      default: "#1C7ED6",
      foreground: "#FFFFFF",
    },
  },
} as const;

export const cssVariables = {
  light: {
    background: "#FCFCFD",
    foreground: "#121417",
    muted: "#F1F3F5",
    mutedForeground: "#6C757D",
    subtleForeground: "#ADB5BD",
    secondary: "#E9ECEF",
    secondaryForeground: "#121417",
    popover: "#FFFFFF",
    popoverForeground: "#121417",
    card: "#FFFFFF",
    cardForeground: "#121417",
    primary: "#1D54DB",
    primaryHover: "#143EB0",
    primaryActive: "#12348E",
    primaryForeground: "#FFFFFF",
    border: "#E4E7EB",
    borderSubtle: "#EEF0F3",
    input: "#F8F9FA",
    ring: "#1D54DB",
    destructive: "#E03131",
    destructiveForeground: "#FFFFFF",
    success: "#2F9E44",
    successForeground: "#FFFFFF",
    warning: "#F08C00",
    warningForeground: "#FFFFFF",
    info: "#1971C2",
    infoForeground: "#FFFFFF",
  },
  dark: {
    background: "#000000",
    foreground: "#EDEDF0",
    muted: "#161619",
    mutedForeground: "#94949E",
    subtleForeground: "#52525C",
    secondary: "#1C1C20",
    secondaryForeground: "#EDEDF0",
    popover: "#111113",
    popoverForeground: "#EDEDF0",
    card: "#111113",
    cardForeground: "#EDEDF0",
    primary: "#2F6FED",
    primaryHover: "#558FF8",
    primaryActive: "#8AB4FC",
    primaryForeground: "#FFFFFF",
    border: "#242429",
    borderSubtle: "#18181C",
    input: "#111113",
    ring: "#2F6FED",
    destructive: "#F03E3E",
    destructiveForeground: "#FFFFFF",
    success: "#37B24D",
    successForeground: "#FFFFFF",
    warning: "#F59F00",
    warningForeground: "#FFFFFF",
    info: "#1C7ED6",
    infoForeground: "#FFFFFF",
  },
} as const;

export type CssVariables = typeof cssVariables;

export type PrimitiveColor = typeof primitiveColors;
export type SpacingToken = typeof spacing;
export type BorderRadiusToken = typeof borderRadius;
export type ComponentSizeToken = typeof componentSizes;
export type SemanticTokens = typeof semanticTokens;
