import type { PropDef } from "src/definitions/types";

const direction = ["row", "row-reverse", "column", "column-reverse"] as const;
const wrap = ["nowrap", "wrap", "wrap-reverse"] as const;

export const flexPropDefs = {
  direction: {
    type: "enum",
    values: direction,
    default: undefined,
    responsive: true,
  },
  wrap: { type: "enum", values: wrap, default: undefined, responsive: true },
} satisfies {
  direction: PropDef<(typeof direction)[number]>;
  wrap: PropDef<(typeof wrap)[number]>;
};
