import type { PropDef } from "src/definitions/types";

const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "none"] as const;
const rows = [1, 2, 3, 4, 5, 6, "none"] as const;
const flow = ["row", "column", "row-dense", "col-dense"] as const;
const autoCols = ["auto", "min", "max", "fr"] as const;
const autoRows = autoCols;
export const gridPropDefs = {
  cols: {
    type: "enum",
    values: cols,
    default: undefined,
    responsive: true,
  },
  rows: { type: "enum", values: rows, default: undefined, responsive: true },
  flow: { type: "enum", values: flow, default: undefined, responsive: true },
  autoRows: {
    type: "enum",
    values: autoRows,
    default: undefined,
    responsive: true,
  },
  autoCols: {
    type: "enum",
    values: autoCols,
    default: undefined,
    responsive: true,
  },
} satisfies {
  cols: PropDef<(typeof cols)[number]>;
  rows: PropDef<(typeof rows)[number]>;
  flow: PropDef<(typeof flow)[number]>;
  autoRows: PropDef<(typeof autoRows)[number]>;
  autoCols: PropDef<(typeof autoCols)[number]>;
};
