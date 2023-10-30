import type { BorderRadius, FontWeight, Screens, Theme } from "../../types"
import colors from "./colors"

const borderRadius: BorderRadius = {
  base: "0.25rem",
  none: "0",
  sm: "calc(var(--rounded) / 2)",
  md: "calc(var(--rounded) * 1.5)",
  lg: "calc(var(--rounded) * 2)",
  xl: "calc(var(--rounded) * 3)",
  "2xl": "calc(var(--rounded) * 4)",
  "3xl": "calc(var(--rounded) * 6)",
  full: "9999px",
}

const fontSize = {
  xs: {
    fontSize: "12px",
    lineHeight: "16px",
  },
  sm: {
    fontSize: "14px",
    lineHeight: "20px",
  },
  base: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  lg: {
    fontSize: "18px",
    lineHeight: "26px",
  },
  xl: {
    fontSize: "20px",
    lineHeight: "28px",
  },
  "2xl": {
    fontSize: "24px",
    lineHeight: "30px",
  },
  "3xl": {
    fontSize: "28px",
    lineHeight: "36px",
  },
  "4xl": {
    fontSize: "35px",
    lineHeight: "40px",
  },
  "5xl": {
    fontSize: "60px",
    lineHeight: "60px",
  },
  default: {
    fontSize: "var(--font-size-base)",
    lineHeight: "var(--line-height-base)",
  },
}

const fontWeight: FontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
  default: "var(--font-normal)",
}

const screens: Screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

const theme: Theme = {
  colors,
  fontWeight,
  fontSize,
  borderRadius,
  spacingScale: 4,
  screens,
}

export default theme
