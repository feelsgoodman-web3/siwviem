import type { ColorMap } from "../types"
import mapColorRamp from "./mapColorRamp"

export default function getRamp(map: ColorMap) {
  return {
    ...mapColorRamp("accent", map.accent),
    ...mapColorRamp("accent", map["accent-a"], true),
    ...mapColorRamp("blue", map.blue),
    ...mapColorRamp("blue", map["blue-a"], true),
    ...mapColorRamp("gray", map.gray),
    ...mapColorRamp("gray", map["gray-a"], true),
    ...mapColorRamp("green", map.green),
    ...mapColorRamp("green", map["green-a"], true),
    ...mapColorRamp("orange", map.orange),
    ...mapColorRamp("orange", map["orange-a"], true),
    ...mapColorRamp("purple", map.purple),
    ...mapColorRamp("purple", map["purple-a"], true),
    ...mapColorRamp("red", map.red),
    ...mapColorRamp("red", map["red-a"], true),
    ...mapColorRamp("yellow", map.yellow),
    ...mapColorRamp("yellow", map["yellow-a"], true),
    ["--color-background"]: map["color-background"],
    ["--color-panel-solid"]: map["color-panel-solid"],
    ["--text-color"]: map["text-color"],
    ["--text-color-contrast"]: map["text-color-contrast"],
    ["--text-muted"]: map["text-muted"],
    ["--tw-shadow-color"]: map["tw-shadow-color"] || null,
  }
}
