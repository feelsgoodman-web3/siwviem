import type { PropDef } from "../../definitions/types"

export const direction = ["row", "row-reverse", "col", "col-reverse"] as const
export const wrap = ["nowrap", "wrap", "wrap-reverse"] as const

export const flexPropDefs = {
  direction: {
    type: "enum",
    values: direction,
    default: undefined,
    responsive: true,
  },
  wrap: { type: "enum", values: wrap, default: undefined, responsive: true },
} satisfies {
  direction: PropDef<typeof direction[number]>
  wrap: PropDef<typeof wrap[number]>
}
