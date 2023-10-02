import { ColorRamp } from "../types";

export default function mapColorRamp(
  color: string,
  values: ColorRamp,
  isAlpha = false
) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const colorKey = isAlpha ? `${color}-a` : color;
    if (typeof value === "string") {
      acc[`--${colorKey}-${key}`] = value;
    } else {
      Object.entries(values).forEach(([subKey, subValue]) => {
        acc[`--${colorKey}-${key}-${subKey}`] = subValue;
      });
    }
    return acc;
  }, {} as Record<string, string>);
}
