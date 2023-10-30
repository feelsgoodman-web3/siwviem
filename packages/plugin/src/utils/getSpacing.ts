import { SPACING_SCALE } from "../constants"
import type { Spacing, SpacingVars } from "../types"

export default function getSpacing() {
  return SPACING_SCALE.reduce<SpacingVars>((acc, cur) => {
    const key = cur.toString().replace(".", "-")

    return {
      ...acc,
      [`--spacing-${key}`]:
        typeof cur === "string"
          ? "1px"
          : `calc(var(--spacing-scale, 4) * ${cur})`,
    }
  }, {} as SpacingVars)
}

export function getSpacingDefs() {
  const scale = getSpacing()

  return SPACING_SCALE.reduce<Spacing>((acc, cur) => {
    const key = cur.toString().replace(".", "-")
    return {
      ...acc,
      [cur]: `var(--spacing-${key}, ${
        scale[`--spacing-${key}` as keyof typeof scale]
      })`,
    }
  }, {} as Spacing)
}
