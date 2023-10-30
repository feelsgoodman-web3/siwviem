import type { ColorRamp } from "../types"

export default function mapColorRamp(
  color: string,
  values: ColorRamp,
  isAlpha = false,
) {
  return Object.entries(values).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      const colorKey = isAlpha ? `a${key}` : key
      acc[`--${color}-${colorKey}`] = value

      return acc
    },
    {},
  )
}
