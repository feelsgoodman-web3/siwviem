import type { PropDef } from "../../definitions/types";
import { makeSafeList } from "../../utils";

const direction = ["row", "row-reverse", "col", "col-reverse"] as const;
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

export const flexSafeList = [
  makeSafeList("flex", wrap),
  makeSafeList("flex", direction),
];
