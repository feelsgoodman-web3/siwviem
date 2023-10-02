type ColorRecord = Record<
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  string
>;

export interface ColorRamp extends ColorRecord {
  "9-contrast"?: string;
  surface?: string;
}

export interface ColorMap {
  accent: ColorRamp;
  "accent-a": ColorRamp;
  blue: ColorRamp;
  "blue-a": ColorRamp;
  gray: ColorRamp;
  "gray-a": ColorRamp;
  green: ColorRamp;
  "green-a": ColorRamp;
  orange: ColorRamp;
  "orange-a": ColorRamp;
  purple: ColorRamp;
  "purple-a": ColorRamp;
  red: ColorRamp;
  "red-a": ColorRamp;
  yellow: ColorRamp;
  "yellow-a": ColorRamp;
  "color-background": string;
  "color-panel-solid": string;
  "text-color": string;
  "text-color-contrast": string;
  "text-muted": string;
  "tw-shadow-color"?: string | null;
}

interface Colors {
  light: ColorMap;
  dark: ColorMap;
}

interface Typography {
  fontSize: string;
  lineHeight: string;
}
export interface FontSize {
  xs: Typography;
  sm: Typography;
  base: Typography;
  lg: Typography;
  xl: Typography;
  "2xl": Typography;
  "3xl": Typography;
  "4xl": Typography;
  "5xl": Typography;
  default: Typography;
}

export type FontWeight = Record<
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black"
  | "default",
  string
>;

export type BorderRadius = Record<
  "base" | "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full",
  string
>;

export interface Theme {
  colors: Colors;
  fontSize: FontSize;
  fontWeight: FontWeight;
  borderRadius: BorderRadius;
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type Options = DeepPartial<Theme>;
