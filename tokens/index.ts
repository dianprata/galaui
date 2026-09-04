/**
 * GalaUI Design Tokens Definition & Exports
 * 1:1 Parity with Figma Variables & Tailwind CSS
 */

export const primitiveColors = {
  zinc: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
    950: "#09090B",
    1000: "#000000",
  },
  brand: {
    50: "#EEF2FF",
    100: "#E0E7FF",
    200: "#C7D2FE",
    300: "#A5B4FC",
    400: "#818CF8",
    500: "#6366F1",
    600: "#4F46E5",
    700: "#4338CA",
    800: "#3730A3",
    900: "#312E81",
    950: "#1E1B4B",
  },
  destructive: {
    500: "#EF4444",
    600: "#DC2626",
  },
  success: {
    500: "#22C55E",
    600: "#16A34A",
  },
  warning: {
    500: "#F59E0B",
    600: "#D97706",
  },
  info: {
    500: "#0EA5E9",
    600: "#0284C7",
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

export const semanticTokens = {
  light: {
    bg: {
      default: primitiveColors.zinc[0],
      subtle: primitiveColors.zinc[50],
      canvas: primitiveColors.zinc[100],
      inverse: primitiveColors.zinc[900],
    },
    text: {
      default: primitiveColors.zinc[900],
      muted: primitiveColors.zinc[500],
      subtle: primitiveColors.zinc[400],
      inverse: primitiveColors.zinc[0],
    },
    primary: {
      default: primitiveColors.brand[600],
      hover: primitiveColors.brand[700],
      active: primitiveColors.brand[800],
      foreground: primitiveColors.zinc[0],
    },
    border: {
      default: primitiveColors.zinc[200],
      subtle: primitiveColors.zinc[100],
      focus: primitiveColors.brand[500],
    },
    destructive: {
      default: primitiveColors.destructive[500],
      foreground: primitiveColors.zinc[0],
    },
  },
  dark: {
    bg: {
      default: primitiveColors.zinc[950],
      subtle: primitiveColors.zinc[900],
      canvas: primitiveColors.zinc[900],
      inverse: primitiveColors.zinc[50],
    },
    text: {
      default: primitiveColors.zinc[50],
      muted: primitiveColors.zinc[400],
      subtle: primitiveColors.zinc[500],
      inverse: primitiveColors.zinc[950],
    },
    primary: {
      default: primitiveColors.brand[500],
      hover: primitiveColors.brand[400],
      active: primitiveColors.brand[300],
      foreground: primitiveColors.zinc[0],
    },
    border: {
      default: primitiveColors.zinc[800],
      subtle: primitiveColors.zinc[900],
      focus: primitiveColors.brand[400],
    },
    destructive: {
      default: primitiveColors.destructive[600],
      foreground: primitiveColors.zinc[0],
    },
  },
} as const;

export type PrimitiveColor = typeof primitiveColors;
export type SpacingToken = typeof spacing;
export type BorderRadiusToken = typeof borderRadius;
export type ComponentSizeToken = typeof componentSizes;
export type SemanticTokens = typeof semanticTokens;
