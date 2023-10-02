import { PropDef } from "./types";
import { marginDefs, MarginDefs } from "./margin.props";
import { makeSafeList } from "../utils";

export const size = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
] as const;

export const weight = [
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
] as const;

const alignValues = ["left", "center", "right"] as const;

export interface TypographyDefs extends MarginDefs {
  size: PropDef<(typeof size)[number]>;
  weight: PropDef<(typeof weight)[number]>;
  align: PropDef<(typeof alignValues)[number]>;
  highContrast: PropDef<boolean>;
}

export const typographyDefs = {
  ...marginDefs,
  size: { type: "enum", values: size, default: "base", responsive: true },
  weight: { type: "enum", values: weight, default: "normal", responsive: true },
  align: {
    type: "enum",
    values: alignValues,
    default: undefined,
    responsive: true,
  },
  highContrast: { type: "boolean", default: false },
} satisfies TypographyDefs;

export const typographySafeList = [
  makeSafeList("text", size),
  makeSafeList("font", weight),
  makeSafeList("text", alignValues),
];
