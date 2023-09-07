import { GetPropDefTypes } from "src/definitions/types";
import { typographyDefs } from "src/definitions/typography.props";
import { withBreakpoints } from "src/utils";
import { extractMarginProps } from "src/definitions/margin.utils";

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
export function withTypographyProps<T extends TypographyProps>(obj: T): string {
  const { typographyProps } = extractTypographyProps(obj);
  return Object.entries(typographyProps)
    .reduce<string[]>((acc, [key, value]) => {
      if (typeof value === "undefined") return acc;
      const prefix =
        key === "weight" ? "font" : key.includes("m") ? key : "text";
      const classes = withBreakpoints(prefix, value);

      if (classes) acc.push(classes);

      return acc;
    }, [])
    .join(" ");
}
