import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

const colorScale = 12;
const getColor = (color: string, scale: number, alpha?: boolean) => {
  const colors = Array.from(Array(scale).keys()).reduce((acc, _, i) => {
    acc[i + 1] = `var(--${color}-${alpha ? "a" : ""}${i + 1})`;
    return acc;
  }, {} as Record<number | string, string>) as Record<string | number, string>;
  if (!alpha) {
    colors[`9-contrast`] = `var(--${color}-9-contrast)`;
    colors["surface"] = `var(--${color}-surface)`;
  }

  return colors;
};
export default plugin(
  function () {
    // empty
  },
  {
    prefix: "fs-",
    theme: {
      ...defaultTheme,
      colors: {
        accent: getColor("accent", colorScale),
        gray: getColor("gray", colorScale),
        transparent: "transparent",
        overlay: "var(--color-overlay)",
        "panel-solid": "var(--color-panel-solid)",
        "panel-alpha": "var(--color-panel-alpha)",
        surface: "var(--color-surface)",
        panel: "var(--color-panel)",
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
  }
);
