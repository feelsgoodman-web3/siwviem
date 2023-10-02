import plugin from "tailwindcss/plugin";
import twDefaultTheme from "tailwindcss/defaultTheme";

import {
  boxSafeList,
  marginSafeList,
  paddingSafeList,
  typographySafeList,
} from "../definitions";
import { positionSafeList } from "../definitions/position.props";
import { flexSafeList } from "../components/Flex/props";
import { Options } from "./types";
import {
  deepMerge,
  getBorderRadius,
  getColor,
  getFontSize,
  getFontWeight,
  getRamp,
} from "./utils";
import { defaultTheme } from "./themes";

const colorScale = 12;

const frogspawnPlugin = plugin.withOptions<Options>(
  (theme) =>
    ({ addBase }) => {
      const mergedOptions = deepMerge(defaultTheme, theme);

      const light = getRamp(mergedOptions.colors.light);
      const dark = getRamp(mergedOptions.colors.dark);
      const borderRadius = getBorderRadius(mergedOptions.borderRadius);
      const fontWeight = getFontWeight(mergedOptions.fontWeight);
      const fontSize = getFontSize(mergedOptions.fontSize);

      addBase({
        ":root": {
          ...light,
          ...borderRadius,
          ...fontWeight,
          ...fontSize,
          backgroundColor: "var(--color-background)",
          color: "var(--text-color)",
          fontSize: "var(--default-font-size)",
          lineHeight: "var(--default-line-height)",
          fontWeight: "var(--default-font-weight)",
          "&:not(.light-theme):not(.light)": {
            "@media (prefers-color-scheme: dark)": dark,
          },
        },
        ":root.dark, :root.dark-theme": dark,
      });
    },
  () => ({
    prefix: "fs-",
    safelist: [
      ...boxSafeList,
      ...marginSafeList,
      ...paddingSafeList,
      ...positionSafeList,
      ...typographySafeList,
      ...flexSafeList,
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
      borderRadius: {
        none: "var(--rounded-none)",
        sm: "var(--rounded-sm)",
        DEFAULT: "var(--rounded)",
        md: "var(--rounded-md)",
        lg: "var(--rounded-lg)",
        xl: "var(--rounded-xl)",
        "2xl": "var(--rounded-2xl)",
        "3xl": "var(--rounded-3xl)",
        full: "var(--rounded-full)",
      },
      fontWeight: {
        thin: "var(--font-thin)",
        extralight: "var(--font-extralight)",
        light: "var(--font-light)",
        normal: "var(--font-normal)",
        medium: "var(--font-medium)",
        semibold: "var(--font-semibold)",
        bold: "var(--font-bold)",
        extrabold: "var(--font-extrabold)",
        black: "var(--font-black)",
      },
      fontSize: {
        xs: ["var(--font-size-xs)", "var(--line-height-xs)"],
        sm: ["var(--font-size-sm)", "var(--line-height-sm)"],
        base: ["var(--font-size-base)", "var(--line-height-base)"],
        lg: ["var(--font-size-lg)", "var(--line-height-lg)"],
        xl: ["var(--font-size-xl)", "var(--line-height-xl)"],
        "2xl": ["var(--font-size-2xl)", "var(--line-height-2xl)"],
        "3xl": ["var(--font-size-3xl)", "var(--line-height-3xl)"],
        "4xl": ["var(--font-size-4xl)", "var(--line-height-4xl)"],
        "5xl": ["var(--font-size-5xl)", "var(--line-height-5xl)"],
      },
    },
  })
);

export default frogspawnPlugin;
