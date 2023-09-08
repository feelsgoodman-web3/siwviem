import { SPACING_SCALE } from "src/constants";
import { PropDef } from "src/definitions/types";

const insert = [
  ...SPACING_SCALE,
  "full",
  "auto",
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "2/4",
  "3/4",
] as const;

const insetX = insert;
const insetY = insert;
const start = insert;
const end = insert;
const top = insert;
const bottom = insert;
const left = insert;
const right = insert;

const position = ["static", "relative", "absolute", "fixed", "sticky"] as const;

export interface PositionDefs {
  position: PropDef<(typeof position)[number]>;
  inset: PropDef<(typeof insetX)[number]>;
  insetX: PropDef<(typeof insetX)[number]>;
  insetY: PropDef<(typeof insetY)[number]>;
  start: PropDef<(typeof start)[number]>;
  end: PropDef<(typeof end)[number]>;
  top: PropDef<(typeof top)[number]>;
  bottom: PropDef<(typeof bottom)[number]>;
  left: PropDef<(typeof left)[number]>;
  right: PropDef<(typeof right)[number]>;
}

export const positionDefs: PositionDefs = {
  position: {
    type: "enum",
    values: position,
    default: undefined,
    responsive: true,
  },
  inset: { type: "enum", values: insert, default: undefined, responsive: true },
  insetX: {
    type: "enum",
    values: insetX,
    default: undefined,
    responsive: true,
  },
  insetY: {
    type: "enum",
    values: insetY,
    default: undefined,
    responsive: true,
  },
  start: { type: "enum", values: start, default: undefined, responsive: true },
  end: { type: "enum", values: end, default: undefined, responsive: true },
  top: { type: "enum", values: top, default: undefined, responsive: true },
  bottom: {
    type: "enum",
    values: bottom,
    default: undefined,
    responsive: true,
  },
  left: { type: "enum", values: left, default: undefined, responsive: true },
  right: { type: "enum", values: right, default: undefined, responsive: true },
};
