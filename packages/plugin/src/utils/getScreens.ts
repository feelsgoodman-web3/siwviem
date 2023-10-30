import type { Screens } from "../types"

export default function getScreens(screens: Screens) {
  return {
    ["--screen-sm"]: screens.sm,
    ["--screen-md"]: screens.md,
    ["--screen-lg"]: screens.lg,
    ["--screen-xl"]: screens.xl,
    ["--screen-2xl"]: screens["2xl"],
  }
}

export function getScreensDef(screens: Screens) {
  return {
    sm: screens.sm,
    md: screens.md,
    lg: screens.lg,
    xl: screens.xl,
    ["2xl"]: screens["2xl"],
  }
}
