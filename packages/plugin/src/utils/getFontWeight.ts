import type { FontWeight } from "../types"

export default function getFontWeight(fontWeight: FontWeight) {
  return {
    "--font-thin": fontWeight.thin,
    "--font-extralight": fontWeight.extralight,
    "--font-light": fontWeight.light,
    "--font-normal": fontWeight.normal,
    "--font-medium": fontWeight.medium,
    "--font-semibold": fontWeight.semibold,
    "--font-bold": fontWeight.bold,
    "--font-extrabold": fontWeight.extrabold,
    "--font-black": fontWeight.black,
    "--default-font-weight": fontWeight.default,
  }
}

export function getFontWeightDef(fontWeight: FontWeight) {
  return {
    thin: `var(--font-thin, ${fontWeight.thin})`,
    extralight: `var(--font-extralight, ${fontWeight.extralight})`,
    light: `var(--font-light, ${fontWeight.light})`,
    normal: `var(--font-normal, ${fontWeight.normal})`,
    medium: `var(--font-medium, ${fontWeight.medium})`,
    semibold: `var(--font-semibold, ${fontWeight.semibold})`,
    bold: `var(--font-bold, ${fontWeight.bold})`,
    extrabold: `var(--font-extrabold, ${fontWeight.extrabold})`,
    black: `var(--font-black, ${fontWeight.black})`,
  }
}
