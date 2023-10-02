import { FontSize } from "../types";

export default function getFontSize(fontSize: FontSize) {
  return Object.entries(fontSize).reduce((acc, [key, value]) => {
    if (key === "default") {
      return {
        ...acc,
        "--default-font-size": value.fontSize,
        "--default-line-height": value.lineHeight,
      };
    }
    return {
      ...acc,
      [`--font-size-${key}`]: value.fontSize,
      [`--line-height-${key}`]: value.lineHeight,
    };
  }, {});
}
