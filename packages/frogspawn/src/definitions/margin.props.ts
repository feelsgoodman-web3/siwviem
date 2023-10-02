import { SPACING_SCALE } from "../constants";

import { PropDef } from "./types";
import { makeSafeList } from "../utils";

export const m = [...SPACING_SCALE, "auto"] as const;
export const mx = m;
export const my = m;
export const mt = m;
export const mr = m;
export const mb = m;
export const ml = m;
export const ms = m;
export const me = m;

export interface MarginDefs {
  m: PropDef<(typeof m)[number]>;
  mb: PropDef<(typeof mb)[number]>;
  me: PropDef<(typeof me)[number]>;
  ml: PropDef<(typeof ml)[number]>;
  mr: PropDef<(typeof mr)[number]>;
  ms: PropDef<(typeof ms)[number]>;
  mt: PropDef<(typeof mt)[number]>;
  mx: PropDef<(typeof mx)[number]>;
  my: PropDef<(typeof my)[number]>;
}

export const marginDefs: MarginDefs = {
  m: { type: "enum", values: m, default: undefined, responsive: true },
  mb: { type: "enum", values: mb, default: undefined, responsive: true },
  me: { type: "enum", values: me, default: undefined, responsive: true },
  ml: { type: "enum", values: ml, default: undefined, responsive: true },
  mr: { type: "enum", values: mr, default: undefined, responsive: true },
  ms: { type: "enum", values: ms, default: undefined, responsive: true },
  mt: { type: "enum", values: mt, default: undefined, responsive: true },
  mx: { type: "enum", values: mx, default: undefined, responsive: true },
  my: { type: "enum", values: my, default: undefined, responsive: true },
};

export const marginSafeList = [
  makeSafeList("m", m),
  makeSafeList("mb", mb),
  makeSafeList("me", me),
  makeSafeList("ml", ml),
  makeSafeList("mr", mr),
  makeSafeList("ms", ms),
  makeSafeList("mt", mt),
  makeSafeList("mx", mx),
  makeSafeList("my", my),
];
