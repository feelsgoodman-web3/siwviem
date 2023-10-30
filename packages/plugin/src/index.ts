import twDefaultTheme from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

import { defaultTheme } from "./themes"
import type { Options } from "./types"
import {
  deepMerge,
  getBorderRadius,
  getBorderRadiusDefs,
  getColor,
  getFontSize,
  getFontSizeDefs,
  getFontWeight,
  getFontWeightDef,
  getRamp,
  getScreens,
  getScreensDef,
  getSpacing,
  getSpacingDefs,
} from "./utils"

const colorScale = 12

const frogspawnPlugin = plugin.withOptions<Options>(
  (theme) => ({ addBase, addComponents }) => {
    const mergedOptions = deepMerge(defaultTheme, theme)

    const light = getRamp(mergedOptions.colors.light)
    const dark = getRamp(mergedOptions.colors.dark)
    const borderRadius = getBorderRadius(mergedOptions.borderRadius)
    const fontWeight = getFontWeight(mergedOptions.fontWeight)
    const fontSize = getFontSize(mergedOptions.fontSize)
    const spacing = getSpacing()
    const screens = getScreens(mergedOptions.screens)

    addComponents({
      ".code": {
        "--variant-font-adjust": "0.96",
      },
    })

    addBase({
      ":root": {
        ...light,
        ...borderRadius,
        ...fontWeight,
        ...fontSize,
        "--spacing-scale": `${mergedOptions.spacingScale}px`,
        ...spacing,
        ...screens,
        "--variant-font-adjust": "1",
        backgroundColor: "var(--color-background)",
        color: "var(--text-color)",
        fontSize: "var(--default-font-size)",
        lineHeight: "var(--default-line-height)",
        fontWeight: "var(--default-font-weight)",
        '&:not(.light-theme):not(.light):not([data-theme="light"])': {
          "@media (prefers-color-scheme: dark)": dark,
        },
      },
      ':root.dark, :root.dark-theme, :root[data-theme="dark"]': dark,
    })
  },
  (theme) => {
    const mergedOptions = deepMerge(defaultTheme, theme)
    const borderRadius = getBorderRadiusDefs(mergedOptions.borderRadius)
    const fontWeight = getFontWeightDef(mergedOptions.fontWeight)
    const fontSize = getFontSizeDefs(mergedOptions.fontSize)
    const spacing = getSpacingDefs()
    const screens = getScreensDef(mergedOptions.screens)

    return {
      prefix: "fs-",
      safelist: [
        {
          pattern: /\b(dark|dark-theme|light|light-theme)\b/,
        },
      ],
      theme: {
        ...twDefaultTheme,
        colors: {
          accent: getColor("accent", colorScale),
          "accent-a": getColor("accent", colorScale, true),
          blue: getColor("blue", colorScale),
          "blue-a": getColor("blue", colorScale, true),
          gray: getColor("gray", colorScale),
          "gray-a": getColor("gray", colorScale, true),
          green: getColor("green", colorScale),
          "green-a": getColor("green", colorScale, true),
          orange: getColor("orange", colorScale),
          "orange-a": getColor("orange", colorScale, true),
          purple: getColor("purple", colorScale),
          "purple-a": getColor("purple", colorScale, true),
          red: getColor("red", colorScale),
          "red-a": getColor("red", colorScale, true),
          yellow: getColor("yellow", colorScale),
          "yellow-a": getColor("yellow", colorScale, true),
          transparent: "transparent",
          overlay: "var(--color-overlay)",
          "panel-solid": "var(--color-panel-solid)",
        },
        spacing,
        screens,
        borderRadius,
        fontWeight,
        fontSize,
      },
    }
  },
)

export { SPACING_SCALE } from "./constants"
export default frogspawnPlugin
