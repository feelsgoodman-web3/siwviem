import type { BorderRadius } from "../types"

export default function getBorderRadius(borderRadius: BorderRadius) {
  return {
    "--rounded": borderRadius.base,
    "--rounded-none": borderRadius.none,
    "--rounded-sm": borderRadius.sm,
    "--rounded-md": borderRadius.md,
    "--rounded-lg": borderRadius.lg,
    "--rounded-xl": borderRadius.xl,
    "--rounded-2xl": borderRadius["2xl"],
    "--rounded-3xl": borderRadius["3xl"],
    "--rounded-full": borderRadius.full,
  }
}

export function getBorderRadiusDefs(borderRadius: BorderRadius) {
  return {
    none: `var(--rounded-none, ${borderRadius.none})`,
    sm: `var(--rounded-sm, ${borderRadius.sm})`,
    DEFAULT: `var(--rounded, ${borderRadius.base})`,
    md: `var(--rounded-md, ${borderRadius.md})`,
    lg: `var(--rounded-lg, ${borderRadius.lg})`,
    xl: `var(--rounded-xl, ${borderRadius.xl})`,
    "2xl": `var(--rounded-2xl, ${borderRadius["2xl"]})`,
    "3xl": `var(--rounded-3xl, ${borderRadius["3xl"]})`,
    full: `var(--rounded-full, ${borderRadius.full})`,
  }
}
