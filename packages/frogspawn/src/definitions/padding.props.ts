import { SPACING_SCALE } from "src/constants";
import { PropDef } from "src/definitions/types";

export const p = SPACING_SCALE;
export const pb = p;
export const pe = p;
export const pl = p;
export const pr = p;
export const ps = p;
export const pt = p;
export const px = p;
export const py = p;

export interface PaddingDefs {
  p: PropDef<(typeof p)[number]>;
  pb: PropDef<(typeof pb)[number]>;
  pe: PropDef<(typeof pe)[number]>;
  pl: PropDef<(typeof pl)[number]>;
  pr: PropDef<(typeof pr)[number]>;
  ps: PropDef<(typeof ps)[number]>;
  pt: PropDef<(typeof pt)[number]>;
  px: PropDef<(typeof px)[number]>;
  py: PropDef<(typeof py)[number]>;
}

export const paddingDefs: PaddingDefs = {
  p: { type: "enum", values: p, default: undefined, responsive: true },
  pb: { type: "enum", values: pb, default: undefined, responsive: true },
  pe: { type: "enum", values: pe, default: undefined, responsive: true },
  pl: { type: "enum", values: pl, default: undefined, responsive: true },
  pr: { type: "enum", values: pr, default: undefined, responsive: true },
  ps: { type: "enum", values: ps, default: undefined, responsive: true },
  pt: { type: "enum", values: pt, default: undefined, responsive: true },
  px: { type: "enum", values: px, default: undefined, responsive: true },
  py: { type: "enum", values: py, default: undefined, responsive: true },
};
