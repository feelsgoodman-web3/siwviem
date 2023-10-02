import { withBreakpoints } from "../utils";

import { GetPropDefTypes } from "./types";
import { typographyDefs } from "./typography.props";
import { extractMarginProps, withMarginProps } from "./margin.utils";
import { cva, VariantProps } from "class-variance-authority";

export type TypographyProps = VariantProps<typeof textColorVariants> &
  GetPropDefTypes<typeof typographyDefs>;

export const textColorVariants = cva("", {
  variants: {
    color: {
      default: "fs-text-inherit fs-decoration-gray-a-5",
      inherit: "fs-text-inherit fs-decoration-inherit",
      accent: "fs-text-accent-a-11 fs-decoration-accent-a-5",
      blue: "fs-text-blue-a-11 fs-decoration-blue-a-5",
      gray: "fs-text-gray-a-11 fs-decoration-gray-a-5",
      green: "fs-text-green-a-11 fs-decoration-green-a-5",
      orange: "fs-text-orange-a-11 fs-decoration-orange-a-5",
      purple: "fs-text-purple-a-11 fs-decoration-purple-a-5",
      red: "fs-text-red-a-11 fs-decoration-red-a-5",
      yellow: "fs-text-red-a-11 fs-decoration-red-a-5",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export function extractTypographyProps<T extends TypographyProps>(props: T) {
  const { marginProps, ...marginRest } = extractMarginProps(props);
  const {
    size = typographyDefs.size.default,
    weight = typographyDefs.weight.default,
    align = typographyDefs.align.default,
    ...rest
  } = marginRest;
  return {
    typographyProps: {
      ...marginProps,
      size,
      weight,
      align,
    },
    ...rest,
  };
}
export function withTypographyProps<T extends TypographyProps>(
  props: T
): string {
  return [
    withMarginProps(props),
    withBreakpoints("text", props.size),
    withBreakpoints("font", props.weight),
    withBreakpoints("text", props.align),
  ]
    .filter(Boolean)
    .join(" ");
}
