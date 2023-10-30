import { SPACING_SCALE } from "@feelsgoodman/fs-plugin"

import { MarginDefs, marginDefs } from "./margin.props"
import { PaddingDefs, paddingDefs } from "./padding.props"
import { PositionDefs, positionDefs } from "./position.props"
import { PropDef } from "./types"

export const alignSelf = ["auto", "center", "end", "start", "stretch"] as const

export const content = [
  "around",
  "baseline",
  "between",
  "center",
  "end",
  "evenly",
  "normal",
  "start",
  "stretch",
] as const

export const items = ["center", "end", "normal", "start", "stretch"] as const

export const justify = [
  "center",
  "end",
  "normal",
  "space-around",
  "space-between",
  "space-evenly",
  "start",
] as const

export const justifyItems = items // They have the same values

export const justifySelf = alignSelf // They have the same values

export const placeContent = [
  "around",
  "baseline",
  "between",
  "center",
  "end",
  "evenly",
  "start",
  "stretch",
] as const

export const gap = SPACING_SCALE
export const gapY = gap
export const gapX = gap

export const display = [
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
] as const

export const spaceX = [...SPACING_SCALE, "reverse"] as const
export const spaceY = [...SPACING_SCALE, "reverse"] as const

export interface BoxDefs extends PaddingDefs, MarginDefs, PositionDefs {
  alignSelf: PropDef<typeof alignSelf[number]>
  content: PropDef<typeof content[number]>
  display: PropDef<typeof display[number]>
  gap: PropDef<typeof gap[number]>
  gapX: PropDef<typeof gapX[number]>
  gapY: PropDef<typeof gapY[number]>
  items: PropDef<typeof items[number]>
  justify: PropDef<typeof justify[number]>
  justifyItems: PropDef<typeof justifyItems[number]>
  justifySelf: PropDef<typeof justifySelf[number]>
  spaceX: PropDef<typeof spaceX[number]>
  spaceY: PropDef<typeof spaceY[number]>
  placeContent: PropDef<typeof placeContent[number]>
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
}
