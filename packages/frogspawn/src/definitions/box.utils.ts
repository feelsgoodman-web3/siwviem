import { boxDefs } from "src/definitions/box.props";
import { type GetPropDefTypes } from "src/definitions/types";

import { toKebabCase, withBreakpoints } from "src/utils";
import { extractPaddingProps } from "src/definitions/padding.utils";
import { extractMarginProps } from "src/definitions/margin.utils";

export type BoxProps = GetPropDefTypes<typeof boxDefs>;
export function extractBoxProps<T extends BoxProps>(props: T) {
  const { paddingProps, ...paddingRest } = extractPaddingProps(props);
  const { marginProps, ...marginRest } = extractMarginProps(paddingRest);
  const {
    alignSelf = boxDefs.alignSelf.default,
    content = boxDefs.content.default,
    display = boxDefs.display.default,
    gap = boxDefs.gap.default,
    gapX = boxDefs.gapX.default,
    gapY = boxDefs.gapY.default,
    items = boxDefs.items.default,
    justify = boxDefs.justify.default,
    justifyItems = boxDefs.justifyItems.default,
    justifySelf = boxDefs.justifySelf.default,
    placeContent = boxDefs.placeContent.default,
    spaceX = boxDefs.spaceX.default,
    spaceY = boxDefs.spaceY.default,
    ...rest
  } = marginRest;
  return {
    layoutProps: {
      ...paddingProps,
      ...marginProps,
      alignSelf,
      content,
      display,
      gap,
      gapX,
      gapY,
      items,
      justify,
      justifyItems,
      justifySelf,
      placeContent,
      spaceX,
      spaceY,
    },
    ...rest,
  };
}
export function withBoxDefs<T extends BoxProps>(obj: T): string {
  const { layoutProps } = extractBoxProps(obj);
  return Object.entries(layoutProps)
    .reduce<string[]>((acc, [key, value]) => {
      if (typeof value === "undefined") return acc;
      const prefix = key === "alignSelf" ? "self" : toKebabCase(key);
      const classes = withBreakpoints(prefix, value);

      if (classes) acc.push(classes);

      return acc;
    }, [])
    .join(" ");
}
