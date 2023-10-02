import { SPACING_SCALE } from "../constants";
import { makeSafeList } from "../utils";

import { paddingDefs, PaddingDefs } from "./padding.props";
import { marginDefs, MarginDefs } from "./margin.props";
import { positionDefs, PositionDefs } from "./position.props";
import { PropDef } from "./types";

const alignSelf = ["auto", "center", "end", "start", "stretch"] as const;

const content = [
  "around",
  "baseline",
  "between",
  "center",
  "end",
  "evenly",
  "normal",
  "start",
  "stretch",
] as const;

const items = ["center", "end", "normal", "start", "stretch"] as const;

const justify = [
  "center",
  "end",
  "normal",
  "space-around",
  "space-between",
  "space-evenly",
  "start",
] as const;

const justifyItems = items; // They have the same values

const justifySelf = alignSelf; // They have the same values

const placeContent = [
  "around",
  "baseline",
  "between",
  "center",
  "end",
  "evenly",
  "start",
  "stretch",
] as const;

const gap = SPACING_SCALE;
const gapY = gap;
const gapX = gap;

const display = [
  "block",
  "inline-block",
  "inline",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "table",
  "table-row",
  "table-cell",
  "none",
] as const;

const spaceX = [...SPACING_SCALE, "reverse"] as const;
const spaceY = [...SPACING_SCALE, "reverse"] as const;

export interface BoxDefs extends PaddingDefs, MarginDefs, PositionDefs {
  alignSelf: PropDef<(typeof alignSelf)[number]>;
  content: PropDef<(typeof content)[number]>;
  display: PropDef<(typeof display)[number]>;
  gap: PropDef<(typeof gap)[number]>;
  gapX: PropDef<(typeof gapX)[number]>;
  gapY: PropDef<(typeof gapY)[number]>;
  items: PropDef<(typeof items)[number]>;
  justify: PropDef<(typeof justify)[number]>;
  justifyItems: PropDef<(typeof justifyItems)[number]>;
  justifySelf: PropDef<(typeof justifySelf)[number]>;
  spaceX: PropDef<(typeof spaceX)[number]>;
  spaceY: PropDef<(typeof spaceY)[number]>;
  placeContent: PropDef<(typeof placeContent)[number]>;
}

export const boxDefs: BoxDefs = {
  ...paddingDefs,
  ...positionDefs,
  ...marginDefs,
  content: {
    type: "enum",
    values: content,
    default: undefined,
    responsive: true,
  },
  display: {
    type: "enum",
    values: display,
    default: undefined,
    responsive: true,
  },
  gap: { type: "enum", values: gap, default: undefined, responsive: true },
  gapX: { type: "enum", values: gapX, default: undefined, responsive: true },
  gapY: { type: "enum", values: gapY, default: undefined, responsive: true },
  items: { type: "enum", values: items, default: undefined, responsive: true },
  placeContent: {
    type: "enum",
    values: placeContent,
    default: undefined,
    responsive: true,
  },
  justify: {
    type: "enum",
    values: justify,
    default: undefined,
    responsive: true,
  },
  justifyItems: {
    type: "enum",
    values: justifyItems,
    default: undefined,
    responsive: true,
  },
  justifySelf: {
    type: "enum",
    values: justifySelf,
    default: undefined,
    responsive: true,
  },
  spaceX: {
    type: "enum",
    values: spaceX,
    default: undefined,
    responsive: true,
  },
  spaceY: {
    type: "enum",
    values: spaceY,
    default: undefined,
    responsive: true,
  },
  alignSelf: {
    type: "enum",
    values: alignSelf,
    default: undefined,
    responsive: true,
  },
};

export const boxSafeList = [
  makeSafeList("self", alignSelf),
  makeSafeList("content", content),
  makeSafeList("", display),
  makeSafeList("gap", gap),
  makeSafeList("gap-x", gapX),
  makeSafeList("gap-y", gapY),
  makeSafeList("items", items),
  makeSafeList("justify", justify),
  makeSafeList("justify-items", justifyItems),
  makeSafeList("justify-self", justifySelf),
  makeSafeList("place-content", placeContent),
  makeSafeList("space-x", spaceX),
  makeSafeList("space-y", spaceY),
];
