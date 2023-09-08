import { GetPropDefTypes } from "src/definitions/types";
import { typographyDefs } from "src/definitions/typography.props";
import { withBreakpoints } from "src/utils";
import {
  extractMarginProps,
  withMarginProps,
} from "src/definitions/margin.utils";

export type TypographyProps = GetPropDefTypes<typeof typographyDefs>;
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
